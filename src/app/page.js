import Form from "./components/form";

import("./styles/app.css");
import LandingPage from "./components/landingPage";

const App = () => {
    return (
        <>
            <div id="hero" className="main1 min-min-vh-100 text-white">
                <div className="container z-1">
                    <div className="row">
                        <div className="col-md-6">
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
