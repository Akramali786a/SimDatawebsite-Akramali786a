"use client";
import React from 'react';
import {toast,ToastContainer} from "react-toastify";

function ActionBtns(props) {
    const {data:dataToCopy} = props;

    const showToast = (type, msg) => {
        toast(msg, {
            type: type,
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: "dark",
        });
    };

    const handleCopy = async (event) => {
        try {
            // Serialize the object into a JSON string
            const dataToCopyJson = JSON.stringify(dataToCopy);

            // Parse the JSON string into an object
            const data = JSON.parse(dataToCopyJson);

            // Format the data
            const formattedData = Object.entries(data)
                .map(([key, value]) => `${key.toUpperCase()}:${value}`)
                .join('\n');

            // Write the formatted data to the clipboard
            await navigator.clipboard.writeText(formattedData);

            console.log("Data copied to clipboard successfully!");
            showToast("info","Data copied to clipboard successfully!")
        } catch (err) {
            showToast("error","Unable to copy data to clipboard")
            console.error("Unable to copy data to clipboard:", err);
        }
    }

    const handleShare = async () => {
        try {
            // Check if the Web Share API is available
            if (navigator.share) {
                // Serialize the object into a JSON string
                const dataToShareJson = JSON.stringify(dataToCopy);

                // Parse the JSON string into an object
                const data = JSON.parse(dataToShareJson);

                // Format the data
                const formattedData = Object.entries(data)
                    .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
                    .join('\n');

                // Share the formatted data
                await navigator.share({
                    text: formattedData
                });

                console.log("Data shared successfully!");
            } else {
                console.error("Web Share API not supported.");
                showToast("error","Web Share API not supported.")
            }
        } catch (err) {
            console.error("Unable to share data:", err);
        }
    };



    return (
        <>
            <div style={{cursor:"pointer",right:10}} className="copybtn d-flex align-items-center position-absolute">
                <box-icon size={"sm"} onClick={handleCopy} class={"mx-4"} color={"#0fa0e8"} name='copy-alt'></box-icon>
                <box-icon size={"sm"} color={"#0fa0e8"} onClick={handleShare} name='share-alt'></box-icon>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme="dark"
                limit={1}
            />
        </>
    );
}

export default ActionBtns;