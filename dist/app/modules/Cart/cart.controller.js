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
exports.CartControllers = void 0;
const cart_service_1 = require("./cart.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
//Create Cart
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const newCart = req.body;
        if ((newCart === null || newCart === void 0 ? void 0 : newCart.userId) !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            console.log("Cart user: ", newCart === null || newCart === void 0 ? void 0 : newCart.userId);
            console.log("Logged user id: ", (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
            throw new AppError_1.default(401, "You are not authorized");
        }
        //will call service function to send data in db
        const result = yield cart_service_1.cartServices.createCartDB(newCart);
        //Send Response
        res.status(200).json({
            message: "Book Added in cart successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get All Cart
const getAllCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        if (id !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            console.log("id: ", id);
            console.log("Logged user: ", (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id);
            throw new AppError_1.default(401, "You are not authorized");
        }
        const result = yield cart_service_1.cartServices.getAllCartFromDB(id);
        // Send response with the results
        res.status(200).json({
            message: "Book from Cart retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Delete Cart
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = req.params.id;
        const result = yield cart_service_1.cartServices.deleteCartFromDB(productId, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!result) {
            res.status(404).json({
                message: "Book Not Found in Cart",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book deleted successfully From Cart",
            status: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CartControllers = {
    createCart,
    getAllCart,
    deleteCart,
};
