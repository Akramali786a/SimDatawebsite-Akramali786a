import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import tablesInCNICDatabases from "./tablesinCnic";
import tablesInNumDatabases from "./tablesinnumdbs";
import cnicdatabases from "./cnicDbs";
import numdatabases from "./numDbs";
import Locate from "./Locate";

console.clear();

// Function to search for data in the databases
async function searchDataInPools(pools, query, parameters) {
    const results = [];

    for (const pool of pools) {
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.query(query, parameters);
            if (rows.length > 0) {
                results.push(...rows);
            }
        } catch (error) {
            console.error(`Error querying database: ${error.message}`);
        } finally {
            if (connection) {
                connection.release(); // Release the connection back to the pool
            }
        }
    }

    return results;
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

    let dbsThatHaveThisTalbe = {};

    for (const db in tablesInNumDatabases) {
        if (tablesInNumDatabases[db].includes(tableName)) {
            const dbConfig = numdatabases[db];

            dbsThatHaveThisTalbe[db] = dbConfig;
            console.log(`Table ${tableName} Found In Number Database ${db}`);
            console.log(`---------------------------------------------------`);
        }
    }

    if (dbsThatHaveThisTalbe.length === 0) {
        return {
            status: "error",
            message: "User data not found",
        };
    }

    const filteredPools = Object.values(dbsThatHaveThisTalbe).map((config) =>
        mysql.createPool(config)
    );

    const searchData = await searchDataInPools(
        filteredPools,
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

    let dbsThatHaveThisCNIC = {};

    for (const db in tablesInCNICDatabases) {
        if (tablesInCNICDatabases[db].includes(tableName)) {
            const dbConfig = cnicdatabases[db];

            dbsThatHaveThisCNIC[db] = dbConfig;

            console.log(`Table ${tableName} Found in CNIC Database ${db}`);
            console.log(`----------------------------------------------`);
        }
    }

    if (dbsThatHaveThisCNIC.length === 0) {
        return {
            status: "error",
            message: "No CNIC Results Found",
        };
    }

    const filteredCnicPools = Object.values(dbsThatHaveThisCNIC).map((config) =>
        mysql.createPool(config)
    );

    const totalRows = await searchDataInPools(
        filteredCnicPools,
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

async function searchForFemales(number, limit) {
    const searchLimit = parseInt(limit);

    if (isNaN(searchLimit)) {
        return {
            status: "error",
            message: "Invalid Limit Type",
        };
    }

    if (number.length !== 5) {
        return NextResponse.json({
            status: "error",
            message: "Please Enter Only 5 Digits Of CNIC",
        });
    }
    const tableName = `table_${number}`;
    let dbsthatHavethisTable = {};

    for (const db in tablesInCNICDatabases) {
        // console.log(db);
        if (tablesInCNICDatabases[db].includes(tableName)) {
            const dbConfig = cnicdatabases[db];

            dbsthatHavethisTable[db] = dbConfig;
            console.log(`Table '${tableName}' found in CNIC database '${db}'`);
            console.log("--------------------------------------");
        }
    }

    // console.log(dbsthatHavethisTable);
    if (dbsthatHavethisTable.length === 0) {
        return {
            status: "error",
            message: "No female results found",
        };
    }

    const filterCNICPools = Object.values(dbsthatHavethisTable).map((config) =>
        mysql.createPool(config)
    );

    const femaleResults = [];

    // Iterate over each pool in cnicPools
    for (const pool of filterCNICPools) {
        try {
            // Assuming there's a column named 'gender' which stores gender information
            const [rows] = await pool.query(
                `SELECT * FROM ${tableName} LIMIT ?`,
                [searchLimit]
            );

            // Filter out male data based on the last character of CNIC and remove rows with null or empty values
            const filteredRows = rows.filter(
                (row) =>
                    parseInt(row.CNIC.slice(-1)) % 2 === 0
            );

            // Add filtered rows to results
            femaleResults.push(...filteredRows);
        } catch (error) {
            console.error(`Error querying database: ${error.message}`);
        }
    }

    // Deeply shuffle the female results
    for (let i = femaleResults.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [femaleResults[i], femaleResults[j]] = [
            femaleResults[j],
            femaleResults[i],
        ];
    }

    // Return random rows equal to the limit requested by the client
    const randomFemaleResults = femaleResults.slice(0, searchLimit);

    return randomFemaleResults.length > 0
        ? {
              status: "success",
              message: "Female results found",
              data: randomFemaleResults,
          }
        : {
              status: "error",
              message: "No female results found",
          };
}

async function searchForMales(number, limit) {
    const searchLimit = parseInt(limit);

    if (isNaN(searchLimit)) {
        return {
            status: "error",
            message: "Invalid Limit Type",
        };
    }

    if (number.length !== 5) {
        return NextResponse.json({
            status: "error",
            message: "Please Enter Only 5 Digits Of CNIC",
        });
    }
    const tableName = `table_${number}`;

    let dbsthatHavethisTable = {};

    for (const db in tablesInCNICDatabases) {
        // console.log(db);
        if (tablesInCNICDatabases[db].includes(tableName)) {
            const dbConfig = cnicdatabases[db];

            dbsthatHavethisTable[db] = dbConfig;
            console.log(`Table '${tableName}' found in CNIC database '${db}'`);
            console.log("--------------------------------------");
        }
    }

    if (dbsthatHavethisTable.length === 0) {
        return { status: "error", message: "Not Male Record Found" };
    }

    // console.log(dbsthatHavethisTable);

    const filterCNICPools = Object.values(dbsthatHavethisTable).map((config) =>
        mysql.createPool(config)
    );

    const femaleResults = [];

    // Iterate over each pool in cnicPools
    for (const pool of filterCNICPools) {
        try {
            // Assuming there's a column named 'gender' which stores gender information
            const [rows] = await pool.query(
                `SELECT * FROM ${tableName} LIMIT ?`,
                [searchLimit]
            );

            // Filter out male data based on the last character of CNIC and remove rows with null or empty values
            const filteredRows = rows.filter(
                (row) =>
                    parseInt(row.CNIC.slice(-1)) % 2 !== 0
            );

            // Add filtered rows to results
            femaleResults.push(...filteredRows);
        } catch (error) {
            console.error(`Error querying database: ${error.message}`);
        }
    }

    // Deeply shuffle the female results
    for (let i = femaleResults.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [femaleResults[i], femaleResults[j]] = [
            femaleResults[j],
            femaleResults[i],
        ];
    }

    // Return random rows equal to the limit requested by the client
    const randomFemaleResults = femaleResults.slice(0, searchLimit);

    return randomFemaleResults.length > 0
        ? {
              status: "success",
              message: "Female results found",
              data: randomFemaleResults,
          }
        : {
              status: "error",
              message: "No female results found",
          };
}

const searchByAddress = async (address, limit) => {
    let sanitizedAddress = address.trim().split("-");

    let tablePrefix = sanitizedAddress[0];
    let table_name = `table_${tablePrefix}`

    sanitizedAddress = sanitizedAddress.slice(1);

    let areaName = sanitizedAddress.join(" ");
    if(areaName === ""){
        let findArea = Locate(tablePrefix).split(",").filter((value)=>value.trim() !== "")
        if(findArea === undefined){
            return {status:"error",message:"Invalid NearBy Area Please Try Again."}
        }else{
            areaName = findArea[findArea.length - 1];
        }
    }
    console.log(`Table Prefix is ${tablePrefix} and Area Name is ${areaName}`)

    const validatedLimit = parseInt(limit);

    // return {status:"error",message:"this is success message"}

    if (isNaN(validatedLimit)) {
        return { status: "error", message: "Invalid Limit Type!!!" };
    }

    // Create an array to store the results
    let searchResults = [];

    try {
        // Create an array to store all database pools
        let allPools = [];

        for (const table in tablesInCNICDatabases) {
            if (tablesInCNICDatabases[table].includes(table_name.trim())){
                console.log(`Table ${table_name} Found In Database ${table}. Pushing To All Pools Var`);
                console.log(`---------------------------------------------------------------------------`)
                const pool = mysql.createPool(cnicdatabases[table]);
                allPools.push(pool);
            }
        }

        if (allPools.length === 0){
            return {
                status:"error",
                message:"No Results Found For This Address!!!"
            }
        }

        // Loop through each pool to execute the query
        let limitReached = false; // Variable to track if limit is reached
        for (const pool of allPools) {
            try {
                // Execute the query to search for the address in the current table
                const [rows] = await pool.query(
                    `SELECT * FROM ${table_name} WHERE ADDRESS LIKE ? LIMIT ?`,
                    [`%${areaName}%`, validatedLimit - searchResults.length]
                );

                // Add the rows to the search results
                searchResults = [...searchResults, ...rows];

                // Log the number of new rows found
                console.log(`${rows.length} new rows found. Total: ${searchResults.length}`);

                // Check if the limit has been reached
                if (searchResults.length >= validatedLimit) {
                    limitReached = true; // Update limitReached flag
                    break; // Break out of the loop
                }
            } catch (error) {
                console.error(`Error querying database: ${error.message}`);
            }
        }


        // If all databases are searched and limit not reached, return the results found
        // Deeply shuffle the search results
        shuffleArray(searchResults);

        if (searchResults.length === 0){
            return {
                status:"error",
                message:"No Results Were Found For This Address"
            }
        }

        return {
            status: "success",
            message: "Address results found",
            data: searchResults.slice(0, validatedLimit),
        };
    } catch (error) {
        console.error("Error:", error.message);
        return { status: "error", message: "An unexpected error occurred", error: error.message };
    }
};

const searchByName = async (address, limit) => {
    let sanitizedAddress = address.trim().split("-");

    let tablePrefix = sanitizedAddress[0];
    let table_name = `table_${tablePrefix}`

    sanitizedAddress = sanitizedAddress.slice(1);

    let areaName = sanitizedAddress.join(" ");
    if(areaName === ""){
        let findArea = Locate(tablePrefix).split(",").filter((value)=>value.trim() !== "")
        if(findArea === undefined){
            return {status:"error",message:"Invalid NearBy Area Please Try Again."}
        }else{
            areaName = findArea[findArea.length - 1];
        }
    }


    const validatedLimit = parseInt(limit);

    // return {status:"error",message:"this is success message"}

    if (isNaN(validatedLimit)) {
        return { status: "error", message: "Invalid Limit Type!!!" };
    }

    // Create an array to store the results
    let searchResults = [];

    try {
        // Create an array to store all database pools
        let allPools = [];

        for (const table in tablesInCNICDatabases) {
            if (tablesInCNICDatabases[table].includes(table_name.trim())){
                console.log(`Table ${table_name} Found In Database ${table}. Pushing To All Pools Var`);
                console.log(`---------------------------------------------------------------------------`)
                const pool = mysql.createPool(cnicdatabases[table]);
                allPools.push(pool);
            }
        }

        if (allPools.length === 0){
            return {
                status:"error",
                message:"No Results Found For This Address!!!"
            }
        }

        // Loop through each pool to execute the query
        let limitReached = false; // Variable to track if limit is reached
        for (const pool of allPools) {
            try {
                // Execute the query to search for the address in the current table
                const [rows] = await pool.query(
                    `SELECT * FROM ${table_name} WHERE NAME LIKE ? LIMIT ?`,
                    [`%${areaName}%`, validatedLimit - searchResults.length]
                );

                // Add the rows to the search results
                searchResults = [...searchResults, ...rows];

                // Log the number of new rows found
                console.log(`${rows.length} new rows found. Total: ${searchResults.length}`);

                // Check if the limit has been reached
                if (searchResults.length >= validatedLimit) {
                    limitReached = true; // Update limitReached flag
                    break; // Break out of the loop
                }
            } catch (error) {
                console.error(`Error querying database: ${error.message}`);
            }
        }


        // If all databases are searched and limit not reached, return the results found
        // Deeply shuffle the search results
        shuffleArray(searchResults);

        if (searchResults.length === 0){
            return {
                status:"error",
                message:"No Results Were Found For This Name"
            }
        }

        return {
            status: "success",
            message: "Address results found",
            data: searchResults.slice(0, validatedLimit),
        };
    } catch (error) {
        console.error("Error:", error.message);
        return { status: "error", message: "An unexpected error occurred", error: error.message };
    }
};


// Function to deeply shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        if (Array.isArray(array[i])) {
            shuffleArray(array[i]);
        }
    }
}


