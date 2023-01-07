/** @format */
// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
// eslint-disable-next-line
import { isAuthenticated } from "../auth";
// import CartButtons from "./CartButtons";
import styled from "styled-components";
import { useCartContext } from "../Checkout/cart_context";
import { FaTrash, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import DarkBackground from "./DarkBackground";
import { allLoyaltyPointsAndStoreStatus, getColors } from "../apiCore";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "black",
			fontWeight: "bold",
			textDecoration: "underline",
		};
	} else {
		return { color: "darkGrey", fontWeight: "bold" };
	}
};

// eslint-disable-next-line
const isActive2 = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#e8f3ff",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#ffffff", fontWeight: "bold" };
	}
};

const NavbarBottom = ({ history, chosenLanguage }) => {
	// const [click, setClick] = useState(false);
	//
	const [allColors, setAllColors] = useState([]);
	const [logoImage, setLogoImage] = useState("");

	const {
		cart,
		total_items,
		// clearCart,
		removeItem,
		toggleAmount,
		total_amount,
		openSidebar,
		changeSize,
		changeColor,
		closeSidebar,
		isSidebarOpen,
	} = useCartContext();

	const gettingAllColors = () => {
		getColors().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLogoImage(
					data &&
						data[data.length - 1] &&
						data[data.length - 1].addStoreLogo &&
						data[data.length - 1].addStoreLogo[0] &&
						data[data.length - 1].addStoreLogo[0],
				);
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		getOnlineStoreName();
		// eslint-disable-next-line
	}, []);

	// const handleSidebar = () => {
	// 	setClick(!click);
	// };

	var checkingAvailability = [];

	const sideCart = () => {
		return (
			<SideWrapper show={isSidebarOpen}>
				<div
					onClick={closeSidebar}
					className='float-right mr-3'
					style={{ fontSize: "15px", color: "black", cursor: "pointer" }}>
					<FaTimes />
				</div>
				{cart && cart.length === 0 ? (
					<div style={{ marginTop: "80px" }}>
						<h3
							style={{
								textAlign: "center",
								fontWeight: "bolder",
								color: "darkcyan",
							}}>
							Your Cart Is Empty
						</h3>
					</div>
				) : (
					<div className='cellPhoneLayout mt-5'>
						{cart &&
							cart.length > 0 &&
							cart.map((i, k) => {
								var productColors =
									i.allProductDetailsIncluded.productAttributes.map(
										(iii) => iii.color,
									);
								var uniqueProductColors = [
									...new Map(
										productColors.map((item) => [item, item]),
									).values(),
								];

								var productSizes =
									i.allProductDetailsIncluded.productAttributes.map(
										(iii) => iii.size,
									);
								var uniqueProductSizes = [
									...new Map(productSizes.map((item) => [item, item])).values(),
								];

								var chosenAttribute =
									i.allProductDetailsIncluded.productAttributes.filter(
										(iii) => iii.color === i.color && iii.size === i.size,
									)[0];

								if (i.allProductDetailsIncluded.activeBackorder) {
									checkingAvailability.push(true);
								} else {
									checkingAvailability.push(
										chosenAttribute.quantity >= i.amount,
									);
								}

								const increase = () => {
									toggleAmount(i.id, "inc", chosenAttribute, i.max);
								};
								const decrease = () => {
									toggleAmount(i.id, "dec", chosenAttribute, i.max);
								};

								return (
									<div key={k} className='mt-2'>
										<div className='row mx-auto'>
											<div className='col-3'>
												<span>
													<img
														src={i.image}
														alt={i.name}
														style={{ width: "80px", height: "80px" }}
													/>
												</span>
											</div>
											<div className='col-9 mx-auto my-auto'>
												<div
													style={{
														fontSize: "14px",
														fontWeight: "bold",
														marginLeft: "14px",
														textTransform: "capitalize",
													}}>
													{i.name}
												</div>
												<div
													style={{
														fontSize: "14px",
														fontWeight: "bold",
														marginLeft: "14px",
														marginTop: "3px",
														textTransform: "capitalize",
													}}>
													{i.categoryName}
												</div>

												<div
													className=''
													style={{
														fontSize: "13px",
														fontWeight: "bold",
														marginTop: "6px",
														marginLeft: "14px",
														textTransform: "capitalize",
														color: "#7b7b7b",
													}}>
													Size:{" "}
													<select
														className='w-50 ml-2'
														style={{
															textTransform: "uppercase",
															border: "1px solid lightgrey",
														}}
														onChange={(e) => {
															var chosenAttribute2 =
																i.allProductDetailsIncluded.productAttributes.filter(
																	(iii) =>
																		iii.color === i.color &&
																		iii.size.toLowerCase() ===
																			e.target.value.toLowerCase(),
																)[0];
															changeSize(
																i.id,
																e.target.value,
																i.color,
																chosenAttribute2.quantity,
																i.size,
															);
														}}>
														<option style={{ textTransform: "capitalize" }}>
															{i.size}
														</option>

														{uniqueProductSizes &&
															uniqueProductSizes.map((ss, ii) => {
																return (
																	<option key={ii} value={ss}>
																		{ss}
																	</option>
																);
															})}
													</select>
												</div>

												<div
													className=''
													style={{
														fontSize: "13px",
														fontWeight: "bold",
														marginTop: "3px",
														marginLeft: "14px",
														textTransform: "capitalize",
														color: "#7b7b7b",
													}}>
													Color:{" "}
													<select
														className='w-50'
														style={{
															textTransform: "uppercase",
															border: "1px solid lightgrey",
														}}
														onChange={(e) => {
															var chosenColorImageHelper =
																i.allProductDetailsIncluded.productAttributes.filter(
																	(iii) => iii.color === e.target.value,
																)[0];

															var chosenColorImage =
																chosenColorImageHelper &&
																chosenColorImageHelper.productImages &&
																chosenColorImageHelper.productImages[0] &&
																chosenColorImageHelper.productImages[0].url;

															var chosenAttribute2 =
																i.allProductDetailsIncluded.productAttributes.filter(
																	(iii) =>
																		iii.color.toLowerCase() ===
																			e.target.value.toLowerCase() &&
																		iii.size.toLowerCase() === i.size,
																)[0];
															changeColor(
																i.id,
																e.target.value,
																i.size,
																chosenColorImage,
																chosenAttribute2.quantity,
																i.color,
															);
														}}>
														<option style={{ textTransform: "capitalize" }}>
															{allColors &&
																allColors[
																	allColors
																		.map((ii) => ii.hexa)
																		.indexOf(i.color)
																] &&
																allColors[
																	allColors
																		.map((ii) => ii.hexa)
																		.indexOf(i.color)
																].color}
														</option>

														{uniqueProductColors &&
															uniqueProductColors.map((cc, ii) => {
																return (
																	<option key={ii} value={cc}>
																		{allColors &&
																			allColors[
																				allColors
																					.map((ii) => ii.hexa)
																					.indexOf(cc)
																			] &&
																			allColors[
																				allColors
																					.map((ii) => ii.hexa)
																					.indexOf(cc)
																			].color}
																	</option>
																);
															})}
													</select>
												</div>

												<div
													style={{
														fontSize: "14px",
														fontWeight: "bold",
														marginTop: "6px",
														marginLeft: "14px",
														textTransform: "capitalize",
														color: "#7b7b7b",
													}}>
													{Number(i.priceAfterDiscount * i.amount).toFixed(2)}{" "}
													EGP
												</div>

												<div
													style={{
														fontSize: "12px",
														fontWeight: "bold",
														marginLeft: "10px",
														marginTop: "10px",
														textTransform: "capitalize",
														color: "darkgreen",
													}}>
													{i.allProductDetailsIncluded
														.activeBackorder ? null : chosenAttribute.quantity >=
													  i.amount ? null : (
														<span style={{ color: "red" }}>
															Unavailable Stock
														</span>
													)}
												</div>

												{chosenLanguage === "Arabic" ? (
													<div
														className='buttons-up-down'
														style={{
															fontSize: "12px",
															fontWeight: "bold",
															marginLeft: "15px",
															marginTop: "10px",
															textTransform: "capitalize",
															color: "darkgreen",
														}}>
														<button
															type='button'
															className='amount-btn'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "8px 13px",
															}}
															onClick={decrease}>
															<FaMinus />
														</button>
														<span
															className='amount my-auto mx-auto'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "black",
																padding: "9px 14px 11px 14px",
															}}>
															{i.amount}
														</span>
														<button
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "8px 13px",
															}}
															type='button'
															className='amount-btn'
															onClick={increase}>
															<FaPlus />
														</button>
													</div>
												) : (
													<div
														className='buttons-up-down'
														style={{
															fontSize: "12px",
															fontWeight: "bold",
															marginLeft: "15px",
															marginTop: "10px",
															textTransform: "capitalize",
															color: "darkgreen",
														}}>
														<button
															type='button'
															className='amount-btn'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "8px 13px",
															}}
															onClick={decrease}>
															<FaMinus />
														</button>
														<span
															className='amount my-auto mx-auto'
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "black",
																padding: "9px 14px 11px 14px",
															}}>
															{i.amount}
														</span>
														<button
															style={{
																border: "lightgrey solid 1px",
																backgroundColor: "white",
																color: "darkgrey",
																padding: "8px 13px",
															}}
															type='button'
															className='amount-btn'
															onClick={increase}>
															<FaPlus />
														</button>
													</div>
												)}

												<button
													type='button'
													style={{
														marginLeft: "250px",
														color: "red",
														border: "none",
														fontWeight: "bold",
													}}
													onClick={() => removeItem(i.id, i.size, i.color)}>
													<FaTrash />
												</button>
											</div>
										</div>

										<hr />
									</div>
								);
							})}

						<div
							className='row'
							style={{
								fontSize: "14px",
								fontWeight: "bold",
								marginLeft: "14px",
								marginTop: "3px",
								textTransform: "capitalize",
							}}>
							<div className='col-6'>TOTAL AMOUNT</div>
							<div className='col-6'>{Number(total_amount).toFixed(2)} EGP</div>
						</div>
						<hr />

						<div className='link-container' onClick={closeSidebar}>
							<div className='link-btn-wrapper'>
								<Link
									style={{ background: "#007db5" }}
									to='/cart'
									className='link-btn btn-block w-75 mx-auto text-center py-2'
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}>
									Check Out
								</Link>
							</div>

							<div className='link-btn-wrapper mt-2'>
								<Link
									style={{ background: "#5d5d5d" }}
									to='/our-products'
									className='link-btn btn-block w-75 mx-auto text-center py-2'
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}>
									continue shopping
								</Link>
							</div>
						</div>
					</div>
				)}
			</SideWrapper>
		);
	};
	const storeLogo = logoImage;
	var index = storeLogo.indexOf("upload");

	var finalLogoUrl =
		storeLogo.substr(0, index + 6) +
		"/e_bgremoval" +
		storeLogo.substr(index + 6);

	return (
		<Nav
			className=' navbar  navbar-expand-sm'
			style={{ backgroundColor: "	white" }}>
			<div className='logo-type ml-5 logoWrapper'>
				<Link
					to='/'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}>
					<div className='infiniteAppsLogo p-0'>
						<img
							className='imgLogo p-0'
							src={finalLogoUrl}
							alt='Infinite Apps'
						/>
					</div>
					{/* <div
						className='logo-type ml-1'
						style={{ color: "black", fontSize: "18px" }}>
						{onlineStoreName} <br />
					</div> */}
				</Link>
			</div>
			{isSidebarOpen ? <DarkBackground isSidebarOpen={isSidebarOpen} /> : null}
			<div
				className='collapse navbar-collapse '
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<ul
					className='navbar-nav mx-auto navbar-expand '
					style={{ backgroundColor: "	white" }}>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/")}
							to='/'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							{chosenLanguage === "Arabic" ? (
								<span
									style={{
										fontFamily: "Droid Arabic Kufi",
										letterSpacing: "0px",
									}}>
									الصفحة الرئيسية
								</span>
							) : (
								"Home"
							)}
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/our-products")}
							to='/our-products'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							{chosenLanguage === "Arabic" ? (
								<span
									style={{
										fontFamily: "Droid Arabic Kufi",
										letterSpacing: "0px",
									}}>
									منتجاتنا
								</span>
							) : (
								"Our Products"
							)}
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/contact")}
							to='/contact'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							{chosenLanguage === "Arabic" ? (
								<span
									style={{
										fontFamily: "Droid Arabic Kufi",
										letterSpacing: "0px",
									}}>
									اتصل بنا
								</span>
							) : (
								"Contact Us"
							)}
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							{chosenLanguage === "Arabic" ? (
								<span
									style={{
										fontFamily: "Droid Arabic Kufi",
										letterSpacing: "0px",
									}}>
									من نحن
								</span>
							) : (
								"About Us"
							)}
						</Link>
					</li>

					{/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item ml-5'>
							<Link
								className='nav-link'
								style={isActive2(history, "/user-dashboard/last-purchase")}
								to='/user-dashboard/last-purchase'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								My Dasboard/Account
								{chosenLanguage === "Arabic" ? "حسابي" : "My Dasboard/Account"}
							</Link>
						</li>
					)} */}

					{/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/user-dashboard/last-purchase")}
								to='/user-dashboard/last-purchase'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Owner Regular Account
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/admin/dashboard")}
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Owner Dashboard
							</Link>
						</li>
					)} */}
					{/* {isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/user-dashboard/last-purchase")}
								to='/user-dashboard/last-purchase'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Stylist Regular Account
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/stylist/dashboard")}
								to='/stylist/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Stylist Dashboard
							</Link>
						</li>
					)} */}
				</ul>
			</div>
			<span
				style={{ color: "black", fontSize: "20px", cursor: "pointer" }}
				className='mr-3'
				onClick={() => {
					history.push("/cart");
				}}>
				Cart
			</span>
			<div className='nav-cart mr-5 mt-2'>
				{/* <FaCartPlus className="nav-icon" onClick={handleCart} /> */}
				<div
					style={{ cursor: "pointer" }}
					// to='/cart'
					onClick={isSidebarOpen ? closeSidebar : openSidebar}>
					<sup>
						<small className='cart-badge'>{total_items}</small>
					</sup>
					<i
						className='fa fa-cart-plus faaaa-bars'
						style={{ color: "black", fontSize: "20px" }}
						aria-hidden='true'></i>
				</div>

				{sideCart()}
			</div>
			<hr />
		</Nav>
	);
};

