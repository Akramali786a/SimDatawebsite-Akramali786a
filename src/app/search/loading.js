import React from "react";
import("../styles/search.css");
const Loading = () => {
    return (
        <>
            <div className="main">
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
                        <tr>
                            <td>Searching</td>
                            <td>Searching</td>
                            <td>Searching</td>
                            <td>Searching</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
};

export default Loading;
