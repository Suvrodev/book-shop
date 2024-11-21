import { Request, Response } from "express";
import { BookServices } from "./book.service";

//Create Book
const createBook = async (req: Request, res: Response) => {
  try {
    const { book } = req.body;
    //will call service function to send data in db
    const result = await BookServices.createBookIntoDB(book);

    //Send Response
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error in Insert Book: ", error);
  }
};

//Get All Books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromDB();

    //Send Response
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log("Get all Books Error: ", error);
  }
};

//Get Single Book
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await BookServices.getSingleBookFromDB(productId);

    //Send Response
    res.status(200).json({
      success: true,
      message: "Book retrive Successfully",
      data: result,
    });
  } catch (error) {
    console.log("Get all Books Error: ", error);
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
};
