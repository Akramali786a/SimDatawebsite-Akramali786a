import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define the database credentials
const DB_HOST = "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com";
const DB_PORT = 28431;
const DB_USER = "avnadmin";
const DB_PASSWORD = "AVNS_1MQ-ZTaBJtyzJXpRQys";
const DB_NAME = "NADRA";

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export async function POST(req) {
  try {
    const payload = await req.json();
    let { number } = payload;

    // Validate input: Ensure it's a number
    if (!/^\d+$/.test(number)) {
      return NextResponse.json({
        status: "error",
        message: "Invalid input. Please provide a valid number.",
      });
    }

    // Sanitize the input by removing any non-numeric characters
    number = number.replace(/\D/g, "");

    if (number.length !== 10 && number.length !== 11) {
      return NextResponse.json({
        status: "error",
        message: "Invalid number format. Please enter a 10 or 11-digit number.",
      });
    }

    const firstThreeDigits = number.substring(0, 3);
    const tableName = `table_${firstThreeDigits}`;

    const [rows, fields] = await pool.query(`SELECT * FROM ?? WHERE MOBILE = ?`, [tableName, number]);

    if (rows && rows.length > 0) {
      return NextResponse.json({
        status: "success",
        message: "Data found",
        data: rows,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "User data not found",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
}
