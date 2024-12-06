import { IUser } from "./user.type";

export interface IPaymentIntent {
  amount: number;
}

export interface IPayment {
  _id?: string;
  user?: string | IUser;
  amount: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
