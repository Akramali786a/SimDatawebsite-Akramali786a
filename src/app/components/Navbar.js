import React from "react";
import NavLinks from "./NavLinks";
import("../styles/navbar.css");
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <h3 className=" mb-sm-0 mb-0">PAKDATA</h3>

                <NavLinks />
            </nav>
        </>
    );
}
