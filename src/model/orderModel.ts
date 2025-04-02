import { RowDataPacket } from "mysql2";
import { pool } from "../utils/dbConnection.js";
import { OrderType } from "../utils/types.js";
import CustomError from "../utils/customError.js";

// add a single grocery item in the DB
export const placeOrderFromDB = async (items: OrderType[], userid: number) => {
  // Start a transaction
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Check stock for each item
    for (const item of items) {
      const [rows] = await conn.query(
        "SELECT stock FROM groceries WHERE id = ?",
        [item.id]
      );

      const stock = rows[0]?.stock || 0;
      if (stock < item.quantity) {
        throw new CustomError(`Insufficient stock for item ID ${item.id}`, 400);
      }
    }

    // Insert the order
    const groceryIdsJson = JSON.stringify(items);
    const [order] = await conn.query(
      "INSERT INTO orders (userid, grocery_ids) VALUES (?,?)",
      [userid, groceryIdsJson]
    );

    // Update stock
    for (const item of items) {
      await conn.query("UPDATE groceries SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.id,
      ]);
    }

    // Commit transaction
    await conn.commit();
    return order;
  } catch (error) {
    // Rollback in case of an error
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
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
