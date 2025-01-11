"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        
    if (window.sessionStorage.getItem("token") === null) {
        console.log("caiu no if")
        return router.push("/login")
      }
    }, [path]);

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
