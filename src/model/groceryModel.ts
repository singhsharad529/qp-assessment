import { FieldPacket, QueryResult, RowDataPacket } from "mysql2";
import { pool } from "../utils/dbConnection.js";

// get all the grocery Items from the DB
export const getAllGroceriesFromDB = async (): Promise<RowDataPacket[]> => {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM groceries");
  return rows;
};

// get single grocery item from the DB
export const getGroceryItemFromDB = async (
  id: number
): Promise<RowDataPacket[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM groceries WHERE id= ?`,
    [id]
  );
  return rows;
};

// add a single grocery item in the DB
export const addGroceryItemIntoDB = async (
  name: string,
  price: number,
  stock: number
) => {
  let result: any = null;
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM groceries WHERE name = ?`,
    [name]
  );

  if (rows.length > 0) {
    // checking if the grocery item already exists
    result = await pool.query(
      "UPDATE groceries SET stock = stock + ? WHERE name = ?",
      [stock, name]
    );
    return result;
  }

  // if the grocery item not exists then adding it as a row
  result = await pool.query(
    "INSERT INTO groceries (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock]
  );

  return result;
};

// remove single grocery item from the DB
export const removeGroceryItemFromDB = async (
  id: number
): Promise<RowDataPacket[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "DELETE FROM groceries WHERE id = ?",
    [id]
  );
  return rows;
};

// Update single grocery item from the DB
export const updateGroceryItemFromDB = async (
  updateFields: string[],
  updateValues: (string | number)[]
) => {
  // updating the row based on inputs
  let result = await pool.query(
    `UPDATE groceries SET ${updateFields.join(", ")} WHERE id = ?`,
    updateValues
  );

  return result;
};
