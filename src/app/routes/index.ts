import express from "express";
import { OrderRoutes } from "../modules/order/order.route";
import { BookRoutes } from "../modules/book/book.route";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { cartRoutes } from "../modules/Cart/cart.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: OrderRoutes,
  },
  {
    path: "/products",
    route: BookRoutes,
  },
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/login",
    route: AuthRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  // {
  //   path: "/blogs",
  //   route: blogRoutes,
  // },
  // {
  //   path: "/admin",
  //   route: AdminRoutes,
  // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
