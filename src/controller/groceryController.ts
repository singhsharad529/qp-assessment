import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";

export const getGroceries = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      result: ["dsfjsdlk"],
    });
  }
);
