export interface IOrder {
  orderId: string;
  flavor: string;
  price: number;
  quantity: number;
  totalValue: number;
  clientName: string;
  clientId: string
}