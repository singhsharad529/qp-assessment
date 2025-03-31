import express, { NextFunction } from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import CustomError from "./utils/customError.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Working with types and watch command");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the Server!`,
    404
  );
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Node Server is listening on PORT " + PORT);
});
