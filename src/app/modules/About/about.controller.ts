import { NextFunction, Request, RequestHandler, Response } from "express";
import { aboutServices } from "./about.service";

///Add About
const addAbout: RequestHandler = async (req, res, next) => {
  try {
    const aboutData = req.body;
    const result = await aboutServices.addAboutIntoDB(aboutData);

    res.status(201).json({
      success: true,
      message: "About Added successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Get All User
const getAllAbout = async (req: Request, res: Response) => {
  try {
    const result = await aboutServices.getAllAbout();
    res.status(201).json({
      success: true,
      message: "About Retrived successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive About",
      statusCode: 400,
      error: error,
      stack: "error stack",
    });
  }
};

//Update About
const updateAbout = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const about = req.body;

    // console.log("Come id: ", id);
    // console.log("Come bhai: ", about);

    const result = await aboutServices.updatAboutIntoDB(id, about);

    //Send Response
    res.status(200).json({
      message: "About updated successfully",
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

export const aboutControllers = {
  addAbout,
  getAllAbout,
  updateAbout,
};
