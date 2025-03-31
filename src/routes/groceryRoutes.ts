import express from "express";
import { getGroceries } from "../controller/groceryController.js";

const router = express.Router();

router.get("/", getGroceries);

export default router;
