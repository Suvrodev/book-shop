import { Schema, model, connect } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>({
  id: {
    type: String,
    required: [true, "id must be needed"],
    unique: true,
  },
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
    min: [0, "Price must be a non-negative number"],
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

const Book = model<TBook>("Book", bookSchema);
