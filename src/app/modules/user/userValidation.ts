import { z } from "zod";

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .nonempty("Name cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .max(10, "Password cannot be more than 10 characters"),
  role: z
    .enum(["admin", "user"], {
      invalid_type_error:
        "Role must be one of the following: 'admin' or 'user'",
    })
    .default("user"),
  isBlocked: z.boolean().default(false),
});

export const userValidations = {
  userValidationSchema,
};

//!In here will be enum not refine
