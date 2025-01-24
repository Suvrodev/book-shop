import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BookRoutes } from "./app/modules/book/book.route";
import { OrderRoutes } from "./app/modules/order/order.route";
import router from "./app/routes";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//application route
// app.use("/api/products", BookRoutes);
// app.use("/api", OrderRoutes);
app.use("/api", router);

const getAController = async (req: Request, res: Response) => {
  res.send("Book Shop Assignment-2");
};
app.get("/", getAController);

export default app;
