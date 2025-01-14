"use client";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { message, notification, Spin } from "antd";
import { useRouter } from "next/navigation";
import { getCookie } from "./actions/cookies";
import { Socket } from "socket.io-client";
import { socket } from "./socket";
import { useQueryClient } from "@tanstack/react-query";

interface ServerToClientEvents {
    "update-table": (message: string) => void;
}

interface ClientToServerEvents {
    "register": (userId: string) => void;
}

interface IContext {
    handleMessage: (
        type: "warning" | "error" | "success" | "info" | "loading",
        message: string,
        duration?: number
    ) => void;
    socketInstance: Socket<ServerToClientEvents, ClientToServerEvents>;
    isConnected: boolean;
}
const Context = createContext<IContext>({
    handleMessage: () => {},
    socketInstance: {} as Socket<ServerToClientEvents, ClientToServerEvents>,
    isConnected: false,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [messageApi, contextMessage] = message.useMessage();
    const queryClient = useQueryClient()


    const handleMessage = (
        type: "warning" | "error" | "success" | "info" | "loading",
        message: string,
        duration?: number
    ) => {
        messageApi.open({
            type: type,
            content: message,
            duration: duration || 7,
        });
    };

    const [socketInstance] = useState(socket());

    const [isConnected, setIsConnected] = useState(socketInstance.connected);

    const router = useRouter();

    const verifyIfHasCookies = async () => {
        const tokenCookie = await getCookie("token");
        const usernameCookie = await getCookie("username");
        if (!tokenCookie || !usernameCookie) {
            handleMessage("warning", "Faça login novamente")
            router.push("/login", { scroll: false });
        }
    };

    useEffect(() => {
        verifyIfHasCookies();
    }, []);

    useEffect(() => {
        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        socketInstance.on("update-table", (data) => {
            console.log("socket", data)
            queryClient.invalidateQueries({queryKey: ["allOrders"]})
        });



        return () => {
            socketInstance.off("connect");
            socketInstance.off("disconnect");
        };
    }, [socketInstance]);


    useEffect(() => {
        socketInstance.on("update-table", (mensagem) => {
            handleMessage("info", "Tabela de pedidos atualizada")
        });

        return () => {
            socketInstance.off("update-table");
        };
    }, [socketInstance]);

    const contextValues = {
        handleMessage,
        socketInstance,
        isConnected,
    };

    return (
        <Context.Provider value={contextValues}>
            {contextMessage}
            {children}
        </Context.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error("error useAllOrders context");
    }

    return context as IContext;
};
