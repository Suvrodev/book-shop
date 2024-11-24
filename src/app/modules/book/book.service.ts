import { TBook } from "./book.interface";
import { Book } from "./book.model";

//Insert book
const createBookIntoDB = async (bookData: TBook) => {
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
    }

    // Fetch results from the database
    const result = await Book.find(query);
    return result;
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
