import { Schema, model, connect, Types } from "mongoose";
import { TCart } from "./cart.interface";

const cartSchema = new Schema<TCart>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      required: [true, "Reference to a user is required"],
      ref: "Book",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Reference to a user is required"],
      ref: "users",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const CartModel = model<TCart>("cart", cartSchema);
