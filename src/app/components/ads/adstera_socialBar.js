"use client"
import React from 'react'
import { useEffect } from 'react';

export default function Adstera_socialBar({url}) {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript"
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script)
    };
  }, [url]);
}
