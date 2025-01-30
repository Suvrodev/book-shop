"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
            message: "{VALUE} is not a valid category. Allowed categories are: Fiction, Science, SelfDevelopment, Poetry, Religious",
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Reference to a user is required"],
        ref: "users",
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
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
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
