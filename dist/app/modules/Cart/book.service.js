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
exports.BookServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const book_model_1 = require("./book.model");
//Insert book
const createBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { refUser } = bookData;
    console.log("Ref User: ", refUser);
    const isUserExists = yield user_model_1.userModel.findOne({ _id: refUser });
    console.log("is User exists: ", isUserExists);
    if (!isUserExists) {
        throw new AppError_1.default(404, "Reference User not Exists");
    }
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
// Get all books with strict search
const getAllBooksFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Build a dynamic query object
        const query = {};
        if (searchTerm) {
            query.$or = [
                { category: searchTerm }, // Strict match for category
                { title: searchTerm }, // Strict match for title
                { author: searchTerm }, // Strict match for author
            ];
            // Fetch results from the database
            const result = yield book_model_1.Book.find(query);
            return result;
        }
        if (!searchTerm) {
            const result = yield book_model_1.Book.find();
            return result;
        }
    }
    catch (error) {
        throw new Error("Error while fetching books");
    }
});
//Get Single book
const getSingleBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.findOne({ _id: productId });
        return result;
    }
    catch (error) {
        throw new Error("Book Not Found");
    }
});
//delete book
const deleteBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.findByIdAndDelete({ _id: productId });
        return result;
    }
    catch (error) {
        throw new Error("Book Not Found");
    }
});
//Update book
const updateBookFromDB = (productId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndUpdate({ _id: productId }, bookData, {
        new: true,
    });
    return result;
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    deleteBookFromDB,
    updateBookFromDB,
};
