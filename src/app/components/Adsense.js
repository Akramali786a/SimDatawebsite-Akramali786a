import Script from "next/script";
import React from "react";

export default function Adsense({ pid }) {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
