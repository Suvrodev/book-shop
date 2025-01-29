import { NextFunction, Request, RequestHandler, Response } from "express";
import { BookServices } from "./book.service";
import bookValidationSchema from "./book.validation";
import AppError from "../../errors/AppError";

//Create Book
const createBook: RequestHandler = async (req, res, next) => {
  try {
    const book = req.body;

    //book data validation using zod
    // const zodParseData = bookValidationSchema.parse(book);

    console.log("Come Book: ", book);
    //will call service function to send data in db
    const result = await BookServices.createBookIntoDB(book);

    //Send Response
    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Books
const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const { searchTerm } = req.query; // Extract searchTerm from query parameters

    // Fetch results using the service
    const result = await BookServices.getAllBooksFromDB(searchTerm as string);

    // Check if no matching books found
    if (result?.length === 0 && searchTerm) {
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
  } catch (error: any) {
    next(error);
  }
};

// Get Iamges of Books
const getImagesOfBooks: RequestHandler = async (req, res, next) => {
  try {
    console.log("Image of Book");
    const result = await BookServices.getImagesOfBookFromDB();

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
  } catch (error: any) {
    next(error);
  }
};

// Get Home 6  Books
const getHoneBook: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookServices.getHomeBookFromDB();

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
  } catch (error: any) {
    next(error);
  }
};

//Get Single Book
const getSingleBook: RequestHandler = async (req, res, next) => {
  try {
    console.log("Come Book: ", req.body);
    const productId = req.params.productId;

    const result = await BookServices.getSingleBookFromDB(productId);

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
  } catch (error: any) {
    next(error);
  }
};

//Get Own Book
const getOwnBook: RequestHandler = async (req, res, next) => {
  try {
    const userId = req?.params?.userId;

    if (req?.user?._id !== userId) {
      throw new AppError(401, "You are not authorized");
    }
    +6;
    // console.log("Come user id--: ", userId);

    const result = await BookServices.getOwnBookFromDB(userId);

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
  } catch (error: any) {
    next(error);
  }
};

//Delete Book
const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const result = await BookServices.deleteBookFromDB(
      productId,
      req?.user?._id
    );
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
  } catch (error: any) {
    next(error);
  }
};

//Update Book
const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const book = req.body;

    const result = await BookServices.updateBookFromDB(
      productId,
      book,
      req?.user?._id
    );

    //Send Response
    res.status(200).json({
      message: "Book updated successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  getOwnBook,
  getImagesOfBooks,
  getHoneBook,
};
