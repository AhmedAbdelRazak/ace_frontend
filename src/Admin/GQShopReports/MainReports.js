/** @format */

import { GroupOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { getColors, listOrdersDates } from "../apiAdmin";
import { isAuthenticated } from "../../auth";
// import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import DarkBG from "../AdminMenu/DarkBG";
import Navbar from "../AdminNavMenu/Navbar";
import CountUp from "react-countup";
import Chart from "react-apexcharts";
import CustomDatesModal from "./CustomDatesModal";
import OrdersCountCards from "../CardsBreakDown/OrdersCountCards";
import OrdersQtyCard from "../CardsBreakDown/OrdersQtyCard";
import OrdersTotalAmountCards from "../CardsBreakDown/OrdersTotalAmountCards";

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

const MainReports = () => {
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("SelectAll");
	const [chosenCard, setChosenCard] = useState("OrdersCountCard");
	// eslint-disable-next-line
	const [modalVisible, setModalVisible] = useState(false);
	// eslint-disable-next-line
	const [allOrders, setAllOrders] = useState([]);
	const [requiredSKU, setRequiredSKU] = useState("");
	const [day1, setDay1] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1)),
	);
	const [day2, setDay2] = useState(
		new Date(new Date().setDate(new Date().getDate() - 7)),
	);
	const [allColors, setAllColors] = useState([]);

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

	// var todayTimeZone = moment(new Date().toISOString()).utcOffset(120)._i;

	const loadOrders = () => {
		function sortOrdersAscendingly(a, b) {
			const TotalAppointmentsA = a.orderCreationDate;
			const TotalAppointmentsB = b.orderCreationDate;
			let comparison = 0;
			if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		listOrdersDates(user._id, token, day1, day2).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllOrders(
					data
						.filter((i) => i.orderSource === "ace")
						.sort(sortOrdersAscendingly),
				);
			}
		});
	};

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
		gettingAllColors();
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

	//Charts

	var OrdersDates_TotalAmount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[new Date(value.orderCreationDate).toLocaleDateString()]) {
				res[new Date(value.orderCreationDate).toLocaleDateString()] = {
					orderCreationDate: new Date(
						value.orderCreationDate,
					).toLocaleDateString(),
					totalAmountAfterDiscount: 0,
				};
				OrdersDates_TotalAmount.push(
					res[new Date(value.orderCreationDate).toLocaleDateString()],
				);
			}
			res[
				new Date(value.orderCreationDate).toLocaleDateString()
			].totalAmountAfterDiscount += Number(value.totalAmountAfterDiscount);
			return res;
		}, {});

	var chartDataTotalAmount = {
		options: {
			chart: {
				id: "area",
				background: "",
				toolbar: {
					tools: {
						download: true,
						selection: false,
						zoom: false,
						zoomin: false,
						zoomout: false,
						pan: false,
						reset: false | '<img src="/static/icons/reset.png" width="20">',
						customIcons: [],
					},
				},
			},

			plotOptions: {
				bar: {
					horizontal: false,
					s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
					e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
					borderRadius: 0,
					columnWidth: "90%",
					barHeight: "100%",
					distributed: false,
					rangeBarOverlap: true,
					rangeBarGroupRows: false,

					dataLabels: {
						position: "center",
						maxItems: 100,
						hideOverflowingLabels: true,
						orientation: "vertical",
					},
				},
			},

			dataLabels: {
				enabled: true,
				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return val;
				},
				style: {
					fontSize: "10px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: "bold",
					// colors: undefined,
					colors: ["black", "#E91E63", "#9C27B0"],
				},
			},

			title: {
				text: "Day Over Day Sales By Total Amount (L.E.) Report",
				align: "center",
				margin: 35,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "black",
					fontSize: "1.05rem",
				},
			},
			xaxis: {
				name: "Order Date",
				categories: OrdersDates_TotalAmount.map((i) =>
					new Date(i.orderCreationDate).toLocaleDateString(),
				),
			},
			colors: ["#99dd99"],

			stroke: {
				width: [3, 3],
			},

			yaxis: {
				tickAmount: 6,
				labels: {
					formatter: function (val) {
						return val;
					},
				},
			},
			fill: {
				type: "gradient",
				colors: ["#99dd99"],
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 100],
				},
			},
		},
		series: [
			{
				name: "Total Paid Amount",
				data: OrdersDates_TotalAmount.map((i) => {
					return i.totalAmountAfterDiscount.toFixed(2);
				}),
			},
		],
	};

	var OrdersDates_OrdersCount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[new Date(value.orderCreationDate).toLocaleDateString()]) {
				res[new Date(value.orderCreationDate).toLocaleDateString()] = {
					orderCreationDate: new Date(
						value.orderCreationDate,
					).toLocaleDateString(),
					ordersCount: 0,
				};
				OrdersDates_OrdersCount.push(
					res[new Date(value.orderCreationDate).toLocaleDateString()],
				);
			}
			res[
				new Date(value.orderCreationDate).toLocaleDateString()
			].ordersCount += 1;
			return res;
		}, {});

	// console.log(OrdersDates_OrdersCount, "OrdersDates_OrdersCount");

	var chartDataOrdersCount = {
		options: {
			chart: {
				id: "area",
				background: "",
				toolbar: {
					tools: {
						download: true,
						selection: false,
						zoom: false,
						zoomin: false,
						zoomout: false,
						pan: false,
						reset: false | '<img src="/static/icons/reset.png" width="20">',
						customIcons: [],
					},
				},
			},

			plotOptions: {
				bar: {
					horizontal: false,
					s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
					e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
					borderRadius: 0,
					columnWidth: "90%",
					barHeight: "100%",
					distributed: false,
					rangeBarOverlap: true,
					rangeBarGroupRows: false,

					dataLabels: {
						position: "center",
						maxItems: 100,
						hideOverflowingLabels: true,
						orientation: "vertical",
					},
				},
			},

			dataLabels: {
				enabled: true,
				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return val;
				},
				style: {
					fontSize: "10px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: "bold",
					// colors: undefined,
					colors: ["black", "#E91E63", "#9C27B0"],
				},
			},

			title: {
				text: "Day Over Day Orders Count Report",
				align: "center",
				margin: 35,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "black",
					fontSize: "1.05rem",
				},
			},
			xaxis: {
				name: "Order Date",
				categories: OrdersDates_OrdersCount.map((i) =>
					new Date(i.orderCreationDate).toLocaleDateString(),
				),
			},
			colors: ["#f1416c"],

			stroke: {
				width: [3, 3],
			},

			yaxis: {
				tickAmount: 2,
				labels: {
					formatter: function (val) {
						return val;
					},
				},
			},
			fill: {
				type: "gradient",
				colors: ["#f1416c"],
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 100],
				},
			},
		},
		series: [
			{
				name: "Total Paid Amount",
				data: OrdersDates_OrdersCount.map((i) => {
					return i.ordersCount.toFixed(0);
				}),
			},
		],
	};

	function sortTopOrdersStatus(a, b) {
		const TotalAppointmentsA = a.ordersCount
			? a.ordersCount
			: a.totalAmountAfterDiscount;
		const TotalAppointmentsB = b.ordersCount
			? b.ordersCount
			: b.totalAmountAfterDiscount;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	var OrderStatus_OrdersCount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[value.status]) {
				res[value.status] = {
					status: value.status,
					ordersCount: 0,
				};
				OrderStatus_OrdersCount.push(res[value.status]);
			}
			res[value.status].ordersCount += 1;
			return res;
		}, {});

	var OrderStatus_TotalAmount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[value.status]) {
				res[value.status] = {
					status: value.status,
					totalAmountAfterDiscount: 0,
				};
				OrderStatus_TotalAmount.push(res[value.status]);
			}
			res[value.status].totalAmountAfterDiscount += Number(
				value.totalAmountAfterDiscount,
			);
			return res;
		}, {});

	OrderStatus_OrdersCount.sort(sortTopOrdersStatus);
	OrderStatus_TotalAmount.sort(sortTopOrdersStatus);

	var pieChart1 = {
		series: OrderStatus_OrdersCount.map((i) => {
			return i.ordersCount;
		}),
		labels: OrderStatus_OrdersCount.map((i) => i.status + " Orders"),
		title: {
			text: "Order Status Breakdown By Orders Count",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		// colors: [
		// 	"#f1416c",
		// 	"#004e00",
		// 	"#00c400",
		// 	"#cccc00",
		// 	"#ffb1b1",
		// 	"#9dceff",
		// 	"#003162",
		// ],

		legend: {
			show: true,
			position: "top",
		},
	};

	var pieChart2 = {
		series: OrderStatus_TotalAmount.map((i) => {
			return i.totalAmountAfterDiscount;
		}),
		labels: OrderStatus_TotalAmount.map((i) => i.status + " Orders"),
		title: {
			text: "Order Status Breakdown By Total Amount (L.E.)",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		// colors: [
		// 	"#f1416c",
		// 	"#004e00",
		// 	"#00c400",
		// 	"#cccc00",
		// 	"#ffb1b1",
		// 	"#9dceff",
		// 	"#003162",
		// ],

		legend: {
			show: true,
			position: "top",
		},
	};

	const selectedDateOrdersModified = () => {
		const modifiedArray =
			allOrders &&
			allOrders.map((i) =>
				i.chosenProductQtyWithVariables.map((ii) =>
					ii.map((iii) => {
						return {
							productName: iii.productName,
							OrderedQty: iii.OrderedQty,
							productMainImage: iii.productMainImage,

							totalPaidAmount:
								Number(iii.pickedPrice).toFixed(2) *
								Number(iii.OrderedQty).toFixed(2),
						};
					}),
				),
			);

		return modifiedArray;
	};

	var destructingNestedArray = [];
	selectedDateOrdersModified() &&
		selectedDateOrdersModified().map((i) =>
			i.map((ii) => destructingNestedArray.push(...ii)),
		);

	function sortTopOrdersProducts(a, b) {
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

	var TopSoldProducts = [];
	destructingNestedArray &&
		destructingNestedArray.reduce(function (res, value) {
			if (!res[value.productName]) {
				res[value.productName] = {
					productName: value.productName,
					productMainImage: value.productMainImage,
					OrderedQty: 0,
					totalPaidAmount: 0,
				};
				TopSoldProducts.push(res[value.productName]);
			}

			res[value.productName].OrderedQty += Number(value.OrderedQty);
			res[value.productName].totalPaidAmount += Number(value.totalPaidAmount);

			return res;
		}, {});

	TopSoldProducts.sort(sortTopOrdersProducts);

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

	var Stores_OrdersCount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[value.orderSource]) {
				res[value.orderSource] = {
					orderSource: value.orderSource,
					ordersCount: 0,
				};
				Stores_OrdersCount.push(res[value.orderSource]);
			}
			res[value.orderSource].ordersCount += 1;
			return res;
		}, {});

	var Stores_TotalAmount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[value.orderSource]) {
				res[value.orderSource] = {
					orderSource: value.orderSource,
					totalAmountAfterDiscount: 0,
				};
				Stores_TotalAmount.push(res[value.orderSource]);
			}
			res[value.orderSource].totalAmountAfterDiscount += Number(
				value.totalAmountAfterDiscount,
			);
			return res;
		}, {});

	var donutChart1 = {
		series: Stores_OrdersCount.map((i) => {
			return i.ordersCount;
		}),
		labels: Stores_OrdersCount.map((i) => i.orderSource + " Orders"),
		title: {
			text: "Order Source Breakdown By Orders Count",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		// colors: [
		// 	"#f1416c",
		// 	"#004e00",
		// 	"#00c400",
		// 	"#cccc00",
		// 	"#ffb1b1",
		// 	"#9dceff",
		// 	"#003162",
		// ],

		legend: {
			show: true,
			position: "top",
		},
	};

	var donutChart2 = {
		series: Stores_TotalAmount.map((i) => {
			return i.totalAmountAfterDiscount;
		}),
		labels: Stores_TotalAmount.map((i) => i.orderSource + " Orders"),
		title: {
			text: "Order Source Breakdown By Orders Total Amount (L.E.)",
			align: "center",
		},

		dataLabels: {
			enabled: true,
		},
		// colors: [
		// 	"#f1416c",
		// 	"#004e00",
		// 	"#00c400",
		// 	"#cccc00",
		// 	"#ffb1b1",
		// 	"#9dceff",
		// 	"#003162",
		// ],

		legend: {
			show: true,
			position: "top",
		},
	};

	function sortTopOrdersStates(a, b) {
		const TotalAppointmentsA = a.totalAmountAfterDiscount;
		const TotalAppointmentsB = b.totalAmountAfterDiscount;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	var State_TotalAmount = [];
	allOrders &&
		allOrders.reduce(function (res, value) {
			if (!res[value.customerDetails.state]) {
				res[value.customerDetails.state] = {
					state: value.customerDetails.state,
					totalAmountAfterDiscount: 0,
					ordersCount: 0,
				};
				State_TotalAmount.push(res[value.customerDetails.state]);
			}
			res[value.customerDetails.state].totalAmountAfterDiscount += Number(
				value.totalAmountAfterDiscount,
			);
			res[value.customerDetails.state].ordersCount += 1;
			return res;
		}, {});

	State_TotalAmount.sort(sortTopOrdersStates);

	var treeMapStates1 = {
		series: State_TotalAmount.map((i) => {
			return {
				data: [
					{ x: i.state, y: Number(i.totalAmountAfterDiscount).toFixed(2) },
				],
			};
		}),
		title: {
			text: "Governorate Break Down By Total Amount (L.E.)",
			align: "center",
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

		options: {
			legend: {
				show: false,
			},
			chart: {
				height: 350,
				type: "treemap",
			},
			title: {
				text: "Governorate Break Down By Total Amount (L.E.)",
				align: "center",
			},

			plotOptions: {
				treemap: {
					distributed: true,
					enableShades: false,
				},
			},
		},
	};

	var treeMapStates2 = {
		series: State_TotalAmount.map((i) => {
			return {
				data: [{ x: i.state, y: Number(i.ordersCount).toFixed(2) }],
			};
		}),
		title: {
			text: "Governorate Break Down By Orders' Count",
			align: "center",
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

		options: {
			legend: {
				show: false,
			},
			chart: {
				height: 350,
				type: "treemap",
			},
			title: {
				text: "Governorate Break Down By Orders' Count",
				align: "center",
			},

			plotOptions: {
				treemap: {
					distributed: true,
					enableShades: false,
				},
			},
		},
	};

	return (
		<MainReportsWrapper show={collapsed}>
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
						fromPage='MainReports'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='MainReports' pageScrolled={pageScrolled} />
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
							}}>
							Last 30 Days
						</span>

						<span
							style={isActive("CustomDates", selectedFilter)}
							className='mx-2 filterItem'
							onClick={() => {
								setSelectedFilter("CustomDates");
								setModalVisible(true);
							}}>
							Custom Dates
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
					<CustomDatesModal
						day1={day1}
						setDay1={setDay1}
						day2={day2}
						setDay2={setDay2}
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						setRequiredSKU={setRequiredSKU}
						requiredSKU={requiredSKU}
					/>
					<h3 className='mx-auto text-center' style={{ fontWeight: "bold" }}>
						SALES REPORT <br />
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

					<div className='container-fluid  mb-5'>
						<div className='row'>
							<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
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

							<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
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
							{user.userRole === "Order Taker" ? null : (
								<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
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
								<OrdersTotalAmountCards allOrders={allOrders} />
							</div>
						) : null}
					</div>

					<div className='mx-auto my-3' style={{ width: "75%" }}>
						<div className='card'>
							<div className='mx-auto text-center ' style={{ width: "85%" }}>
								<Chart
									options={chartDataTotalAmount.options}
									series={chartDataTotalAmount.series}
									type='area'
									style={{
										width: "100%",
										height: "100%",
									}}
								/>
							</div>
						</div>
					</div>

					<div className='mx-auto my-3' style={{ width: "75%" }}>
						<div className='card'>
							<div className='mx-auto text-center ' style={{ width: "85%" }}>
								<Chart
									options={chartDataOrdersCount.options}
									series={chartDataOrdersCount.series}
									type='area'
									style={{
										width: "100%",
										height: "100%",
									}}
								/>
							</div>
						</div>
					</div>
					<div className='row mx-4'>
						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										title={pieChart1.title}
										options={pieChart1}
										series={pieChart1.series}
										type='pie'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>

						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										title={pieChart2.title}
										options={pieChart2}
										series={pieChart2.series}
										type='pie'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='row mx-4 my-4'>
						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										title={donutChart2.title}
										options={donutChart2}
										series={donutChart2.series}
										type='donut'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>

						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										title={donutChart1.title}
										options={donutChart1}
										series={donutChart1.series}
										type='donut'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='row mx-4 my-4'>
						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										options={treeMapStates1}
										series={treeMapStates1.series}
										colors={treeMapStates1.colors}
										type='treemap'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>
						<div className='col-md-6 mx-auto'>
							<div className='card'>
								<div className='mx-auto text-center ' style={{ width: "85%" }}>
									<Chart
										options={treeMapStates2}
										series={treeMapStates2.series}
										colors={treeMapStates1.colors}
										title={treeMapStates2.title}
										type='treemap'
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='col-md-9 mx-auto my-5'>
						<div className='card'>
							<h5
								style={{
									textAlign: "center",
									marginTop: "10px",
									fontWeight: "bolder",
									fontSize: "1.1rem",
								}}>
								Top Sold Products By Total Ordered Quantity & Amount (L.E.)
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
										<th scope='col'>Product Name</th>
										<th scope='col'>Ordered Qty</th>
										<th scope='col'>Amount (L.E.)</th>
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
									{TopSoldProducts &&
										TopSoldProducts.map((s, i) => {
											return (
												<tr key={i} className=''>
													<td className='my-auto'>{i + 1}</td>

													<td>{s.productName}</td>
													<td>{s.OrderedQty}</td>
													<td>{s.totalPaidAmount}</td>
													<td style={{ width: "15%", textAlign: "center" }}>
														<img
															width='40%'
															height='40%'
															style={{ marginLeft: "20px" }}
															src={s.productMainImage}
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

					<div className='col-md-9 mx-auto my-5'>
						<div className='card'>
							<h5
								style={{
									textAlign: "center",
									marginTop: "10px",
									fontWeight: "bolder",
									fontSize: "1.1rem",
								}}>
								Top Sold Products & SKU's By Total Ordered Quantity & Amount
								(L.E.)
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
										<th scope='col'>Amount (L.E.)</th>
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
															allColors
																.map((i) => i.hexa)
																.indexOf(s.SubSKUColor)
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
													<td>{s.totalPaidAmount}</td>
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
				</div>
			</div>
		</MainReportsWrapper>
	);
};

export default MainReports;

const MainReportsWrapper = styled.div`
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
`;
