/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import "antd/dist/antd.css";
import {
	ShoppingCartOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	AppstoreAddOutlined,
	MoneyCollectOutlined,
	BorderHorizontalOutlined,
	RadiusBottomleftOutlined,
	SwapOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import LogoImage from "../../GeneralImages/ace-logo.png";
import { isAuthenticated } from "../../auth";
import { getAllUsers } from "../apiAdmin";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	getItem(
		<div className='logoClass'></div>,
		"GQLogo",
		<div
			className='logoClass'
			style={{
				background: "white",
				textAlign: "center",
				padding: "5px",
				marginLeft: "25%",
				marginTop: "5px",
			}}>
			<Link to='/admin/dashboard'>
				<img
					src={LogoImage}
					alt='GQ Logo'
					style={{
						width: "100px",
						objectFit: "cover",
					}}
				/>
			</Link>
		</div>,
	),
	getItem(
		<div className='logoClass'></div>,
		"GQLogo",
		<div
			className='logoClass'
			style={{
				width: "100%",
			}}>
			<hr />
		</div>,
	),
	getItem("Admin Dashboard", "sub1", <PieChartOutlined />, [
		getItem(
			<Link to='/admin/dashboard'>Admin Dashboard</Link>,
			"/admin/dashboard",
		),
		getItem(
			<Link to='/admin/gq-reports/sales'>Sales Report</Link>,
			"/admin/gq-reports/sales",
		),
		getItem(
			<Link to='/admin/gq-reports/stock'>Stock Report (G&Q Hub)</Link>,
			"/admin/gq-reports/stock",
		),

		getItem(
			<Link to='/admin/ace-inventory-report'>Stock Report (Branch)</Link>,
			"/admin/ace-inventory-report",
		),

		getItem(
			<Link to='/admin/gq-reports/operations'>Operations Report</Link>,
			"/admin/gq-reports/operations",
		),
	]),

	getItem("Orders Management", "sub6", <ShoppingCartOutlined />, [
		getItem(
			<Link
				to='/admin/orders-list'
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				Orders List (Pending Orders)
			</Link>,
			"/admin/orders-list",
		),

		getItem(
			<Link
				to='/admin/exchange-or-return'
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				Exchange & Return
			</Link>,
			"/admin/exchange-or-return",
		),

		getItem(
			<Link
				to='/admin/return-list'
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				Return List
			</Link>,
			"/admin/return-list",
		),
		getItem(
			<Link
				to='/admin/exchange-list'
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				Exchange List
			</Link>,
			"/admin/exchange-list",
		),

		getItem(
			<Link
				to='/admin/orders-hist'
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				Sales History
			</Link>,
			"/admin/orders-hist",
		),
	]),

	getItem("Financial Affairs", "sub33", <MoneyCollectOutlined />, [
		getItem("Add Expenses", "/admin/add-expenses"),
		getItem("Financial Report", "/admin/financial-report"),
	]),

	getItem("ACE Store Management", "sub34", <BorderHorizontalOutlined />, [
		getItem(
			<Link to='/admin/ace-receiving'>Ace Store Receiving</Link>,
			"/admin/ace-receiving",
			<AppstoreAddOutlined />,
		),
		getItem(
			<Link to='/admin/ace-receiving-log'>Ace Receiving Log</Link>,
			"/admin/ace-receiving-log",
			<MailOutlined />,
		),
		getItem(
			<Link to='/admin/offline-order-taking'>Onsite Order Taking</Link>,
			"/admin/offline-order-taking",
			<ShoppingOutlined />,
		),
		getItem("ACE Pages", "sub41", <SwapOutlined />, [
			getItem("Contact Us", "/admin/website-edit/contactus-edit"),
			getItem("About Us", "/admin/website-edit/aboutus-edit"),
		]),
		getItem("Ads Carousel", "sub40", <RadiusBottomleftOutlined />, [
			getItem("Add Top Ads", "/admin/add-top-ads"),
			getItem("Update Top Ads", "/admin/update-top-ads"),
		]),
		getItem("Online Store Properties", "/admin/online-store-management"),
		getItem("Add Banners", "/admin/add-hero-comp"),
		getItem("Product Specs", "/admin/product-specs"),
		getItem(
			<Link to='/admin/coupon-management'>Coupons</Link>,
			"/admin/coupon-management",
		),

		getItem(
			<Link to='/admin/print-barcodes'>Print SKUs' Barcode</Link>,
			"/admin/print-barcodes",
		),
	]),
];

