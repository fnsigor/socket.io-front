"use client";
import { Button } from "antd";
import { Wrapper } from "./styled";
import { useAllOrders } from "@/app/(after-login)/context";

const CreateOrderButton: React.FC = () => {
    const { setIsModalCreateOrderOpen } = useAllOrders();

    return (
        <Wrapper>
            <Button onClick={() => setIsModalCreateOrderOpen(true)}>
                Gerar pedido de pizza
            </Button>
        </Wrapper>
    );
};

export default CreateOrderButton;
