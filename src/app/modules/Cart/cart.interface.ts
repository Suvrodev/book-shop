import { Schema, model, connect, Types } from "mongoose";

export type TCart = {
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  price: number;
};
