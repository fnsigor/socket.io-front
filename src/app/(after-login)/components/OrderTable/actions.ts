"use server"

import { request } from "@/api/server"

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

export const getOrders = async () => {
  

    const response = await request("GET", "/order")

    if(response.error){
      throw new Error(response.error)
    }

    return response.data as Order[]


}