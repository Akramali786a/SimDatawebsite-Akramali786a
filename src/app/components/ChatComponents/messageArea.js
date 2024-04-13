"use client";
import React, {useEffect, useRef, useState} from 'react';
import Message from "@/app/components/ChatComponents/Message";
import Footer from "@/app/components/ChatComponents/Footer";
import {useRouter} from "next/navigation";

function MessageArea(props) {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("")
    useEffect(() => {
        const storedMessages = localStorage.getItem("Messages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    },[]);

    useEffect(() => {
        const UserName = localStorage.getItem("name");
        if(!UserName){
            const askName = prompt("Please Write Your Name!");
            if(!askName){
                router.back();
            }else{
                localStorage.setItem("name",askName.trim());
                setName(askName.trim());
            }
        }else{
            setName(UserName);
        }
    }, []);

    const pref = useRef(null)
    return (
        <>
            <div ref={pref} className="messagesArea">
                {messages.map((message,index)=>(
                    <Message key={index} name={message.name} message={message.message} side={"incoming"}/>
                ))}
            </div>
            <Footer messages={messages} name={name} setMessages={setMessages} pref={pref} />
        </>
    );
}

export default MessageArea;