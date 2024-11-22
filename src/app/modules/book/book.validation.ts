import { z } from "zod";

export const bookValidationSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  price: z.number().min(0).optional(),
  category: z
    .enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"])
    .optional(),
  description: z.string().optional(),
  quantity: z.number().min(0).optional(),
  inStock: z.boolean().optional(),
});

export default bookValidationSchema;
