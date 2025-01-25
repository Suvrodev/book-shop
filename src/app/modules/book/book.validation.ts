import { z } from "zod";

export const bookValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  price: z.number().min(0, "Price must be a positive number"),
  imageUrl: z.string().min(0, "Image must be a required"),
  category: z.enum(
    ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
    {
      required_error: "Category is required",
      invalid_type_error:
        "Invalid category. Allowed categories are: Fiction, Science, SelfDevelopment, Poetry, Religious",
    }
  ),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  inStock: z.boolean({
    required_error: "In-stock status is required",
    invalid_type_error: "In-stock status must be a boolean",
  }),
  refUser: z
    .string()
    .min(1, "Reference to a user is required")
    .regex(/^[a-f\d]{24}$/i, "Invalid user ID"),
});

export default bookValidationSchema;
