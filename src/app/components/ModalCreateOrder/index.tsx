"use client";
import { useAllOrders } from "@/app/context";
import SelectPizza from "@/components/Select/SelectPizza";
import {
    Col,
    Divider,
    Modal,
    Row,
    Button,
    Form,
    Input,
    message,
    Select,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/api/server";
import { useState } from "react";
import { useGlobal } from "@/globalContext";

interface IPizza {
    id: number;
    name: string;
    price: number;
}

const ModalCreateOrder = () => {

    const { isModalCreateOrderOpen, setIsModalCreateOrderOpen } = useAllOrders();
    const { handleMessage } = useGlobal();
    
    const [totalValue, setTotalValue] = useState(0);

    const [form] = Form.useForm();
    const quantity = Form.useWatch("quantity", form);

    const queryClient = useQueryClient()




    const handleCancel = () => {
        setIsModalCreateOrderOpen(false);
        form.resetFields();
    };


    const handleChangePizza = (pizzaId: any, data: any) => {
        setTotalValue(Number(data.key.split("-")[0]));
    };

    const createOrder = useMutation({
        mutationFn: async () => {

            const requestBody = {
                quantity:  form.getFieldValue('quantity'),
                pizzaId:  form.getFieldValue('pizzaId'),
            } 
            const response = await request(
                "POST",
                "/order",
                requestBody
            );

            if (response.error) {
                throw new Error(response.error);
            }

            return response.data;
        },
        onError: (error: Error) => handleMessage("error", error.message),
        onSuccess: (success) => {
            handleCancel()
            queryClient.invalidateQueries({queryKey: ["allOrders"]})
        },
    });

    return (
        <Modal
            closable={false}
            onCancel={handleCancel}
            open={isModalCreateOrderOpen}
            title={null}
            footer={null}
            loading={createOrder.isPending}
        >
            <Divider>Novo pedido</Divider>

            <Form
                form={form}
                name="newPizzaForm"
                initialValues={{
                    pizzaId: undefined,
                    quantity: 1,
                }}
                autoComplete="off"
                layout="vertical"
                scrollToFirstError={{
                    behavior: "instant",
                    block: "end",
                }}
                onFinish={createOrder.mutate}
            >
                <Divider />

                <Form.Item
                    label="Sabor da pizza"
                    name="pizzaId"
                    rules={[
                        { required: true, message: "informe o sabor da pizza" },
                    ]}
                >
                    <SelectPizza onChange={handleChangePizza} />
                </Form.Item>

                <Form.Item label="quantidade" name="quantity" required>
                    <Input type="number" min={1} />
                </Form.Item>

                <p>Valor total: {totalValue * quantity}</p>

                <Row justify={"end"} gutter={[20, 20]}>
                    <Col>
                        <Form.Item>
                            <Button onClick={handleCancel}>cancelar</Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={createOrder.isPending}
                            >
                                fazer pedido
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalCreateOrder;
