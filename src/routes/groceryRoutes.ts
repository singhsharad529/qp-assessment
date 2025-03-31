import express from "express";
import {
  getGroceries,
  getGroceryItem,
} from "../controller/groceryController.js";

const router = express.Router();

router.get("/", getGroceries);
router.get("/:groceryID", getGroceryItem);

export default router;
