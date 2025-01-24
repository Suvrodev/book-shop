import express from "express";
import { OrderRoutes } from "../modules/order/order.route";
import { BookRoutes } from "../modules/book/book.route";

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
  // {
  //   path: "/auth/register",
  //   route: userRoutes,
  // },
  // {
  //   path: "/auth/login",
  //   route: AuthRoutes,
  // },
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
