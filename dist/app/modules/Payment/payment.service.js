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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = exports.updateQuantityRemoveCartAndCheckInStock = exports.checkQuantityOfBook = exports.makePayment = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const book_model_1 = require("../book/book.model");
const payment_model_1 = require("./payment.model");
const makePayment = (finalOrder, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for the order creation
    const result = yield payment_model_1.paymentModel.create(finalOrder);
});
exports.makePayment = makePayment;
const checkQuantityOfBook = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    //Check quantity of Book
    console.log("Come product id for check book: ", productId);
    const targetBook = yield book_model_1.Book.findOne({
        _id: productId,
    });
    // console.log("Target Book: ", targetBook);
    if (!targetBook) {
        return false;
    }
    if ((targetBook === null || targetBook === void 0 ? void 0 : targetBook.quantity) < quantity) {
        return false;
    }
    console.log("Target Book Quantity: ", targetBook === null || targetBook === void 0 ? void 0 : targetBook.quantity);
    return true;
});
exports.checkQuantityOfBook = checkQuantityOfBook;
const updateQuantityRemoveCartAndCheckInStock = (productId, cartId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    //inStock make false if quantity is 0
    const targetBookAgain = yield book_model_1.Book.findOne({
        _id: productId,
    });
    if (!targetBookAgain) {
        return;
    }
    const againTargetBookQuantity = targetBookAgain === null || targetBookAgain === void 0 ? void 0 : targetBookAgain.quantity;
    console.log("Again Target Book Quantity: ", againTargetBookQuantity);
    if (againTargetBookQuantity == 0) {
        const inStockRes = yield book_model_1.Book.updateOne({ _id: productId }, { inStock: false });
        console.log("After in Stock false: ", inStockRes);
    }
    return;
});
exports.updateQuantityRemoveCartAndCheckInStock = updateQuantityRemoveCartAndCheckInStock;
///Get All Payment by admin
const getAllPaymentByAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.paymentModel
        .find()
        .populate("productId")
        .populate("userId");
    return result;
});
// Get all Payment by User
const getSpecificPaymentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.paymentModel.find({ userId: id }).populate("productId");
    return result;
});
// Delete Payment
const deletePaymentFromDB = (id, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    ///Check user right or wrong
    const prvCheck = yield payment_model_1.paymentModel.findById({ _id: id });
    if (((_a = prvCheck === null || prvCheck === void 0 ? void 0 : prvCheck.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== loggedUserId) {
        console.log("Payment user id--------: ", (_b = prvCheck === null || prvCheck === void 0 ? void 0 : prvCheck.userId) === null || _b === void 0 ? void 0 : _b.toString());
        console.log("logged user id------: ", loggedUserId);
        throw new AppError_1.default(401, "You are not authorized");
    }
    //main work
    const result = yield payment_model_1.paymentModel.findByIdAndDelete({ _id: id });
    return result;
});
// Delete Payment
const deletePaymentByAdminFromDB = (id, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete order (admin id:)", loggedUserId);
    const result = yield payment_model_1.paymentModel.findByIdAndDelete({ _id: id });
    return result;
});
//confirm payment by admin
const confirmPaymentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = payload === null || payload === void 0 ? void 0 : payload.bookId;
    const quantity = payload === null || payload === void 0 ? void 0 : payload.quantity;
    const adminApproval = payload === null || payload === void 0 ? void 0 : payload.adminApproval;
    console.log("AdminApproval: ", adminApproval);
    console.log("Book id: ", bookId);
    console.log("quantity: ", quantity);
    const res = yield payment_model_1.paymentModel.findByIdAndUpdate({ _id: id }, { adminApproval: adminApproval }, {
        new: true,
    });
    if ((res === null || res === void 0 ? void 0 : res.adminApproval) !== "confirm") {
        return;
    }
    ///Reduce Quantity of Book
    const targetBook = yield book_model_1.Book.findOne({
        _id: bookId,
    });
    if (!targetBook) {
        return;
    }
    const tarGetBookQuantity = targetBook === null || targetBook === void 0 ? void 0 : targetBook.quantity;
    console.log("Target Book Quantity: ", tarGetBookQuantity);
    const updateQuantitiesRes = yield book_model_1.Book.findByIdAndUpdate({ _id: bookId }, { quantity: tarGetBookQuantity - quantity }, {
        new: true,
    });
    console.log("After Update BOOk Quantity: ", updateQuantitiesRes);
    if ((updateQuantitiesRes === null || updateQuantitiesRes === void 0 ? void 0 : updateQuantitiesRes.quantity) !== 0) {
        return;
    }
    const updateBookInStockFalseRes = yield book_model_1.Book.findByIdAndUpdate({ _id: bookId }, { inStock: false }, {
        new: true,
    });
    console.log("updateBookInStockFalseRes", updateBookInStockFalseRes);
});
exports.PaymentService = {
    getAllPaymentByAdminFromDB,
    getSpecificPaymentFromDB,
    deletePaymentFromDB,
    confirmPaymentFromDB,
    deletePaymentByAdminFromDB,
};
