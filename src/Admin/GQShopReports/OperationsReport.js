/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import DarkBG from "../AdminMenu/DarkBG";
import Navbar from "../AdminNavMenu/Navbar";
import {
	getColors,
	getProducts,
	// eslint-disable-next-line
	listOrdersProcessing,
	listOrdersProcessingDetermined,
	ordersLength,
	updateOrderInvoice,
	updateOrderInvoiceStock,
} from "../apiAdmin";
// eslint-disable-next-line
import Pagination from "../Orders/Pagination";
import CountUp from "react-countup";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-export-excel";
import { FileSearchOutlined } from "@ant-design/icons";
import CustomDatesModal from "./CustomDatesModal";
import SKUModal from "../Modals/SKUModal";
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

const OperationsReport = () => {
	const [allOrders, setAllOrders] = useState([]);
	const [q, setQ] = useState("");
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	// eslint-disable-next-line
	const [lengthOfOrders, setLengthOfOrders] = useState(0);
	const [backorders, setBackorders] = useState("NotClicked");
	const [excelDataSet, setExcelDataSet] = useState([]);
	const [allColors, setAllColors] = useState([]);
	const [selectedFilter, setSelectedFilter] = useState("SelectAll");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [requiredSKU, setRequiredSKU] = useState("");

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(100);

	const [day1, setDay1] = useState(
		new Date(new Date().setDate(new Date().getDate() + 2)),
	);
	const [day2, setDay2] = useState(
		new Date(new Date().setDate(new Date().getDate() - 90)),
	);

	const { user, token } = isAuthenticated();

	// eslint-disable-next-line
	var today = new Date();
	var today2 = new Date();
	var yesterday = new Date();
	var last7Days = new Date();
	var last30Days = new Date();
	var last90Days = new Date();

	yesterday.setDate(yesterday.getDate() - 1);
	last7Days.setDate(last7Days.getDate() - 7);
	last30Days.setDate(last30Days.getDate() - 30);
	last90Days.setDate(last90Days.getDate() - 200);

	const loadOrders = () => {
		function sortOrdersAscendingly(a, b) {
			const TotalAppointmentsA = a.invoiceNumber;
			const TotalAppointmentsB = b.invoiceNumber;
			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}
		listOrdersProcessingDetermined(user._id, token, day1, day2).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				if (requiredSKU && modalVisible2 === false) {
					var returnValue = data.map((i) => {
						return {
							...i,
							chosenProductQtyWithVariables:
								i.chosenProductQtyWithVariables.map((ii) =>
									// eslint-disable-next-line
									ii.filter(
										(iii) =>
											iii.SubSKU.toLowerCase() === requiredSKU.toLowerCase(),
									),
								),
						};
					});

					var returnValue2 = returnValue.filter(
						(i) =>
							i.chosenProductQtyWithVariables
								.map((ii) => ii.length > 0)
								.indexOf(true) > -1,
					);

					setAllOrders(
						returnValue2
							.filter((i) => i.orderSource === "ace")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						returnValue2
							.filter((i) => i.orderSource === "ace")
							.sort(sortOrdersAscendingly),
					);
				} else if (backorders === "Clicked") {
					getProducts().then((data2) => {
						if (data2.error) {
							console.log(data2.error);
						} else {
							const checkingWithLiveStock = (
								productId,
								SubSKU,
								OrderedQty,
								status,
							) => {
								if (
									status === "In Processing" ||
									status === "On Hold" ||
									status === "Ready To Ship"
								) {
									const pickedSub =
										data2 && data2.filter((iii) => iii._id === productId)[0];

									const GetSpecificSubSKU =
										pickedSub &&
										pickedSub.productAttributes &&
										pickedSub.productAttributes.filter(
											(iii) => iii.SubSKU === SubSKU,
										)[0];
									const QtyChecker =
										GetSpecificSubSKU &&
										GetSpecificSubSKU.quantity < OrderedQty;

									return QtyChecker;
								}
							};

							var stockCheckHelper = data.map((i) =>
								i.chosenProductQtyWithVariables.map((ii) =>
									ii.map((iii) =>
										checkingWithLiveStock(
											iii.productId,
											iii.SubSKU,
											iii.OrderedQty,
											i.status,
										),
									),
								),
							);
							// var merged = [].concat.apply([], stockCheckHelper);

							var beforeel = stockCheckHelper.map((i) =>
								i.map((ii) => ii.filter((iii) => iii === true)),
							);

							var backordersAll = [];

							for (var i = 0; i < beforeel.length; i++) {
								for (var ii = 0; ii < beforeel[i].length; ii++) {
									if (beforeel[i][ii].indexOf(true) !== -1) {
										backordersAll.push(data[i]);
									}
								}
							}

							setAllOrders(
								backordersAll
									.filter((i) => i.orderSource === "ace")
									.sort(sortOrdersAscendingly),
							);
							setExcelDataSet(
								backordersAll
									.filter((i) => i.orderSource === "ace")
									.sort(sortOrdersAscendingly),
							);
						}
					});
				} else if (backorders === "Good") {
					getProducts().then((data2) => {
						if (data2.error) {
							console.log(data2.error);
						} else {
							const checkingWithLiveStock = (productId, SubSKU, OrderedQty) => {
								const pickedSub =
									data2 && data2.filter((iii) => iii._id === productId)[0];

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

							var stockCheckHelper = data.map((i) =>
								i.chosenProductQtyWithVariables.map((ii) =>
									ii.map((iii) =>
										checkingWithLiveStock(
											iii.productId,
											iii.SubSKU,
											iii.OrderedQty,
										),
									),
								),
							);
							// var merged = [].concat.apply([], stockCheckHelper);

							var beforeel = stockCheckHelper.map((i) =>
								i.map((ii) => ii.filter((iii) => iii === true)),
							);

							var backordersAll = [];

							for (var i = 0; i < beforeel.length; i++) {
								for (var ii = 0; ii < beforeel[i].length; ii++) {
									if (
										beforeel[i][0].indexOf(true) === -1 &&
										beforeel[i].length === 1
									) {
										backordersAll.push(data[i]);
									} else if (
										beforeel[i][0].indexOf(true) === -1 &&
										beforeel[i].length === 2
									) {
										if (
											beforeel[i][0].indexOf(true) === -1 &&
											beforeel[i][1].indexOf(true) === -1
										) {
											backordersAll.push(data[i]);
										}
									}
								}
							}

							setAllOrders(
								backordersAll
									.filter((i) => i.orderSource === "ace")
									.sort(sortOrdersAscendingly),
							);
							setExcelDataSet(
								backordersAll
									.filter((i) => i.orderSource === "ace")
									.sort(sortOrdersAscendingly),
							);
						}
					});
				} else if (backorders === "Processing") {
					setAllOrders(
						data.filter(
							(i) =>
								(i.status.includes("Processing") ||
									i.status === "Ready To Ship") &&
								i.orderSource === "ace",
						),
					);
					setExcelDataSet(
						data.filter(
							(i) =>
								(i.status.includes("Processing") ||
									i.status === "Ready To Ship") &&
								i.orderSource === "ace",
						),
					);
				} else {
					setAllOrders(
						data
							.filter((i) => i.orderSource === "ace")
							.sort(sortOrdersAscendingly),
					);
					setExcelDataSet(
						data
							.filter((i) => i.orderSource === "ace")
							.sort(sortOrdersAscendingly),
					);
				}
			}
		});
	};

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllProducts(data.filter((i) => i.storeName.storeName === "ace"));
			}
		});
	};

	const loadOrdersLength = () => {
		ordersLength(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLengthOfOrders(data);
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
		loadOrders();
		gettingAllProducts();
		loadOrdersLength();
		gettingAllColors();
		// eslint-disable-next-line
	}, [backorders, day1, day2, modalVisible2, requiredSKU]);

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

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.createdAt).toLocaleDateString();
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
				row.chosenShippingOption[0].carrierName
					.toString()
					.toLowerCase()
					.indexOf(q) > -1
			);
		});
	}

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	// eslint-disable-next-line
	const currentPosts =
		allOrders && allOrders.slice(indexOfFirstPost, indexOfLastPost);

	// eslint-disable-next-line
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// eslint-disable-next-line
	const handleInvoiceStatus = (
		invoiceNumber,
		orderId,
		order,
		finalChecker2,
	) => {
		if (finalChecker2 === "Failed") {
			console.log(finalChecker2, "Ahowan Yaba sha3'al");

			const checkingWithLiveStock = (productId, SubSKU) => {
				const pickedSub =
					allProducts && allProducts.filter((iii) => iii._id === productId)[0];

				const GetSpecificSubSKU =
					pickedSub &&
					pickedSub.productAttributes &&
					pickedSub.productAttributes.filter((iii) => iii.SubSKU === SubSKU)[0];
				const QtyChecker = GetSpecificSubSKU && GetSpecificSubSKU.quantity;

				return QtyChecker;
			};

			var modifyingTheVariables = order.chosenProductQtyWithVariables;

			var quantityModified = modifyingTheVariables.map((iii) =>
				iii.map((iiii) => {
					return {
						...iiii,
						quantity: checkingWithLiveStock(iiii.productId, iiii.SubSKU),
					};
				}),
			);

			var orderFinal = {
				...order,
				onholdStatus: "Not On Hold",
				chosenProductQtyWithVariables: quantityModified,
			};

			// console.log(orderFinal, "orderFinal");

			updateOrderInvoiceStock(
				user._id,
				token,
				orderId,
				orderFinal,
				invoiceNumber,
				"Not On Hold",
			).then((data) => {
				if (data.error) {
					console.log("Status update failed");
				} else {
					window.location.reload(false);
				}
			});
		} else {
			updateOrderInvoice(user._id, token, orderId, invoiceNumber).then(
				(data) => {
					if (data.error) {
						console.log("Status update failed");
					} else {
						window.location.reload(false);
					}
				},
			);
		}
	};

	const mainDate =
		allOrders &&
		allOrders.map((i) => {
			const checkingWithLiveStock = (productId, SubSKU, OrderedQty) => {
				const pickedSub =
					allProducts && allProducts.filter((iii) => iii._id === productId)[0];

				const GetSpecificSubSKU =
					pickedSub &&
					pickedSub.productAttributes &&
					pickedSub.productAttributes.filter((iii) => iii.SubSKU === SubSKU)[0];
				const QtyChecker =
					GetSpecificSubSKU && GetSpecificSubSKU.quantity < OrderedQty;

				return QtyChecker;
			};

			var stockCheckHelper = i.chosenProductQtyWithVariables.map((iii) =>
				iii.map((iiii) =>
					checkingWithLiveStock(iiii.productId, iiii.SubSKU, iiii.OrderedQty),
				),
			);
			var merged = [].concat.apply([], stockCheckHelper);
			var finalChecker = merged.indexOf(true) === -1 ? "Passed" : "Failed";

			return {
				PurchaseDate: new Date(i.orderCreationDate).toLocaleDateString(),
				Invoice: i.invoiceNumber,
				Status: i.status,
				// Name: i.customerDetails.fullName.toString(),
				Phone: i.customerDetails.phone,
				Amount: i.totalAmountAfterDiscount + " L.E.",
				Store: i.orderSource.toUpperCase(),
				Governorate: i.customerDetails.state,
				// Carrier: i.customerDetails.carrierName,
				SKU_Qty: i.chosenProductQtyWithVariables.map((iii) =>
					iii.map(
						(iiii) =>
							iiii.SubSKU +
							"  /  " +
							iiii.OrderedQty +
							"  /  " +
							iiii.productName +
							" \n",
					),
				),
				backorder: finalChecker === "Passed" ? "Good" : "Backorder",
			};
		});

	const exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "landscape"; // portrait or landscape

		const marginLeft = 80;
		const doc = new jsPDF(orientation, unit, size);

		doc.setLanguage("ar-Ar");
		doc.setFontSize(9);

		const title = "PENDING ORDERS";
		const headers = [
			[
				"Date",
				"Invoice #",
				"Status",
				// "Name",
				"Phone",
				"Amount",
				"Store",
				"Governorate",
				// "Carrier",
				"SKU_Qty",
				"Backorder",
			],
		];

		const data = mainDate.map((elt) => [
			elt.PurchaseDate,
			elt.Invoice,
			elt.Status,
			// elt.Name,
			elt.Phone,
			elt.Amount,
			elt.Store,
			elt.Governorate,
			// elt.Carrier,
			elt.SKU_Qty,
			elt.backorder,
		]);

		let content = {
			startY: 50,
			head: headers,
			body: data,
			// theme: "plain",
			styles: { fontSize: 8, cellWidth: "auto" },
		};

		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("Checklist.pdf");
	};

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

	// console.log(adjustedExcelData, "adjustedExcelData");

	// eslint-disable-next-line
	const DownloadExcel = () => {
		return (
			<ExcelFile
				filename={`GQ_Orders_ ${new Date().toLocaleString("en-US", {
					timeZone: "Africa/Cairo",
				})}`}
				element={
					<Link
						className='btn btn-info mr-5 ml-2'
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

	const selectedDateOrdersSKUsModified = () => {
		const modifiedArray =
			allOrders &&
			allOrders.map((i) =>
				i.chosenProductQtyWithVariables.map((ii) =>
					ii.map((iii) => {
						return {
							productName: iii.productName,
							OrderedQty: iii.OrderedQty,
							productMainImage: iii.productMainImage,
							SubSKU: iii.SubSKU,
							SubSKUColor: iii.SubSKUColor,
							SubSKUSize: iii.SubSKUSize,
							productSubSKUImage: iii.productSubSKUImage,
							totalPaidAmount:
								Number(iii.pickedPrice).toFixed(2) *
								Number(iii.OrderedQty).toFixed(2),
						};
					}),
				),
			);

		return modifiedArray;
	};

	var destructingNestedArraySKUs = [];
	selectedDateOrdersSKUsModified() &&
		selectedDateOrdersSKUsModified().map((i) =>
			i.map((ii) => destructingNestedArraySKUs.push(...ii)),
		);

	function sortTopOrdersProductsSKUs(a, b) {
		const TotalAppointmentsA = a.totalPaidAmount;
		const TotalAppointmentsB = b.totalPaidAmount;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	var TopSoldProductsSKUs = [];
	destructingNestedArraySKUs &&
		destructingNestedArraySKUs.reduce(function (res, value) {
			if (!res[value.productName + value.SubSKU]) {
				res[value.productName + value.SubSKU] = {
					productName: value.productName,
					productMainImage: value.productMainImage,
					productSubSKUImage: value.productSubSKUImage,
					SubSKU: value.SubSKU,
					SubSKUColor: value.SubSKUColor,
					SubSKUSize: value.SubSKUSize,
					OrderedQty: 0,
					totalPaidAmount: 0,
				};
				TopSoldProductsSKUs.push(res[value.productName + value.SubSKU]);
			}

			res[value.productName + value.SubSKU].OrderedQty += Number(
				value.OrderedQty,
			);
			res[value.productName + value.SubSKU].totalPaidAmount += Number(
				value.totalPaidAmount,
			);

			return res;
		}, {});

	TopSoldProductsSKUs.sort(sortTopOrdersProductsSKUs);

	const TopProductsSKUS = () => {
		return (
			<div className='col-md-11 mx-auto my-5'>
				<div className='card'>
					<h5
						style={{
							textAlign: "center",
							marginTop: "10px",
							fontWeight: "bolder",
							fontSize: "1.1rem",
						}}>
						Unfulfilled Sold Products & SKU's By Total Ordered Quantity
					</h5>
					<div className='col-md-10 mx-auto'>
						<hr />
					</div>

					<table
						className='table table-bordered table-md-responsive table-hover'
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
								<th scope='col'>#</th>
								<th scope='col'>SKU</th>
								<th scope='col'>Product Name</th>
								<th scope='col'>Color</th>
								<th scope='col'>Size</th>
								<th scope='col'>Ordered Qty</th>
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
							{TopSoldProductsSKUs &&
								TopSoldProductsSKUs.map((s, i) => {
									return (
										<tr key={i} className=''>
											<td className='my-auto'>{i + 1}</td>
											<td>{s.SubSKU}</td>
											<td>{s.productName}</td>
											<td>
												{allColors[
													allColors.map((i) => i.hexa).indexOf(s.SubSKUColor)
												]
													? allColors[
															allColors
																.map((i) => i.hexa)
																.indexOf(s.SubSKUColor)
													  ].color
													: s.SubSKUColor}
											</td>

											<td>{s.SubSKUSize}</td>
											<td>{s.OrderedQty}</td>
											<td style={{ width: "15%", textAlign: "center" }}>
												<img
													width='40%'
													height='40%'
													style={{ marginLeft: "20px" }}
													src={s.productSubSKUImage}
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
		);
	};

	const dataTable = () => {
		return (
			<div className='tableData'>
				{allOrders && allOrders.length === 0 ? (
					<div
						className='text-center mt-5'
						style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
						No Un-invoiced Orders Available
					</div>
				) : (
					<>
						<div>
							<Link
								className='btn btn-primary mr-4'
								onClick={() => exportPDF()}
								to='#'>
								Download Report (PDF)
							</Link>
							{backorders === "Clicked" ? (
								<Link
									className='btn btn-info mx-2'
									onClick={() => {
										setBackorders("NotClicked");
										setRequiredSKU("");
									}}
									to='#'>
									Revert To Default
								</Link>
							) : (
								<Link
									className='btn btn-danger mx-2'
									onClick={() => {
										setBackorders("Clicked");
										setRequiredSKU("");
									}}
									to='#'>
									Backorders
								</Link>
							)}
							<Link
								className='btn'
								style={{ background: "black", color: "white" }}
								onClick={() => {
									setBackorders("Processing");
									setRequiredSKU("");
								}}
								to='#'>
								In Processing
							</Link>
							<Link
								className='btn ml-2 btn-success'
								// style={{ background: "black", color: "white" }}
								onClick={() => {
									setBackorders("Good");
									setRequiredSKU("");
								}}
								to='#'>
								Good Orders
							</Link>
						</div>
						{TopProductsSKUS()}

						<div>
							<Link
								className='btn btn-success'
								to='#'
								onClick={() => {
									setModalVisible2(true);
								}}>
								Search By SKU{" "}
								<span className='ml-3' style={{ fontSize: "1.11rem" }}>
									<FileSearchOutlined />
								</span>
							</Link>
						</div>
						<div className='form-group text-right'>
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
								className='p-2 my-2 '
								type='text'
								value={q}
								onChange={(e) => {
									setQ(e.target.value.toLowerCase());

									if (e.target.value.length > 0) {
										setPostsPerPage(allOrders.length + 2);
									} else {
										setPostsPerPage(100);
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
							className='table table-bordered table-md-responsive table-hover text-center my-5'
							style={{ fontSize: "0.75rem" }}
							id='ahowan'>
							<thead className='thead-light'>
								<tr>
									<th scope='col'>#</th>

									<th scope='col'>Purchase Date</th>
									<th scope='col'>INV #</th>
									<th scope='col'>Status</th>
									<th scope='col'>Name</th>
									<th scope='col'>Phone</th>
									<th scope='col'>Amount</th>
									<th scope='col'>SKU #</th>
									<th scope='col'>Ordered Qty</th>
									<th scope='col'>Stock Onhand</th>
									<th scope='col'>Stock Onhand (live)</th>
									<th scope='col'>Details?</th>
								</tr>
							</thead>

							<tbody className='my-auto'>
								{search(currentPosts).map((s, i) => {
									const checkingWithLiveStock = (
										productId,
										SubSKU,
										OrderedQty,
										status,
									) => {
										if (
											status === "In Processing" ||
											status === "On Hold" ||
											status === "Ready To Ship"
										) {
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
												GetSpecificSubSKU &&
												GetSpecificSubSKU.quantity < OrderedQty;

											return QtyChecker;
										}
									};

									var stockCheckHelper = s.chosenProductQtyWithVariables.map(
										(iii) =>
											iii.map((iiii) =>
												checkingWithLiveStock(
													iiii.productId,
													iiii.SubSKU,
													iiii.OrderedQty,
													s.status,
												),
											),
									);

									var merged = [].concat.apply([], stockCheckHelper);
									var finalChecker =
										merged.indexOf(true) === -1 ? "Passed" : "Failed";

									//Getting stock as of the time the order was taken
									var stockCheckHelper2 = s.chosenProductQtyWithVariables.map(
										(iii) => iii.map((iiii) => iiii.quantity < iiii.OrderedQty),
									);

									var merged2 = [].concat.apply([], stockCheckHelper2);
									// eslint-disable-next-line
									var finalChecker2 =
										merged2.indexOf(true) === -1 ? "Passed" : "Failed";

									const returnLiveStock = (productId, SubSKU) => {
										const pickedSub =
											allProducts &&
											allProducts.filter((iii) => iii._id === productId)[0];

										const GetSpecificSubSKU =
											pickedSub &&
											pickedSub.productAttributes &&
											pickedSub.productAttributes.filter(
												(iii) => iii.SubSKU === SubSKU,
											)[0];
										const liveStock =
											GetSpecificSubSKU && GetSpecificSubSKU.quantity;

										return liveStock;
									};

									// console.log(finalChecker2, "Merged2");

									return (
										<tr key={i} className=''>
											<td>{i + 1}</td>
											{s.orderCreationDate ? (
												<td style={{ width: "8%" }}>
													{new Date(s.orderCreationDate).toDateString()}{" "}
												</td>
											) : (
												<td style={{ width: "8%" }}>
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
														// finalChecker2 === "Failed" &&
														finalChecker === "Failed" &&
														s.status !== "Ready To Ship"
															? "darkred"
															: s.status === "Delivered" ||
															  s.status === "Shipped"
															? "#004b00"
															: s.status === "Cancelled"
															? "darkred"
															: s.status === "In Processing"
															? "#d8ffff"
															: s.status === "Exchange - In Processing"
															? "#d8ebff"
															: "#ffffd8",
													color:
														// finalChecker2 === "Failed" &&
														finalChecker === "Failed" &&
														s.status !== "Ready To Ship"
															? "white"
															: s.status === "Delivered" ||
															  s.status === "Shipped"
															? "white"
															: s.status === "Cancelled"
															? "white"
															: "black",
												}}>
												{s.status}
											</td>

											<td style={{ width: "11%" }}>
												{s.customerDetails.fullName}
											</td>
											<td style={{ width: "11%" }}>
												{s.customerDetails.phone}
											</td>
											<td>{s.totalAmountAfterDiscount.toFixed(0)} L.E.</td>

											<td>
												{s.chosenProductQtyWithVariables.map((i) =>
													i.map((ii) => (
														<span>
															{ii.SubSKU} <br />
														</span>
													)),
												)}
											</td>

											<td>
												{s.chosenProductQtyWithVariables.map((i) =>
													i.map((ii) => (
														<span>
															{ii.OrderedQty} <br />
														</span>
													)),
												)}
											</td>
											<td>
												{s.chosenProductQtyWithVariables.map((i) =>
													i.map((ii) => (
														<span>
															{ii.quantity} <br />
														</span>
													)),
												)}
											</td>
											<td>
												{s.chosenProductQtyWithVariables.map((i) =>
													i.map((ii) => (
														<span>
															{returnLiveStock(ii.productId, ii.SubSKU)} <br />
														</span>
													)),
												)}
											</td>

											<td
												style={{
													color: "blue",
													fontWeight: "bold",
													cursor: "pointer",
												}}>
												<Link to={`/admin/single-order/${s._id}`}>
													Details....
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				)}
			</div>
		);
	};

	const overallQtyArray =
		TopSoldProductsSKUs && TopSoldProductsSKUs.map((i) => i.OrderedQty);

	const ArrayOfQty = overallQtyArray.reduce((a, b) => a + b, 0);

	const overallAmountArray =
		allOrders && allOrders.map((i) => i.totalAmountAfterDiscount);

	const ArrayOfAmount = overallAmountArray.reduce((a, b) => a + b, 0);

	return (
		<OperationsReportWrapper show={AdminMenuStatus}>
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
								fromPage='OperationsReport'
								AdminMenuStatus={AdminMenuStatus}
								setAdminMenuStatus={setAdminMenuStatus}
								collapsed={collapsed}
								setCollapsed={setCollapsed}
							/>
						</div>
						<div className='mainContent'>
							<Navbar fromPage='OperationsReport' pageScrolled={pageScrolled} />
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
										setDay1(today2);
										setRequiredSKU("");
									}}>
									Select All
								</span>
								<span
									style={isActive("Today", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("Today");
										setDay2(today);
										setDay1(today2);
										setRequiredSKU("");
									}}>
									Today
								</span>
								<span
									style={isActive("Yesterday", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("Yesterday");
										setDay2(yesterday);
										setDay1(yesterday);
										setRequiredSKU("");
									}}>
									Yesterday
								</span>
								<span
									style={isActive("Last7Days", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("Last7Days");
										setDay2(last7Days);
										setDay1(today2);
										setRequiredSKU("");
									}}>
									Last 7 Days
								</span>
								<span
									style={isActive("Last30Days", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("Last30Days");
										setDay2(last30Days);
										setDay1(today2);
										setRequiredSKU("");
									}}>
									Last 30 Days
								</span>

								<span
									style={isActive("CustomDates", selectedFilter)}
									className='mx-2 filterItem'
									onClick={() => {
										setSelectedFilter("CustomDates");
										setModalVisible(true);
										setRequiredSKU("");
									}}>
									Custom Dates
								</span>
							</div>
							<CustomDatesModal
								day1={day1}
								setDay1={setDay1}
								day2={day2}
								setDay2={setDay2}
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
								setRequiredSKU={setRequiredSKU}
							/>
							<SKUModal
								allOrders={allOrders}
								setAllOrders={setAllOrders}
								modalVisible2={modalVisible2}
								setModalVisible2={setModalVisible2}
								requiredSKU={requiredSKU}
								setRequiredSKU={setRequiredSKU}
							/>
							<h3 className='mt-5 text-center' style={{ fontWeight: "bolder" }}>
								Operations Unfulfilled Orders Report By SKU <br />
								<span
									style={{
										fontSize: "0.95rem",
										color: "black",
										textAlign: "center",
										fontWeight: "normal",
									}}>
									(Selected Date Range From{" "}
									<strong> {new Date(day2).toDateString()}</strong> to{" "}
									<strong>{new Date(day1).toDateString()}</strong>)
								</span>
							</h3>
							<div className='row mx-5 mt-5'>
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
								user.userRole === "Operations" ||
								user.userRole === "Offline Store" ? null : (
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
							<div className='mt-5 mx-3'> {dataTable()}</div>
						</div>
					</div>
				</>
			)}
		</OperationsReportWrapper>
	);
};

export default OperationsReport;

const OperationsReportWrapper = styled.div`
	min-height: 880px;
	/* overflow-x: hidden; */
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) =>
			props.show ? "8% 92%" : "15.1% 84.9%"};
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
		background: #009ef7 !important;
		color: white !important;
		background: #e3f5ff !important;
		color: black !important;
		/* font-weight: bolder !important; */
	}

	.filterListWrapper {
		list-style: none;
		font-size: 11px;
		font-weight: none;
		color: #808080;
		cursor: pointer;
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

	@charset "UTF-8";
	.page-break {
		page-break-after: always;
		page-break-inside: avoid;
		clear: both;
	}
	.page-break-before {
		page-break-before: always;
		page-break-inside: avoid;
		clear: both;
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
