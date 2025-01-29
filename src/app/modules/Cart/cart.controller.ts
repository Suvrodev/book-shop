import { NextFunction, Request, RequestHandler, Response } from "express";
import { cartServices } from "./cart.service";
import AppError from "../../errors/AppError";

//Create Cart
const createCart: RequestHandler = async (req, res, next) => {
  try {
    const newCart = req.body;
    if (newCart?.userId !== req?.user?._id) {
      console.log("Cart user: ", newCart?.userId);
      console.log("Logged user id: ", req?.user?._id);
      throw new AppError(401, "You are not authorized");
    }

    //will call service function to send data in db
    const result = await cartServices.createCartDB(newCart);

    //Send Response
    res.status(200).json({
      message: "Book Added in cart successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Cart
const getAllCart: RequestHandler = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    if (id !== req?.user?._id) {
      console.log("id: ", id);
      console.log("Logged user: ", req?.user?._id);
      throw new AppError(401, "You are not authorized");
    }

    const result = await cartServices.getAllCartFromDB(id);

    // Send response with the results
    res.status(200).json({
      message: "Book from Cart retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete Cart
const deleteCart: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await cartServices.deleteCartFromDB(
      productId,
      req?.user?._id
    );

    if (!result) {
      res.status(404).json({
        message: "Book Not Found in Cart",
        status: false,
      });
      return;
    }

    //Send Response
    res.status(200).json({
      message: "Book deleted successfully From Cart",
      status: true,
      data: {},
    });
  } catch (error: any) {
    next(error);
  }
};

export const CartControllers = {
  createCart,
  getAllCart,
  deleteCart,
};
