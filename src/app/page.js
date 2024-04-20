import Form from "./components/form";

import("./styles/app.css");
import LandingPage from "./components/landingPage";
import Banner300x250 from './components/ads/Banner300x250';
import Banner300x160 from "./components/ads/Banner300x160";

export const metadata = {
    title: "Pak Data Instant Pakistani Mobile Number Lookup (Government Authorized)",
    description: "Easily discover details of Pakistani numbers with Sim Owner Details online. CNIC data, location tracking for quick, accurate info on Pakistan SIM owners quickly with PAK SERVICES.",
    keywords: [
        "pakistan sim verification",
        "pakistan mobile number verification",
        "pakistan sim lookup",
        "pakistan mobile number lookup",
        "verify sim ownership pakistan",
        "confirm sim registration pakistan",
        "check sim owner details pakistan",
        "pakistan sim card verification",
        "pakistan sim registration verification",
        "official pakistan sim verification",
        "secure pakistan sim verification",
        "authorized pakistan sim verification",
        "pakistani sim details",
        "pakistani mobile number details"
    ]
}

const App = () => {
    return (
        <>
            <div className="main1 text-white">
                <div className="container">

                    <div className="row">
                        <div className="col-md-6 mt-md-4 mt-0">
                            <LandingPage />
                        </div>

                        <div className="col-md-6 mt-md-0 mt-4 mt-sm-4 text-center">
                            <Form />
                        </div>
                    </div>

                    {/* <Banner300x250 url={"//drugstoredemuretake.com/078be6385401567a2171cc0096eedc4e/invoke.js"} /> */}
                    <Banner300x160 url={"drugstoredemuretake.com/4822d137643eef9722d12cf1c43c455e/invoke.js"} />
                </div>


            </div>
        </>
    );
};

export default App;
