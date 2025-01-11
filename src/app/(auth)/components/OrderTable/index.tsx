"use client";
import React from "react";
import type { IOrder } from "@/interfaces/IOrder";
import { Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { reactQueryRequest, request } from "@/api/server";
import { getOrders } from "./actions";

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
    const { isPending, error, data } = useQuery({
        queryKey: ["allOrders"],
        queryFn: () => getOrders(),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <>
            {isPending && <p>carregando...</p>}
            {data && <Table<Order> columns={columns} dataSource={data} />}
            {error && <p>deu pau</p>}
        </>
    );
};

export default OrderTable;
