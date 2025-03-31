import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError.js";

// Error Handler Middleware Logic
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
