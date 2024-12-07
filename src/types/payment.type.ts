import { IOrder } from "./order.type";
import { IUser } from "./user.type";

export interface IPaymentIntent {
  amount: number;
}

export interface IPayment {
  _id: string;
  user: IUser;
  order: IOrder;
  amount: number;
  status: "successful" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePayment {
  order: string;
  amount: number;
}
