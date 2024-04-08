"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Typed from "typed.js";
export default function Form() {
    const [option, setOption] = useState([]);
    const [num, setnum] = useState("");

    const navigation = useRouter();
    useEffect(() => {
        const getOptions = async () => {
            try {
                const req = await fetch("/api/options", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await req.json();
                console.log(data);
                // Replace old data with new data
                if (data.status === "success") {
                    setOption(data.data);
                }
            } catch (error) {
                console.log(`Error : ${error.message}`);
            }
        };

        getOptions();
    }, []);

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

    const handlesubmit = () => {
        const number = num.trim();

        if (number === "") {
            showToast("error", "Please Enter Valid Number");
            return;
        }

        navigation.push("/search/" + number);
    };
    const handleSelectChange = (event) => {
        setnum(event.target.value);
    };
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Discover the versatility of Basic Search! Easily retrieve number details and explore advanced options like address, CNIC, and name searches.",
            ],
            typeSpeed: 50,
            cursorChar: "",
        });
        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <div className="form h-100 w-100 flex-column d-flex align-items-center justify-content-center">
            <h2
                className="text-uppercase mt-3"
                style={{ color: "cornflowerblue" }}
            >
                Basic Search
            </h2>
            <p
                ref={el}
                style={{ color: "skyblue" }}
                className="text-upper mb-1"
            ></p>
            <form onSubmit={(r) => r.preventDefault()}>
                <div className="field">
                    <select
                        value={"SELECT NUMBER"}
                        onChange={handleSelectChange}
                    >
                        <option>Random Nums</option>
                        {option.length > 0 &&
                            option.map((data, index) => (
                                <option key={index} value={data.MOBILE}>
                                    {data.MOBILE}
                                </option>
                            ))}
                    </select>
                    <input
                        type="number"
                        name="num"
                        value={num}
                        onChange={(e) => setnum(e.target.value)}
                        id="num"
                        placeholder="0314XXXXXXX"
                        maxLength={11}
                    />
                </div>
                <button onClick={handlesubmit}>Search</button>
            </form>

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
        </div>
    );
}
