import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error.js";

const errorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    statusCode: error.statusCode,
  });
};

export default errorMiddleware;
