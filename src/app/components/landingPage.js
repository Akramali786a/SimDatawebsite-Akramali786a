"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ToastContainer, toast } from "react-toastify";

export default function LandingPage() {
    const router = useRouter();

    const slogans = [
        "Unlocking the Secrets: Your Gateway to Uncharted Data Realms!",
        "Navigate the Unknown: Dive Deep into Pak Data's Rich Resources!",
        "Empowering Curiosity: Where Every Search Unveils New Discoveries!",
        "Data Discovery Made Simple: Explore, Engage, Enlighten!",
        "Illuminate the Shadows: Revealing Hidden Gems in Every Query!",
        "Your Data Compass: Guiding You through the Depths of Information!",
        "Unravel the Mysteries: Where Information Meets Intuition!",
        "Unveil the Unseen: Explore Endless Possibilities with Pak Data!",
        "Data Exploration Redefined: Your Path to Unparalleled Insight!",
        "Embark on a Journey: Discover the Power of Pak Data's Knowledge Hub!",
    ];

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: slogans,
            typeSpeed: 50,
            cursorChar: "",
            backDelay: 2000,
            loop: true,
        });
        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
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

    return (
        <>
            <h1 className="text-uppercase text-center fw-semibold ">
                Welcome To Pak Data
            </h1>
            <h5 ref={el} className="mt-4 typedJs mb-4 text-center">
                Discover, Explore, Connect: Empowering You with Pak Data
                Insights!
            </h5>
            <div className="d-flex align-items-center justify-content-center">
                <button
                    onClick={() =>
                        showToast(
                            "warning",
                            "Stay tuned! This feature is currently in development."
                        )
                    }
                    type="button"
                    className="btn me-2 protectbtn"
                >
                    Protect My Data
                </button>
                <button
                    onClick={() => router.push("/search")}
                    type="button"
                    className="btn ms-2 advBtn "
                >
                    Advance Search
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
