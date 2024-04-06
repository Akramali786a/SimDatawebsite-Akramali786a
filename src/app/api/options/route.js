import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define the database credentials
const DB_HOST = "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com";
const DB_PORT = 12918;
const DB_USER = "avnadmin";
const DB_PASSWORD = "AVNS_xMDhZvw0nqB-wL7eF0L";
const DB_NAME = "NADRA";

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function POST(req) {
    try {
        const tableName = [
            "table_301",
            "table_302",
            "table_303",
            "table_304",
            "table_305",
        ];

        let rows = [];
        for (const table of tableName) {
            const [resultRows, fields] = await pool.query(
                `SELECT MOBILE FROM ${table} ORDER BY MOBILE DESC LIMIT 20`
            );
            rows.push(...resultRows);
        }

        // Sort the rows by MOBILE column
        rows.sort((a, b) => a.MOBILE.localeCompare(b.MOBILE));

        // Shuffle the rows to change the order deeply
        rows = shuffle(rows);

        if (rows.length > 0) {
            return NextResponse.json({
                status: "success",
                message: "Data found",
                data: rows,
            });
        } else {
            return NextResponse.json({
                status: "error",
                message: "No data found",
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
