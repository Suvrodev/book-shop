import { TBook } from "./book.interface";
import { Book } from "./book.model";

//Insert book
const createBookIntoDB = async (bookData: TBook) => {
  console.log("Create Book");
  console.log("Book Data: ", bookData);
  const result = await Book.create(bookData);
  return result;
};

//get all book
const getAllBooksFromDB = async () => {
  const result = await Book.find();
  return result;
};

//Get Single book
const getSingleBookFromDB = async (productId: string) => {
  const result = await Book.findOne({ _id: productId });
  return result;
};

//delete book
const deleteBookFromDB = async (productId: string) => {
  const result = await Book.findByIdAndDelete({ _id: productId });
  return result;
};

//Update book
const updateBookFromDB = async (productId: string, bookData: TBook) => {
  console.log("Book Data in service: ", bookData);
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
