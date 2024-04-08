"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AdvanceSearch() {
    const [option, setOption] = useState();

    const placeholder =
        option === "byCNIC"
            ? "Enter 13 Digits CNIC Number"
            : option === "byNAME"
            ? "Enter The Name You Want To Search For!"
            : option === "byNUMBER"
            ? "Enter The Number "
            : option === "byADDRESS"
            ? "Enter The Address You Want To Search For!"
            : option === "byMALE"
            ? "Enter the limit for results"
            : option === "byFEMALE"
            ? "Enter the limit for results"
            : "Select an option"; // Default placeholder if none selected

    const type =
        option === "byCNIC"
            ? "number"
            : option === "byNAME"
            ? "text"
            : option === "byADDRESS"
            ? "text"
            : option === "byMALE"
            ? "number"
            : option === "byNUMBER"
            ? "number"
            : option === "byFEMALE"
            ? "number"
            : "text"; // Default placeholder if none selected

    const showToast = (type, msg) => {
        toast(msg, {
            type: type,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: "dark",
        });
    };

    return (
        <>
            <div className="form">
                <div className="fields">
                    <select
                        onChange={(e) => setOption(e.target.value)}
                        name="searchBy"
                    >
                        <option>Filter Search</option>
                        <option value="byNUMBER"> By Number</option>
                        <option value="byCNIC"> By CNIC</option>
                        <option value="byNAME"> By Name</option>
                        <option value="byADDRESS">By Address</option>
                        <option value="byMALE">For Males Only</option>
                        <option value="byFEMALE">For FeMales Only</option>
                    </select>

                    <input type={type} placeholder={placeholder} />
                </div>

                <button
                    onClick={() =>
                        showToast(
                            "warning",
                            "We're currently working on this feature. Stay tuned for updates!"
                        )
                    }
                    type="button"
                >
                    Search
                </button>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={3}
            />
        </>
    );
}
