import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";

import CustomError from "../utils/customError.js";
import { placeOrderFromDB } from "../model/orderModel.js";
import { OrderType } from "../utils/types.js";

// get all the grocery items
export const placeOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { items }: { items: OrderType[] } = req.body;

    if (!items || items.length == 0) {
      return next(new CustomError("Invalid order details", 400));
    }

    const result = await placeOrderFromDB(items);

    res.status(201).json({
      success: true,
      result: result,
      message: "Order has been done",
    });
  }
);
