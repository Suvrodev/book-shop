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
exports.cartServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cart_model_1 = require("./cart.model");
//Insert Cart
const createCartDB = (carttData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Cart Data: ", carttData);
    const result = yield cart_model_1.CartModel.create(carttData);
    return result;
});
// Get all Cart
const getAllCartFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.CartModel.find({ userId: id }).populate("bookId");
    return result;
});
//delete Cart
const deleteCartFromDB = (cartId, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    ///Check user right or wrong
    const prvCheck = yield cart_model_1.CartModel.findById({ _id: cartId });
    if (((_a = prvCheck === null || prvCheck === void 0 ? void 0 : prvCheck.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== loggedUserId) {
        console.log("Cart ref id--------: ", (_b = prvCheck === null || prvCheck === void 0 ? void 0 : prvCheck.userId) === null || _b === void 0 ? void 0 : _b.toString());
        console.log("logged user id------: ", loggedUserId);
        throw new AppError_1.default(401, "You are not authorized");
    }
    //main work
    const result = yield cart_model_1.CartModel.findByIdAndDelete({ _id: cartId });
    return result;
});
exports.cartServices = {
    createCartDB,
    getAllCartFromDB,
    deleteCartFromDB,
};
