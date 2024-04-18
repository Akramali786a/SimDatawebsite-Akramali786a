"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export default function AdvanceSearch() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(null);
    const [option, setOption] = useState("Filter Search");
    const [value, setValue] = useState("");
    const [limit, setLimit] = useState(10);

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
                            ? "Enter the first 5 digits of your CNIC to find results nearby."
                            : option === "byFEMALE"
                                ? "Enter the first 5 digits of your CNIC to find results nearby."
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

    const textForDD =
        option === "byCNIC"
            ? "Search By CNIC"
            : option === "byNAME"
                ? "Search By Name"
                : option === "byADDRESS"
                    ? "Search By Address"
                    : option === "byMALE"
                        ? "Search For Males"
                        : option === "byNUMBER"
                            ? "Search By Number"
                            : option === "byFEMALE"
                                ? "Search For Females"
                                : "Please Select Filter Option";
    const changeOption = (value) => {
        let newValue = value.trim();
        setOption(newValue);
        setOpenMenu(!openMenu);
    };

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
                                    : option === "byMALE"
                                        ? "CNIC Digits"
                                        : option === "byFEMALE"
                                            ? "CNIC Digits"
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

        router.push(
            `/search/advanceSearch/${searchParameter}/${searchBy}/${limit}`
        );
    };

    return (
        <>
            <div className="form">
                <div id="customdropdown">
                    <div id="select-btn" onClick={(r) => setOpenMenu(!openMenu)}>
                        <span className={"mb-0 text-white"}>{textForDD}</span>
                        {openMenu ? (
                            <Image
                                src={"/chevronup.png"}
                                alt={"upbtn"}
                                height={20}
                                width={20}
                            />
                        ) : (
                            <Image
                                src={"/chevronDown.png"}
                                alt={"downbtn"}
                                height={20}
                                width={20}
                            />
                        )}
                    </div>

                    <ul className={`options ${openMenu ? "open" : ""}`}>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byNUMBER")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byNUMBER")}
                        >
                            <span>Search By Number</span>
                            <box-icon
                                type="solid"
                                color={isMenuHovered === "byNUMBER" ? "#fff" : "#000"}
                                name="phone"
                            ></box-icon>
                        </li>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byCNIC")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byCNIC")}
                        >
                            <span>Search By CNIC</span>
                            <box-icon
                                type="solid"
                                color={isMenuHovered === "byCNIC" ? "#fff" : "#000"}
                                name="id-card"
                            ></box-icon>
                        </li>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byNAME")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byNAME")}
                        >
                            <span>Search By Name (Not Working)</span>
                            <box-icon
                                type="solid"
                                color={isMenuHovered === "byNAME" ? "#fff" : "#000"}
                                name="user"
                            ></box-icon>
                        </li>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byADDRESS")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byADDRESS")}
                        >
                            <span>Search By Address (Not Working)</span>
                            <box-icon
                                type="solid"
                                color={isMenuHovered === "byADDRESS" ? "#fff" : "#000"}
                                name="contact"
                            ></box-icon>
                        </li>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byMALE")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byMALE")}
                        >
                            <span>Search For Males</span>
                            <box-icon
                                color={isMenuHovered === "byMALE" ? "#fff" : "#000"}
                                name="male"
                            ></box-icon>
                        </li>
                        <li
                            className="option"
                            onMouseEnter={() => setIsMenuHovered("byFEMALE")}
                            onMouseLeave={() => setIsMenuHovered(null)}
                            onClick={(e) => changeOption("byFEMALE")}
                        >
                            <span>Search For Females</span>
                            <box-icon
                                color={isMenuHovered === "byFEMALE" ? "#fff" : "#000"}
                                name="female"
                            ></box-icon>
                        </li>
                    </ul>
                </div>

                <div
                    className="fields"
                    style={{
                        marginBottom:
                            option === "byMALE" ? "0" : option === "byFEMALE" ? "0" : option=== "byCNIC" ? "0" : "20px",
                    }}
                >
                    <input
                        className="searchnuminput"
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                {option === "byMALE" || option === "byFEMALE" ? (
                    <i
                        style={{ fontSize: "13px" }}
                        className="text-white text-center mb-3"
                    >
                        We&apos;ll use the first 5 digits of your CNIC to detect your area
                        and provide tailored results for a better experience. e.g : 38701
                    </i>
                ) : option === "byCNIC" ? (
                    <>
                        <p className={"text-white  fw-light text-center mb-3"}>If No Results Were Found <Link className={"text-info"} href={"/cnic-tracker"}>Try Out Our ServerLess CNIC Tracker</Link></p>
                    </>
                ) : null}

                <select
                    id="limit"
                    style={{
                        marginTop:
                            option === "byMALE"
                                ? "20px"
                                : option === "byFEMALE"
                                    ? "20px"
                                    : option === "byCNIC" ? "10px" :     "0px",
                    }}
                    onChange={(e) => setLimit(e.target.value)}
                >
                    <option value="10">
                        Limit For Maximum Results (By Default : 10)
                    </option>
                    <option value="20">Max 20 Results</option>
                    <option value="30">Max 30 Results</option>
                    <option value="40">Max 40 Results</option>
                    <option value="50">Max 50 Results</option>
                    <option value="60">Max 60 Results</option>
                    <option value="70">Max 70 Results</option>
                    <option value="80">Max 80 Results</option>
                    <option value="90">Max 90 Results</option>
                    <option value="100">Max 100 Results</option>
                </select>

                <button onClick={handleSubmit} className="submitBtn" type="button">
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
