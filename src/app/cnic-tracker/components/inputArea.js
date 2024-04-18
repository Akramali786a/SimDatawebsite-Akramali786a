"use client"
import React, {useState} from 'react';
import Locate from "./Locate";

import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import DetailsArea from "@/app/cnic-tracker/components/DetailsArea";

function InputArea(props) {
	const [cnic, setCnic] = useState("");
	const [dataToPass, setDataToPass] = useState([]);
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

	const handleClick = () =>{
		const value = cnic.trim();
		let dataObject = {};

		const gender = value.length === 13  ? value.slice(-1) % 2 === 0 ? "Female" : "Male" : null;

		const data = Locate(cnic);

		const dataArray = data.split(",");


		if(dataArray.length >=4 ){
			dataObject.Province = dataArray[0] !== "" ? dataArray[0] : "Not Found"
			dataObject.Division = dataArray[1] !== "" ? dataArray[1] : "Not Found"
			dataObject.District = dataArray[2] !== "" ? dataArray[2] : "Not Found"
			dataObject.Tehsil = dataArray[3] !== "" ? dataArray[3] : "Not Found";
			dataObject.Council = dataArray[4] !== "" ? dataArray[4] : "Not Found"
			dataObject.Gender = gender !== "" ? gender : "Not Available"
		}

		setDataToPass(dataObject);

	}


	return (
		<>
			<div className="table overflow-auto">

			<div className="searchArea">
				<h3>Cnic Tracker</h3>
				<input type="number" value={cnic} onKeyUp={ handleClick} onChange={(e)=>{setCnic(e.target.value); }} placeholder={"CNIC Number 3840100000000"} />

			</div>

			</div>


			<DetailsArea data={dataToPass} />

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

export default InputArea;