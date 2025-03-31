import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";
import {
  getAllGroceriesFromDB,
  getGroceryItemFromDB,
} from "../model/groceryModel.js";
import CustomError from "../utils/customError.js";

// get all the grocery items
export const getGroceries = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllGroceriesFromDB();
    res.status(200).json({
      success: true,
      result: result,
    });
  }
);

// get a single grocery item with the groceryID
export const getGroceryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate groceryID (ensure it's a valid number)
    const { groceryID } = req.params;
    if (!groceryID || isNaN(Number(groceryID))) {
      return next(new CustomError("Invalid Grocery Item ID", 400));
    }

    const result = await getGroceryItemFromDB(groceryID);
    res.status(200).json({
      success: true,
      result: result,
    });
  }
);
