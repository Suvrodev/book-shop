import express from "express";
import { BookControllers } from "./book.controller";

const router = express.Router();

//will call controller function
router.post("/", BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getSingleBook);
router.get("/ownbook/:userId", BookControllers.getOwnBook);
router.get("/images/book", BookControllers.getImagesOfBooks);
router.get("/images/book/home", BookControllers.getHoneBook);
router.delete("/:productId", BookControllers.deleteBook);
router.put("/:productId", BookControllers.updateBook);

export const BookRoutes = router;
