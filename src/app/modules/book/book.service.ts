import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

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

// Get all books with strict search
const getAllBooksFromDB = async (searchTerm: string | null) => {
  try {
    // Build a dynamic query object
    const query: any = {};

    if (searchTerm) {
      query.$or = [
        { category: searchTerm }, // Strict match for category
        { title: searchTerm }, // Strict match for title
        { author: searchTerm }, // Strict match for author
      ];

      // Fetch results from the database
      const result = await Book.find(query);
      return result;
    }

    if (!searchTerm) {
      const result = await Book.find();
      return result;
    }
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

//delete book
const deleteBookFromDB = async (productId: string) => {
  try {
    const result = await Book.findByIdAndDelete({ _id: productId });
    return result;
  } catch (error) {
    throw new Error("Book Not Found");
  }
};

//Update book
const updateBookFromDB = async (productId: string, bookData: TBook) => {
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
};
