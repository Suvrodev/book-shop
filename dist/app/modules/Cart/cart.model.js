"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Reference to a user is required"],
        ref: "Book",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Reference to a user is required"],
        ref: "users",
    },
    quantity: {
        type: Number,
        required: [true, "Quantity  have to give"],
        ref: "users",
    },
    price: {
        type: Number,
        required: [true, "Price  have to give"],
        ref: "users",
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.CartModel = (0, mongoose_1.model)("cart", cartSchema);
