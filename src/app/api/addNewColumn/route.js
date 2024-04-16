import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
const numdatabases = require("./dbs");

const numPools = Object.values(numdatabases).map((config) =>
    mysql.createPool(config)
);

async function addColumnIfNotExists(pool) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SHOW TABLES");
        for (let row of rows) {
            const tableName =
                row[`Tables_in_${pool.pool.config.connectionConfig.database}`];
            const [columns] = await connection.query(
                `SHOW COLUMNS FROM ${tableName}`
            );
            const columnNames = columns.map((column) => column.Field);
            if (!columnNames.includes("isSecured")) {
                await connection.query(
                    `ALTER TABLE ${tableName} ADD COLUMN isSecured BOOLEAN DEFAULT FALSE AFTER ${
                        columnNames[columnNames.length - 1]
                    }`
                );
                console.log(`Added 'isSecured' column to table ${tableName}`);
            } else {
                console.log(
                    `'isSecured' column already exists in table ${tableName}`
                );
            }
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        connection.release();
    }
}

export async function POST(req) {
    // Add new column 'isSecured' to tables in numPools

    for (const pool of numPools) {
        await addColumnIfNotExists(pool);
        console.log(pool.pool.config.connectionConfig.database);
    }

    return NextResponse.json({
        status: "success",
        message: "Added isSecure Column To All DBS",
    });
}
