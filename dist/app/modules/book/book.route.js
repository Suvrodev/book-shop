"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//will call controller function
router.post("/", (0, auth_1.default)("admin"), book_controller_1.BookControllers.createBook);
router.get("/", book_controller_1.BookControllers.getAllBooks);
router.get("/:productId", book_controller_1.BookControllers.getSingleBook);
router.get("/ownbook/:userId", (0, auth_1.default)("user"), book_controller_1.BookControllers.getOwnBook);
router.get("/images/book", book_controller_1.BookControllers.getImagesOfBooks);
router.get("/images/book/home", book_controller_1.BookControllers.getHoneBook);
//Admin
router.delete("/:productId", (0, auth_1.default)("admin"), book_controller_1.BookControllers.deleteBook);
router.put("/:productId", (0, auth_1.default)("admin"), book_controller_1.BookControllers.updateBook);
router.get("/admin/getbook", (0, auth_1.default)("admin"), book_controller_1.BookControllers.getAllBookByAdmin);
exports.BookRoutes = router;
