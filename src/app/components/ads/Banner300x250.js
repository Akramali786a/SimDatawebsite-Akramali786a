"use client"
import React, { useRef, useEffect } from 'react';

export default function Banner300x250({ url }) {
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            const atOptions = {
                'key': '078be6385401567a2171cc0096eedc4e',
                'format': 'iframe',
                'height': 250,
                'width': 300,
                'params': {}
            };

            const script1 = document.createElement("script");
            script1.type = "text/javascript";
            script1.innerHTML = `var atOptions = ${JSON.stringify(atOptions)};`;
            divRef.current.appendChild(script1);

            const script2 = document.createElement("script");
            script2.type = 'text/javascript';
            script2.src = url;
            divRef.current.appendChild(script2);
        }

        return () => {
            // Cleanup if needed
        };
    }, [url]);

    return (
        <div className="banner" ref={divRef}></div>
    );
}
