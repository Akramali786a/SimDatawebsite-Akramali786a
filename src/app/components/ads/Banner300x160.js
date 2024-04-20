"use client"
import React, { useRef, useEffect } from 'react';

export default function Banner300x160({ url }) {
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            const atOptions = {
                'key' : '4822d137643eef9722d12cf1c43c455e',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
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

        
    }, [url]);

    return (
        <div className="banner" ref={divRef}></div>
    );
}
