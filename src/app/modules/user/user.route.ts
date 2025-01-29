import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { userValidations } from "./userValidation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser
);
//Get All User
router.get("/allusers", auth("admin"), userControllers.getAllUsers);
//delete user
router.delete("/allusers/:id", auth("admin"), userControllers.deleteUser);
//update user
router.patch("/allusers/:id", auth("admin"), userControllers.updateUser);
//change password
router.patch(
  "/updatepassword/:userId",
  auth("user"),
  userControllers.updatePassword
);
// router.get("/register", userControllers.getAllUsers);

export const userRoutes = router;
