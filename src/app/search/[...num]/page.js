import BackBTN from "@/app/components/backBTN";

import React from "react";
import("../../styles/search.css");
const searchData = async (num) => {
    const baseUrl =
        process.env.NODE_ENV === "production"
            ? "https://pakdata.vercel.app"
            : "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/search`;
    const req = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: num }),
    });

    const data = await req.json();

    return data;
};

const Page = async (props) => {
    const { num } = props.params;
    const [route, number, searchBy, limit] = num;

    const userData = await searchData(number);

    return (
        <div className="main">
            {userData && userData.status === "success" && (
                <div className="table-responsive">
                    <table border={1}>
                        {userData.data.map((user, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th>ID</th>
                                    <td>{index + 1}</td>
                                </tr>
                                <tr>
                                    <th>MOBILE</th>
                                    <td>{user.MOBILE}</td>
                                </tr>
                                <tr>
                                    <th>NAME</th>
                                    <td>{user.NAME}</td>
                                </tr>
                                <tr>
                                    <th>CNIC</th>
                                    <td>{user.CNIC}</td>
                                </tr>
                                <tr>
                                    <th>ADDRESS</th>
                                    <td>
                                        {user.ADDRESS ||
                                            "ADDRESS NOT AVAILABLE"}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <BackBTN />
                </div>
            )}
            {userData && userData.status === "error" && (
                <>
                    <p>Error: {userData.message}</p>
                    <BackBTN />
                </>
            )}
        </div>
    );
};

export default Page;
