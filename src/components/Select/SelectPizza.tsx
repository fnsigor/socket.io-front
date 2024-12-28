import React from "react";
import { Space, Table, Tag, message, Select } from "antd";
import { SelectProps } from "antd/lib/select";

import { useQuery } from "@tanstack/react-query";
import { request } from "@/api/server";

interface IPizza {
    id: number;
    name: string;
    price: number;
}

const SelectPizza = ({ ...props }: SelectProps) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["allPizzas"],
        initialData: [],
        queryFn: async () => {
            const response = await request("GET", "/pizza");

            if (response.error) {
                message.open({
                    type: "error",
                    content: "Erro ao buscar pizzas",
                    duration: 7,
                });
                throw new Error("Erro ao buscar pizzas");
            }

            if (response.data) {
                return response.data as IPizza[];
            }
        },
    });

    return (
        <Select
            {...props}
            disabled={isLoading}
            loading={isLoading}
            placeholder={isLoading ? "Buscando sabores de pizza..." : "Selecione um sabor de pizza"}
        >
            {data?.map((pizza) => (
                <Select.Option value={pizza.id} key={`${pizza.price}-${pizza.id}`}>
                    {pizza.name} - {pizza.price}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectPizza;
