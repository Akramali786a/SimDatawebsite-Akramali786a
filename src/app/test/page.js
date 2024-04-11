import React from "react";
import("../styles/search.css");
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
    return (
        <>
            <div className="main">
                <div className="table overflow-auto">
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>
                                    <Skeleton height={18} baseColor="#c9d6ff" />
                                </td>
                            </tr>

                            <tr>
                                <th>MOBILE</th>
                                <td>
                                    <Skeleton height={18} baseColor="#c9d6ff" />
                                </td>
                            </tr>

                            <tr>
                                <th>NAME</th>
                                <td>
                                    <Skeleton height={18} baseColor="#c9d6ff" />
                                </td>
                            </tr>

                            <tr>
                                <th>CNIC</th>
                                <td>
                                    <Skeleton height={18} baseColor="#c9d6ff" />
                                </td>
                            </tr>

                            <tr>
                                <th>ADDRESS</th>
                                <td>
                                    <Skeleton
                                        height={18}
                                        baseColor="#c9d6ff"
                                        count={3}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Loading;
