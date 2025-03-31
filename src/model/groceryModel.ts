import { QueryResult } from "mysql2";
import { pool } from "../utils/dbConnection.js";

// get all the grocery Items from the DB
export const getAllGroceriesFromDB = async () => {
  const [rows] = await pool.query("SELECT * FROM groceries");
  return rows;
};

// get single grocery item from the DB
export const getGroceryItemFromDB = async (
  id: string
): Promise<QueryResult> => {
  const [rows] = await pool.query(`SELECT * FROM groceries where id=${id}`);
  return rows;
};
