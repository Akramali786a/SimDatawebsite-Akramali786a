"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackBTN = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <button onClick={handleBack} className="returnBtn">
                Search New Number
            </button>
        </>
    );
};

export default BackBTN;
