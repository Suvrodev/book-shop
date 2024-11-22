import { Schema, model, connect } from "mongoose";

export type TOrder = {
  email: string;
  product: string; // Reference to the book
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
