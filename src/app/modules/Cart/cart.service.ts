import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import { CartModel } from "./cart.model";

//Insert Cart
const createCartDB = async (carttData: TCart) => {
  console.log("Cart Data: ", carttData);
  const result = await CartModel.create(carttData);
  return result;
};

// Get all Cart
const getAllCartFromDB = async (id: string) => {
  const result = await CartModel.find({ userId: id }).populate("bookId");
  return result;
};

//delete Cart
const deleteCartFromDB = async (cartId: string, loggedUserId: string) => {
  ///Check user right or wrong
  const prvCheck = await CartModel.findById({ _id: cartId });
  if (prvCheck?.userId?.toString() !== loggedUserId) {
    console.log("Cart ref id--------: ", prvCheck?.userId?.toString());
    console.log("logged user id------: ", loggedUserId);
    throw new AppError(401, "You are not authorized");
  }

  //main work
  const result = await CartModel.findByIdAndDelete({ _id: cartId });
  return result;
};

export const cartServices = {
  createCartDB,
  getAllCartFromDB,
  deleteCartFromDB,
};
