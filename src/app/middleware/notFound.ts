import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: "API not Found!!!",
    error: "",
  });
};
export default notFound;
