"use client"
import { createContext, ReactNode, useContext, useState } from "react";

interface IContext {
  isModalCreateOrderOpen: boolean;
  setIsModalCreateOrderOpen: (previousState?: boolean) => void 
}
const Context = createContext({});

export const AllOrdersContext = ({ children }: { children: ReactNode }) => {
    const [isModalCreateOrderOpen, setIsModalCreateOrderOpen] = useState(false);

    const contextValues = {
        isModalCreateOrderOpen,
        setIsModalCreateOrderOpen,
    };

    return (
        <Context.Provider value={contextValues}>{children}</Context.Provider>
    );
};


export const useAllOrders = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('error useAllOrders context')
  }

  return context as IContext

}