import { TBook } from "./book.interface";
import { Book } from "./book.model";

//Insert book
const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

//get all book
const getAllBooksFromDB = async (category: string) => {
  try {
    //if exist category
    if (category) {
      console.log("Category from Service: ", category);
      const result = await Book.find({ category });
      return result;
    }
    //if category doestn't exists
    const result = await Book.find();
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
