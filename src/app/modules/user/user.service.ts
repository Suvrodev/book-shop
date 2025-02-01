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
  console.log("User Payload: ", payload);
  const email = payload?.email;
  const res = await userModel.findOne({ email: email });
  console.log(" res: ", res);
  if (res) {
    throw new AppError(409, "This Email Allready Exists");
  }
  const result = await userModel.create(payload);
  return result;
};

//Get All User from DB
const getAllUser = async () => {
  const result = await userModel.find();
  return result;
};

//deletel User from DB
const deleteUser = async (id: string) => {
  try {
    const result = await userModel.findOneAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw new Error("USer Not Found");
  }
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
    throw new AppError(401, "Old password is not right");
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
//Update User
const updatUserIntoDB = async (userId: string, payload: TUser) => {
  console.log("User Id in service: ", userId);
  console.log("payload in service", payload);

  const result = await userModel.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
  });
  return result;
};

export const userServices = {
  registerUserIntoDB,
  getAllUser,
  updatePasswordIntoDB,
  deleteUser,
  updatUserIntoDB,
};
