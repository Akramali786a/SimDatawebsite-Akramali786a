"use client";
import React from 'react';

function ActionBtns(props) {

    const handleCopy = (event) =>{
        console.log(event);
    }

    return (
        <>
            <div className="copybtn">
                <button onClick={(e)=>handleCopy(e)} className={"btn btn-sm mx-2 btn-outline-info"}>Copy Data</button>
                <button className={"btn btn-sm btn-outline-primary"}>Share On WA</button>
            </div>
        </>
    );
}

export default ActionBtns;