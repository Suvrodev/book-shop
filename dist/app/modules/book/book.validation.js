"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    imageUrl: zod_1.z.string().min(0, "Image must be a required"),
    category: zod_1.z.enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"], {
        required_error: "Category is required",
        invalid_type_error: "Invalid category. Allowed categories are: Fiction, Science, SelfDevelopment, Poetry, Religious",
    }),
    description: zod_1.z.string().min(1, "Description is required"),
    quantity: zod_1.z.number().min(0, "Quantity must be a positive number"),
    inStock: zod_1.z.boolean({
        required_error: "In-stock status is required",
        invalid_type_error: "In-stock status must be a boolean",
    }),
    refUser: zod_1.z
        .string()
        .min(1, "Reference to a user is required")
        .regex(/^[a-f\d]{24}$/i, "Invalid user ID"),
});
exports.default = exports.bookValidationSchema;
