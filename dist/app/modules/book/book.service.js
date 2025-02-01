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
exports.BookServices = exports.getAllBooksFromDB = void 0;
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
///Get All Book by Admin
const getAllBookByAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield book_model_1.Book.find();
    return res;
});
// // Get all books with all requirement
// const getAllBooksFromDB = async (searchTerm: string | null) => {
//   try {
//     // Build a dynamic query object
//     const query: any = {};
//     if (searchTerm) {
//       query.$or = [
//         { category: searchTerm }, // Strict match for category
//         { title: searchTerm }, // Strict match for title
//         { author: searchTerm }, // Strict match for author
//       ];
//       // Fetch results from the database
//       const result = await Book.find(query);
//       return result;
//     }
//     if (!searchTerm) {
//       const result = await Book.find();
//       return result;
//     }
//   } catch (error) {
//     throw new Error("Error while fetching books");
//   }
// };
///Next Get all books code
const getAllBooksFromDB = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm, category, author, brand, model, minPrice, maxPrice, minQuantity, maxQuantity, inStock, page, limit, sortBy, sortOrder, } = queryParams;
        const query = {};
        if (searchTerm) {
            query.$or = [
                { title: { $regex: new RegExp(searchTerm, "i") } },
                { author: { $regex: new RegExp(searchTerm, "i") } },
                { category: { $regex: new RegExp(searchTerm, "i") } },
            ];
        }
        if (category)
            query.category = category;
        if (author)
            query.author = author;
        if (brand)
            query.brand = brand;
        if (model)
            query.model = model;
        if (inStock !== undefined)
            query.inStock = inStock;
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined)
                query.price.$gte = minPrice;
            if (maxPrice !== undefined)
                query.price.$lte = maxPrice;
        }
        if (minQuantity !== undefined || maxQuantity !== undefined) {
            query.quantity = {};
            if (minQuantity !== undefined)
                query.quantity.$gte = minQuantity;
            if (maxQuantity !== undefined)
                query.quantity.$lte = maxQuantity;
        }
        const skip = (page - 1) * limit;
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder;
        }
        // Example: Sort based on title, price, or quantity
        const books = yield book_model_1.Book.find(query)
            .sort(sortOptions) // Ensure correct sorting
            .skip(skip)
            .limit(limit);
        const totalBooks = yield book_model_1.Book.countDocuments(query);
        return {
            data: books,
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
        };
    }
    catch (error) {
        throw new Error("Error while fetching books");
    }
});
exports.getAllBooksFromDB = getAllBooksFromDB;
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
//Get Images of book
const getImagesOfBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.find()
            .select("imageUrl")
            .limit(12)
            .populate("refUser");
        return result;
    }
    catch (error) {
        throw new Error("Book Not Found");
    }
});
//Get Home book
const getHomeBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.find()
            .sort({ createdAt: -1 })
            .limit(6)
            .populate("refUser");
        return result;
    }
    catch (error) {
        throw new Error("Book Not Found");
    }
});
//Get Own book
const getOwnBookFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_model_1.Book.find({ refUser: userId });
        return result;
    }
    catch (error) {
        throw new Error("Book Not Found");
    }
});
//delete book
const deleteBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    ///Check user right or wrong
    // const prvCheck = await Book.findById({ _id: productId });
    // if (prvCheck?.refUser?.toString() !== loggedUserId) {
    //   console.log("Book ref id--------: ", prvCheck?.refUser?.toString());
    //   console.log("logged user id------: ", loggedUserId);
    //   throw new AppError(401, "You are not authorized");
    // }
    //main work
    const result = yield book_model_1.Book.findByIdAndDelete({ _id: productId });
    return result;
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
    getAllBooksFromDB: exports.getAllBooksFromDB,
    getSingleBookFromDB,
    deleteBookFromDB,
    updateBookFromDB,
    getOwnBookFromDB,
    getImagesOfBookFromDB,
    getHomeBookFromDB,
    getAllBookByAdmin,
};
