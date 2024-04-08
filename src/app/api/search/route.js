import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define database configurations
const databases = [
    {
        host: "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com",
        port: 28431,
        user: "avnadmin",
        password: "AVNS_1MQ-ZTaBJtyzJXpRQys",
        database: "NADRA",
    },
    {
        host: "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com",
        port: 12918,
        user: "avnadmin",
        password: "AVNS_xMDhZvw0nqB-wL7eF0L",
        database: "NADRA",
    },
    {
        host: "mysql-3dc5a780-ranjhagaming44-ef10.a.aivencloud.com",
        port: 24075,
        user: "avnadmin",
        password: "AVNS_af-sK2kQLb-IAVFSsNN",
        database: "NADRA",
    },
    {
        host: "mysql-1d488cc9-codewithfaisal4-2e4d.a.aivencloud.com",
        port: 10160,
        user: "avnadmin",
        password: "AVNS_DwrwyKA4zjv0jOMp2Gm",
        database: "NADRA",
    },
    {
        host: "mysql-31ec2ba9-faisal447846-1a00.a.aivencloud.com",
        port: "16285",
        user: "avnadmin",
        password: "AVNS_Lkfg1IkFwc45v_Xrf8j",
        database: "NADRA",
    },
];

// Create connection pools for all databases
const pools = databases.map((config) => mysql.createPool(config));

// Function to search for data in the databases
async function searchDataInDatabases(number, tableName) {
    for (const pool of pools) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT 1`,
                [number]
            );
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.error(`Error querying database: ${error.message}`);
        }
    }
    return [];
}

export async function POST(req) {
    try {
        const payload = await req.json();
        let { number } = payload;

        // Validate and sanitize the input
        number = number.replace(/\D/g, "");

        if (!/^\d+$/.test(number)) {
            return NextResponse.json({
                status: "error",
                message: "Invalid input. Please provide a valid number.",
            });
        }

        if (
            number.length !== 10 &&
            number.length !== 11 &&
            number.length !== 13
        ) {
            return NextResponse.json({
                status: "error",
                message:
                    "Invalid number format. Please enter an 11 or 13-digit number/CNIC.",
            });
        }

        if (number.length === 11 && number.startsWith("0")) {
            number = number.slice(1);
        }

        // Determine the table name based on the number
        const firstThreeDigits = number.substring(0, 3);
        const tableName = `table_${firstThreeDigits}`;

        // Search for data in all databases
        const searchData = await searchDataInDatabases(number, tableName);

        if (searchData.length > 0) {
            return NextResponse.json({
                status: "success",
                message: "Data found",
                data: searchData,
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
