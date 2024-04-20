import React from "react";
import MessageArea from "../components/ChatComponents/messageArea";
import("../styles/ai.css");

export const metadata = {
    title: "Unlock the Power of AI Communication with PAK AI",
    description:
        "PAK AI revolutionizes communication with its cutting-edge AI chatbot. Experience seamless human-like interactions, enhanced customer support, and automated processes. Harness the power of AI to elevate your conversational experiences and drive business growth. Explore the future of AI communication with PAK AI.",
    keywords: [
        "AI chatbot",
        "Chatbot",
        "Artificial intelligence",
        "Natural language processing",
        "PAK AI",
        "AI-powered communication ",
    ],
};

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
