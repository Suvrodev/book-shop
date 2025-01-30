"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const about_controller_1 = require("./about.controller");
const router = express_1.default.Router();
router.post("/", about_controller_1.aboutControllers.addAbout);
//Get All User
router.get("/", about_controller_1.aboutControllers.getAllAbout);
//update user
router.patch("/:id", about_controller_1.aboutControllers.updateAbout);
exports.aboutRoutes = router;
