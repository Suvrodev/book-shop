import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { userValidations } from "./userValidation";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync(req.body);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

router.post(
  "/",
  validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser
);
router.get("/register", userControllers.getAllUsers);

export const userRoutes = router;
