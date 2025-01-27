import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";

///Register User
const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await userServices.registerUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error: any) {
    // res.status(400).json({
    //   success: false,
    //   message: error.message || "Validation error",
    //   statusCode: 400,
    //   error: error,
    //   stack: "error stack",
    // });
    next(error);
  }
};

//Get All User
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(201).json({
      success: true,
      message: "Users Retrived successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive students",
      statusCode: 400,
      error: error,
      stack: "error stack",
    });
  }
};

//delete  User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const result = await userServices.deleteUser(id);
    res.status(201).json({
      success: true,
      message: "Users Deleted successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive students",
      statusCode: 400,
      error: error,
      stack: "error stack",
    });
  }
};

//Update  User
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const body = req?.body;
    console.log("Come id: ", id);
    console.log("Body ", body);

    const result = await userServices.updatUserIntoDB(id, body);
    res.status(201).json({
      success: true,
      message: "Users Updated successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive students",
      statusCode: 400,
      error: error,
      stack: "error stack",
    });
  }
};

///Update Password
const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const userId = req?.params?.userId;
    const userPassword = req.body;

    const result = await userServices.updatePasswordIntoDB(
      userId,
      userPassword
    );

    res.status(201).json({
      success: true,
      message: "Password Updated Successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error: any) {
    // res.status(400).json({
    //   success: false,
    //   message: error.message || "Validation error",
    //   statusCode: 400,
    //   error: error,
    //   stack: "error stack",
    // });
    next(error);
  }
};

export const userControllers = {
  registerUser,
  getAllUsers,
  deleteUser,
  updatePassword,
  updateUser,
};
