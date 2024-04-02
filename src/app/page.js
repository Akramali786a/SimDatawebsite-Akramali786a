"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import("@/app/styles/index.css");

const Page = () => {

  const navigation = useRouter();
  
    const [num, setnum] = useState("");

    const handlesubmit = () => {

      const number = num.trim();

    navigation.push("/search/"+number);

    };

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={(r) => r.preventDefault()}>
                    <div className="field">
                        <input
                            type="number"
                            name="num"
                            value={num}
                            onChange={(r) => setnum(r.target.value)}
                            id="num"
                            placeholder="Please Enter The Mobile No"
                        />
                    </div>
                    <button onClick={handlesubmit}>Search</button>
                </form>
            </div>
        </div>
    );
};

export default Page;
