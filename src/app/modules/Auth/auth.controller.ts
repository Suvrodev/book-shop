import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";

//Login User
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    // console.log("Come Data to Login: ", req.body);
    const result = await AuthServices.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        token: result?.accessToken,
      },
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};

export const AuthControllers = {
  loginUser,
};
