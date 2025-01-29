import express from "express";
import { BookControllers } from "./book.controller";
import auth from "../../middleware/auth";

const router = express.Router();

//will call controller function
router.post("/", auth("user"), BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getSingleBook);
router.get("/ownbook/:userId", auth("user"), BookControllers.getOwnBook);
router.get("/images/book", BookControllers.getImagesOfBooks);
router.get("/images/book/home", BookControllers.getHoneBook);
router.delete("/:productId", auth("user"), BookControllers.deleteBook);
router.put("/:productId", auth("user"), BookControllers.updateBook);

export const BookRoutes = router;