const AdminMenu = ({
	fromPage,
	setAdminMenuStatus,
	collapsed,
	setCollapsed,
}) => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions(),
	);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		activeUser: true,
		success: false,
		misMatch: false,
		loading: false,
		employeeImage: "",
		role: 1,
		userRole: "",
	});

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setAdminMenuStatus(!collapsed);
	};

	const { user, token } = isAuthenticated();

	function getWindowDimensions() {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	}

	useEffect(() => {
		if (window.innerWidth <= 1400) {
			setCollapsed(true);
			setAdminMenuStatus(true);
		} else if (fromPage === "AceStoreOrderTaking") {
			setCollapsed(true);
			setAdminMenuStatus(true);
		} else {
			setCollapsed(false);
			setAdminMenuStatus(false);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
			if (getWindowDimensions().width <= 1400) {
				setCollapsed(true);
				setAdminMenuStatus(true);
			} else {
				setCollapsed(false);
				setAdminMenuStatus(false);
			}
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
		// eslint-disable-next-line
	}, [windowDimensions]);

	const gettingAllUsers = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "getting all users error");
			} else {
				setValues({
					...values,
					name:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].name,
					email:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].email,
					role:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].role,

					userRole:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].userRole,

					employeeImage:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].employeeImage,
				});
			}
		});
	};

	useEffect(() => {
		gettingAllUsers();

		// eslint-disable-next-line
	}, []);

	const currUser = JSON.parse(localStorage.getItem("jwt"));

	localStorage.setItem(
		"jwt",
		JSON.stringify({
			...currUser,
			user: { ...currUser.user, userRole: values.userRole },
		}),
	);

	return (
		<AdminMenuWrapper
			show={collapsed}
			style={{
				width: 285,
			}}>
			<Button
				type='primary'
				onClick={toggleCollapsed}
				style={{
					marginBottom: 8,
					textAlign: "center",
					marginLeft: 10,
					marginTop: 3,
				}}>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={
					fromPage === "AdminDasboard"
						? "/admin/dashboard"
						: fromPage === "AddGender"
						? "/admin/add-gender"
						: fromPage === "UpdateGender"
						? "/admin/update-gender"
						: fromPage === "DeleteGender"
						? "/admin/delete-gender"
						: fromPage === "AddCategory"
						? "/admin/add-category"
						: fromPage === "UpdateCategory"
						? "/admin/update-category"
						: fromPage === "DeleteCategory"
						? "/admin/delete-category"
						: fromPage === "AddProduct"
						? "/admin/add-product"
						: fromPage === "UpdateProduct"
						? "/admin/update-product"
						: fromPage === "DeleteProduct"
						? "/admin/delete-product"
						: fromPage === "AddSubcategory"
						? "/admin/add-subcategory"
						: fromPage === "UpdateSubcategory"
						? "/admin/update-subcategory"
						: fromPage === "DeleteSubcategory"
						? "/admin/delete-subcategory"
						: fromPage === "CreateNewOrder"
						? "/admin/create-new-order"
						: fromPage === "UpdateShippingOption"
						? "/admin/update-shipping-carrier"
						: fromPage === "AddShippingOption"
						? "/admin/add-shipping-carrier"
						: fromPage === "DeleteShippingOption"
						? "/admin/delete-shipping-carrier"
						: fromPage === "OrdersHist"
						? "/admin/orders-hist"
						: fromPage === "AddEmployee"
						? "/admin/add-employee"
						: fromPage === "MainReports"
						? "/admin/gq-reports/sales"
						: fromPage === "UpdateEmployee"
						? "/admin/update-employee"
						: fromPage === "AddColor"
						? "/admin/add-color"
						: fromPage === "AddSize"
						? "/admin/add-size"
						: fromPage === "AddStore"
						? "/admin/add-new-store"
						: fromPage === "UpdateStore"
						? "/admin/update-store"
						: fromPage === "DeleteStore"
						? "/admin/delete-store"
						: fromPage === "ReturnOrExchange"
						? "/admin/exchange-or-return"
						: fromPage === "OrdersList"
						? "/admin/orders-list"
						: fromPage === "OrderExchange"
						? "/admin/order-exchange"
						: fromPage === "ReturnList"
						? "/admin/return-list"
						: fromPage === "StockReport"
						? "/admin/gq-reports/stock"
						: fromPage === "OnlineStoreManagement"
						? "/admin/online-store-management"
						: fromPage === "UpdateTopAds"
						? "/admin/update-top-ads"
						: fromPage === "AddTopAds"
						? "/admin/add-top-ads"
						: fromPage === "AddHero"
						? "/admin/add-hero-comp"
						: fromPage === "OperationsReport"
						? "/admin/gq-reports/operations"
						: fromPage === "ExchangeList"
						? "/admin/exchange-list"
						: fromPage === "ProductSpecs"
						? "/admin/product-specs"
						: fromPage === "CouponManagement"
						? "/admin/coupon-management"
						: fromPage === "AceStoreSales"
						? "/admin/ace-orders-list"
						: fromPage === "WebsiteEditAbout"
						? "/admin/website-edit/aboutus-edit"
						: fromPage === "WebsiteEditContact"
						? "/admin/website-edit/contactus-edit"
						: fromPage === "AceStoreReceiving"
						? "/admin/ace-receiving"
						: fromPage === "AceStoreOrderTaking"
						? "/admin/offline-order-taking"
						: fromPage === "PrintBarcodes"
						? "/admin/print-barcodes"
						: fromPage === "AceInventory"
						? "/admin/ace-inventory-report"
						: fromPage === "AceReceivingLog"
						? "/admin/ace-receiving-log"
						: "/admin/dashboard"
				}
				defaultOpenKeys={[
					"sub1",

					fromPage === "AceStoreSales" ||
					fromPage === "AceStoreReceiving" ||
					fromPage === "PrintBarcodes" ||
					fromPage === "CouponManagement" ||
					fromPage === "ProductSpecs"
						? "sub34"
						: null,

					fromPage === "CreateNewOrder" ||
					// fromPage === "AdminDasboard" ||
					fromPage === "OrdersHist" ||
					fromPage === "OrderExchange" ||
					fromPage === "OrdersList" ||
					fromPage === "ReturnList" ||
					fromPage === "ExchangeList" ||
					fromPage === "OrderReturn" ||
					fromPage === "ReturnOrExchange"
						? "sub6"
						: null,

					// "sub4",

					// "sub6",
				]}
				mode='inline'
				theme='dark'
				inlineCollapsed={collapsed}
				items={items}
				onClick={(e) => <Redirect to={e.key} />}
			/>
		</AdminMenuWrapper>
	);
};

