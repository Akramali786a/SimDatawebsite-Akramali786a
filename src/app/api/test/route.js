const { NextResponse } = require("next/server");
import mysql from "mysql2/promise";
console.clear();
const numDatabases = {
    db1: {
        host: "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com",
        port: 28431,
        user: "avnadmin",
        password: "AVNS_1MQ-ZTaBJtyzJXpRQys",
        database: "NADRA",
    },
    db2: {
        host: "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com",
        port: 12918,
        user: "avnadmin",
        password: "AVNS_xMDhZvw0nqB-wL7eF0L",
        database: "NADRA",
    },
    db3: {
        host: "mysql-3dc5a780-ranjhagaming44-ef10.a.aivencloud.com",
        port: 24075,
        user: "avnadmin",
        password: "AVNS_af-sK2kQLb-IAVFSsNN",
        database: "NADRA",
    },
};

const numTables = {
    db1: [
        "table_251",
        "table_299",
        "table_300",
        "table_301",
        "table_302",
        "table_303",
        "table_304",
        "table_305",
        "table_306",
    ],
    db2: [
        "table_300",
        "table_306",
        "table_307",
        "table_308",
        "table_309",
        "table_310",
        "table_311",
        "table_312",
        "table_313",
        "table_314",
        "table_315",
        "table_316",
        "table_317",
        "table_318",
        "table_319",
        "table_320",
        "table_321",
        "table_322",
        "table_323",
        "table_324",
        "table_330",
        "table_331",
        "table_332",
        "table_333",
        "table_334",
        "table_335",
        "table_336",
        "table_337",
        "table_340",
        "table_341",
        "table_342",
        "table_343",
        "table_344",
        "table_345",
        "table_346",
        "table_347",
        "table_348",
        "table_349",
        "table_364",
    ],
    db3: [
        "table_300",
        "table_301",
        "table_302",
        "table_303",
        "table_304",
        "table_305",
        "table_306",
        "table_307",
        "table_308",
    ],
};

let pools = [];

for (const db in numDatabases) {
    const databaseInfo = numDatabases[db];
    // console.log("Database:", db);

    const poolConfig = {
        host: databaseInfo.host,
        port: databaseInfo.port,
        user: databaseInfo.user,
        password: databaseInfo.password,
        database: databaseInfo.database,
        connectionLimit: 10,
    };

    const pool = mysql.createPool(poolConfig);

    pools.push(pool);

    console.log(`Database Connection Established To ${db}`);
    console.log("--------------------------");
}

export async function POST(req) {
    const payload = await req.json();

    let { number, searchBy, limit } = payload;

    if (!number) {
        return NextResponse.json({
            status: "error",
            message: "Please Enter Valid Number",
        });
    }
    // Validate limit
    if (limit > 100) {
        return NextResponse.json({
            status: "error",
            message: "Limit can't be higher than 100.",
        });
    }

    // Sanitize number input
    number = number.replace(/\D/g, "").trim();

    // Validate number length and format
    if (
        (searchBy === "number" || searchBy === "cnic") &&
        ![10, 11, 13].includes(number.length)
    ) {
        return NextResponse.json({
            status: "error",
            message: "Invalid number format.",
        });
    }

    // Perform search based on searchBy parameter
    if (searchBy === "number") {
        if (number.length === 11 && number.startsWith("0")) {
            number = number.slice(1);
        }
        const firstThreeDigits = number.substring(0, 3);
        const tableName = `table_${firstThreeDigits}`;

        let foundIn = [];

        // Iterate through databases in numTables to find where tableName exists
        for (const db in numTables) {
            if (numTables[db].includes(tableName)) {
                foundIn.push(db);
            }
        }

        if (foundIn.length === 0) {
            return NextResponse.json({
                status: "error",
                message: `Table ${tableName} not found in any database.`,
            });
        }

        // Iterate over pools to find the database configuration where the table is found
        for (const poolIndex in pools) {
            const pool = pools[poolIndex];
            const connection = await pool.getConnection();

            try {
                const [results] = await connection.query(
                    `SHOW VARIABLES LIKE 'hostname'`
                );
                const dbHostname = results[0].Value;
                console.log(
                    `Table ${tableName} found in database configured at hostname: ${dbHostname}`
                );
            } catch (error) {
                console.error(
                    "Error occurred while retrieving hostname:",
                    error
                );
            } finally {
                connection.release();
            }
        }

        return NextResponse.json({
            status: "success",
            message: `Table ${tableName} found in database(s): ${foundIn.join(
                ", "
            )}.`,
        });
    }
}
