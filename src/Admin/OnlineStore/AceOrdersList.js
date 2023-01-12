/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import CountUp from "react-countup";
import {
	aceOrders,
	getProducts,
	listOfOrdersFiltered,
	// eslint-disable-next-line
	listOrders,
	removeOrder,
} from "../apiAdmin";
import { Link } from "react-router-dom";
import DarkBG from "../AdminMenu/DarkBG";
import { toast } from "react-toastify";
import { GroupOutlined } from "@ant-design/icons";
// import FiltersModal from "./FiltersModal";
import Pagination from "./Pagination";
import OrdersCountCards from "../CardsBreakDown/OrdersCountCards";
import OrdersQtyCard from "../CardsBreakDown/OrdersQtyCard";
import OrdersTotalAmountCards from "../CardsBreakDown/OrdersTotalAmountCards";
import ReactExport from "react-export-excel";
import ReactGA from "react-ga4";

// import ExcelToJson from "./ExcelToJson";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const isActive = (clickedLink, sureClickedLink) => {
	if (clickedLink === sureClickedLink) {
		return {
			// color: "white !important",
			background: "#f5f8fa",
			color: " #009ef7",
			fontWeight: "bold",
			padding: "5px",
			borderRadius: "5px",
			// textDecoration: "underline",
		};
	} else {
		return {
			color: "darkgrey",
			fontWeight: "bold",
			padding: "5px",
			transition: "0.3s",
		};
	}
};

