/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../services/AuthService";

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
