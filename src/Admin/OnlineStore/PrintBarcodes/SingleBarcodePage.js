/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminMenu from "../../AdminMenu/AdminMenu";
import Navbar from "../../AdminNavMenu/Navbar";
import DarkBG from "../../AdminMenu/DarkBG";
import Barcode from "react-barcode";
// import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const SingleBarcodePage = (props) => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll, { passive: true });
		if (window.pageYOffset > 0) {
			setPageScrolled(true);
		} else {
			setPageScrolled(false);
		}
		return () => window.removeEventListener("scroll", onScroll);
	}, [offset]);

	const exportPDF = () => {
		const input = document.getElementById("content");
		html2canvas(input, {
			logging: true,
			letterRendering: 1,
			useCORS: true,
		}).then((canvas) => {
			const imgWidth = 250;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const imgDate = canvas.toDataURL("img/png");
			const pdf = new jsPDF("p", "mm", "a4");
			pdf.addImage(imgDate, "PNG", 0, 0, imgWidth, imgHeight);
			pdf.save(`Barcode_${props.match.params.sku}`);
		});
	};

	return (
		<SingleBarcodePageWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='PrintBarcodes'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='PrintBarcodes' pageScrolled={pageScrolled} />
					<div className='col-md-9 mx-auto mt-5'>
						<Link
							to='/admin/print-barcodes'
							style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
							Back to SKUs' Barcode Page
						</Link>
						<div className='ml-2 my-5 '>
							<div className='mb-2'>
								SKU: {props.match.params.sku.toUpperCase()}
							</div>
							<div>
								<button className='btn btn-primary' onClick={() => exportPDF()}>
									Print SKU Barcode
								</button>
							</div>
							<div className='content' id='content'>
								<Barcode value={props.match.params.sku.toUpperCase()} />
							</div>
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</SingleBarcodePageWrapper>
	);
};

export default SingleBarcodePage;

const SingleBarcodePageWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 100px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
		margin: auto;
	}

	@media (max-width: 1750px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
		}
	}

	@media (max-width: 1400px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 12% 88%;
			margin: auto;
		}
	}

	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "0% 100%")};
			margin: auto;
		}
		h3 {
			margin-top: 60px !important;
		}

		.ant-select {
			width: 100% !important;
		}
	}
`;
