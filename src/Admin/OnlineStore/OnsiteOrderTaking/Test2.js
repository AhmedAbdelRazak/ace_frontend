/** @format */

import React from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import jsPDF from "jspdf";

const Test2 = () => {
	const exportPDF = () => {
		const input = document.getElementById("content");
		html2canvas(input, {
			logging: true,
			letterRendering: 1,
			useCORS: true,
		}).then((canvas) => {
			const imgWidth = 945;
			const imgHeight = 2008;
			const imgDate = canvas.toDataURL("img/png");
			const pdf = new jsPDF("p", "px", [945, 2008]);
			pdf.addImage(imgDate, "PNG", 0, 0, imgWidth, imgHeight);
			pdf.save("invoice");
		});
	};
	return (
		<>
			<Test2Wrapper id='content'>
				<div className='hamada'>Hi There</div>
				<img
					src='https://res.cloudinary.com/infiniteapps/image/upload/v1670932538/GQ_B2B/1670932537573.jpg'
					alt='logo'
					style={{
						width: "100%",
						// border: "1px black solid",
						padding: "0px",
					}}
				/>
			</Test2Wrapper>
			<button onClick={() => exportPDF()}></button>
		</>
	);
};

export default Test2;

const Test2Wrapper = styled.div`
	width: 925px !important;
	height: 2008px !important;

	.hamada {
		font-size: 5rem;
		font-weight: bold;
	}

	/* background: black; */
`;
