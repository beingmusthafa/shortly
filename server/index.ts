import express, { Request, Response, NextFunction } from "express";
import connectToDb from "./config/database.js";

const app = express();
connectToDb();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server started");
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});
