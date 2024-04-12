import BackBTN from "@/app/components/backBTN";

import React from "react";
import ActionBtns from "@/app/components/actionBtns";
import("../../styles/search.css");
const searchData = async (num, filter, limit) => {
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
        body: JSON.stringify({ number: num, searchBy: filter, limit: limit }),
    });

    const data = await req.json();

    return data;
};

const Page = async (props) => {
    const { num } = props.params;
    const [route, number, searchBy, limit] = num;

    const userData = await searchData(number, searchBy, limit);


    return (
        <div className="main">
            {userData && userData.status === "success" && (
                <>
                    <div className="table overflow-auto ">
                        <table>
                            {userData.data.map((user, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <th>ID</th>
                                        <td className={"d-flex justify-content-between align-items-center"}>
                                            <div className="index">{index + 1}</div>
                                            <ActionBtns/>
                                        </td>
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

                                    <br />
                                </tbody>
                            ))}
                        </table>
                    </div>

                    <div className="btn">
                        <BackBTN />
                    </div>
                </>
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
