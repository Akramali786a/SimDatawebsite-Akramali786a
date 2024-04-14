import React from "react";
import MessageArea from "@/app/components/ChatComponents/messageArea";
import Footer from "@/app/components/ChatComponents/Footer";
import Message from "@/app/components/ChatComponents/Message";

import("../styles/ai.css");
function Page(props) {
    return (
        <>
            <section className="hero">
                <MessageArea />
            </section>
        </>
    );
}

export default Page;
