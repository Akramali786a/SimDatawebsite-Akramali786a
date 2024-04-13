"use client"
import React from 'react';

function Message(props) {
    const {side,name,message} = props;

    const existingDate = new Date(1712998595674);

    return (
        <>
            <div className={`message ${side}`}>
                <span>{name}</span>
                <p className={"mb-0"}>{message}</p>
                <code>{existingDate.toTimeString()}</code>
            </div>
        </>
    );
}


export default Message;