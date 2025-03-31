import express, { NextFunction } from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import CustomError from "./utils/customError.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { pool } from "./utils/dbConnection.js";
// importing routes
import groceryRoutes from "./routes/groceryRoutes.js";

dotenv.config();

pool
  .query("SELECT 1")
  .then(() => {
    console.log("Database connection verified");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1); // Exit if DB fails
  });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Grocery Booking APIs");
});

// questionpro123

app.use("/api/v1/groceries", groceryRoutes);

// check invalid path
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the Server!`,
    404
  );
  next(err);
});

// error handler middleware
app.use(errorHandler);

// server running on defined PORT
app.listen(PORT, () => {
  console.log("Node Server is listening on PORT " + PORT);
});
