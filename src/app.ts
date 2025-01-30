import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BookRoutes } from "./app/modules/book/book.route";
import { OrderRoutes } from "./app/modules/order/order.route";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();

//Parser
app.use(express.json());

//Cors integration
// app.use(cors({ origin: ["*"], credentials: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://boundless-read.netlify.app"],
    credentials: true,
  })
);
// app.use(cors({ origin: "*", credentials: true }));

//application route
// app.use("/api/products", BookRoutes);
// app.use("/api", OrderRoutes);
app.use("/api", router);

const getAController = async (req: Request, res: Response) => {
  res.send("Book Shop Back end Assignment-4");
};
app.get("/", getAController);

//Global Error Handler
app.use(globalErrorHandler);
//Not Found Route
app.use(notFound);

export default app;