export default withRouter(NavbarBottom);

const Nav = styled.nav`
	border-top: 1px solid lightgray;
	border-bottom: 1px solid lightgray;
	/* margin-top: 5px; */
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 120;

	.infiniteAppsLogo {
		display: block;
		width: 63px;
		height: 63px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		border-radius: 15px;
	}

	.imgLogo {
		width: 100% !important;
		height: 100% !important;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
	}

	li a {
		font-size: 0.95rem;
		transition: 0.3s;
		color: darkGrey;
	}

	li {
		margin: 0px 12px 0px 0px;
	}

	li a:hover {
		text-decoration: underline;
		transition: 0.3s;
	}

	.cart-badge {
		border-radius: 20%;
		font-size: 13px;
		font-style: italic;
		color: white;
		text-decoration: none !important;
		display: block;
		margin-left: 18px;
		font-weight: bold;
		background: #c60e0e;
		padding: 6px;
	}

	.nav-item {
		text-transform: uppercase;
	}

	@media (max-width: 900px) {
		li a {
			color: black !important;
			font-size: 0.7rem;
			margin: 0px;
		}
		li {
			margin: 0px 0px 0px 0px;
		}
	}

	@media (max-width: 680px) {
		display: none;
	}
`;

const SideWrapper = styled.nav`
	position: fixed;
	top: 0px;
	right: 0;
	width: 35%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 100;
	border-left: 3px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(220%)")};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}
	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	.link-container {
		margin: auto;
		text-align: center;
	}

	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: grey;
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		text-align: center;
		cursor: pointer;
		width: 75% !important;
	}

	.cellPhoneLayout {
		display: block;
	}

	@media (max-width: 1200px) {
		width: 60%;
	}
`;