export async function POST(req) {
    try {
        const payload = await req.json();

        let { number, searchBy, limit } = payload;

        if (limit > 100) {
            return NextResponse.json({
                status: "error",
                message:
                    "Whoops! The limit can't be higher than 100. To see more results, try reducing the limit or making multiple requests.",
            });
        }

        if (searchBy === "number" || searchBy === "cnic") {
            number = number.replace(/\D/g, "").trim();

            if (!/^\d+$/.test(number)) {
                return NextResponse.json({
                    status: "error",
                    message: "Invalid input. Please provide a valid number.",
                });
            }

            if (![10, 11, 13].includes(number.length)) {
                return NextResponse.json({
                    status: "error",
                    message:
                        "Invalid number format. Please enter an 11 or 13-digit number/CNIC.",
                });
            }
        }
        switch (searchBy) {
            case "number":
                return NextResponse.json(await searchByNumber(number, limit));
            case "cnic":
                return NextResponse.json(await searchByCnic(number, limit));
            case "male":
                return NextResponse.json(await searchForMales(number, limit));
            case "female":
                return NextResponse.json(await searchForFemales(number, limit));
            case "address" :
                return NextResponse.json(await searchByAddress(number, limit))
            case "name" :
                return NextResponse.json(await searchByName(number, limit))
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
