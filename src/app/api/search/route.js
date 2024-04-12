import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define database configurations
const numdatabases = [
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
    {
        host: "mysql-28091021-faisalshahzadyt1-45e8.b.aivencloud.com",
        port: "27439",
        user: "avnadmin",
        password: "AVNS_P3n1SclXh_BqnnRVDXL",
        database: "NADRA",
    },
];
const cnicdatabases = [
    {
        host: "mysql-63ff40e-felibg-1091.b.aivencloud.com",
        port: 17446,
        user: "avnadmin",
        password: "AVNS_gjraUgtyU_DEmrFlazF",
        database: "NADRA",
    },
    {
        host: "mysql-28091021-faisalshahzadyt1-45e8.b.aivencloud.com",
        port: "27439",
        user: "avnadmin",
        password: "AVNS_P3n1SclXh_BqnnRVDXL",
        database: "NADRA",
    },

    {
        host: "mysql-238491f1-project-4777.b.aivencloud.com",
        port: "11166",
        user: "avnadmin",
        password: "AVNS_BTTcC09W2PQln_GMCmW",
        database: "NADRA",
    },
    {
        host: "mysql-c90c836-etopys-1cb9.b.aivencloud.com",
        port: "15909",
        user: "avnadmin",
        password: "AVNS_-Ulq2wZOxDOnIRGnmcI",
        database: "NADRA",
    },
];

// Create connection pools for all databases
const numPools = numdatabases.map((config) => mysql.createPool(config));
const cnicPools = cnicdatabases.map((config) => mysql.createPool(config));

// Function to search for data in the databases
async function searchDataInPools(pools, query, parameters) {
    for (const pool of pools) {
        try {
            const [rows] = await pool.query(query, parameters);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.error(`Error querying database: ${error.message}`);
        }
    }
    return [];
}

async function searchByNumber(number, limit) {
    const searchLimit = parseInt(limit);

    if (isNaN(searchLimit)) {
        return {
            status: "error",
            message: "Invalid Limit Type",
        };
    }

    if (number.length === 11 && number.startsWith("0")) {
        number = number.slice(1);
    }

    const firstThreeDigits = number.substring(0, 3);
    const tableName = `table_${firstThreeDigits}`;

    const searchData = await searchDataInPools(
        numPools,
        `SELECT * FROM ${tableName} WHERE MOBILE = ? LIMIT ${searchLimit}`,
        [number]
    );

    return searchData.length > 0
        ? {
              status: "success",
              message: "Data found",
              data: searchData,
          }
        : {
              status: "error",
              message: "User data not found",
          };
}

async function searchByCnic(cnic, limit) {
    const sanitizedCnic = cnic.trim();
    const resultLimit = parseInt(limit);

    if (sanitizedCnic.length !== 13) {
        return {
            status: "error",
            message: "CNIC Number Must be 13 Digits Long.",
        };
    }

    const tableName = `table_${sanitizedCnic.substring(0, 5)}`;
    const totalRows = await searchDataInPools(
        cnicPools,
        `SELECT * FROM ${tableName} WHERE CNIC = ? OR MOBILE = ? LIMIT ${resultLimit}`,
        [sanitizedCnic, sanitizedCnic]
    );

    return totalRows.length > 0
        ? {
              status: "success",
              message: "CNIC Results Found",
              data: totalRows,
          }
        : {
              status: "error",
              message: "No CNIC Results Found",
          };
}

export async function POST(req) {
    try {
        const payload = await req.json();
        let { number, searchBy, limit } = payload;

        number = number.replace(/\D/g, "").trim();

        if (!/^\d+$/.test(number)) {
            return NextResponse.json({
                status: "error",
                message: "Invalid input. Please provide a valid number.",
            });
        }

        if (
            (searchBy === "number" || searchBy === "cnic") &&
            ![10, 11, 13].includes(number.length)
        ) {
            return NextResponse.json({
                status: "error",
                message:
                    "Invalid number format. Please enter an 11 or 13-digit number/CNIC.",
            });
        }

        switch (searchBy) {
            case "number":
                return NextResponse.json(await searchByNumber(number, limit));
            case "cnic":
                return NextResponse.json(await searchByCnic(number, limit));
            default:
                return NextResponse.json({
                    status: "error",
                    message: "Invalid Filter Method.",
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
