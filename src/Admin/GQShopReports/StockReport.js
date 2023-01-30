/** @format */

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line
import { getColors, getProducts } from "../apiAdmin";
import { isAuthenticated } from "../../auth";
// import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import DarkBG from "../AdminMenu/DarkBG";
import Navbar from "../AdminNavMenu/Navbar";
// eslint-disable-next-line
import CountUp from "react-countup";
// eslint-disable-next-line
import Chart from "react-apexcharts";

const StockReport = () => {
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [allProducts, setAllProducts] = useState([]);

	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);

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
				setAllProducts(
					data.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					),
				);
			}
		});
	};

	const gettingAllColors = () => {
		getColors(token).then((data) => {
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

	function sum_array(arr) {
		// store our final answer
		var sum = 0;

		// loop through entire array
		for (var i = 0; i < arr.length; i++) {
			// loop through each inner array
			for (var j = 0; j < arr[i].length; j++) {
				// add this number to the current final sum
				sum += arr[i][j];
			}
		}

		return sum;
	}

	const productsWithNoVariables =
		allProducts && allProducts.filter((i) => i.addVariables === false);

	const productsWithVariables =
		allProducts &&
		allProducts
			.filter((i) => i.addVariables === true)
			.map((iii) => iii.productAttributes);

	const overallStockLevel = () => {
		var QtyNoVariables =
			productsWithNoVariables &&
			productsWithNoVariables
				.map((iii) => (Number(iii.quantity) > 0 ? Number(iii.quantity) : 0))
				.reduce((a, b) => a + b, 0);

		var QtyWithVariables = productsWithVariables.map((iii) =>
			iii.map((iiii) =>
				Number(iiii.quantity) > 0 ? Number(iiii.quantity) : 0,
			),
		);

		return Number(QtyNoVariables) + Number(sum_array(QtyWithVariables));
	};

	// console.log(overallStockLevel(), "Qty");

	const overallStockWorth = () => {
		var QtyNoVariables =
			productsWithNoVariables &&
			productsWithNoVariables
				.map((iii) =>
					Number(iii.quantity) > 0
						? Number(iii.quantity) * Number(iii.priceAfterDiscount)
						: 0,
				)
				.reduce((a, b) => a + b, 0);

		var QtyWithVariables = productsWithVariables.map((iii) =>
			iii.map((iiii) =>
				Number(iiii.quantity) > 0
					? Number(iiii.quantity) * Number(iiii.priceAfterDiscount)
					: 0,
			),
		);

		return Number(QtyNoVariables) + Number(sum_array(QtyWithVariables));
	};

	const overallStockCost = () => {
		var QtyNoVariables =
			productsWithNoVariables &&
			productsWithNoVariables
				.map((iii) =>
					Number(iii.quantity) > 0
						? Number(iii.quantity) * Number(iii.MSRP)
						: 0,
				)
				.reduce((a, b) => a + b, 0);

		var QtyWithVariables = productsWithVariables.map((iii) =>
			iii.map((iiii) =>
				Number(iiii.quantity) > 0
					? Number(iiii.quantity) * Number(iiii.MSRP)
					: 0,
			),
		);

		return Number(QtyNoVariables) + Number(sum_array(QtyWithVariables));
	};

	const modifyingInventoryTable = () => {
		let modifiedArray = allProducts.map((i) => {
			return {
				productId: i._id,
				productName: i.productName,
				productName_Arabic: i.productName_Arabic,
				productPrice: i.priceAfterDiscount,
				productQty: i.addVariables
					? i.productAttributes
							.map((iii) => iii.quantity)
							.reduce((a, b) => a + b, 0)
					: i.quantity,
				productImage: i.thumbnailImage,
				category: i.category,
				productSKU: i.productSKU,
				addedBy: i.addedByEmployee,
				createdAt: i.createdAt,
				addVariables: i.addVariables,
				totalStockWorth: i.addVariables
					? i.productAttributes
							.map(
								(iii) => Number(iii.quantity) * Number(iii.priceAfterDiscount),
							)
							.reduce((a, b) => a + b, 0)
					: Number(i.quantity) * Number(i.priceAfterDiscount),
				productAttributes: i.productAttributes,
			};
		});

		return modifiedArray;
	};

	var TotalStockByCategory = [];
	modifyingInventoryTable() &&
		modifyingInventoryTable().reduce(function (res, value) {
			if (!res[value.category.categoryName]) {
				res[value.category.categoryName] = {
					category: value.category.categoryName.toUpperCase(),
					productQty: 0,
					totalStockWorth: 0,
				};
				TotalStockByCategory.push(res[value.category.categoryName]);
			}
			res[value.category.categoryName].productQty += Number(value.productQty);
			res[value.category.categoryName].totalStockWorth += Number(
				value.totalStockWorth,
			);

			return res;
		}, {});

	var donutChart1 = {
		series: TotalStockByCategory.map((i) => {
			return i.productQty;
		}),
		labels: TotalStockByCategory.map((i) => i.category),
		title: {
			text: "Product Categories By Total Stock On Hand",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		colors: [
			"#004589",
			"#F7B844",
			"#ADD8C7",
			"#EC3C65",
			"#CDD7B6",
			"#C1F666",
			"#D43F97",
			"#1E5D8C",
			"#421243",
			"#7F94B0",
			"#EF6537",
			"#C0ADDB",
			"#00b1b1",
			"#c4ffff",
			"#ffb1d8",
			"#897680",
		],

		legend: {
			show: true,
			position: "top",
		},
	};

	var donutChart2 = {
		series: TotalStockByCategory.map((i) => {
			return i.totalStockWorth;
		}),
		labels: TotalStockByCategory.map((i) => i.category),
		title: {
			text: "Product Categories By Total Stock Worth (L.E.)",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		colors: [
			"#004589",
			"#F7B844",
			"#ADD8C7",
			"#EC3C65",
			"#CDD7B6",
			"#C1F666",
			"#D43F97",
			"#1E5D8C",
			"#421243",
			"#7F94B0",
			"#EF6537",
			"#C0ADDB",
			"#00b1b1",
			"#c4ffff",
			"#ffb1d8",
			"#897680",
		],

		legend: {
			show: true,
			position: "top",
		},
	};

	function sortTopProductByQty(a, b) {
		const TotalAppointmentsA = a.productQty;
		const TotalAppointmentsB = b.productQty;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	const modifyingInventorySkusTable = () => {
		let modifiedArray = allProducts.map((i) => {
			return i.productAttributes.map((ii) => {
				return {
					productName: i.productName,
					productSKU: ii.SubSKU,
					productQty: ii.quantity,
					productImage: ii.productImages[0],
					productColor: allColors[
						allColors.map((iii) => iii.hexa).indexOf(ii.color)
					]
						? allColors[allColors.map((iii) => iii.hexa).indexOf(ii.color)]
								.color
						: ii.color,
					productSize: ii.size,
					createdAt: i.createdAt,
					totalStockWorth: Number(ii.quantity) * Number(ii.priceAfterDiscount),
				};
			});
		});

		return modifiedArray;
	};

	var destructingNestedArray = [];
	modifyingInventorySkusTable() &&
		modifyingInventorySkusTable().map((i) =>
			i.map((ii) => destructingNestedArray.push(ii)),
		);

	destructingNestedArray && destructingNestedArray.sort(sortTopProductByQty);

	console.log(
		modifyingInventorySkusTable().map((i) => i.map((ii) => ii.productSKU)),
	);

	console.log(destructingNestedArray, "destructingNestedArray");
	return (
		<StockReportWrapper show={collapsed}>
			{user.userRole === "Order Taker" ||
			user.userRole === "Operations" ||
			user.userRole === "offlineStore" ? (
				<Redirect to='/admin/offline-order-taking' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='StockReport'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='StockReport' pageScrolled={pageScrolled} />

					<div className='row mx-4 my-5'>
						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#f1416c" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										Overall Products Count
									</h5>
									<CountUp
										style={{ color: "white" }}
										duration='3'
										delay={1}
										end={allProducts.length}
										separator=','
									/>
									<span
										style={{
											color: "white",
											marginLeft: "5px",
											fontSize: "1.2rem",
										}}>
										Products
									</span>
								</div>
							</div>
						</div>

						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#009ef7" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										Overall Inventory Level
									</h5>
									<CountUp
										style={{ color: "white" }}
										duration='3'
										delay={1}
										end={overallStockLevel()}
										separator=','
									/>
									<span
										style={{
											color: "white",
											marginLeft: "5px",
											fontSize: "1.2rem",
										}}>
										Items
									</span>
								</div>
							</div>
						</div>

						{isAuthenticated().user.userRole === "Order Taker" ? null : (
							<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "darkgreen" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Inventory Cost (EGP)
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration='3'
											delay={1}
											end={overallStockCost()}
											separator=','
										/>
										<span
											style={{
												color: "white",
												marginLeft: "5px",
												fontSize: "1.2rem",
											}}>
											EGY Pounds
										</span>
									</div>
								</div>
							</div>
						)}

						{isAuthenticated().user.userRole === "Order Taker" ? null : (
							<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#50cd89" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Stock Worth (EGP)
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration='3'
											delay={1}
											end={overallStockWorth()}
											separator=','
										/>
										<span
											style={{
												color: "white",
												marginLeft: "5px",
												fontSize: "1.2rem",
											}}>
											EGY Pounds
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className='row mx-3 my-5'>
						<div className='col-md-6 mx-auto'>
							<Chart
								title={donutChart1.title}
								options={donutChart1}
								series={donutChart1.series}
								type='donut'
							/>
						</div>
						<div className='col-md-6 mx-auto'>
							<Chart
								title={donutChart2.title}
								options={donutChart2}
								series={donutChart2.series}
								type='donut'
							/>
						</div>
					</div>

					<div className='col-md-12  mx-auto mb-5'>
						<div className='card'>
							<h5
								style={{
									textAlign: "center",
									marginTop: "10px",
									fontWeight: "bold",
								}}>
								G&Q Shop Inventory Report Grouped By Product Name
							</h5>
							<div className='col-md-10 mx-auto'>
								<hr />
							</div>

							<div className='tableData'>
								<table
									className='table table-bordered table-md-responsive table-hover '
									style={{ fontSize: "0.75rem", overflowX: "auto" }}>
									<thead className=''>
										<tr
											style={{
												fontSize: "0.75rem",
												textTransform: "capitalize",
												textAlign: "center",
												backgroundColor: "#009ef7",
												color: "wheat",
											}}>
											<th scope='col'>Item #</th>
											<th scope='col'>Product Name</th>
											<th scope='col'>Product Main SKU</th>
											<th scope='col'>Product Total Price</th>
											<th scope='col'>Stock Onhand</th>
											<th scope='col'>Product Creation Date</th>
											<th scope='col'>Product Created By</th>
											<th scope='col'>Product Image</th>
										</tr>
									</thead>
									<tbody
										className='my-auto'
										style={{
											fontSize: "0.75rem",
											textTransform: "capitalize",
											fontWeight: "bolder",
										}}>
										{modifyingInventoryTable().map((s, i) => {
											return (
												<tr key={i} className=''>
													<td className='my-auto'>{i + 1}</td>

													<td>{s.productName}</td>
													<td>{s.productSKU}</td>
													<td>{s.totalStockWorth}</td>
													<td
														style={{
															background: s.productQty <= 0 ? "#fdd0d0" : "",
														}}>
														{s.productQty}
													</td>
													<td>{new Date(s.createdAt).toDateString()}</td>
													<td>{s.addedBy.name}</td>
													<td style={{ width: "15%", textAlign: "center" }}>
														<img
															width='40%'
															height='40%'
															style={{ marginLeft: "20px" }}
															src={
																s.productImage[0].images[0]
																	? s.productImage[0].images[0].url
																	: null
															}
															alt={s.productName}
														/>
													</td>

													{/* <td>{Invoice(s)}</td> */}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className='col-md-12  mx-auto mb-5'>
						<div className='card'>
							<h5
								style={{
									textAlign: "center",
									marginTop: "10px",
									fontWeight: "bold",
								}}>
								G&Q Shop Inventory Report Grouped By Product Name And SKU's
							</h5>
							<div className='col-md-10 mx-auto'>
								<hr />
							</div>

							<div className='tableData'>
								<table
									className='table table-bordered table-md-responsive table-hover '
									style={{ fontSize: "0.75rem", overflowX: "auto" }}>
									<thead className=''>
										<tr
											style={{
												fontSize: "0.75rem",
												textTransform: "capitalize",
												textAlign: "center",
												backgroundColor: "#009ef7",
												color: "wheat",
											}}>
											<th scope='col'>Item #</th>
											<th scope='col'>Product Name</th>
											<th scope='col'>Product SKU </th>
											<th scope='col'>Product Total Price</th>
											<th scope='col'>Stock Onhand</th>
											<th scope='col'>Color</th>
											<th scope='col'>Size</th>
											<th scope='col'>Product Creation Date</th>
											{/* <th scope='col'>Product Image</th> */}
										</tr>
									</thead>
									<tbody
										className='my-auto'
										style={{
											fontSize: "0.75rem",
											textTransform: "capitalize",
											fontWeight: "bolder",
										}}>
										{destructingNestedArray &&
											destructingNestedArray.map((s, i) => {
												return (
													<tr key={i} className=''>
														<td className='my-auto'>{i + 1}</td>

														<td>{s.productName}</td>
														<td>{s.productSKU}</td>
														<td>{s.totalStockWorth}</td>
														<td
															style={{
																background: s.productQty <= 0 ? "#fdd0d0" : "",
															}}>
															{s.productQty}
														</td>
														<td>{s.productColor}</td>
														<td>{s.productSize}</td>
														<td>{new Date(s.createdAt).toDateString()}</td>
														{/* <td style={{ width: "15%", textAlign: "center" }}>
                                                            <img
                                                                width='40%'
                                                                height='40%'
                                                                style={{ marginLeft: "20px" }}
                                                                src={
                                                                    s.productImage ? s.productImage.url : null
                                                                }
                                                                alt={s.productName}
                                                            />
                                                        </td> */}
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</StockReportWrapper>
	);
};

export default StockReport;

const StockReportWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		/* grid-template-columns: 16% 84%; */
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15% 85%"};

		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}

	.filterItem {
		color: darkgrey;
		font-weight: bold;
		padding: 5px;
		transition: 0.3s;
	}

	.filterItem:hover {
		background: #f5f8fa;
		color: #009ef7;
		font-weight: bold;
		padding: 5px;
		border-radius: 3px;
		transition: 0.3s;
		cursor: pointer;
	}

	.tableData {
		overflow-x: auto;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 50px;
		margin-left: 50px;
		.table > tbody > tr > td {
			vertical-align: middle !important;
		}
		@media (max-width: 1100px) {
			font-size: 0.5rem;
			/* margin-right: 5px;
		margin-left: 5px; */
		}
	}
`;
