import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BookRoutes } from "./app/modules/book/book.route";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//application route
app.use("/api/products", BookRoutes);

const getAController = async (req: Request, res: Response) => {
  res.send(" Run from primary Controller-Check");
};
app.get("/", getAController);

export default app;
