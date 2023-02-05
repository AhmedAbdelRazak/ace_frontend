/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
// eslint-disable-next-line
import { FaTrash, FaMinus, FaPlus, FaTimes, FaRegHeart } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { signout, isAuthenticated } from "../auth";
import styled from "styled-components";
import { useCartContext } from "../Checkout/cart_context";
import DarkBackground from "./DarkBackground";
import {
	allLoyaltyPointsAndStoreStatus,
	getColors,
	getProducts,
} from "../apiCore";
import Sidebar from "./Sidebar";
import EgyptianFlag from "../GeneralImages/Egypt.png";
import AmericanFlag from "../GeneralImages/UnitedStates.png";
import DarkBackground2 from "./DarkBackground2";
import SigninModal from "../pages/SingleProduct/SigninModal/SigninModal";
// import logo from "../pagesImgs/Sinai-I-Logo.jpg";

const NavbarTop = ({ history, language, setLanguage, chosenLanguage }) => {
	const {
		cart,
		total_items,
		// clearCart,
		removeItem,
		toggleAmount,
		total_amount,
		openSidebar,
		closeSidebar,
		isSidebarOpen,
		openSidebar2,
		closeSidebar2,
		isSidebarOpen2,
		changeSize,
		changeColor,
	} = useCartContext();

	// eslint-disable-next-line
	const [logoImage, setLogoImage] = useState("");
	// eslint-disable-next-line
	const [onlineStoreName, setOnlineStoreName] = useState("");
	const [allColors, setAllColors] = useState([]);
	const [allGenders, setAllGenders] = useState([]);
	const [modalVisible3, setModalVisible3] = useState(false);

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
				setOnlineStoreName(
					data && data[data.length - 1] && data[data.length - 1].addStoreName,
				);
			}
		});
	};

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				//Gender Unique
				var genderUnique = data
					.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					)
					.map((ii) => ii.gender);

				let uniqueGenders = [
					...new Map(
						genderUnique.map((item) => [item["genderName"], item]),
					).values(),
				];
				setAllGenders(uniqueGenders);
			}
		});
	};

	useEffect(() => {
		getOnlineStoreName();
		gettingAllProducts();
		// eslint-disable-next-line
	}, []);

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
		gettingAllColors();

		// eslint-disable-next-line
	}, []);

	const storeLogo = logoImage;
	var index = storeLogo && storeLogo.indexOf("upload");

	// eslint-disable-next-line
	var finalLogoUrl =
		storeLogo.substr(0, index + 6) +
		"/e_bgremoval" +
		storeLogo.substr(index + 6);

	// console.log(logoImage);
	var checkingAvailability = [];

	const sideCart = () => {
		return (
			<SideWrapperCart show={isSidebarOpen}>
				<div
					onClick={closeSidebar}
					className='float-right mr-3'
					style={{ fontSize: "20px", color: "#c60e0e", cursor: "pointer" }}>
					<FaTimes />
				</div>
				<div
					className='text-center mt-3'
					style={{
						fontWeight: "bold",
						fontSize: "1rem",
						textDecoration: "underline",
					}}>
					Shopping Bag
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
						{cart.map((i, k) => {
							var productColors =
								i.allProductDetailsIncluded.productAttributes.map(
									(iii) => iii.color,
								);
							var uniqueProductColors = [
								...new Map(productColors.map((item) => [item, item])).values(),
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
								checkingAvailability.push(chosenAttribute.quantity >= i.amount);
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
													fontSize: "15px",
													fontWeight: "bold",
													marginLeft: "14px",
													textTransform: "capitalize",
													color: "#545454",
												}}>
												{i.name}
											</div>
											<div
												style={{
													fontSize: "15px",
													fontWeight: "bold",
													marginLeft: "14px",
													marginTop: "3px",
													textTransform: "capitalize",
													color: "#545454",
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
																allColors.map((ii) => ii.hexa).indexOf(i.color)
															] &&
															allColors[
																allColors.map((ii) => ii.hexa).indexOf(i.color)
															].color}
													</option>

													{uniqueProductColors &&
														uniqueProductColors.map((cc, ii) => {
															return (
																<option key={ii} value={cc}>
																	{allColors &&
																		allColors[
																			allColors.map((ii) => ii.hexa).indexOf(cc)
																		] &&
																		allColors[
																			allColors.map((ii) => ii.hexa).indexOf(cc)
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
												{Number(i.priceAfterDiscount * i.amount).toFixed(2)} EGP
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
												className='trashIcon'
												type='button'
												style={{
													marginLeft: "230px",
													color: "black",
													border: "none",
													fontWeight: "bold",
													fontSize: "0.8rem",
												}}
												onClick={() => removeItem(i.id, i.size, i.color)}>
												Remove
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
			</SideWrapperCart>
		);
	};

	return (
		<Nav
			className=' navbar  navbar-expand-sm nav-center py-0'
			style={{ backgroundColor: "white" }}>
			{isSidebarOpen ? <DarkBackground isSidebarOpen={isSidebarOpen} /> : null}
			{isSidebarOpen2 ? (
				<DarkBackground2 isSidebarOpen2={isSidebarOpen2} />
			) : null}
			<Sidebar
				setLanguage={setLanguage}
				language={language}
				allGenders={allGenders}
			/>

			<div className='logo-type  logoWrapper'>
				<Link
					to='/'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}>
					<div className='infiniteAppsLogo'>
						<img className='imgLogo' src={finalLogoUrl} alt='Infinite Apps' />
					</div>
				</Link>
			</div>

			<div className='collapse navbar-collapse '>
				<ul className='navbar-nav actual-list ml-auto'>
					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/user/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "black",
									// textDecoration: "underline",
									// fontWeight: "bold",
									marginRight: "20px",
									// fontStyle: "italic",
								}}>
								<svg
									className='Styles__AccountIcon-d7nzgu-1 pWXnP'
									width='17'
									height='17'
									style={{ marginRight: "5px", marginBottom: "2px" }}
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									role='img'
									aria-labelledby='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
									<title id='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
										Account
									</title>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M13.5 4.79092C13.5 2.53192 11.4849 0.700012 9 0.700012L8.782 0.704731C6.39831 0.808141 4.5 2.59836 4.5 4.79092V5.6091C4.5 7.8681 6.5151 9.70001 9 9.70001L9.218 9.69529C11.6017 9.59188 13.5 7.80166 13.5 5.6091V4.79092ZM8.84702 2.20332L9.014 2.19901L9.18583 2.20488C10.7822 2.28873 12 3.44567 12 4.79092V5.6091L11.9946 5.76395C11.9049 7.04676 10.7094 8.12918 9.15298 8.1967L8.96754 8.20036L8.78519 8.19546C7.21783 8.1113 6 6.95435 6 5.6091V4.79092L6.0054 4.63607C6.09507 3.35326 7.29059 2.27084 8.84702 2.20332ZM15.3594 12.6468C13.6548 12.1815 11.3274 11.7 9 11.7C6.6726 11.7 4.3452 12.1815 2.6406 12.6468C1.0773 13.0725 0 14.4972 0 16.1172V18H18V16.1172L17.9949 15.9238C17.913 14.3848 16.8602 13.0555 15.3594 12.6468ZM3.03471 14.0941C5.07704 13.5366 7.12428 13.2 9 13.2C10.8757 13.2 12.923 13.5366 14.9644 14.0939L15.1214 14.1434C15.9428 14.4386 16.5 15.2247 16.5 16.1172V16.499H1.5V16.1172L1.50646 15.9512C1.57496 15.0735 2.1823 14.3262 3.03471 14.0941Z'
										fill='black'></path>
								</svg>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "black",
									// textDecoration: "underline",
									// fontWeight: "bold",
									marginRight: "20px",
									// fontStyle: "italic",
								}}>
								<svg
									className='Styles__AccountIcon-d7nzgu-1 pWXnP'
									width='17'
									height='17'
									style={{ marginRight: "5px", marginBottom: "2px" }}
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									role='img'
									aria-labelledby='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
									<title id='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
										Account
									</title>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M13.5 4.79092C13.5 2.53192 11.4849 0.700012 9 0.700012L8.782 0.704731C6.39831 0.808141 4.5 2.59836 4.5 4.79092V5.6091C4.5 7.8681 6.5151 9.70001 9 9.70001L9.218 9.69529C11.6017 9.59188 13.5 7.80166 13.5 5.6091V4.79092ZM8.84702 2.20332L9.014 2.19901L9.18583 2.20488C10.7822 2.28873 12 3.44567 12 4.79092V5.6091L11.9946 5.76395C11.9049 7.04676 10.7094 8.12918 9.15298 8.1967L8.96754 8.20036L8.78519 8.19546C7.21783 8.1113 6 6.95435 6 5.6091V4.79092L6.0054 4.63607C6.09507 3.35326 7.29059 2.27084 8.84702 2.20332ZM15.3594 12.6468C13.6548 12.1815 11.3274 11.7 9 11.7C6.6726 11.7 4.3452 12.1815 2.6406 12.6468C1.0773 13.0725 0 14.4972 0 16.1172V18H18V16.1172L17.9949 15.9238C17.913 14.3848 16.8602 13.0555 15.3594 12.6468ZM3.03471 14.0941C5.07704 13.5366 7.12428 13.2 9 13.2C10.8757 13.2 12.923 13.5366 14.9644 14.0939L15.1214 14.1434C15.9428 14.4386 16.5 15.2247 16.5 16.1172V16.499H1.5V16.1172L1.50646 15.9512C1.57496 15.0735 2.1823 14.3262 3.03471 14.0941Z'
										fill='black'></path>
								</svg>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link '
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "black",
									// textDecoration: "underline",
									// fontWeight: "bold",
									marginRight: "20px",
									// fontStyle: "italic",
								}}>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{!isAuthenticated() && (
						<Fragment>
							<li className='nav-item'>
								<Link
									className='nav-link  '
									to='/signin'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "black",
										textDecoration: "underline",
										// fontWeight: "bold",
										marginRight: "20px",
										// fontStyle: "italic",
									}}>
									<svg
										className='Styles__AccountIcon-d7nzgu-1 pWXnP'
										width='17'
										height='17'
										style={{ marginRight: "5px", marginBottom: "2px" }}
										viewBox='0 0 20 20'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										role='img'
										aria-labelledby='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
										<title id='00ea8e94-2216-4b64-acff-4d2fb3126ffb'>
											Account
										</title>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M13.5 4.79092C13.5 2.53192 11.4849 0.700012 9 0.700012L8.782 0.704731C6.39831 0.808141 4.5 2.59836 4.5 4.79092V5.6091C4.5 7.8681 6.5151 9.70001 9 9.70001L9.218 9.69529C11.6017 9.59188 13.5 7.80166 13.5 5.6091V4.79092ZM8.84702 2.20332L9.014 2.19901L9.18583 2.20488C10.7822 2.28873 12 3.44567 12 4.79092V5.6091L11.9946 5.76395C11.9049 7.04676 10.7094 8.12918 9.15298 8.1967L8.96754 8.20036L8.78519 8.19546C7.21783 8.1113 6 6.95435 6 5.6091V4.79092L6.0054 4.63607C6.09507 3.35326 7.29059 2.27084 8.84702 2.20332ZM15.3594 12.6468C13.6548 12.1815 11.3274 11.7 9 11.7C6.6726 11.7 4.3452 12.1815 2.6406 12.6468C1.0773 13.0725 0 14.4972 0 16.1172V18H18V16.1172L17.9949 15.9238C17.913 14.3848 16.8602 13.0555 15.3594 12.6468ZM3.03471 14.0941C5.07704 13.5366 7.12428 13.2 9 13.2C10.8757 13.2 12.923 13.5366 14.9644 14.0939L15.1214 14.1434C15.9428 14.4386 16.5 15.2247 16.5 16.1172V16.499H1.5V16.1172L1.50646 15.9512C1.57496 15.0735 2.1823 14.3262 3.03471 14.0941Z'
											fill='black'></path>
									</svg>
									Login
								</Link>
							</li>

							<li className='nav-item'>
								<Link
									className='nav-link '
									to='/signup'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "black",
										// textDecoration: "underline",
										// fontWeight: "bold",
										marginRight: "100px",
										// fontStyle: "italic",
									}}>
									Register
								</Link>
							</li>
						</Fragment>
					)}
					{isAuthenticated() && (
						<li className='nav-item'>
							<span
								className='nav-link '
								style={{
									cursor: "pointer",
									// fontWeight: "bold",
									// textDecoration: "underline",
									color: "red",
									// fontStyle: "italic",
									marginRight: "100px",
								}}
								onClick={() =>
									signout(() => {
										history.push("/");
										localStorage.removeItem("userHistoryPurchases");
										localStorage.removeItem("order");
										window.scrollTo({ top: 0, behavior: "smooth" });
									})
								}>
								Signout
							</span>
						</li>
					)}
					<li
						className='nav-item mt-2 languageList'
						style={{
							// border: "1px solid black",
							width: "90px",
							height: "30px",
						}}>
						<span className='' style={{ padding: "0px" }}>
							{language === "English" ? (
								<span
									// style={{
									// 	background: "#c40000",
									// 	color: "white",
									// 	width: "100%",
									// }}
									className=''
									onClick={() => {
										setLanguage("Arabic");
										// window.location.reload(false);
									}}>
									{" "}
									<img className='flags' src={EgyptianFlag} alt='Arabic' />
									<span>Arabic</span>
								</span>
							) : (
								<span
									// style={{ background: "#c40000", color: "white" }}
									className=' '
									onClick={() => {
										setLanguage("English");
										// window.location.reload(false);
									}}>
									<img className='flags' src={AmericanFlag} alt='English' />{" "}
									English
								</span>
							)}
						</span>
					</li>
				</ul>
			</div>
			<div className='row p-0 m-0'>
				<SigninModal
					modalVisible3={modalVisible3}
					setModalVisible3={setModalVisible3}
				/>
				{isSidebarOpen2 ? (
					<div
						className='col-1 my-auto'
						onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
						<i
							className='fas fa-times nav-icon2 faaa-bars'
							style={{ color: "#c60e0e" }}></i>
					</div>
				) : null}
				{!isSidebarOpen2 ? (
					<div
						className='col-1 my-auto'
						onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
						<i
							className='fa fa-bars nav-icon2 faaa-bars'
							style={{ color: "#676767" }}></i>
					</div>
				) : null}

				<div
					className='col-2  my-auto  cellPhoneLogo p-0'
					// style={{ border: "1px black solid" }}
				>
					<Link to='/'>
						<img className='imgLogo2' src={finalLogoUrl} alt='Infinite Apps' />
					</Link>
				</div>
				<div className={window.screen.width >= 363 ? "col-2" : "col-2"}></div>
				<div
					// className='col-7 my-auto'
					className={
						window.screen.width >= 363 ? "col-7 my-auto" : "col-6 my-auto ml-4"
					}>
					<div className='row mx-auto '>
						<div className='col-1 mx-auto my-auto iconsCellPhone'>
							<Link to='/user/dashboard' style={{ color: "#676767" }}>
								<i className='fa-regular fa-user  nav-icon2 faaa-bars'></i>
								{/* <i className='fa-thin fa-user  nav-icon2 faaa-bars'></i> */}
							</Link>
						</div>

						<div className='col-1 mx-auto my-auto iconsCellPhone'>
							<i
								style={{ color: "#676767" }}
								className='fa-solid fa-magnifying-glass nav-icon2 faaa-bars '></i>
						</div>

						<div
							className='col-1 mx-auto my-auto iconsCellPhone'
							onClick={() => {
								if (!isAuthenticated() && !isAuthenticated().token) {
									setModalVisible3(true);
								} else {
									window.location.replace(
										`${process.env.REACT_APP_MAIN_URL}/user/wishlist`,
									);
								}
							}}>
							<span
								style={{ color: "#676767" }}
								className='fa-regular fa-heart nav-icon2 faaa-bars'></span>
						</div>

						<div className='col-1 mx-auto my-auto nav-cart faaa-bars nav-icon2'>
							<div
								onClick={isSidebarOpen ? closeSidebar : openSidebar}
								style={{ cursor: "pointer" }}>
								<sup>
									<small className='cart-badge'>{total_items}</small>
								</sup>
								<span className='nav-icon2' style={{ fontSize: "1.3rem" }}>
									<BsBag />
								</span>
								{/* <i className='fa fa-cart-plus ' aria-hidden='true'></i> */}
							</div>

							{sideCart()}
						</div>
					</div>
				</div>
			</div>
		</Nav>
	);
};