export default AdminMenu;

const AdminMenuWrapper = styled.div`
	margin-left: 3px;
	margin-bottom: 15px;
	background: ${(props) => (props.show ? "" : "#1e1e2d")};
	top: 0px !important;
	position: fixed;
	z-index: 20000;
	overflow: auto;
	height: ${(props) => (props.show ? "" : "100%")} !important;

	.logoClass {
		display: ${(props) => (props.show ? "none " : "block")} !important;
	}

	li {
		/* margin: 20px auto; */
		font-size: 0.9rem;
		margin-bottom: ${(props) => (props.show ? "15px " : "15px")};
	}

	ul {
	}

	hr {
		color: white !important;
		background: white !important;
	}

	.ant-menu.ant-menu-inline-collapsed {
		min-height: 850px;
		/* position: fixed; */
	}

	button {
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark .ant-menu-sub,
	.ant-menu.ant-menu-dark .ant-menu-sub {
		color: rgba(255, 255, 255, 0.65);
		background: #1e1e2d !important;
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark {
		position: ${(props) => (props.show ? "fixed" : "")};
	}

	@media (max-width: 1650px) {
		background: ${(props) => (props.show ? "" : "transparent")};

		ul {
			width: 250px;
			padding: 0px !important;
			margin: 0px !important;
		}

		ul > li {
			font-size: 0.8rem !important;
		}
	}

	@media (max-width: 750px) {
		ul {
			display: ${(props) => (props.show ? "none" : "")};
			margin-top: 0px !important;
			top: 0px !important;
		}

		.ant-menu.ant-menu-dark {
			/* position: fixed; */
		}

		button {
			margin-top: 15px !important;
		}
	}
`;
