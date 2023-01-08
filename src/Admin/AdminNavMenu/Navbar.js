/** @format */

import React, { useState } from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
	AppstoreOutlined,
	SettingOutlined,
	DesktopOutlined,
	SearchOutlined,
	BellOutlined,
	WindowsOutlined,
	HomeOutlined,
	LogoutOutlined,
	MessageOutlined,
	RocketOutlined,
	DollarCircleOutlined,
	CarOutlined,
	ProjectOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";

import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
// eslint-disable-next-line
import LetterGPhoto from "../../GeneralImages/LetterG.jpg";
import { isAuthenticated, signout } from "../../auth";

const Navbar = ({ fromPage, pageScrolled }) => {
	const [showAccountMenu, setShowAccountMenu] = useState(false);

	const { employeeImage } = isAuthenticated().user;

	return (
		<NavbarWrapper show={pageScrolled}>
			<div className='container-fluid'>
				<div className='row'>
					<div
						className={`${
							pageScrolled
								? "col-xl-8 col-lg-7 col-md-7 col-sm-6 mx-auto itemsLeft"
								: "col-xl-9 col-lg-8 col-md-7 col-sm-6 mx-auto itemsLeft"
						} `}>
						<Menu
							mode='horizontal'
							defaultSelectedKeys={
								fromPage === "AdminDasboard"
									? "/admin/dashboard"
									: fromPage === "AddGender"
									? "/admin/add-gender"
									: fromPage === "AddCategory"
									? "/admin/add-category"
									: fromPage === "UpdateProduct"
									? "/admin/update-product"
									: fromPage === "AddSubcategory"
									? "/admin/add-subcategory"
									: fromPage === "CreateNewOrder"
									? "/admin/create-new-order"
									: fromPage === "UpdateShippingOption"
									? "/admin/update-shipping-carrier"
									: fromPage === "AddShippingOption"
									? "/admin/add-shipping-carrier"
									: fromPage === "OrdersHist"
									? "/admin/orders-hist"
									: fromPage === "OrdersList"
									? "/admin/orders-list"
									: fromPage === "MainReports"
									? "/admin/gq-reports/sales"
									: "/admin/dashboard"
							}>
							<Menu.Item key='/admin/dashboard' icon={<HomeOutlined />}>
								<Link to='/admin/dashboard'>Owner Dashboard</Link>
							</Menu.Item>
							<Menu.SubMenu
								key='SubMenu'
								title='Sales'
								icon={<SettingOutlined />}>
								<Menu.Item
									key='/admin/gq-reports/sales'
									icon={<AppstoreOutlined />}>
									<Link to='/admin/gq-reports/sales'>Day Over Day Sales</Link>
								</Menu.Item>
								<Menu.Item key='/admin/orders-list' icon={<AppstoreOutlined />}>
									<Link to='/admin/orders-list'>Pending Sales</Link>
								</Menu.Item>
								<Menu.Item key='/admin/orders-hist' icon={<AppstoreOutlined />}>
									<Link to='/admin/orders-hist'>Sales History</Link>
								</Menu.Item>
								<Menu.ItemGroup title='Top Trending'>
									<Menu.Item
										key='/admin/gq-reports/sales'
										icon={<AppstoreOutlined />}>
										<Link
											to='/admin/gq-reports/sales'
											onClick={() => {
												window.scrollTo({ top: 3500, behavior: "smooth" });
											}}>
											Top Sold Items
										</Link>
									</Menu.Item>
									<Menu.Item key='five' icon={<AppstoreOutlined />}>
										Top Employee Performance
									</Menu.Item>
								</Menu.ItemGroup>
							</Menu.SubMenu>

							<Menu.SubMenu
								key='SubMenu2'
								title='Modules'
								icon={<DesktopOutlined />}>
								<Menu.Item
									key='/admin/update-product'
									icon={<RocketOutlined />}>
									Products And Inventory
								</Menu.Item>
								<Menu.Item key='eleven' icon={<DollarCircleOutlined />}>
									Financial
								</Menu.Item>
								<Menu.Item
									key='/admin/add-shipping-carrier'
									icon={<CarOutlined />}>
									Shipping / Carriers
								</Menu.Item>
								<Menu.Item key='/admin/add-category' icon={<ProjectOutlined />}>
									Categories Management
								</Menu.Item>
								<Menu.Item
									key='/admin/add-gender'
									icon={<UsergroupAddOutlined />}>
									Gender Management
								</Menu.Item>
							</Menu.SubMenu>
						</Menu>
					</div>

					<div
						className={`${
							pageScrolled
								? "col-xl-4 col-lg-5 col-md-5 col-sm-6 mx-auto rightList"
								: "col-xl-3 col-lg-4 col-md-5 col-sm-6 mx-auto rightList"
						}`}>
						<ul>
							<li>
								<SearchOutlined />
							</li>
							<li>
								<BellOutlined />
							</li>
							<li>
								<WindowsOutlined />
							</li>

							<li>
								<div
									className='blink'
									style={{
										fontSize: "3px",
										padding: "2.5px",
										position: "fixed",
										marginLeft: "9px",
										top: "14px",
										borderRadius: "50%",
										// display: "inherit",
										// background: "#00ff00",
									}}></div>
								<MessageOutlined />
							</li>
							<li
								onMouseOver={() => setShowAccountMenu(true)}
								onMouseLeave={() => setShowAccountMenu(false)}
								onClick={() => {
									// window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<img src={employeeImage} alt='GQShop' />
								<CSSTransition
									in={showAccountMenu}
									timeout={200}
									classNames='subMenuWrapper'
									unmountOnExit={showAccountMenu ? false : true}
									onEnter={() => setShowAccountMenu(showAccountMenu)}
									// onExited={() => setShowAccountMenu(!showAccountMenu)}
								>
									<ul className='subMenuWrapper'>
										<li
											className='subMenuList'
											onClick={() => {
												setShowAccountMenu(!showAccountMenu);
												signout(() => {
													window.location.reload(false);
												});
											}}>
											{isAuthenticated().user.name} Account!
											<br />
											<br />
											<LogoutOutlined />
											{"   "} <span style={{ color: "#ffd8d8" }}>Logout</span>
										</li>
									</ul>
								</CSSTransition>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</NavbarWrapper>
	);
};

export default Navbar;

const NavbarWrapper = styled.div`
	background: white !important;
	margin-bottom: 20px;
	z-index: 1000 !important;
	padding-top: 5px;
	padding-bottom: 5px;
	position: ${(props) => (props.show ? "fixed" : "")};
	width: ${(props) => (props.show ? "100%" : "100%")};

	.ant-menu-horizontal {
		border-bottom: 1px white solid;
	}

	.rightList > ul {
		list-style-type: none;
		/* background: white; */
		position: fixed;
		position: ${(props) => (props.show ? "" : "fixed")};
		z-index: 1000 !important;
	}

	.blink {
		background: ${(props) => (props.show ? "#00ff00 !important" : "#00ff00")};
	}

	.rightList > ul > li {
		display: inline-block;
		margin-left: 15px;
		font-size: 1.5rem;
		color: #b6b6b6;
		font-weight: bold !important;
		transition: 0.3s;
		margin-top: 5px;
		padding-right: 5px;
		padding-left: 5px;
		padding-bottom: 10px;
	}

	.rightList > ul > li:hover {
		background: #d8ebff;
		transition: 0.3s;
		border-radius: 3px;
		padding-right: 5px;
		padding-left: 5px;
		padding-bottom: 10px;
		cursor: pointer;
	}

	.rightList > ul > li > img {
		width: 28px;
		object-fit: cover;
		border-radius: 5px;
	}

	.subMenuWrapper {
		position: absolute;
		background: #00458a;
		border-radius: 5px;
		padding: 20px;
		right: 0px;
		margin-top: 8px;
		z-index: 1000;
	}

	.subMenuList {
		display: block;
		color: white !important;
		font-size: 0.9rem;
		z-index: 1000;
	}

	.subMenuList a {
		display: block;
		color: white !important;
		font-size: 0.9rem;
		font-weight: bold;
		z-index: 1000;
	}

	.subMenuWrapper-enter {
		opacity: 0;
		transform: scale(0.4);
	}
	.subMenuWrapper-enter-active {
		opacity: 1;
		transform: translateX(0);
		transition: opacity 300ms, transform 300ms;
	}
	.subMenuWrapper-exit {
		opacity: 1;
	}
	.subMenuWrapper-exit-active {
		opacity: 0;
		transform: scale(0.9);
		transition: opacity 200ms, transform 200ms;
	}

	@media (max-width: 1830px) {
		.rightList > ul > li {
			display: inline-block;
			margin-left: 10px;
			font-size: 1.6rem;
			color: #b6b6b6;
			font-weight: bold !important;
			transition: 0.3s;
			margin-top: 5px;
			padding-right: 2px;
			padding-left: 2px;
			padding-bottom: 10px;
		}

		.rightList > ul > li:hover {
			background: #d8ebff;
			transition: 0.3s;
			border-radius: 3px;
			padding-right: 2px;
			padding-left: 2px;
			padding-bottom: 10px;
			cursor: pointer;
		}

		.rightList > ul > li > img {
			width: 25px;
			object-fit: cover;
			border-radius: 5px;
		}

		.itemsLeft > ul > li {
			font-size: 0.8rem;
			margin: 0px !important;
			padding-left: 0px !important;
		}
	}

	@media (max-width: 875px) {
		.itemsLeft > ul > li {
			font-size: 0.7rem;
			margin: 0px !important;
			padding-left: 0px !important;
		}
	}

	@media (max-width: 750px) {
		.itemsLeft {
			display: none !important;
		}

		.rightList {
			margin-left: ${(props) =>
				props.show ? "35% !important" : "35% !important"};
			background: white;
			padding-bottom: ${(props) =>
				props.show ? "4px !important" : "50px !important"};
		}
	}
`;
