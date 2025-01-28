import { Request, Response } from "express";
import { cartServices } from "./cart.service";

//Create Cart
const createCart = async (req: Request, res: Response) => {
  try {
    console.log("Come Cart to add: ", req?.body);
    const newCart = req.body;

    //will call service function to send data in db
    const result = await cartServices.createCartDB(newCart);

    //Send Response
    res.status(200).json({
      message: "Book Added in cart successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    //Send Response for error
    res.status(500).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};

// Get All Cart
const getAllCart = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const result = await cartServices.getAllCartFromDB(id);

    // Send response with the results
    res.status(200).json({
      message: "Book from Cart retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    // Send error response
    res.status(500).json({
      message: "Something Went wrong",
      status: false,
      data: error.message || error,
    });
  }
};

//Delete Cart
const deleteCart = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await cartServices.deleteCartFromDB(productId);

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
    //Send Response for error
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: false,
      data: error,
    });
  }
};

export const CartControllers = {
  createCart,
  getAllCart,
  deleteCart,
};
