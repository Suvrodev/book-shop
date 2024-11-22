import { Schema, model, connect } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
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
        values: [
          "Fiction",
          "Science",
          "SelfDevelopment",
          "Poetry",
          "Religious",
        ],
        message: "{VALUE} is not a valid category",
      },
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      min: [0, "Quantity cannot be a negative number"],
      required: true,
    },
    inStock: {
      type: Boolean,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

//It will hide isDeleted
bookSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.isDeleted;
    return ret;
  },
});

//isDeleted will not retrive from find
bookSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//isDeleted will not retrive from findOne
bookSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Book = model<TBook>("Book", bookSchema);
