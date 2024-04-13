"use client";
import React, {useEffect, useRef} from 'react';

function Footer(props) {

    const {pref} = props;
    const topScroller = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            // Check if pref is not fully scrolled by comparing its offsetTop to the scroll position
            if (pref.current && pref.current.offsetTop > window.scrollY) {
                topScroller.current.classList.add('show');
            } else {
                topScroller.current.classList.remove('show');
            }
        };

        // Add scroll event listener to window
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={"sendArea"}>
            <div ref={topScroller} className="topScroller">
                <box-icon color={"#f2f2f2"} name='up-arrow-alt'></box-icon>
            </div>
            <input type="text" placeholder={"What's on your mind? Type your question here."} />
            <div className="sendDiv">
                <box-icon name='send' color={"#7474bf"} ></box-icon>
            </div>
        </div>
    );
}

export default Footer;