import express, { NextFunction, Request, Response } from "express";
import { aboutControllers } from "./about.controller";

const router = express.Router();

router.post("/", aboutControllers.addAbout);
//Get All User
router.get("/", aboutControllers.getAllAbout);

//update user
router.patch("/:id", aboutControllers.updateAbout);

export const aboutRoutes = router;
