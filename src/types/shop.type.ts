import { IUser } from "./user.type";

export interface IShop {
  _id: string;
  name: string;
  logoUrl?: string;
  description: string;
  owner: IUser;
  isBlacklisted: boolean;
  followerCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
