"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { message, notification, Spin } from "antd";


interface IContext {
    handleMessage: (
      type: "warning" | "error" | "success" | "info" | "loading",
      message: string,
      duration?: number
  ) => void;
}
const Context = createContext({});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [messageApi, contextMessage] = message.useMessage();

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

    const contextValues = {
        handleMessage,
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
