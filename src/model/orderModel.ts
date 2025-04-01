import { RowDataPacket } from "mysql2";
import { pool } from "../utils/dbConnection.js";
import { OrderType } from "../utils/types.js";

// add a single grocery item in the DB
export const placeOrderFromDB = async (items: OrderType[]) => {
  console.log("orderdetails", items);

  const groceryIdsJson = JSON.stringify(items);
  const [order] = await pool.query(
    "INSERT INTO orders (grocery_ids) VALUES (?)",
    [groceryIdsJson]
  );

  for (const item of items) {
    await pool.query("UPDATE groceries SET stock = stock - ? WHERE id = ?", [
      item.quantity,
      item.id,
    ]);
  }

  return order;
};
