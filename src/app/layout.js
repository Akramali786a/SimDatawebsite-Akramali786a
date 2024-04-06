import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapJs from "./components/bootstrapJs";
import("bootstrap/dist/css/bootstrap.css");
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "PAK DATA",
    description: "GET SIM DETAILS INSTANTLY",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}

                <BootstrapJs />
            </body>
        </html>
    );
}
