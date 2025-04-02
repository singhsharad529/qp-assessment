import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create & initialize database before starting the connection pool
const initDB = async () => {
  try {
    // Connect to MySQL without selecting a database first
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      port: Number(process.env.MYSQL_PORT) || 3306,
    });

    //  Create the database if it doesn't exist
    const dbName = process.env.MYSQL_DB || "questionpro";
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' ensured`);

    await connection.end(); // Close temporary connection

    // Create connection pool
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: dbName,
      port: Number(process.env.MYSQL_PORT) || 3307,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Create 'groceries' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS groceries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL
      )
    `);

    console.log("'groceries' table ensured");

    // Create 'orders' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        grocery_ids JSON NOT NULL, 
        userid INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("'orders' table ensured");
    return pool;
  } catch (error) {
    console.error(" Database initialization failed:", error);
    throw error; // Prevent app from running without DB
  }
};

//Create & export connection pool (global variable)
export const pool = await initDB();
