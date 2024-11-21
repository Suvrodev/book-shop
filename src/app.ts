import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

const getAController = async (req: Request, res: Response) => {
  res.send(" Run from primary Controller");
};
app.get("/", getAController);

export default app;
