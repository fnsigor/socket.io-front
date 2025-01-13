"use client";
import { Form, Input, Col, Row, Button } from "antd";
import { Wrapper } from "./styled";
import { useState } from "react";
import { useGlobal } from "@/globalContext";
import { login } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { removeAllCookies, setCookie } from "@/actions/cookies";

const LoginForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { handleMessage, socketInstance } = useGlobal();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            await removeAllCookies();

            const { email, password } = form.getFieldsValue(true) as {
                email: string;
                password: string;
            };

            const response = await login(email, password);

            if (response.error) {
                handleMessage("error", response.error);
            }

            if (response.data) {
                await setCookie("token", response.data.token);
                await setCookie("username", response.data.name);
                // Registrar o usuário no servidor via socket
                socketInstance.emit("register", response.data.id);
                router.push("/");
            }
        } catch (error) {
            await removeAllCookies();
            handleMessage("error", "Erro ao fazer login. Consulte o suporte!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <h1>Login</h1>
            <Form
                form={form}
                name="loginForm"
                initialValues={{
                    password: "",
                    email: "",
                }}
                onFinish={handleSubmit}
                autoComplete="off"
                layout="vertical"
                scrollToFirstError={{
                    behavior: "instant",
                    block: "end",
                }}
            >
                <Row>
                    <Col xs={24}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="seu email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24}>
                        <Form.Item
                            name="password"
                            label="Senha"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"end"}>
                    <Col>
                        <Form.Item>
                            <Button loading={isLoading} htmlType="submit">
                                Entrar
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    );
};

export default LoginForm;
