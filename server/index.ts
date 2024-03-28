import express, { Request, Response, NextFunction } from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server started");
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello world");
});
