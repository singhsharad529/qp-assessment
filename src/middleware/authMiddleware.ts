import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

// We can modify this checkRole code since we currently don't have a user schema and are directly checking the role in the request body for assessment purposes.
// Implementing proper authentication and authorization using JWT and OAuth can improve this middleware.
// I am adding this simple handler as a middleware to check the user's role.

export const checkRole = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body; // Assume userId is sent in the request body
    if (!role || role === undefined)
      return res.status(400).json({ message: "User Role is required" });
    console.log("role", role);

    if (role === "admin") {
      console.log("inside admin");

      return next();
    }

    next(new CustomError("You are not an Admin", 401));
  }
);
