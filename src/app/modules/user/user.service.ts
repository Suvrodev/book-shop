import { TUser } from "./user.interface";
import { userModel } from "./user.model";

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

//Login User from DB
const getUserFromDB = async () => {
  const result = await userModel.findOne();
};

export const userServices = {
  registerUserIntoDB,
  getAllUser,
};
