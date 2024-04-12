import AdvanceSearch from "../components/advanceSearch";
import {ToastContainer} from "react-toastify";

import("@/app/styles/advsearch.css");

export const  metadata = {
    title:"Pak Data Authorized NADRA Data Retrieval (Pakistan Government)",
    description:"Access authorized NADRA data (with proper credentials) through our secure government portal. Retrieve essential information for legitimate purposes.",
    keywords:[
        "pakistan",
        "pakistan government",
        "mobile number",
        "sim card",
        "verification",
        "lookup",
        "official",
        "secure",
        "authorized",
        "verify mobile number ownership",
        "confirm sim registration",
        "check sim owner details",
        "instant verification",
        "secure access",
        "pakistan mobile number verification",
        "pakistan sim verification",
        "pakistan number lookup",
        "government agencies",
        "law enforcement",
        "authorized users"
    ]
}

const Page = () => {
    return (
        <>
        <div className="hero main">
            <h2>Advance Search</h2>

            <AdvanceSearch />


        </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme="dark"
                limit={1}
            />
        </>
    );
};

export default Page;
