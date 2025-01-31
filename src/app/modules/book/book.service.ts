import { SortOrder } from "mongoose";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { BookQueryParams } from "./book.controller";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

interface QueryParams {
  searchTerm?: string;
  category?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  page?: number;
  limit?: number;
}

//Insert book
const createBookIntoDB = async (bookData: TBook) => {
  const { refUser } = bookData;
  console.log("Ref User: ", refUser);
  const isUserExists = await userModel.findOne({ _id: refUser });
  console.log("is User exists: ", isUserExists);
  if (!isUserExists) {
    throw new AppError(404, "Reference User not Exists");
  }

  const result = await Book.create(bookData);
  return result;
};

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

export const getAllBooksFromDB = async (queryParams: BookQueryParams) => {
  try {
    const {
      searchTerm,
      category,
      author,
      brand,
      model,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      inStock,
      page,
      limit,
      sortBy,
      sortOrder,
    } = queryParams;

    const query: any = {};

    if (searchTerm) {
      query.$or = [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { author: { $regex: new RegExp(searchTerm, "i") } },
        { category: { $regex: new RegExp(searchTerm, "i") } },
      ];
    }

    if (category) query.category = category;
    if (author) query.author = author;
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (inStock !== undefined) query.inStock = inStock;
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }
    if (minQuantity !== undefined || maxQuantity !== undefined) {
      query.quantity = {};
      if (minQuantity !== undefined) query.quantity.$gte = minQuantity;
      if (maxQuantity !== undefined) query.quantity.$lte = maxQuantity;
    }

    const skip = (page - 1) * limit;

    const sortOptions: Record<string, SortOrder> = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder as SortOrder;
    }

    // Example: Sort based on title, price, or quantity
    const books = await Book.find(query)
      .sort(sortOptions) // Ensure correct sorting
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(query);

    return {
      data: books,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    };
  } catch (error) {
    throw new Error("Error while fetching books");
  }
};

//Get Single book
const getSingleBookFromDB = async (productId: string) => {
  try {
    const result = await Book.findOne({ _id: productId });
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};
//Get Images of book
const getImagesOfBookFromDB = async () => {
  try {
    const result = await Book.find()
      .select("imageUrl")
      .limit(12)
      .populate("refUser");
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};
//Get Home book
const getHomeBookFromDB = async () => {
  try {
    const result = await Book.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("refUser");
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};

//Get Own book
const getOwnBookFromDB = async (userId: string) => {
  try {
    const result = await Book.find({ refUser: userId });
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};

//delete book
const deleteBookFromDB = async (productId: string, loggedUserId: string) => {
  ///Check user right or wrong
  const prvCheck = await Book.findById({ _id: productId });
  if (prvCheck?.refUser?.toString() !== loggedUserId) {
    console.log("Book ref id--------: ", prvCheck?.refUser?.toString());
    console.log("logged user id------: ", loggedUserId);
    throw new AppError(401, "You are not authorized");
  }

  //main work
  const result = await Book.findByIdAndDelete({ _id: productId });
  return result;
};

//Update book
const updateBookFromDB = async (
  productId: string,
  bookData: TBook,
  loggedUserId: string
) => {
  ///Check user right or wrong
  const prvCheck = await Book.findById({ _id: productId });
  if (prvCheck?.refUser?.toString() !== loggedUserId) {
    console.log("Book ref id--------: ", prvCheck?.refUser?.toString());
    console.log("logged user id------: ", loggedUserId);
    throw new AppError(401, "You are not authorized");
  }

  //main work

  const result = await Book.findByIdAndUpdate({ _id: productId }, bookData, {
    new: true,
  });
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
  getOwnBookFromDB,
  getImagesOfBookFromDB,
  getHomeBookFromDB,
};
