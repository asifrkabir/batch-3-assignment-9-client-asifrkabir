import { IOrder } from "./order.type";
import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IReview {
  _id: string;
  user: IUser;
  product: IProduct;
  order: IOrder;
  rating: number;
  comment?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
