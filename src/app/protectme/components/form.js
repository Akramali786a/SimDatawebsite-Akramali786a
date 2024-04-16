"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function ProtectMeForm() {
    const [number, setNumber] = useState("");

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

    const handleNumSubmit = () => {
        let validatedNum = number.trim();

        if (validatedNum === "") {
            showToast("error", "Please Enter Number First");
        }

        if (![10, 11].includes(number.length)) {
            showToast("error", "Please Enter Valid 10/11 Digits Number");
            return;
        }

        if (validatedNum.length === 11 && validatedNum.startsWith("0")) {
            validatedNum = validatedNum.slice(1);
        }

        showToast("info", "Stay Tuned We Are Wokring On This Feature!");
    };

    return (
        <>
            <div id="form">
                <div id="inputum">
                    <input
                        id="numinput"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter Your Number"
                    />
                </div>

                <div className="submit" onClick={handleNumSubmit}>
                    <button className="btnSubmit">Submit</button>
                    <Image
                        width={30}
                        height={30}
                        src="/shield.png"
                        alt="shieldimg"
                    />
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme="dark"
                limit={1}
            />
        </>
    );
}
