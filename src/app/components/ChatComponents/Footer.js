"use client";
import React, {useEffect, useRef, useState} from 'react';


function Footer(props) {
    const {messages,setMessages,name} = props;
    const [message, setMessage] = useState("")
    const {pref} = props;
    const topScroller = useRef(null)



    const handleMessageSend = () => {

        if(message.trim() === ""){
            return
        }

        const newMessage = {
            name: name,
            message: message.trim()
        };

        // Update state by adding the new message to the existing messages
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // Store the updated array of messages back into localStorage
        localStorage.setItem("Messages", JSON.stringify([...messages, newMessage]));

        setMessage("");
        setTimeout(()=>handleScrollClick(),500)
    }

    const handleScrollClick = ()=>{
        pref.current.scrollTop = pref.current.scrollHeight;
    }


    useEffect(()=>{

        const handleScroll = ()=>{
            const isnotScrolledToBottom = pref.current.scrollHeight - pref.current.scrollTop > pref.current.clientHeight;

            if (isnotScrolledToBottom){
                topScroller.current.classList.add("show");
            }else{
                topScroller.current.classList.remove("show");
            }
        }

        pref.current.addEventListener("scroll",handleScroll)

    })

    return (
        <div className={"sendArea"}>
            <div ref={topScroller} onClick={handleScrollClick} className="topScroller">
                <box-icon color={"#f2f2f2"} name='down-arrow-alt'></box-icon>
            </div>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={"What's on your mind? Type your question here."} />
            <div className="sendDiv" onClick={handleMessageSend}>
                <box-icon name='send' color={"#7474bf"} ></box-icon>
            </div>
        </div>
    );
}

export default Footer;