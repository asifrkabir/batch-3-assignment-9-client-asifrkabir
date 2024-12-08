import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createShopValidationSchema = z.object({
  name: requiredString,
  description: requiredString,
});
