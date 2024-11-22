import { Order } from "./order.model";
import { Book } from "../book/book.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (orderData: TOrder) => {
  const { product, quantity } = orderData;
  console.log({ product }, { quantity });

  // Fetch the book from the database
  const book = await Book.findById(product);

  if (!book) {
    throw new Error("Book not found");
  }

  // Check stock availability
  if (!book.inStock || book.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  // Reduce inventory quantity
  book.quantity -= quantity;
  if (book.quantity === 0) {
    book.inStock = false;
  }
  await book.save();

  // Create order
  const order = await Order.create(orderData);
  return order;
};

const calculateRevenueFromDB = async () => {
  return "check total revenew";
  //   const revenue = await Order.aggregate([
  //     {
  //       $lookup: {
  //         from: "books", // Collection name for books
  //         localField: "orders", // Reference field in `orders`
  //         foreignField: "_id", // Field in `books` to match
  //         as: "productDetails",
  //       },
  //     },
  //     {
  //       $unwind: "$productDetails", // Flatten the productDetails array
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         totalRevenue: {
  //           $sum: { $multiply: ["$quantity", "$productDetails.price"] }, // Multiply quantity by book price
  //         },
  //       },
  //     },
  //   ]);

  //   // Ensure a default value if no revenue is found
  //   return revenue[0]?.totalRevenue || 0;
};

export const OrderService = {
  createOrderIntoDB,
  calculateRevenueFromDB,
};
