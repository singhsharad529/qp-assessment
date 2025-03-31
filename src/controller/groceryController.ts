import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";
import {
  addGroceryItemIntoDB,
  getAllGroceriesFromDB,
  getGroceryItemFromDB,
  removeGroceryItemFromDB,
  updateGroceryItemFromDB,
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

    const result = await getGroceryItemFromDB(Number(groceryID));
    res.status(200).json({
      success: true,
      result: result,
    });
  }
);

// add a single grocery item with the info {name,price,stock}
export const addGroceryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate request body data
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return next(new CustomError("Invalid Inputs", 400));
    }

    const result = await addGroceryItemIntoDB(name, price, stock);

    if (!result) {
      return next(new CustomError("Incorrect DB Query", 500));
    }
    res.status(201).json({
      success: true,
      result: result,
      message: "Grocery Item has been added",
    });
  }
);

// Remove a single grocery item with the groceryID
export const removeGroceryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate groceryID (ensure it's a valid number)
    const { groceryID } = req.params;
    if (!groceryID || isNaN(Number(groceryID))) {
      return next(new CustomError("Invalid Grocery Item ID", 400));
    }

    const result = await removeGroceryItemFromDB(Number(groceryID));

    res.status(201).json({
      success: true,
      result: result,
      message: "Item has been deleted",
    });
  }
);

// Remove a single grocery item with the groceryID
export const updateGroceryItem = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate groceryID (ensure it's a valid number)
    const { groceryID } = req.params;
    if (!groceryID || isNaN(Number(groceryID))) {
      return next(new CustomError("Invalid Grocery Item ID", 400));
    }

    const { name, stock } = req.body;

    if (!name && !stock) {
      return next(new CustomError("Provide at least one field to update", 400));
    }

    const updateFields: string[] = [];
    const updateValues: (string | number)[] = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }
    if (stock) {
      updateFields.push("stock = ?");
      updateValues.push(stock);
    }

    updateValues.push(groceryID);

    const result = await updateGroceryItemFromDB(updateFields, updateValues);

    res.status(201).json({
      success: true,
      result: result,
      message: "Item has been Updated",
    });
  }
);
