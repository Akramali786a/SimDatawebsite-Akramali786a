import "./globals.css";
import BootstrapJs from "./components/bootstrapJs";
import("bootstrap/dist/css/bootstrap.css");
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
import("./favicon.ico");
import Adsense from "./components/Adsense";
export const metadata = {
    title: "PAK DATA  Instant SIM Details Retrieval",
    description: "GET SIM DETAILS INSTANTLY",
    keywords: [
        "Pakistan SIM verification",
        "Verify SIM ownership (Pakistan)",
        "SIM card details retrieval (Pakistan)",
        "Government SIM verification portal (Pakistan)",
        "Authorized SIM verification",
        "Secure SIM information access",
        "Legal verification of SIM cards (Pakistan)",
        "Pakistan mobile phone registration check",
        "CNIC verification for SIM (Pakistan)",
        "PTA (Pakistan Telecommunication Authority) verified SIM",
    ],
    tags: [
        "Pakistan SIM verification",
        "Verify SIM ownership (Pakistan)",
        "SIM card details retrieval (Pakistan)",
        "Government SIM verification portal (Pakistan)",
        "Authorized SIM verification",
        "Secure SIM information access",
        "Legal verification of SIM cards (Pakistan)",
        "Pakistan mobile phone registration check",
        "CNIC verification for SIM (Pakistan)",
        "PTA (Pakistan Telecommunication Authority) verified SIM",
    ],
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {process.env.NODE_ENV === "production" ? (
                    <Adsense pid="ca-pub-7447453608219572" />
                ) : null}
            </head>
            <body>
                <Navbar />
                {children}

                <BootstrapJs />

                <Script
                    src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
                    defer={true}
                />
            </body>
        </html>
    );
}
