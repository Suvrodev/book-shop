import express from "express";
import { BookControllers } from "./book.controller";
import auth from "../../middleware/auth";

const router = express.Router();

//will call controller function
router.post("/", auth("admin"), BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getSingleBook);
router.get("/ownbook/:userId", auth("user"), BookControllers.getOwnBook);
router.get("/images/book", BookControllers.getImagesOfBooks);
router.get("/images/book/home", BookControllers.getHoneBook);
//Admin
router.delete("/:productId", auth("admin"), BookControllers.deleteBook);
router.put("/:productId", auth("admin"), BookControllers.updateBook);
router.get("/admin/getbook", auth("admin"), BookControllers.getAllBookByAdmin);

export const BookRoutes = router;
