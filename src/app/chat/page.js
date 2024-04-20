import React from 'react';
import MessageArea from "../components/ChatComponents/messageArea";


import ("../styles/chat.css");
function Page(props) {

    return (
        <>
            <section className="hero">
                <MessageArea/>

            </section>
        </>
    );
}

export default Page;