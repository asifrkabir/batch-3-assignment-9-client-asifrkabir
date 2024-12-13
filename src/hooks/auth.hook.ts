/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  changePassword,
  loginUser,
  registerUser,
} from "../services/AuthService";
import { IChangePassword } from "@/types/auth.type";

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: registerUser,
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: loginUser,
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, IChangePassword>({
    mutationFn: changePassword,
  });
};
