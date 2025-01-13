"use client";
import Link from "next/link";
import { Wrapper } from "./style";
import { useEffect, useState } from "react";
import { getCookie, removeAllCookies } from "@/actions/cookies";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/globalContext";

const Navbar = () => {
    const [username, setUsername] = useState("");
    const router = useRouter();
    const { socketInstance } = useGlobal();

    const getUsername = async () => {
        if (username.trim()) return;
        const cookie = await getCookie("username");
        if (cookie) {
            setUsername(cookie);
        }
    };

    const logout = async () => {
        removeAllCookies();
        socketInstance.off("disconnect");
        router.push("/login");
    };

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <Wrapper>
            <div>
                <Link href={"/"}>home</Link>
                <Link href={"/pagination"}>paginação</Link>
            </div>
            <div>
                <p>{username}</p>
                <Button onClick={logout}>sair</Button> 
            </div>
        </Wrapper>
    );
};

export default Navbar;
