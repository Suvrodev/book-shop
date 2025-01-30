"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//will call controller function
router.post("/", (0, auth_1.default)("user"), cart_controller_1.CartControllers.createCart);
router.get("/:id", (0, auth_1.default)(), cart_controller_1.CartControllers.getAllCart);
router.delete("/:id", (0, auth_1.default)("user"), cart_controller_1.CartControllers.deleteCart);
exports.cartRoutes = router;
