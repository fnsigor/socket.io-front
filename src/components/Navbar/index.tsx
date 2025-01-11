"use client"
import Link from "next/link";
import { Wrapper } from "./style";

const Navbar = () => {
    return (
        <Wrapper>
            <Link href={"/"}>home</Link>
            <Link href={"/pagination"}>paginação</Link>
        </Wrapper>
    );
};

export default Navbar;
