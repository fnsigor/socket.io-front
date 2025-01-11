"use client";
import React, { useState } from "react";
import { Space, Table, Pagination } from "antd";
import type { TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../actions";

interface Pokemon {
    name: string;
    url: string;
}

const columns: TableProps<Pokemon>["columns"] = [
    {
        title: "Pokémon",
        dataIndex: "name",
    },
    {
        title: "URL",
        dataIndex: "url",
    },
    {
        title: "Imagem",
        dataIndex: "url",
        render: (url) => (
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.charAt(
                    url.length - 2
                )}.png`}
            />
        ),
    },
];

const PokemonTable: React.FC = () => {
    const [pagination, setPagination] = useState({ limit: 3, page: 1 });

    const { isPending, error, data } = useQuery({
        queryKey: ["pokemons", pagination.page, pagination.limit],
        queryFn: () => getPokemons(pagination.limit, pagination.limit * (pagination.page - 1)),
        staleTime: 1000 * 60 * 5,
        throwOnError(error, query) {
            console.log('error', error)
            return true
        },
    });

    const handlePagination = (page: number, limit: number) => { 
        setPagination({
            limit,
            page,
        });
    };

    return (
        <>
            {data && (
                <>
                    <Table<Pokemon>
                        columns={columns}
                        dataSource={data.results}
                        loading={isPending}
                    />
                    <Pagination
                        total={data.count}
                        current={pagination.page}
                        pageSize={pagination.limit}
                        pageSizeOptions={[3, 15, 20]}
                        showSizeChanger
                        showQuickJumper
                        onChange={handlePagination}
                    />
                </>
            )}
            {error && <p>deu pau</p>}
        </>
    );
};

export default PokemonTable;
