import { Book } from "../book/book.model";
import { CartModel } from "../Cart/cart.model";
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

  const targetBook = await Book.findOne({
    _id: productId,
  });
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
  ///Reduce Quantity of Book
  const targetBook = await Book.findOne({
    _id: productId,
  });
  if (!targetBook) {
    return;
  }
  const tarGetBookQuantity = targetBook?.quantity;
  console.log("Target Book Quantity: ", tarGetBookQuantity);
  const res = await Book.updateOne(
    { _id: productId },
    { quantity: tarGetBookQuantity - quantity }
  );
  console.log("After Update BOOk Quantity: ", res);

  ///Remove Cart
  const removeCartRes = await CartModel.deleteOne({ _id: cartId });
  console.log("After Fucking Delete Cart: ", removeCartRes);

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
