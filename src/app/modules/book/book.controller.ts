import { NextFunction, Request, RequestHandler, Response } from "express";
import { BookServices } from "./book.service";
import bookValidationSchema from "./book.validation";
import AppError from "../../errors/AppError";

export interface BookQueryParams {
  searchTerm?: string;
  category?: string;
  author?: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
  inStock?: boolean;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder: number;
}

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

const getAllBooks: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const queryParams: BookQueryParams = {
      searchTerm: req.query.searchTerm as string | undefined,
      category: req.query.category as string | undefined,
      author: req.query.author as string | undefined,
      brand: req.query.brand as string | undefined,
      model: req.query.model as string | undefined,
      minPrice: req.query.minPrice
        ? parseFloat(req.query.minPrice as string)
        : undefined,
      maxPrice: req.query.maxPrice
        ? parseFloat(req.query.maxPrice as string)
        : undefined,
      minQuantity: req.query.minQuantity
        ? parseInt(req.query.minQuantity as string, 10)
        : undefined,
      maxQuantity: req.query.maxQuantity
        ? parseInt(req.query.maxQuantity as string, 10)
        : undefined,
      inStock:
        req.query.inStock === "true"
          ? true
          : req.query.inStock === "false"
          ? false
          : undefined,
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      limit: 10,
      sortBy: req.query.sortBy as string | undefined,
      sortOrder: req.query.sortOrder === "desc" ? -1 : 1,
    };

    const result = await BookServices.getAllBooksFromDB(queryParams);

    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result.data, // Always return data, empty array if no data
      pagination: {
        totalBooks: result.totalBooks,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
      },
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
