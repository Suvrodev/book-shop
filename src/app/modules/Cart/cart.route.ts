import express from "express";
import { CartControllers } from "./cart.controller";
import auth from "../../middleware/auth";

const router = express.Router();

//will call controller function
router.post("/", auth("user"), CartControllers.createCart);
router.get("/:id", auth(), CartControllers.getAllCart);
router.delete("/:id", auth("user"), CartControllers.deleteCart);

export const cartRoutes = router;
