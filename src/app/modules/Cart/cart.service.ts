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
const deleteCartFromDB = async (cartId: string) => {
  try {
    const result = await CartModel.findByIdAndDelete({ _id: cartId });
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};

export const cartServices = {
  createCartDB,
  getAllCartFromDB,
  deleteCartFromDB,
};
