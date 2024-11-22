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
  const result = await Order.aggregate([
    {
      $facet: {
        //Pipeline
        totalRevenue: [
          {
            //Stage-1
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalPrice" },
            },
          },
        ],
      },
    },
  ]);

  console.log("Aggregation result:", result[0]?.totalRevenue[0]?.totalRevenue);
  return result[0]?.totalRevenue[0]?.totalRevenue;
};

export const OrderService = {
  createOrderIntoDB,
  calculateRevenueFromDB,
};
