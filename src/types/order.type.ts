import { IProduct } from "./product.type";
import { IShop } from "./shop.type";
import { IUser } from "./user.type";

export interface IOrder {
  _id: string;
  user: IUser;
  shop: IShop;
  produts: IOrderProduct[];
  status: "pending" | "complete";
  createdAt: string;
  updatedAt: string;
}

export interface IOrderProduct {
  product: IProduct;
  price: number;
  quantity: number;
}