export default withRouter(NavbarTop);

const Nav = styled.nav`
	margin-top: 0px;

	.logoWrapper,
	.infiniteAppsLogo {
		display: none;
	}

	.iconsCellPhone {
		display: none;
	}

	.cellPhoneLogo {
		display: none;
	}

	.btn:hover {
		cursor: pointer;
	}

	.flags {
		object-fit: cover;
	}
	.languageList:hover {
		cursor: pointer;
	}

	.link-container {
		margin: auto;
		text-align: center;
		border-radius: 10px;
	}

	.link-container > div > a {
		border-radius: 20px;
		padding: 10px !important;
	}

	/* .imgLogo {
			width: 150px;
			height: 79px;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
			border-radius: 15px;
		} */

	.menu {
		justify-content: flex-end;
	}
	.logo-type {
		font-size: 1rem;
		/* font-family: "Snell Roundhand, cursive"; */
		font-weight: bold;
		text-align: center;
		/* font-style: italic; */
		display: inline-block;
		/* box-shadow: 7px 7px 5px 0px rgba(0, 0, 0, 0.1); */
		vertical-align: middle;
		margin-left: 4px;
	}

	.cart-badge {
		display: none;
	}

	@media (max-width: 900px) {
		.logoWrapper {
			display: block;
		}
	}

	@media (max-width: 680px) {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
		padding: 0.5rem 1.5rem;
		background: var(--mainGrey);
		border-bottom: 1px solid lightgrey;
		z-index: 120;

		.iconsCellPhone {
			display: block;
		}

		.cart-badge {
			font-size: 12px;
			/* font-style: italic; */
			color: #c60e0e;
			text-decoration: none !important;
			display: block;
			margin-left: 18.5px;
			font-weight: bold;
			/* background: #c60e0e !important; */
			padding: 5px;
			position: absolute;
			top: 16px;
			left: -17px;
		}

		.logo-type {
			font-size: 1rem;
			/* font-family: "Snell Roundhand, cursive"; */
			font-weight: bold;
			text-align: center;
			/* font-style: italic; */
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
			margin-right: 2px;
		}

		.nav-center {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1170px;
			margin: 0 auto;
		}

		.nav-icon {
			font-size: 1.35rem;
			cursor: pointer;
			/* margin-left: 15px; */
		}

		.nav-icon2 {
			font-size: 1.35rem;
			cursor: pointer;
			/* margin-left: 20px; */
		}

		.nav-cart {
			position: relative;
			bottom: 5px;
		}
		.cart-items {
			background: var(--mainGrey);
			color: black;
			font-weight: bold;
			font-size: 0.7rem;
			position: absolute;
			padding: 0 5px;
		}
		.infiniteAppsLogo {
			display: none;
			width: 159px;
			height: 79px;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
		}

		.imgLogo {
			width: 80px;
			height: 80px;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
		}

		.cellPhoneLogo {
			display: block;
			width: 140px;
			height: 65px;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
			padding: 0px !important;
		}

		.imgLogo2 {
			width: 90%;
			padding: 0px !important;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
		}

		.logo-type {
			font-size: 1rem;
			/* font-family: "Snell Roundhand, cursive"; */
			font-weight: bold;
			text-align: center;
			/* font-style: italic; */
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
		}
	}
	font-size: 1rem;

	li a:hover {
		background: rgb(240, 240, 240);
		text-decoration: none;
		/* color: var(--mainWhite) !important; */
		outline-color: var(--darkGrey);
		transition: var(--mainTransition);
	}
	@media (min-width: 680px) {
		.faaa-bars {
			display: none;
		}
	}
	@media (max-width: 900px) {
		.actual-list {
			font-size: 0.7rem;
		}
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 120;
		padding: 1px;
	}

	@media (max-width: 375px) {
		.hideSmall {
			display: none;
		}

		/* .nav-icon {
			margin-left: 2px;
		} */

		.imgLogo2 {
			margin-top: 5px;
		}
	}
`;

const SideWrapperCart = styled.nav`
	overflow-y: auto;
	position: fixed;
	top: 0px;
	right: 0;
	width: 80%;
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
	@media (max-width: 1000px) {
		.trashIcon {
			margin-left: 130px !important;
			font-size: 12px !important;
			font-weight: normal !important;
		}

		.link-btn {
			font-size: 0.9rem;
		}
	}
`;
