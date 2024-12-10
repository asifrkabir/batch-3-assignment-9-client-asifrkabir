import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");
const optionalString = z.string().trim().optional();

export const createOrderValidationSchema = z.object({
  couponCode: optionalString,
  deliveryAddress: requiredString,
});
