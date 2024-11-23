import { Request, Response } from "express";
import { BookServices } from "./book.service";
import bookValidationSchema from "./book.validation";

//Create Book
const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;

    //book data validation using zod
    // const zodParseData = bookValidationSchema.parse(book);

    //will call service function to send data in db
    const result = await BookServices.createBookIntoDB(book);

    //Send Response
    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    //Send Response for error
    res.status(404).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};

//Get All Books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromDB();

    //Send Response
    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    //Send Response for error
    res.status(500).json({
      message: "Something Went wrong",
      status: false,
      data: error,
    });
  }
};

//Get Single Book
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await BookServices.getSingleBookFromDB(productId);

    //Send Response
    res.status(200).json({
      message: "Book retrive Successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    //Send Response for error
    res.status(500).json({
      message: "Something went wrong",
      status: false,
      data: error,
    });
  }
};

//Delete Book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    console.log("Deleted id: ", productId);

    const result = await BookServices.deleteBookFromDB(productId);

    //Send Response
    res.status(200).json({
      message: "Book deleted successfully",
      status: true,
      data: {},
    });
  } catch (error) {
    //Send Response for error
    res.status(500).json({
      message: "Something went wrong",
      status: false,
      data: error,
    });
  }
};

//Update Book
const updateBook = async (req: Request, res: Response) => {
  try {
    console.log("Come in Update");
    const productId = req.params.productId;
    const book = req.body;
    console.log("Update Book Data: ", book);

    const result = await BookServices.updateBookFromDB(productId, book);

    //Send Response
    res.status(200).json({
      message: "Book updated successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    //Send Response for error
    res.status(500).json({
      message: "Something went wrong",
      status: false,
      data: error,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};
