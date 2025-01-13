"use client";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
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
        title: "Valor Unitário",
        dataIndex: "Pizza",
        render: (Pizza) => <>{Pizza.price}</>,
    },
    {
        title: "Quantidade",
        dataIndex: "quantity",
    },
    {
        title: "Total do Pedido",
        dataIndex: "totalValue",
    },
    {
        title: "Status do Pedido",
        dataIndex: "OrderStatus",
        render: ({ name }) => <Tag>{name}</Tag>,
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
