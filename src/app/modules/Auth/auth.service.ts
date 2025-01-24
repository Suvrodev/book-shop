import config from "../../config";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const loginUser = async (payload: TLoginUser) => {
  //   console.log("Payloadddd: ", payload);

  //Checking  if the user is exist
  const isUserExists = await userModel.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(404, "User not Found");
  }

  //Check User blocked or not
  const userIsBlocked = isUserExists?.isBlocked;
  if (userIsBlocked) {
    throw new AppError(403, "User is Blocked");
  }

  //Check Password is right or wrong
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(401, "Password do not matched");
  }

  console.log("is User exists: ", isUserExists);
  //Create Token and send to the client
  const jwtPayload = {
    id: isUserExists.id,
    name: isUserExists?.name,
    email: isUserExists?.email,
    role: isUserExists?.role,
    isBlocked: isUserExists?.isBlocked,
  };
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "30d",
  });
  //   console.log("JwtPayload: ", jwtPayload);
  //Access Granted: Send AccessToken, Refresh Token
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
