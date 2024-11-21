import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

//will call controller function
router.post("/", BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getSingleBook);

export const BookRoutes = router;
