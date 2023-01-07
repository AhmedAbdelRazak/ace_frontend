/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line
import { isAuthenticated } from "../../../auth";
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";
import { getColors, getProducts } from "../../apiAdmin";
import LogoImage from "../../../GeneralImages/ace-logo.png";
import ReactExport from "react-export-excel";
import { Link } from "react-router-dom";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Inventory = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	// eslint-disable-next-line
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	// eslint-disable-next-line
	const [allProducts, setAllProducts] = useState([]);
	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);
	const [allSubSKUs, setAllSubSKUs] = useState([]);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

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
					allAceProducts.map((i) =>
						i.productAttributes.map((ii) => {
							return {
								SubSKU: ii.SubSKU,
								name: i.productName,
							};
						}),
					);

				var mergedSubSKUs = [].concat.apply([], allAceSKUs);

				setAllSubSKUs(mergedSubSKUs);
			}
		});
	};

	const gettingAllColors = () => {
		getColors().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();
		gettingAllColors();

		// eslint-disable-next-line
	}, []);

	// console.log(allProducts, "allProducts");
	// console.log(allCategories, "allCategories");
	console.log(allSubSKUs, "allSubSKUs");

	const DownloadExcel = () => {
		return (
			<ExcelFile
				filename={`Ace_Inventory ${new Date().toLocaleString("en-US", {
					timeZone: "Africa/Cairo",
				})}`}
				element={
					<Link
						className='btn btn-danger mr-5 ml-2'
						// onClick={() => exportPDF()}
						to='#'>
						Download Report (Excel)
					</Link>
				}>
				<ExcelSheet data={allSubSKUs} name='Ace_Inventory'>
					<ExcelColumn label='Description' value='name' />
					<ExcelColumn label='SKU' value='SubSKU' />
				</ExcelSheet>
			</ExcelFile>
		);
	};

	return (
		<InventoryWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AceInventory'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<div className='col-md-12 '>
						<div className='text-center mx-auto'>
							<h3 className='text-center' style={{ fontWeight: "bold" }}>
								<img
									src={LogoImage}
									alt='GQ Logo'
									style={{
										width: "10%",
										padding: "0px",
										objectFit: "cover",
									}}
								/>
								Inventory Report
							</h3>
							<div className='mt-4'>{DownloadExcel()}</div>
						</div>
					</div>
				</div>
			</div>
		</InventoryWrapper>
	);
};

export default Inventory;

const InventoryWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 100px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
		margin: auto;
	}

	.productsOnRight {
		.grid-container2 {
			display: grid;
			grid-template-columns: 20% 20% 20% 20% 20%;
			margin: auto;
		}
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
