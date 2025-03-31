import express from "express";
import {
  addGroceryItem,
  getGroceries,
  getGroceryItem,
  removeGroceryItem,
  updateGroceryItem,
} from "../controller/groceryController.js";

const router = express.Router();

router.get("/", getGroceries);
router.get("/:groceryID", getGroceryItem);
router.post("/", addGroceryItem);
router.delete("/:groceryID", removeGroceryItem);
router.put("/:groceryID", updateGroceryItem);

export default router;
