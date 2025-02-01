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
exports.BookControllers = void 0;
const book_service_1 = require("./book.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
//Create Book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        //book data validation using zod
        // const zodParseData = bookValidationSchema.parse(book);
        console.log("Come Book: ", book);
        //will call service function to send data in db
        const result = yield book_service_1.BookServices.createBookIntoDB(book);
        //Send Response
        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Get All Book By admin
const getAllBookByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookServices.getAllBookByAdmin();
        res.status(200).json({
            message: "Book Retrive successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = {
            searchTerm: req.query.searchTerm,
            category: req.query.category,
            author: req.query.author,
            brand: req.query.brand,
            model: req.query.model,
            minPrice: req.query.minPrice
                ? parseFloat(req.query.minPrice)
                : undefined,
            maxPrice: req.query.maxPrice
                ? parseFloat(req.query.maxPrice)
                : undefined,
            minQuantity: req.query.minQuantity
                ? parseInt(req.query.minQuantity, 10)
                : undefined,
            maxQuantity: req.query.maxQuantity
                ? parseInt(req.query.maxQuantity, 10)
                : undefined,
            inStock: req.query.inStock === "true"
                ? true
                : req.query.inStock === "false"
                    ? false
                    : undefined,
            page: req.query.page ? parseInt(req.query.page, 10) : 1,
            limit: 10,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder === "desc" ? -1 : 1,
        };
        const result = yield book_service_1.BookServices.getAllBooksFromDB(queryParams);
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: result.data, // Always return data, empty array if no data
            pagination: {
                totalBooks: result.totalBooks,
                currentPage: result.currentPage,
                totalPages: result.totalPages,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// Get Iamges of Books
const getImagesOfBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Image of Book");
        const result = yield book_service_1.BookServices.getImagesOfBookFromDB();
        if (!result) {
            res.status(404).json({
                message: "Book Not Found",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get Home 6  Books
const getHoneBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookServices.getHomeBookFromDB();
        if (!result) {
            res.status(404).json({
                message: "Book Not Found",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Get Single Book
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Come Book: ", req.body);
        const productId = req.params.productId;
        const result = yield book_service_1.BookServices.getSingleBookFromDB(productId);
        if (!result) {
            res.status(404).json({
                message: "Book Not Found",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Get Own Book
const getOwnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        if (((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id) !== userId) {
            throw new AppError_1.default(401, "You are not authorized");
        }
        +6;
        // console.log("Come user id--: ", userId);
        const result = yield book_service_1.BookServices.getOwnBookFromDB(userId);
        if (!result) {
            res.status(404).json({
                message: "Book Not Found",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book retrive Successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Delete Book
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield book_service_1.BookServices.deleteBookFromDB(productId);
        if (!result) {
            res.status(404).json({
                message: "Book Not Found",
                status: false,
            });
            return;
        }
        //Send Response
        res.status(200).json({
            message: "Book deleted successfully",
            status: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
//Update Book
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const book = req.body;
        const result = yield book_service_1.BookServices.updateBookFromDB(productId, book);
        //Send Response
        res.status(200).json({
            message: "Book updated successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookControllers = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    updateBook,
    getOwnBook,
    getImagesOfBooks,
    getHoneBook,
    getAllBookByAdmin,
};
