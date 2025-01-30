"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Name is required",
    })
        .trim()
        .nonempty("Name cannot be empty"),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string({
        required_error: "Password is required",
    })
        .max(10, "Password cannot be more than 10 characters"),
    role: zod_1.z
        .enum(["admin", "user"], {
        invalid_type_error: "Role must be one of the following: 'admin' or 'user'",
    })
        .default("user"),
    isBlocked: zod_1.z.boolean().default(false),
});
exports.userValidations = {
    userValidationSchema,
};
//!In here will be enum not refine
