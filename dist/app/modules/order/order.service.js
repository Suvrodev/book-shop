"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const book_model_1 = require("../book/book.model");
//create order
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = orderData;
    // Fetch the book from the database
    const book = yield book_model_1.Book.findById(product);
    if (!book) {
        throw new Error("Book not found");
    }
    // Check stock availability
    if (!book.inStock || book.quantity < quantity) {
        throw new Error("Insufficient stock");
    }
    // Reduce inventory quantity
    book.quantity -= quantity;
    if (book.quantity === 0) {
        book.inStock = false;
    }
    yield book.save();
    // Create order
    const order = yield order_model_1.Order.create(orderData);
    return order;
});
//Get Revenew
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield order_model_1.Order.aggregate([
        {
            $facet: {
                //Pipeline
                totalRevenue: [
                    {
                        //Stage-1
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: "$totalPrice" },
                        },
                    },
                ],
            },
        },
    ]);
    // console.log("Aggregation result:", result[0]?.totalRevenue[0]?.totalRevenue);
    return (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue[0]) === null || _b === void 0 ? void 0 : _b.totalRevenue;
});
exports.OrderService = {
    createOrderIntoDB,
    calculateRevenueFromDB,
};
