import { z } from "zod";

const optionalString = z.string().trim().optional();

export const createReviewValidationSchema = z.object({
//   rating: z.coerce.number().min(1).max(5),
  comment: optionalString,
});
