"use client";
import React from "react";
import type { IOrder } from "@/interfaces/IOrder";
import { Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/api/server";

interface Order {
    id: number;
    quantity: number;
    totalValue: number;
    Client: {
        name: string;
    };
    Pizza: {
        name: string;
        price: number;
    };
    OrderStatus: {
        name: string;
    };
}

const columns: TableProps<Order>["columns"] = [
    {
        title: "Cliente",
        dataIndex: "Client",
        render: (Client) => <>{Client.name}</>,
    },
    {
        title: "Pizza",
        dataIndex: "Pizza",
        render: (Pizza) => <>{Pizza.name}</>,
    },
    {
        title: "Valor unitário",
        dataIndex: "Pizza",
        render: (Pizza) => <>{Pizza.price}</>,
    },
    {
        title: "Quantidade",
        dataIndex: "quantity",
    },
    {
        title: "Total do pedido",
        dataIndex: "totalValue",
    },
];

const OrderTable: React.FC = () => {
    
    const { isLoading, error, data } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const response = await request("GET", "/order");

            if (response.error) {
                message.open({
                    type: "error",
                    content: "Erro ao buscar pedidos",
                    duration: 7,
                });
                throw new Error("Erro ao buscar pedidos");
            }

            if (response.data) {
                return response.data as Order[];
            }
        },
        initialData: []
    });

    return (
        <>
            {isLoading && <p>carregando...</p>}
            {data && <Table<Order> columns={columns} dataSource={data} />}
            {error && <p>deu pau</p>}
        </>
    );
};

export default OrderTable;
