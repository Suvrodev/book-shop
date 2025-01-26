import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { userValidations } from "./userValidation";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser
);
//Get All User
router.get("/allusers", userControllers.getAllUsers);
router.delete("/allusers/:id", userControllers.deleteUser);
router.patch("/updatepassword/:userId", userControllers.updatePassword);
// router.get("/register", userControllers.getAllUsers);

export const userRoutes = router;
