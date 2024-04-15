import {NextResponse} from "next/server";
import mysql from "mysql2/promise";

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
    {
        host: "mysql-2a81e8ae-kravify-ad30.b.aivencloud.com",
        port: "20455",
        user: "avnadmin",
        password: "AVNS_qs6s7YoNXqhRvRW4Ddd",
        database: "NADRA",
    },
    {
        host:"mysql-3a403e85-kravify-0f99.b.aivencloud.com",
        user: "avnadmin",
        port: 24080,
        password: "AVNS_LIt98X8FrFCF2SUe4Kq",
        database: "NADRA",
    },
    {
        host:"mysql-1978de28-rartg-6c4d.b.aivencloud.com",
        user:"avnadmin",
        port:25007,
        password: "AVNS_HQI-xtvK1KScPL-RHJA",
        database: "NADRA"
    },
    {
        host:"mysql-39082126-rartg-de61.b.aivencloud.com",
        user:"avnadmin",
        port:15653,
        password: "AVNS_mzwwc1bcKJJLEH09EeI",
        database: "NADRA"
    }
];
const numPools = numdatabases.map((config) => mysql.createPool(config));
const cnicPools = cnicdatabases.map((config) => mysql.createPool(config));


async function fetchTableNames(pool) {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SHOW TABLES");
    connection.release();
    return rows.map(row => row[Object.keys(row)[0]]);
}

async function fetchAllTables(pools, databases) {
    const tables = {};
    for (const [index, pool] of pools.entries()) {
        const dbName = databases[index]?.host || `Unknown_DB_${index}`;
        tables[dbName] = await fetchTableNames(pool);
    }
    return tables;
}

export async function POST(req) {
    try {
        const numTables = await fetchAllTables(numPools, numdatabases);
        const cnicTables = await fetchAllTables(cnicPools, cnicdatabases);

        return NextResponse.json({
            numTables,
            cnicTables
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