import { Types } from "mongoose";

export interface IPayment {
  transactionId: string;
  cartId?: Types.ObjectId;
  userId?: Types.ObjectId;
  productId?: string;
  price: number;
  quantity: number;
  paidStatus?: string;
  adminApproval?: "pending" | "confirm";
}
