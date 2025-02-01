import AppError from "../../errors/AppError";
import { Book } from "../book/book.model";
import { CartModel } from "../Cart/cart.model";
import { IPayment } from "./payment.interface";
import { paymentModel } from "./payment.model";

export const makePayment = async (
  finalOrder: any,
  productId: string,
  quantity: number
) => {
  // Wait for the order creation
  const result: any = await paymentModel.create(finalOrder);
};

export const checkQuantityOfBook = async (
  productId: string,
  quantity: number
) => {
  //Check quantity of Book
  console.log("Come product id for check book: ", productId);
  const targetBook = await Book.findOne({
    _id: productId,
  });
  // console.log("Target Book: ", targetBook);
  if (!targetBook) {
    return false;
  }
  if (targetBook?.quantity < quantity) {
    return false;
  }
  console.log("Target Book Quantity: ", targetBook?.quantity);
  return true;
};

export const updateQuantityRemoveCartAndCheckInStock = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  //inStock make false if quantity is 0
  const targetBookAgain = await Book.findOne({
    _id: productId,
  });
  if (!targetBookAgain) {
    return;
  }
  const againTargetBookQuantity = targetBookAgain?.quantity;
  console.log("Again Target Book Quantity: ", againTargetBookQuantity);
  if (againTargetBookQuantity == 0) {
    const inStockRes = await Book.updateOne(
      { _id: productId },
      { inStock: false }
    );
    console.log("After in Stock false: ", inStockRes);
  }

  return;
};

///Get All Payment by admin
const getAllPaymentByAdminFromDB = async () => {
  const result = await paymentModel
    .find()
    .populate("productId")
    .populate("userId");
  return result;
};

// Get all Payment by User
const getSpecificPaymentFromDB = async (id: string) => {
  const result = await paymentModel.find({ userId: id }).populate("productId");
  return result;
};

// Delete Payment
const deletePaymentFromDB = async (id: string, loggedUserId: string) => {
  ///Check user right or wrong
  const prvCheck = await paymentModel.findById({ _id: id });
  if (prvCheck?.userId?.toString() !== loggedUserId) {
    console.log("Payment user id--------: ", prvCheck?.userId?.toString());
    console.log("logged user id------: ", loggedUserId);
    throw new AppError(401, "You are not authorized");
  }

  //main work
  const result = await paymentModel.findByIdAndDelete({ _id: id });
  return result;
};

// Delete Payment
const deletePaymentByAdminFromDB = async (id: string, loggedUserId: string) => {
  console.log("Delete order (admin id:)", loggedUserId);
  const result = await paymentModel.findByIdAndDelete({ _id: id });
  return result;
};

//confirm payment by admin
const confirmPaymentFromDB = async (id: string, payload: any) => {
  const bookId = payload?.bookId;
  const quantity = payload?.quantity;
  const adminApproval = payload?.adminApproval;

  console.log("AdminApproval: ", adminApproval);
  console.log("Book id: ", bookId);
  console.log("quantity: ", quantity);
  const res = await paymentModel.findByIdAndUpdate(
    { _id: id },
    { adminApproval: adminApproval },
    {
      new: true,
    }
  );

  if (res?.adminApproval !== "confirm") {
    return;
  }

  ///Reduce Quantity of Book
  const targetBook = await Book.findOne({
    _id: bookId,
  });
  if (!targetBook) {
    return;
  }
  const tarGetBookQuantity = targetBook?.quantity;
  console.log("Target Book Quantity: ", tarGetBookQuantity);
  const updateQuantitiesRes = await Book.findByIdAndUpdate(
    { _id: bookId },
    { quantity: tarGetBookQuantity - quantity },
    {
      new: true,
    }
  );
  console.log("After Update BOOk Quantity: ", updateQuantitiesRes);
  if (updateQuantitiesRes?.quantity !== 0) {
    return;
  }
  const updateBookInStockFalseRes = await Book.findByIdAndUpdate(
    { _id: bookId },
    { inStock: false },
    {
      new: true,
    }
  );
  console.log("updateBookInStockFalseRes", updateBookInStockFalseRes);
};

export const PaymentService = {
  getAllPaymentByAdminFromDB,
  getSpecificPaymentFromDB,
  deletePaymentFromDB,
  confirmPaymentFromDB,
  deletePaymentByAdminFromDB,
};
