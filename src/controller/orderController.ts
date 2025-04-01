import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";

import CustomError from "../utils/customError.js";
import {
  getAllOrdersFromDB,
  getUserOrdersFromDB,
  placeOrderFromDB,
} from "../model/orderModel.js";
import { OrderType } from "../utils/types.js";

// place Order
export const placeOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid, items }: { userid: number; items: OrderType[] } = req.body;

    if (!userid || isNaN(Number(userid))) {
      return next(new CustomError("Invalid User ID", 400));
    }

    if (!items || items.length == 0) {
      return next(new CustomError("Invalid order details", 400));
    }

    const result = await placeOrderFromDB(items, userid);

    res.status(201).json({
      success: true,
      result: result,
      message: "Order has been done",
    });
  }
);

// get all the orders
export const getAllOrders = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      result: result,
    });
  }
);

// get single order
export const getSingleOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.params;

    if (!userid || userid === undefined) {
      return next(new CustomError("Invalid User ID", 400));
    }

    const result = await getUserOrdersFromDB(userid);
    res.status(200).json({
      success: true,
      result: result,
    });
  }
);
