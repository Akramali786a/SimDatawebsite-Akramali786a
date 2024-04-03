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
                                <td>1</td>
                            </tr>

                            <tr>
                                <th>MOBILE</th>
                                <td>03144709452</td>
                            </tr>

                            <tr>
                                <th>NAME</th>
                                <td>Faisal Shahzad</td>
                            </tr>

                            <tr>
                                <th>CNIC</th>
                                <td>384013445678</td>
                            </tr>

                        <tr>
                            <th>ADDRESS</th>
                            <td>KMW PUNJAB PAKISTAN</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Loading;
