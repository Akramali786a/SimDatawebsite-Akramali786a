import Form from "./components/form";

import("./styles/app.css");
import LandingPage from "./components/landingPage";

export const metadata = {
    title:"Pak Data Instant Pakistani Mobile Number Lookup (Government Authorized)",
    description : "Easily discover details of Pakistani numbers with Sim Owner Details online. CNIC data, location tracking for quick, accurate info on Pakistan SIM owners quickly with PAK SERVICES.",
    keywords:[
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
                </div>
            </div>
        </>
    );
};

export default App;
