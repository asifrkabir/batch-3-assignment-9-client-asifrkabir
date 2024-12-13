import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const registerValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(1, { message: "Password is required" }),
  role: z.enum(["user", "vendor"], {
    errorMap: () => ({ message: "Role must be either 'User' or 'Vendor'" }),
  }),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(1, { message: "Old Password is required" }),
  newPassword: z
    .string()
    .trim()
    .min(1, { message: "New Password is required" }),
});
