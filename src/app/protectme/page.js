import React from "react";
import ProtectMeForm from "./components/form";
import("./protectme.css");

export const metadata = {
    title: "PAKDATA: Find & Protect Your Personal Information (Secure Your Data)",
    description:
        "PAKDATA empowers you to connect with others while safeguarding your privacy. Find profiles and control your data visibility. Join the Privacy List to limit who sees your name, CNIC, address, and mobile number.  Find people. Protect yourself.",
    tags: [
        "Pakistan user search",
        "Public information search",
        "Personal data control",
        "Privacy protection",
        "CNIC verification (if applicable)",
        "Secure online community",
    ],
    keywords: [
        "PAKDATA",
        "Pakistan",
        "User search",
        "Public information",
        "Personal data",
        "Privacy",
        "Security",
        "CNIC",
        "Online directory",
        "People finder",
    ],
};

export default function page() {
    return (
        <>
            <div id="hero" className="container-fluid">
                <div className="mainHeading">
                    <p className="text-center text-md-start">
                        <span>Control Your Privacy</span>
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="secondpara mt-3">
                            <p
                                className="text-md-center text-start mb-md-4 mb-1"
                                style={{ color: "chartreuse" }}
                            >
                                We understand the importance of protecting your
                                personal information. Our website allows you to
                                connect with others,{" "}
                                <span className="text-decoration-underline text-info">
                                    but you also have the right to control who
                                    sees your data.
                                </span>
                            </p>
                            <p className="text-white">
                                <span className="text-decoration-underline">
                                    When you're on the Privacy List,
                                </span>{" "}
                                other users will only see basic information
                                about you, such as your username (if
                                applicable). This helps to safeguard your{" "}
                                <span className="text-decoration-underline text-info">
                                    personal information and reduce the risk of
                                    it being misused
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 text-white">
                        <h2
                            className="mt-3 text-md-center text-start"
                            style={{ color: "springgreen" }}
                        >
                            How to Join the Privacy List
                        </h2>
                        <p className="text-md-center text-start">
                            Protect your personal information on PAKDATA{" "}
                            <span className="text-decoration-underline text-info">
                                by adding your mobile number to the Privacy List
                            </span>
                            . Once added, your details will be hidden from other
                            users searching for you.
                        </p>
                    </div>

                    <ProtectMeForm />
                </div>
            </div>
        </>
    );
}
