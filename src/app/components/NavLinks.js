"use client";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function NavLinks() {
    const path = usePathname();
    const [showNav, setshowNav] = useState(false);

    return (
        <>
            {showNav ? (
                <box-icon
                    size="md"
                    onClick={() => setshowNav(false)}
                    color="white"
                    name="x"
                    class="navClose"
                ></box-icon>
            ) : (
                <box-icon
                    size="md"
                    class="navOpen"
                    onClick={() => setshowNav(true)}
                    color="white"
                    name="menu-alt-right"
                ></box-icon>
            )}

            <ul className={showNav ? "show" : ""}>
                <li>
                    <Link className={path === "/" ? "active" : ""} href={"/"}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className={path === "/search" ? "active" : ""}
                        href={"/search"}
                    >
                        Advance Search
                    </Link>
                </li>
                <li>
                    <Link
                        className={path === "/protectme" ? "active" : ""}
                        href={"/protectme"}
                    >
                        Protect My Data
                    </Link>
                </li>
                {/*<li>*/}
                {/*    <Link*/}
                {/*        className={path === "/chat" ? "active" : ""}*/}
                {/*        href={"/chat"}*/}
                {/*    >*/}
                {/*        Chat*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li>
                    <Link
                        className={path === "/ai" ? "active" : ""}
                        href={"/ai"}
                    >
                        PAK AI
                    </Link>
                </li>
            </ul>
        </>
    );
}
