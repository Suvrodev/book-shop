import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import config from "../../config";

interface IPassword {
  oldPassword: string;
  newPassword: string;
}

///Create User into db
const registerUserIntoDB = async (payload: TUser) => {
  //   console.log("Payload: ", payload);
  const result = await userModel.create(payload);
  return result;
};

//Get All User from DB
const getAllUser = async () => {
  const result = await userModel.find();
  return result;
};

//Update Password
const updatePasswordIntoDB = async (userId: string, payload: IPassword) => {
  const { oldPassword, newPassword } = payload;
  console.log("User Id: ", userId);
  console.log("Old Password ", oldPassword);
  console.log("New  Password ", newPassword);

  //Checking  if the user is exist
  const isUserExists = await userModel.findOne({ _id: userId });
  if (!isUserExists) {
    throw new AppError(404, "User not Found");
  }

  //Check Password is right or wrong
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExists?.password
  );
  console.log("is Password Matched: ", isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(401, "Password do not matched");
  }

  const hashNewPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await userModel.findByIdAndUpdate(
    userId,
    { password: hashNewPassword },
    { new: true }
  );
  return result;
};
export const userServices = {
  registerUserIntoDB,
  getAllUser,
  updatePasswordIntoDB,
};
