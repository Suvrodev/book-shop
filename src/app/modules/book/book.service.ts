import { TBook } from "./book.interface";
import { Book } from "./book.model";

const createBookIntoDB = async (bookData: TBook) => {
  console.log("Create Book");
  console.log("Book Data: ", bookData);
  const result = await Book.create(bookData);
  return result;
};

const getAllBooksFromDB = async () => {
  const result = await Book.find();
  return result;
};

const getSingleBookFromDB = async (productId: string) => {
  const result = await Book.findOne({ _id: productId });
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
};
