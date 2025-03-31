import { NextFunction, Request, Response } from "express";
import CustomError from "./customError.js";

// Handler to handler controller code asynchronously.
export const asyncErrorHandler = (func: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: CustomError) => next(err));
  };
};
