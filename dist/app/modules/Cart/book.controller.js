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
exports.BookControllers = void 0;
const book_service_1 = require("./book.service");
//Create Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        //book data validation using zod
        // const zodParseData = bookValidationSchema.parse(book);
        //will call service function to send data in db
        const result = yield book_service_1.BookServices.createBookIntoDB(book);
        //Send Response
        res.status(200).json({
            message: "Book created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        //Send Response for error
        res.status(500).json({
            message: "Validation failed",
            success: false,
            data: error,
        });
    }
});
// Get All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query; // Extract searchTerm from query parameters
        // Fetch results using the service
        const result = yield book_service_1.BookServices.getAllBooksFromDB(searchTerm);
        // Check if no matching books found
        if ((result === null || result === void 0 ? void 0 : result.length) === 0 && searchTerm) {
            res.status(404).json({
                message: `No books found matching the search term '${searchTerm}'`,
                status: false,
            });
            return;
        }
        // Send response with the results
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        // Send error response
        res.status(500).json({
            message: "Something Went wrong",
            status: false,
            data: error.message || error,
        });
    }
});
//Get Single Book
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //Send Response for error
        res.status(404).json({
            message: error.message || "Something went wrong",
            status: false,
            data: error,
        });
    }
});
//Delete Book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //Send Response for error
        res.status(500).json({
            message: error.message || "Something went wrong",
            status: false,
            data: error,
        });
    }
});
//Update Book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //Send Response for error
        res.status(500).json({
            message: "Something went wrong",
            status: false,
            data: error,
        });
    }
});
exports.BookControllers = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    updateBook,
};
