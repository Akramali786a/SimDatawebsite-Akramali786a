import React from "react";
import("../styles/search.css");
const Loading = () => {
    return (
        <>
            <div className="main">
                <div className="table-responsive">
                    <table border={1}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>Searching</td>
                            </tr>

                            <tr>
                                <th>MOBILE</th>
                                <td>Searching</td>
                            </tr>

                            <tr>
                                <th>NAME</th>
                                <td>Searching</td>
                            </tr>

                            <tr>
                                <th>CNIC</th>
                                <td>Searching</td>
                            </tr>

                            <tr>
                                <th>ADDRESS</th>
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
