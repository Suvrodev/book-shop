import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export const Order = model<TOrder>("Order", orderSchema);
