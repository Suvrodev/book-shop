"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_route_1 = require("../modules/order/order.route");
const book_route_1 = require("../modules/book/book.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const cart_route_1 = require("../modules/Cart/cart.route");
const about_route_1 = require("../modules/About/about.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/products",
        route: book_route_1.BookRoutes,
    },
    {
        path: "/auth",
        route: user_route_1.userRoutes,
    },
    {
        path: "/login",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/cart",
        route: cart_route_1.cartRoutes,
    },
    {
        path: "/about",
        route: about_route_1.aboutRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
    // {
    //   path: "/admin",
    //   route: AdminRoutes,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
