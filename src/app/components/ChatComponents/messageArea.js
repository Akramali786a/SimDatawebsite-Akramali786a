"use client";
import React, {useRef} from 'react';
import Message from "@/app/components/ChatComponents/Message";
import Footer from "@/app/components/ChatComponents/Footer";

function MessageArea(props) {
const pref = useRef(null)
    return (
        <>
            <div ref={pref} className="messagesArea">
                <Message/>
                <Message name={"Faisal"} side={"outgoing"}  />
                <Message name={"Developer"} side={"incoming"}  />
                <Message name={"Faisal"}  side={"outgoing"}  />
                <Message name={"Developer"} side={"incoming"}  />
                <Message name={"Faisal"} side={"outgoing"}  />
                <Message name={"Developer"} side={"incoming"}  />
            </div>
            <Footer pref={pref} />
        </>
    );
}

export default MessageArea;