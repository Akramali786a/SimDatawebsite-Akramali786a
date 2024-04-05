import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// // Define the database credentials
const DB_HOST = "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com";
const DB_PORT = 28431;
const DB_USER = "avnadmin";
const DB_PASSWORD = "AVNS_1MQ-ZTaBJtyzJXpRQys";
const DB_NAME = "NADRA";

const DB_HOST1 = "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com";
const DB_PORT1 = 12918;
const DB_USER1 = "avnadmin";
const DB_PASSWORD1 = "AVNS_xMDhZvw0nqB-wL7eF0L";
const DB_NAME1 = "NADRA";

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});
const pool1 = mysql.createPool({
    host: DB_HOST1,
    port: DB_PORT1,
    user: DB_USER1,
    password: DB_PASSWORD1,
    database: DB_NAME1,
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

        // Sanitize the input
        // Remove any non-numeric characters
        number = number.replace(/\D/g, "");

        // Check if the number is not 10 or 11 digits after sanitization
        if (
            number.length !== 10 &&
            number.length !== 11 &&
            number.length !== 13
        ) {
            return NextResponse.json({
                status: "error",
                message:
                    "Invalid number format. Please enter an 11 or 13-digit number/cnic.",
            });
        }

        // Check if the number is 11 digits and starts with 0, then remove the leading 0
        if (number.length === 11 && number.startsWith("0")) {
            number = number.slice(1);
        }

        let combinedData = [];

        if (number.length === 13) {
            const firstThreeDigits = number.substring(0, 3);
            const tableNamePrefix = `table_`;

            // Query the information schema to get a list of tables
            const [rows, fields] = await pool.query("SHOW TABLES");
            const [rows1, fields1] = await pool1.query("SHOW TABLES");

            // Iterate over tables and execute query for each table for pool
            for (let row of rows) {
                const tableName = row[`Tables_in_${DB_NAME}`];
                if (tableName.startsWith(tableNamePrefix)) {
                    const query = `SELECT * FROM ${tableName} WHERE CNIC = ?`;
                    const [tableRows, tableFields] = await pool.query(query, [
                        number,
                    ]);
                    combinedData.push(...tableRows);
                }
            }

            // Iterate over tables and execute query for each table for pool1
            for (let row of rows1) {
                const tableName = row[`Tables_in_${DB_NAME1}`];
                if (tableName.startsWith(tableNamePrefix)) {
                    const query = `SELECT * FROM ${tableName} WHERE CNIC = ?`;
                    const [tableRows, tableFields] = await pool1.query(query, [
                        number,
                    ]);
                    combinedData.push(...tableRows);
                }
            }
        } else {
            // If the number is not 13 digits, execute your default logic
            const firstThreeDigits = number.substring(0, 3);
            const tableName = `table_${firstThreeDigits}`;

            // Query the first database (pool)
            const [rowsFromPool, fieldsFromPool] = await pool.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ?`,
                [number]
            );

            // Query the second database (pool1)
            const [rowsFromPool1, fieldsFromPool1] = await pool1.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ?`,
                [number]
            );

            // Combine data from both databases
            combinedData = [...rowsFromPool, ...rowsFromPool1];
        }

        if (combinedData.length > 0) {
            return NextResponse.json({
                status: "success",
                message: "Data found",
                data: combinedData,
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
            error: error.message,
        });
    }
}
