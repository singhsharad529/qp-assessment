import express from "express";
import {
  addGroceryItem,
  getGroceries,
  getGroceryItem,
  removeGroceryItem,
  updateGroceryItem,
} from "../controller/groceryController.js";
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGroceries);
router.get("/:groceryID", getGroceryItem);
router.post("/", checkRole, addGroceryItem);
router.delete("/:groceryID", checkRole, removeGroceryItem);
router.put("/:groceryID", checkRole, updateGroceryItem);

export default router;
