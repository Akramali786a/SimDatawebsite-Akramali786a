"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import("@/app/styles/index.css");

const Page = () => {
    const [option, setOption] = useState([]);

    useEffect(() => {
        const getOptions = async () => {
            try {
                const req = await fetch("/api/options", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await req.json();

                console.log(data);

                // Replace old data with new data
                if (data.status === "success") {
                    setOption(data.data);
                    
                }
            } catch (error) {
                console.log(`Error : ${error.message}`);
            }
        };

        getOptions();
    }, []);

    const navigation = useRouter();

    const [num, setnum] = useState("");

    const handlesubmit = () => {
        const number = num.trim();

        if (number === "") {
            alert("Please Enter Valid Number..");
            return;
        }

        navigation.push("/search/" + number);
    };

    const handleSelectChange = (event) => {
        setnum(event.target.value);
    };

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={(r) => r.preventDefault()}>
                    <div className="field">
                        <select
                            value={"SELECT NUMBER"}
                            onChange={handleSelectChange}
                        >
                            <option>Numbers</option>
                            {option.length > 0 &&
                                option.map((data, index) => (
                                    <option key={index} value={data.MOBILE}>
                                        {data.MOBILE}
                                    </option>
                                ))}
                        </select>
                        <input
                            type="number"
                            name="num"
                            value={num}
                            onChange={(r) => setnum(r.target.value)}
                            id="num"
                            placeholder="0314XXXXXXX"
                            maxLength={11}
                        />
                    </div>
                    <button onClick={handlesubmit}>Search</button>
                </form>
            </div>
        </div>
    );
};

export default Page;
