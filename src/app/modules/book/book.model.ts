import { Schema, model, connect, Types } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
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
        message:
          "{VALUE} is not a valid category. Allowed categories are: Fiction, Science, SelfDevelopment, Poetry, Religious",
      },
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    quantity: {
      type: Number,
      min: [0, "Quantity must be a positive number"],
      required: [true, "Quantity is required"],
    },
    inStock: {
      type: Boolean,
      required: [true, "In-stock status is required"],
    },
    refUser: {
      type: Schema.Types.ObjectId,
      required: [true, "Reference to a user is required"],
      ref: "users",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

//It will hide isDeleted
// bookSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.isDeleted;
//     return ret;
//   },
// });

//isDeleted will not retrive from find
// bookSchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
//isDeleted will not retrive from findOne
// bookSchema.pre("findOne", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

export const Book = model<TBook>("Book", bookSchema);
