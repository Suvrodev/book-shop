import express from "express";
import { CartControllers } from "./cart.controller";

const router = express.Router();

//will call controller function
router.post("/", CartControllers.createCart);
router.get("/:id", CartControllers.getAllCart);
router.delete("/:id", CartControllers.deleteCart);

export const cartRoutes = router;
