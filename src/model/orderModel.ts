import { RowDataPacket } from "mysql2";
import { pool } from "../utils/dbConnection.js";
import { OrderType } from "../utils/types.js";

// add a single grocery item in the DB
export const placeOrderFromDB = async (items: OrderType[], userid: number) => {
  console.log("orderdetails", items);

  const groceryIdsJson = JSON.stringify(items);
  const [order] = await pool.query(
    "INSERT INTO orders (userid,grocery_ids) VALUES (?,?)",
    [userid, groceryIdsJson]
  );

  for (const item of items) {
    await pool.query("UPDATE groceries SET stock = stock - ? WHERE id = ?", [
      item.quantity,
      item.id,
    ]);
  }

  return order;
};

// add a single grocery item in the DB
export const getAllOrdersFromDB = async (): Promise<RowDataPacket[]> => {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM orders");
  return rows;
};

export const getUserOrdersFromDB = async (
  userid: string
): Promise<RowDataPacket[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM orders where userid=?",
    [userid]
  );
  return rows;
};
