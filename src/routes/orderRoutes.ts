import express from "express";
import {
  getAllOrders,
  getSingleOrder,
  placeOrder,
} from "../controller/orderController.js";
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkRole, getAllOrders);
router.get("/:userid", getSingleOrder);
router.post("/", placeOrder);

export default router;
