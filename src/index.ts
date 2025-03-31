import express, { NextFunction } from "express";
import { Request, Response } from "express";
import CustomError from "./utils/customError.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

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

app.listen(5000, () => {
  console.log("Express Server is listening on PORT 5000");
});
