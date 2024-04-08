import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define the database credentials
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

const DB_HOST2 = "mysql-3dc5a780-ranjhagaming44-ef10.a.aivencloud.com";
const DB_PORT2 = 24075;
const DB_USER2 = "avnadmin";
const DB_PASSWORD2 = "AVNS_af-sK2kQLb-IAVFSsNN";
const DB_NAME2 = "NADRA";

const DB_HOST3 = "mysql-1d488cc9-codewithfaisal4-2e4d.a.aivencloud.com";
const DB_PORT3 = 10160;
const DB_USER3 = "avnadmin";
const DB_PASSWORD3 = "AVNS_DwrwyKA4zjv0jOMp2Gm";
const DB_NAME3 = "NADRA";

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
const pool2 = mysql.createPool({
    host: DB_HOST2,
    port: DB_PORT2,
    user: DB_USER2,
    password: DB_PASSWORD2,
    database: DB_NAME2,
});
const pool3 = mysql.createPool({
    host: DB_HOST3,
    port: DB_PORT3,
    user: DB_USER3,
    password: DB_PASSWORD3,
    database: DB_NAME3,
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

        // If the number is not 13 digits, execute your default logic
        const firstThreeDigits = number.substring(0, 3);
        const tableName = `table_${firstThreeDigits}`;

        // Query the first database (pool)
        let rowsFromPool;
        try {
            [rowsFromPool] = await pool.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT 1`,
                [number]
            );

            if (rowsFromPool.length > 0) {
                return NextResponse.json({
                    status: "success",
                    message: "Data found",
                    data: rowsFromPool,
                });
            }
        } catch (error) {
            console.error("Error querying pool:", error.message);
        }

        // If data is not found in the first database, proceed to check other databases
        let combinedData = [];

        // Query the remaining databases
        let rowsFromPool1, rowsFromPool2, rowsFromPool3;
        try {
            [rowsFromPool1] = await pool1.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT 1`,
                [number]
            );
            combinedData.push(...rowsFromPool1);
        } catch (error) {
            console.error("Error querying pool1:", error.message);
        }
        try {
            [rowsFromPool2] = await pool2.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT 1`,
                [number]
            );
            combinedData.push(...rowsFromPool2);
        } catch (error) {
            console.error("Error querying pool2:", error.message);
        }
        try {
            [rowsFromPool3] = await pool3.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT 1`,
                [number]
            );
            combinedData.push(...rowsFromPool3);
        } catch (error) {
            console.error("Error querying pool3:", error.message);
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
