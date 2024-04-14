"use client";

// usePrism.js
import { useEffect } from "react";
import Prism from "prismjs";

const usePrism = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return null;
};

export default usePrism;
