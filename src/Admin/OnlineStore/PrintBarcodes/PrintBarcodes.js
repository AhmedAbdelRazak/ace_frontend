/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line
import { isAuthenticated } from "../../../auth";
import AdminMenu from "../../AdminMenu/AdminMenu";
import Navbar from "../../AdminNavMenu/Navbar";
import DarkBG from "../../AdminMenu/DarkBG";
import { getProducts } from "../../apiAdmin";
import Barcode from "react-barcode";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const PrintBarcodes = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	// eslint-disable-next-line
	const [allProducts, setAllProducts] = useState([]);
	const [allSubSKUs, setAllSubSKUs] = useState([]);

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

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var allAceProducts = data.filter(
					(i) => i.activeProduct === true && i.storeName.storeName === "ace",
				);
				setAllProducts(allAceProducts);

				var allAceSKUs =
					allAceProducts &&
					allAceProducts.map((i) => i.productAttributes.map((ii) => ii.SubSKU));

				var mergedSubSKUs = [].concat.apply([], allAceSKUs);
				let uniqueMergedSubSKUs = [...new Set(mergedSubSKUs)];

				setAllSubSKUs(uniqueMergedSubSKUs);
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	return (
		<PrintBarcodesWrapper show={AdminMenuStatus}>
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
						{allSubSKUs &&
							allSubSKUs.map((s, i) => {
								return (
									<div key={i} className='ml-2 my-5 '>
										<div className='mb-2'>SKU: {s.toUpperCase()}</div>
										<div>
											<Link
												to={`/admin/single-barcode/${s}`}
												onClick={() =>
													window.scrollTo({ top: 0, behavior: "smooth" })
												}
												className='btn btn-primary'>
												Print SKU Barcode
											</Link>
										</div>
										<div className='content' id='content'>
											<Barcode value={s.toUpperCase()} />
										</div>
										<br />
										<br />
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</PrintBarcodesWrapper>
	);
};

export default PrintBarcodes;

const PrintBarcodesWrapper = styled.div`
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
