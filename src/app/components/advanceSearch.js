"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AdvanceSearch() {
    const router = useRouter();

    const [option, setOption] = useState("");
    const [value, setValue] = useState("");
    const [limit, setLimit] = useState(10);

    const firstPh =
        option === "byMALE"
            ? "Optional : Name Of Person To Filter"
            : null || option === "byFEMALE"
            ? "Optional : Name Of Person To Filter"
            : null;

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
            ? "Enter the limit for results e.g 10"
            : option === "byFEMALE"
            ? "Enter the limit for results e.g 10"
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

    const handleSubmit = () => {
        // Check if option is not selected
        if (option === "") {
            showToast("warning", "Please Select Filter Option First.");
            return;
        }

        const searchParameter = value.trim();

        // Check if search parameter is empty
        if (searchParameter === "") {
            showToast(
                "error",
                `Please Enter A Valid ${
                    option === "byCNIC"
                        ? "CNIC Number"
                        : option === "byNUMBER"
                        ? "Mobile Number"
                        : option === "byNAME"
                        ? "Name"
                        : option === "byADDRESS"
                        ? "Address"
                        : "value"
                }`
            );
            return;
        }

        // Map option to searchBy value
        const searchByMap = {
            byCNIC: "cnic",
            byNUMBER: "number",
            byNAME: "name",
            byADDRESS: "address",
            byMALE: "male",
            byFEMALE: "female",
        };

        const searchBy = searchByMap[option];
        const additionalParams = {
            num: searchParameter,
            searchBy: searchBy,
        };

        router.push(
            `/search/advanceSearch/${searchParameter}/${searchBy}/${limit}`
        );
    };

    return (
        <>
            <div className="form">
                <select
                    onChange={(e) => setOption(e.target.value)}
                    name="searchBy"
                >
                    <option value={""}>Filter Search</option>
                    <option value="byNUMBER">Search By Number (Working)</option>
                    <option value="byCNIC">Search By CNIC (Working)</option>
                    <option value="byNAME">Search By Name (Not Working)</option>
                    <option value="byADDRESS">
                        Search By Address (Not Working)
                    </option>
                    <option value="byMALE">
                        Search For Males Only (Not Working)
                    </option>
                    <option value="byFEMALE">
                        Search For FeMales Only (Not Working)
                    </option>
                </select>

                {option === "byMALE" ? (
                    <div className="fields">
                        <input type="text" placeholder={firstPh} />
                    </div>
                ) : option === "byFEMALE" ? (
                    <div className="fields">
                        <input type="text" placeholder={firstPh} />
                    </div>
                ) : null}

                <div className="fields">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>

                <select id="limit" onChange={(e) => setLimit(e.target.value)}>
                    <option className="text-center" value="10">
                        Limit For Maximum Results (By Default : 10)
                    </option>
                    <option className="text-center" value="20">
                        Max 20 Results
                    </option>
                    <option className="text-center" value="30">
                        Max 30 Results
                    </option>
                    <option className="text-center" value="40">
                        Max 40 Results
                    </option>
                    <option className="text-center" value="50">
                        Max 50 Results
                    </option>
                    <option className="text-center" value="60">
                        Max 60 Results
                    </option>
                    <option className="text-center" value="70">
                        Max 70 Results
                    </option>
                    <option className="text-center" value="80">
                        Max 80 Results
                    </option>
                    <option className="text-center" value="90">
                        Max 90 Results
                    </option>
                    <option className="text-center" value="100">
                        Max 100 Results
                    </option>
                </select>

                <button
                    onClick={handleSubmit}
                    // onClick={() =>
                    //     showToast(
                    //         "warning",
                    //         "We're currently working on this feature. Stay tuned for updates!"
                    //     )
                    // }
                    className="submitBtn"
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