const AceOrdersList = () => {
	const [allOrders, setAllOrders] = useState([]);
	// eslint-disable-next-line
	const [allOrdersFiltered, setAllOrdersFiltered] = useState([]);
	const [q, setQ] = useState("");
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	// eslint-disable-next-line
	const [modalVisible, setModalVisible] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	// eslint-disable-next-line
	const [selectedFilter, setSelectedFilter] = useState("SelectAll");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(80);
	const [allProducts, setAllProducts] = useState([]);
	const [day1, setDay1] = useState(
		new Date(new Date().setDate(new Date().getDate() + 3)),
	);
	const [day2, setDay2] = useState(
		new Date(new Date().setDate(new Date().getDate() - 45)),
	);
	const [chosenCard, setChosenCard] = useState("OrdersCountCard");

	const [excelDataSet, setExcelDataSet] = useState([]);

	const { user, token } = isAuthenticated();

	// eslint-disable-next-line
	var today = new Date();
	var yesterday = new Date();
	var last7Days = new Date();
	var last90Days = new Date();

	yesterday.setDate(yesterday.getDate() - 1);
	last7Days.setDate(last7Days.getDate() - 7);
	last90Days.setDate(last90Days.getDate() - 200);

	const loadOrders = () => {
		function sortOrdersAscendingly(a, b) {
			const TotalAppointmentsA = a.orderCreationDate;
			const TotalAppointmentsB = b.orderCreationDate;
			const TotalAppointmentsC = a.createdAt;
			const TotalAppointmentsD = b.createdAt;
			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			} else if (TotalAppointmentsC < TotalAppointmentsD) {
				comparison = 1;
			} else if (TotalAppointmentsC > TotalAppointmentsD) {
				comparison = -1;
			}
			return comparison;
		}

		aceOrders(user._id, token, day1, day2).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				if (selectedFilter === "SelectAll") {
					setAllOrders(data.sort(sortOrdersAscendingly));
				} else if (selectedFilter === "InProcessing") {
					setAllOrders(
						data
							.filter((i) => i.status === "In Processing")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.status === "In Processing")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "OnHold") {
					setAllOrders(
						data
							.filter((i) => i.status === "On Hold")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.status === "On Hold")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Shipped") {
					setAllOrders(
						data
							.filter((i) => i.status === "Shipped")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.status === "Shipped")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Delivered") {
					setAllOrders(
						data
							.filter((i) => i.status === "Delivered")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.status === "Delivered")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Cancelled") {
					setAllOrders(
						data
							.filter((i) => i.status === "Cancelled")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.status === "Cancelled")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "NoInvoice") {
					setAllOrders(
						data
							.filter((i) => i.invoiceNumber === "Not Added")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.invoiceNumber === "Not Added")
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Exchanged") {
					setAllOrders(
						data
							.filter(
								(i) =>
									i.status.includes("Exchange") ||
									i.status.includes("Exchanged"),
							)
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter(
								(i) =>
									i.status.includes("Exchange") ||
									i.status.includes("Exchanged"),
							)
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Return") {
					setAllOrders(
						data
							.filter(
								(i) =>
									i.status.includes("Return") || i.status.includes("Returned"),
							)
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter(
								(i) =>
									i.status.includes("Return") || i.status.includes("Returned"),
							)
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Today") {
					setAllOrders(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) ===
									new Date(today).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) ===
									new Date(today).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Yesterday") {
					setAllOrders(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) ===
									new Date(yesterday).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) ===
									new Date(yesterday).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
				} else if (selectedFilter === "Last7Days") {
					setAllOrders(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) >=
									new Date(last7Days).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter(
								(i) =>
									new Date(i.orderCreationDate).setHours(0, 0, 0, 0) >=
									new Date(last7Days).setHours(0, 0, 0, 0),
							)
							.sort(sortOrdersAscendingly),
					);
				} else {
					setAllOrders(data.sort(sortOrdersAscendingly));
					setExcelDataSet(data.sort(sortOrdersAscendingly));
				}
				setExcelDataSet(data.sort(sortOrdersAscendingly));
			}
		});
	};

	const loadOrdersFiltered = () => {
		listOfOrdersFiltered(user._id, token, 20).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllOrdersFiltered(data);
			}
		});
	};

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllProducts(data);
			}
		});
	};

	// console.log(allOrdersFiltered, "AllOrdersFiltered");
	useEffect(() => {
		loadOrders();
		loadOrdersFiltered();
		gettingAllProducts();
		// eslint-disable-next-line
	}, [selectedFilter, day1, day2]);

	const nonCancelledOrders =
		allOrders && allOrders.filter((i) => i.status !== "Cancelled");

	const overallQtyArray =
		nonCancelledOrders && nonCancelledOrders.map((i) => i.totalOrderQty);

	const ArrayOfQty = overallQtyArray.reduce((a, b) => a + b, 0);

	const overallAmountArray =
		nonCancelledOrders &&
		nonCancelledOrders.map((i) => i.totalAmountAfterDiscount);

	const ArrayOfAmount = overallAmountArray.reduce((a, b) => a + b, 0);

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.orderCreationDate).toLocaleDateString();
			return (
				row.customerDetails.phone.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.state.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.cityName.toString().toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.fullName.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.email.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.invoiceNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.OTNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.trackingNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.orderSource.toString().toLowerCase().indexOf(q) > -1 ||
				row.chosenShippingOption[0].carrierName
					.toString()
					.toLowerCase()
					.indexOf(q) > -1
			);
		});
	}

	const handleRemove = (orderId) => {
		if (window.confirm("Are You Sure You Want To Delete?")) {
			removeOrder(orderId, user._id, token)
				.then((res) => {
					toast.error(`Order "${res.data.name}" deleted`);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				})
				.catch((err) => console.log(err));
		}
	};

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	// eslint-disable-next-line
	const currentPosts =
		allOrders && allOrders.slice(indexOfFirstPost, indexOfLastPost);

	// eslint-disable-next-line
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const dataTable = () => {
		return (
			<div className='tableData'>
				<div className='mt-5 ml-2'>
					<Link className='btn btn-info' to='/admin/create-new-order'>
						Create New Order
					</Link>
				</div>
				<div className='mt-4'>{DownloadExcel()}</div>
				<div className=' mb-3 form-group mx-3 text-center'>
					<label
						className='mt-3 mx-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "black",
							borderRadius: "20px",
						}}>
						Search
					</label>
					<input
						className='p-2 my-5 '
						type='text'
						value={q}
						onChange={(e) => {
							setQ(e.target.value.toLowerCase());

							if (e.target.value.length > 0) {
								setPostsPerPage(allOrders.length + 2);
							} else {
								setPostsPerPage(80);
							}
						}}
						placeholder='Search By Client Phone, Client Name, Status Or Carrier'
						style={{ borderRadius: "20px", width: "50%" }}
					/>
				</div>

				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={allOrders.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
				<table
					className='table table-bordered table-md-responsive table-hover text-center'
					style={{ fontSize: "0.75rem" }}>
					<thead className='thead-light'>
						<tr>
							{/* <th scope='col'>Order #</th> */}
							<th scope='col'>Purchase Date</th>
							{/* <th scope='col'>Order #</th> */}
							<th scope='col'>INV #</th>
							<th scope='col'>Status</th>
							<th scope='col'>Name</th>
							<th scope='col'>Phone</th>
							<th scope='col'>Amount</th>
							<th scope='col'>Store</th>
							<th scope='col' style={{ width: "6%" }}>
								Taker
							</th>
							<th scope='col'>Governorate</th>
							{/* <th scope='col'>City</th> */}
							<th scope='col'>Tracking #</th>
							<th scope='col'>Quantity</th>
							<th scope='col' style={{ width: "8%" }}>
								Details
							</th>

							<th scope='col'>Shipping?</th>
							{user.userRole === "Admin Account" ? (
								<th scope='col'>Delete?</th>
							) : null}
						</tr>
					</thead>

					<tbody className='my-auto'>
						{search(currentPosts).map((s, i) => {
							const checkingWithLiveStock = (productId, SubSKU, OrderedQty) => {
								const pickedSub =
									allProducts &&
									allProducts.filter((iii) => iii._id === productId)[0];

								const GetSpecificSubSKU =
									pickedSub &&
									pickedSub.productAttributes &&
									pickedSub.productAttributes.filter(
										(iii) => iii.SubSKU === SubSKU,
									)[0];
								const QtyChecker =
									GetSpecificSubSKU && GetSpecificSubSKU.quantity < OrderedQty;

								return QtyChecker;
							};

							var stockCheckHelper = s.chosenProductQtyWithVariables.map(
								(iii) =>
									iii.map((iiii) =>
										checkingWithLiveStock(
											iiii.productId,
											iiii.SubSKU,
											iiii.OrderedQty,
										),
									),
							);
							var merged = [].concat.apply([], stockCheckHelper);
							var finalChecker =
								merged.indexOf(true) === -1 ? "Passed" : "Failed";
							return (
								<tr key={i} className=''>
									{s.orderCreationDate ? (
										<td style={{ width: "10%" }}>
											{new Date(s.orderCreationDate).toDateString()}{" "}
										</td>
									) : (
										<td style={{ width: "10%" }}>
											{new Date(s.createdAt).toDateString()}{" "}
										</td>
									)}

									<td
										style={{
											width: "10%",
											background:
												s.invoiceNumber === "Not Added" ? "#f4e4e4" : "",
										}}>
										{s.invoiceNumber}
									</td>
									<td
										style={{
											fontWeight: "bold",
											fontSize: "0.9rem",
											width: "8.5%",
											background:
												s.status === "Delivered" || s.status === "Shipped"
													? "#004b00"
													: s.status === "Cancelled"
													? "red"
													: finalChecker === "Failed"
													? "darkred"
													: s.status === "In Processing"
													? "#d8ffff"
													: s.status === "Exchange - In Processing"
													? "#d8ebff"
													: "#ffffd8",
											color:
												finalChecker === "Failed"
													? "white"
													: s.status === "Delivered" || s.status === "Shipped"
													? "white"
													: s.status === "Cancelled"
													? "white"
													: "black",
										}}>
										{s.status}
									</td>

									<td style={{ width: "11%" }}>{s.customerDetails.fullName}</td>
									<td>{s.customerDetails.phone}</td>
									<td>{s.totalAmountAfterDiscount.toFixed(0)} L.E.</td>
									<td style={{ textTransform: "uppercase" }}>
										{s.orderSource}
									</td>
									<td
										style={{
											background:
												s.employeeData === "Online Order" ? "#ffc994" : "",
										}}>
										{s.employeeData.name
											? s.employeeData.name
											: s.employeeData === "Online Order"
											? "Online Self Service"
											: ""}
									</td>
									<td>{s.customerDetails.state}</td>
									{/* <td>{s.customerDetails.cityName}</td> */}

									<td style={{ width: "8%" }}>
										{s.trackingNumber ? s.trackingNumber : "Not Added"}
									</td>
									<td>{s.totalOrderQty}</td>
									<td
										style={{
											color: "blue",
											fontWeight: "bold",
											cursor: "pointer",
										}}>
										<Link to={`/admin/single-order/${s._id}`}>
											Show More....
										</Link>
									</td>
									{s.invoiceNumber === "Not Added" ? (
										<td
											style={{
												cursor: "pointer",
												fontSize: "10px,",
												width: "8%",
												color: "darkgray",
												fontWeight: "bold",
											}}>
											Create Shipping
										</td>
									) : (
										<td
											style={{
												cursor: "pointer",
												fontSize: "10px,",
												width: "8%",
												fontWeight: "bold",
											}}>
											<Link to={`#`}>Create Shipping</Link>
										</td>
									)}

									{user.userRole === "Admin Account" ? (
										<td
											onClick={() => {
												handleRemove(s._id);
												setTimeout(function () {
													window.location.reload(false);
												}, 1000);
											}}
											style={{
												color: "red",
												fontWeight: "bold",
												cursor: "pointer",
											}}>
											Delete?
										</td>
									) : null}

									{/* <td>{Invoice(s)}</td> */}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

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

	var adjustedExcelData =
		excelDataSet &&
		excelDataSet.map((i, counter) => {
			var descriptionChecker = i.chosenProductQtyWithVariables.map((iii) =>
				iii.map(
					(iiii) => "SKU: " + iiii.SubSKU + ", Qty: " + iiii.OrderedQty,
					// "  /  " +
					// iiii.productName,
				),
			);

			var merged = [].concat.apply([], descriptionChecker);
			var merged2 = [].concat.apply([], merged);
			return {
				Index: counter + 1,
				Name: i.customerDetails.fullName,
				address: i.customerDetails.address,
				phone1: i.customerDetails.phone,
				phone2: "",
				City: i.customerDetails.cityName.toUpperCase(),
				DescriptionOfGoods:
					merged2.length === 1
						? merged2[0]
						: merged2.length === 2
						? merged2[0] + " | " + merged2[1]
						: merged2.length === 3
						? merged2[0] + " | " + merged2[1] + " | " + merged2[2]
						: merged2[0],
				totalAmount: i.totalAmountAfterDiscount,
				ReferenceNumber:
					i.invoiceNumber !== "Not Added" ? i.invoiceNumber : i.OTNumber,
				parcels: 1,
				comment: i.customerDetails.orderComment
					? i.customerDetails.orderComment
					: ".",
				company: i.orderSource.toUpperCase(),
				email: "gqcanihelpyou@gmail.com",
				weight: 1,
			};
		});

	const DownloadExcel = () => {
		return (
			<ExcelFile
				filename={`GQ_Orders_ ${new Date().toLocaleString("en-US", {
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
				<ExcelSheet data={adjustedExcelData} name='GQ_Orders'>
					<ExcelColumn label='#' value='Index' />
					<ExcelColumn label='Name' value='Name' />
					<ExcelColumn label='Address' value='address' />
					<ExcelColumn label='Phone' value='phone1' />
					<ExcelColumn label='Phone2' value='phone2' />
					<ExcelColumn label='City' value='City' />
					<ExcelColumn
						label='Description Of Goods'
						value='DescriptionOfGoods'
					/>
					<ExcelColumn label='Cod' value='totalAmount' />
					<ExcelColumn label='Refrance number' value='ReferenceNumber' />
					<ExcelColumn label='Pieces' value='pieces' />
					<ExcelColumn label='Comment' value='comment' />
					<ExcelColumn label='Company' value='company' />
					<ExcelColumn label='Email' value='email' />
					<ExcelColumn label='Weight' value='weight' />
				</ExcelSheet>
			</ExcelFile>
		);
	};

	return (
		<AceOrdersListWrapper show={AdminMenuStatus}>
			{allOrders.length === 0 && allProducts.length === 0 ? (
				<div
					style={{
						textAlign: "center",
						fontWeight: "bolder",
						marginTop: "50px",
						fontSize: "2.5rem",
					}}>
					Loading....
				</div>
			) : (
				<>
					{!collapsed ? (
						<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
					) : null}
					<div className='grid-container'>
						<div className=''>
							<AdminMenu
								fromPage='AceStoreSales'
								AdminMenuStatus={AdminMenuStatus}
								setAdminMenuStatus={setAdminMenuStatus}
								collapsed={collapsed}
								setCollapsed={setCollapsed}
							/>
						</div>
						<div className='mainContent'>
							<Navbar fromPage='AceStoreSales' pageScrolled={pageScrolled} />
							{/* <FiltersModal
								selectedFilter={selectedFilter}
								setSelectedFilter={setSelectedFilter}
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
							/> */}
							<div
								style={{
									background: "white",
									textAlign: "right",
									fontSize: "13px",
								}}
								className='py-3 mb-5'>
								<span
									style={isActive("SelectAll", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("SelectAll");
										setDay2(last90Days);
										setDay1(today);
									}}>
									Select All
								</span>
								<span
									style={isActive("Today", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => setSelectedFilter("Today")}>
									Today
								</span>
								<span
									style={isActive("Yesterday", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => setSelectedFilter("Yesterday")}>
									Yesterday
								</span>
								<span
									style={isActive("Last7Days", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => setSelectedFilter("Last7Days")}>
									Last 7 Days
								</span>

								<span
									style={isActive("Group", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setModalVisible(true);
										setSelectedFilter("Group");
									}}>
									Group <GroupOutlined />
								</span>
							</div>
							<h3
								style={{ color: "#009ef7", fontWeight: "bold" }}
								className='mx-auto text-center mb-5'>
								SALES HISTORY <br />
								<span
									style={{
										fontSize: "0.9rem",
										color: "black",
										textAlign: "center",
										fontWeight: "normal",
									}}>
									(Selected Date Range From{" "}
									<strong> {new Date(day2).toDateString()}</strong> to{" "}
									<strong>{new Date(day1).toDateString()}</strong>)
								</span>
							</h3>

							<div className='container-fluid'>
								<div className='row'>
									<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
										<div className='card' style={{ background: "#f1416c" }}>
											<div className='card-body'>
												<h5 style={{ fontWeight: "bolder", color: "white" }}>
													Overall Orders Count
												</h5>
												<CountUp
													style={{ color: "white" }}
													duration='3'
													delay={1}
													end={allOrders.length}
													separator=','
												/>
											</div>
										</div>
									</div>

									<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
										<div className='card' style={{ background: "#009ef7" }}>
											<div className='card-body'>
												<h5 style={{ fontWeight: "bolder", color: "white" }}>
													Overall Ordered Items
												</h5>
												<CountUp
													style={{ color: "white" }}
													duration='3'
													delay={1}
													end={ArrayOfQty}
													separator=','
												/>
											</div>
										</div>
									</div>
									{user.userRole === "Order Taker" ||
									user.userRole === "Operations" ? null : (
										<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
											<div className='card' style={{ background: "#50cd89" }}>
												<div className='card-body'>
													<h5 style={{ fontWeight: "bolder", color: "white" }}>
														Total Amount (L.E.)
													</h5>
													<CountUp
														style={{ color: "white" }}
														duration='3'
														delay={1}
														end={ArrayOfAmount}
														separator=','
													/>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className='mt-3 ml-5'>
									<span
										className='mx-1 ordersCount'
										onClick={() => {
											setChosenCard("OrdersCountCard");
										}}>
										Orders Count
									</span>
									<span
										className='mx-1 ordersQty'
										onClick={() => {
											setChosenCard("OrdersQtyCard");
										}}>
										Orders Quantity
									</span>
									<span
										className='mx-1 ordersAmount'
										onClick={() => {
											setChosenCard("OrdersTotalAmountCard");
										}}>
										Orders Total Amount
									</span>
								</div>
								{chosenCard === "OrdersCountCard" ? (
									<div>
										<OrdersCountCards allOrders={allOrders} />
									</div>
								) : null}
								{chosenCard === "OrdersQtyCard" ? (
									<div>
										<OrdersQtyCard allOrders={allOrders} />
									</div>
								) : null}
								{chosenCard === "OrdersTotalAmountCard" ? (
									<div>
										{user.userRole === "Order Taker" ||
										user.userRole === "Operations" ? null : (
											<div>
												<OrdersTotalAmountCards allOrders={allOrders} />
											</div>
										)}
									</div>
								) : null}
							</div>

							{dataTable()}
						</div>
					</div>
				</>
			)}
		</AceOrdersListWrapper>
	);
};

export default AceOrdersList;

const AceOrdersListWrapper = styled.div`
	min-height: 880px;
	/* overflow-x: hidden; */
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
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

	tr:hover {
		background: #e3f5ff !important;
		color: black !important;
		/* font-weight: bolder !important; */
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

	.ordersCount {
		padding: 4px 25px;
		background: #f1416c;
		border-radius: 2px;
		color: white;
		font-weight: bold;
		transition: 0.3s;
	}

	.ordersQty {
		padding: 4px 13px;
		background: #009ef7;
		border-radius: 2px;
		color: white;
		font-weight: bold;
		transition: 0.3s;
	}

	.ordersAmount {
		padding: 4px;
		background: #50cd89;
		border-radius: 2px;
		color: white;
		font-weight: bold;
		transition: 0.3s;
	}

	.ordersAmount:hover,
	.ordersQty:hover,
	.ordersCount:hover {
		padding: 9px 25px;
		cursor: pointer;
		transition: 0.3s;
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

	@media (max-width: 1750px) {
		background: white;

		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 1400px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 12% 88%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 16% 84%; */
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "0% 100%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
		h3 {
			margin-top: 60px !important;
		}

		.rightContentWrapper {
			margin-top: 20px;
			margin-left: ${(props) => (props.show ? "0px" : "20px")};
		}
	}
`;
