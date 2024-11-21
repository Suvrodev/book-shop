import { Schema, model, connect } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>({
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    enum: {
      values: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
      message: "{VALUE} is not a valid category",
    },
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    min: [0, "Quantity cannot be a negative number"],
  },
  inStock: {
    type: Boolean,
  },
});

export const Book = model<TBook>("Book", bookSchema);
