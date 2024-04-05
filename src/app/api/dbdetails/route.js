import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define the database credentials for both databases
const DB1_HOST = "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com";
const DB1_PORT = 28431;
const DB1_USER = "avnadmin";
const DB1_PASSWORD = "AVNS_1MQ-ZTaBJtyzJXpRQys";
const DB1_NAME = "NADRA";

const DB2_HOST = "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com";
const DB2_PORT = 12918;
const DB2_USER = "avnadmin";
const DB2_PASSWORD = "AVNS_xMDhZvw0nqB-wL7eF0L";
const DB2_NAME = "NADRA";

// Create connections to both databases
const pool1 = mysql.createPool({
  host: DB1_HOST,
  port: DB1_PORT,
  user: DB1_USER,
  password: DB1_PASSWORD,
  database: DB1_NAME,
});

const pool2 = mysql.createPool({
  host: DB2_HOST,
  port: DB2_PORT,
  user: DB2_USER,
  password: DB2_PASSWORD,
  database: DB2_NAME,
});

export async function GET(req) {
  try {
    // Get tables details from the first database
    const [tables1] = await pool1.query("SHOW TABLE STATUS");

    // Get tables details from the second database
    const [tables2] = await pool2.query("SHOW TABLE STATUS");

    // Combine tables details from both databases
    const tablesDetails = [...tables1, ...tables2];

    // Extract relevant information about the tables
    const tableDetails = tablesDetails.map(table => {
      return {
        tableName: table.Name,
        rowCount: table.Rows,
        dataSize: table.Data_length,
        indexSize: table.Index_length,
        tableSize: table.Data_length + table.Index_length,
        autoIncrement: table.Auto_increment,
        engine: table.Engine,
        collation: table.Collation,
      };
    });

    return NextResponse.json({
      status: "success",
      message: "Table details fetched successfully",
      data: tableDetails,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({
      status: "error",
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
}
