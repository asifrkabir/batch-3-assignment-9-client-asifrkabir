import { IUser } from "./user.type";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
