import React from "react";
import("../../styles/search.css")
const searchData = async (num) => {
    const req = await fetch(`http://localhost:3000/api/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: num }),
    });

    const data = await req.json();

    return data;
};

const Page = async ({ params }) => {
    const { num } = params;

    const userData = await searchData(num);
    console.log(userData);
    return (
        <div className="main">
            
            {userData && userData.status === "success" && (
                <div className="table-responsive">
                    <table border={1}>
                    <thead>
                        <tr>
                            <th>Mobile</th>
                            <th>Name</th>
                            <th>CNIC</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.MOBILE}</td>
                                <td>{user.NAME}</td>
                                <td>{user.CNIC}</td>
                                <td>{user.ADDRESS}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
            {userData && userData.status === "error" && (
                <p>Error: {userData.message}</p>
            )}
        </div>
    );
};

export default Page;
