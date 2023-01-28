/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line
import { isAuthenticated } from "../../../auth";
// eslint-disable-next-line
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";
import {
	getColors,
	getProducts,
	getReceivingLogs,
	listOrdersAce,
	ordersLengthAce,
	readSingleOrderByPhoneNumber,
} from "../../apiAdmin";
import LogoImage from "../../../GeneralImages/Logo2.png";
import { FilterFilled } from "@ant-design/icons";
import ProductsPrview from "./ProductsPreview";
import OrderedItems from "./OrderedItems";
import { DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";
import FiltersModal from "./FiltersModal";
import DiscountModal from "./DiscountModal";
import CustomerConfirmationModal from "./CustomerConfirmationModal";
import CheckoutCardModal from "./CheckoutCardModal";
import CheckoutCashModal from "./CheckoutCashModal";
import { toast } from "react-toastify";
import NewCustomerModal from "./NewCustomerModal";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import OrdersListModal from "./OrdersListModal";

const OnsiteOrderTaking = () => {
	// eslint-disable-next-line
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	// eslint-disable-next-line
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);
	const [modalVisible4, setModalVisible4] = useState(false);
	const [modalVisible5, setModalVisible5] = useState(false);
	const [modalVisible6, setModalVisible6] = useState(false);
	const [modalVisible7, setModalVisible7] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	const [allProductsAll, setAllProductsAll] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [allAceOfflineOrders, setAllAceOfflineOrders] = useState([]);
	const [allGenders, setAllGenders] = useState([]);
	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);
	const [allSubSKUs, setAllSubSKUs] = useState([]);
	const [chosenSubSKUs, setChosenSubSKUs] = useState([]);
	const [chosenProducts, setChosenProducts] = useState([]);

	// eslint-disable-next-line
	const [allReceivings, setAllReceivings] = useState([]);

	const [genderFilter, setGenderFilter] = useState("men");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [chosenProductWithVariables, setChosenProductWithVariables] = useState(
		[],
	);
	const [discountStatus, setDiscountStatus] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [discountBy, setDiscountBy] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line
	const [postsPerPage, setPostsPerPage] = useState(15);
	const [addedPhoneNumber, setAddedPhoneNumber] = useState("");
	const [userCustomerDetails, setUserCustomerDetails] = useState({
		fullName: "Offline Store",
		email: "",
		phone: "Offline Store",
		address: "From Store " + isAuthenticated().user.userBranch,
		state: "From Store " + isAuthenticated().user.userBranch,
		city: "",
		cityName: "",
		carrierName: "",
	});
	const [accountHistOrders, setAccountHistOrders] = useState("");
	const [lengthOfOrders, setLengthOfOrders] = useState("");
	const [customerPaid, setCustomerPaid] = useState("");
	const [orderCreationDate, setOrderCreationDate] = useState(
		new Date(
			new Date().toLocaleString("en-US", {
				timeZone: "Africa/Cairo",
			}),
		),
	);

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

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				getReceivingLogs(token).then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var overallReceivedSKUs = [];
						const allReceivingsSummarized1 = data2
							.filter(
								(i) =>
									i.storeName.toLowerCase().replace(/\s+/g, " ").trim() ===
										user.userStore.toLowerCase().replace(/\s+/g, " ").trim() &&
									i.storeBranch.toLowerCase().replace(/\s+/g, " ").trim() ===
										user.userBranch.toLowerCase().replace(/\s+/g, " ").trim(),
							)
							.map((iii) => {
								return {
									receivedSubSKU: iii.receivedSKU,
									quantityReceived: iii.receivedQuantity,
								};
							});

						allReceivingsSummarized1 &&
							allReceivingsSummarized1.reduce(function (res, value) {
								if (!res[value.receivedSubSKU]) {
									res[value.receivedSubSKU] = {
										receivedSubSKU: value.receivedSubSKU.toLowerCase(),
										quantityReceived: 0,
									};
									overallReceivedSKUs.push(res[value.receivedSubSKU]);
								}
								res[value.receivedSubSKU].quantityReceived += Number(
									value.quantityReceived,
								);
								return res;
							}, {});

						setAllReceivings(overallReceivedSKUs);
					}

					var allAceProducts = data.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					);

					setAllProductsAll(allAceProducts);

					const AllProductsModified =
						allAceProducts && allAceProducts.map((i) => i.productAttributes);

					var mergedAttributes = [].concat.apply([], AllProductsModified);

					let allAttributes = [
						...new Map(mergedAttributes.map((item) => [item, item])).values(),
					];

					const allAttributesEnhanced =
						allAttributes &&
						allAttributes.filter((i) => i.productImages.length > 0);

					const PK =
						allAttributesEnhanced && allAttributesEnhanced.map((i) => i.PK);

					const finalResultVariableDifferentImages = allAceProducts.map((i) => {
						return {
							...i,
							productAttributes: i.productAttributes,
							clickedProductAttribute: i.productAttributes.filter(
								(ii) => PK.indexOf(ii.PK) !== -1,
							),
						};
					});

					const finalOfFinal1 =
						finalResultVariableDifferentImages &&
						finalResultVariableDifferentImages.map((i) =>
							i.clickedProductAttribute.map((ii) => {
								return {
									...i,
									DropShippingPrice: ii.DropShippingPrice,
									MSRP: ii.MSRP,
									PK: ii.PK,
									SubSKU: ii.SubSKU,
									WholeSalePrice: ii.WholeSalePrice,
									color: ii.color,
									price: ii.price,
									priceAfterDiscount: ii.priceAfterDiscount,
									productImages: ii.productImages,
									quantity: ii.quantity,
									size: ii.size,
								};
							}),
						);

					var mergedFinalOfFinal2 = [].concat.apply([], finalOfFinal1);

					let allAttributesFinalOfFinalMain = [
						...new Map(
							mergedFinalOfFinal2.map((item) => [item, item]),
						).values(),
					];

					const requiredProducts =
						allAttributesFinalOfFinalMain &&
						allAttributesFinalOfFinalMain.filter(
							(i) =>
								i.productImages &&
								i.productImages[0] &&
								i.productImages[0].url !== undefined,
						);

					if (categoryFilter) {
						setAllProducts(
							requiredProducts.filter(
								(iii) =>
									iii.gender.genderName.toLowerCase() ===
										genderFilter.toLowerCase() &&
									iii.category.categoryName.toLowerCase() ===
										categoryFilter.toLowerCase(),
							),
						);
					} else {
						setAllProducts(
							requiredProducts.filter(
								(iii) =>
									iii.gender.genderName.toLowerCase() ===
									genderFilter.toLowerCase(),
							),
						);
					}

					//Unique Categories
					var categoriesArray =
						allAceProducts && allAceProducts.map((ii) => ii.category);

					let uniqueCategories = [
						...new Map(
							categoriesArray &&
								categoriesArray.map((item) => [item["categoryName"], item]),
						).values(),
					];
					setAllCategories(uniqueCategories);

					//Gender Unique
					var genderUnique =
						allAceProducts && allAceProducts.map((ii) => ii.gender);

					let uniqueGenders = [
						...new Map(
							genderUnique &&
								genderUnique.map((item) => [item["genderName"], item]),
						).values(),
					];
					setAllGenders(uniqueGenders);

					var allAceSKUs =
						allAceProducts &&
						allAceProducts.map((i) =>
							i.productAttributes.map((ii) => ii.SubSKU),
						);

					var mergedSubSKUs = [].concat.apply([], allAceSKUs);
					let uniqueMergedSubSKUs = [...new Set(mergedSubSKUs)];

					setAllSubSKUs(uniqueMergedSubSKUs);

					const quantityReceivedFuntion = (requiredSKU) => {
						var index = overallReceivedSKUs
							.map((i) => i.receivedSubSKU)
							.indexOf(requiredSKU.toLowerCase());
						if (index === -1) {
							return 0;
						} else {
							return overallReceivedSKUs[index].quantityReceived;
						}
					};

					var addingVariablesToMain =
						allAceProducts &&
						allAceProducts.map((i) =>
							i.productAttributes.map((ii) => {
								return {
									...i,
									DropShippingPrice: ii.DropShippingPrice,
									MSRP: ii.MSRP,
									PK: ii.PK,
									SubSKU: ii.SubSKU,
									WholeSalePrice: ii.WholeSalePrice,
									color: ii.color,
									price: ii.price,
									priceAfterDiscount: ii.priceAfterDiscount,
									productImages: ii.productImages,
									quantity: ii.quantity,
									size: ii.size,
									receivedQuantity: quantityReceivedFuntion(ii.SubSKU),
								};
							}),
						);

					// eslint-disable-next-line
					var mergedFinalOfFinal = [].concat.apply([], addingVariablesToMain);

					let allAttributesFinalOfFinal = [
						...new Map(mergedFinalOfFinal.map((item) => [item, item])).values(),
					];

					let chosenProducts1 =
						chosenSubSKUs &&
						allAttributesFinalOfFinal &&
						allAttributesFinalOfFinal.filter(
							(i) => chosenSubSKUs.indexOf(i.SubSKU) > -1,
						);

					const UniqueProducts = [
						...new Map(
							chosenProducts1.map((item) => [item["SubSKU"], item]),
						).values(),
					];

					setChosenProducts(UniqueProducts);

					const productSubSKUImage = (requiredProduct, productSubSKUColor) => {
						const theReturn = requiredProduct.productAttributes.filter(
							(i) => i.color === productSubSKUColor,
						)[0].productImages;
						return theReturn[0] ? theReturn[0].url : undefined;
					};

					setChosenProductWithVariables(
						UniqueProducts.map((i) => {
							return {
								SubSKU: i.SubSKU,
								OrderedQty: 1,
								productId: i._id,
								productName: i.productName,
								productMainImage: i.thumbnailImage[0].images[0].url,
								productSubSKUImage: productSubSKUImage(
									UniqueProducts.filter((s) => s._id === i._id)[0],
									UniqueProducts.filter(
										(s) => s._id === i._id,
									)[0].productAttributes.filter(
										(ss) => ss.SubSKU === i.SubSKU,
									)[0].color,
								)
									? productSubSKUImage(
											UniqueProducts.filter((s) => s._id === i._id)[0],
											UniqueProducts.filter(
												(s) => s._id === i._id,
											)[0].productAttributes.filter(
												(ss) => ss.SubSKU === i.SubSKU,
											)[0].color,
									  )
									: UniqueProducts.filter((s) => s._id === i._id)[0]
											.thumbnailImage[0].images[0].url,
								SubSKUPriceAfterDiscount: i.priceAfterDiscount,
								SubSKURetailerPrice: i.price,
								SubSKUWholeSalePrice: i.WholeSalePrice,
								SubSKUDropshippingPrice: i.DropShippingPrice,
								pickedPrice: i.priceAfterDiscount,
								quantity: quantityReceivedFuntion(i.SubSKU),
								SubSKUColor: i.color,
								SubSKUSize: i.size,
								SubSKUMSRP: i.MSRP,
							};
						}),
					);
				});
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
	}, [chosenSubSKUs, genderFilter, categoryFilter]);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = allProducts.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// console.log(allProducts, "allProducts");
	// console.log(allCategories, "allCategories");

	let productsTotalAmount =
		chosenProductWithVariables &&
		chosenProductWithVariables
			.map((i) => Number(i.OrderedQty) * Number(i.pickedPrice))
			.reduce((a, b) => a + b, 0);

	let productsTotalAmountAfterDiscount =
		discountStatus === "Cash"
			? Number(productsTotalAmount - discountBy).toFixed(2)
			: Number(
					productsTotalAmount - productsTotalAmount * (discountBy / 100),
			  ).toFixed(2);

	let productsTotalOrderedQty =
		chosenProductWithVariables &&
		chosenProductWithVariables
			.map((i) => Number(i.OrderedQty))
			.reduce((a, b) => a + b, 0);

	const loadOrdersLength = () => {
		ordersLengthAce(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLengthOfOrders(data);
			}
		});
	};

	const loadAceOfflineOrders = () => {
		listOrdersAce(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var ordersForBranch = data.filter(
					(i) => i.employeeData.userBranch === user.userBranch,
				);
				setAllAceOfflineOrders(ordersForBranch);
			}
		});
	};

	useEffect(() => {
		loadOrdersLength();
		loadAceOfflineOrders();
		// eslint-disable-next-line
	}, [
		addedPhoneNumber,
		modalVisible,
		modalVisible2,
		modalVisible3,
		chosenSubSKUs,
		paymentStatus,
		orderCreationDate,
	]);

	// console.log(chosenProductWithVariables, "chosenProductsWith");

	return (
		<OnsiteOrderTakingWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className=''>
				{/* <div className=''>
					<AdminMenu
						fromPage='AceStoreOrderTaking'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div> */}
				<div style={{ padding: "30px 0px", background: "rgb(198,14,14)" }}>
					<img
						className='imgLogo2'
						src={LogoImage}
						alt='Infinite Apps'
						style={{
							width: "80px",
							position: "absolute",
							top: "10px",
							padding: "0px",
							left: "20px",
							background: "#c60e0e",
							border: "#c60e0e solid 1px",
						}}
					/>
					<span
						style={{
							fontSize: "1.2rem",
							marginLeft: "42%",
							color: "white",
							position: "absolute",
							top: "15px",
						}}>
						ACE STORE (Branch: {user && user.userBranch})
					</span>
				</div>

				<div className='mainContent' style={{ margin: "0px 30px" }}>
					<div className='col-md-12 '>
						<div
							className='posWrapper'
							style={{
								// border: "2px lightgrey solid",
								borderRadius: "5px",
								// background: "white",
							}}>
							<div
								className='row mx-3'
								style={{
									minHeight: "720px",
									borderBottom: "3px grey solid",
								}}>
								<OrderedItems
									chosenProductWithVariables={chosenProductWithVariables}
									chosenSubSKUs={chosenSubSKUs}
									setChosenSubSKUs={setChosenSubSKUs}
									chosenProducts={chosenProducts}
									setChosenProductWithVariables={setChosenProductWithVariables}
									setChosenProducts={setChosenProducts}
									allProductsAll={allProductsAll}
									allColors={allColors}
									allSubSKUs={allSubSKUs}
									productsTotalAmount={productsTotalAmount}
								/>

								<OrdersListModal
									modalVisible={modalVisible7}
									setModalVisible={setModalVisible7}
									orders={allAceOfflineOrders}
									user={user}
								/>

								<FiltersModal
									modalVisible={modalVisible}
									setModalVisible={setModalVisible}
									allCategories={allCategories}
									allGenders={allGenders}
									setGenderFilter={setGenderFilter}
									setCategoryFilter={setCategoryFilter}
								/>

								<NewCustomerModal
									modalVisible={modalVisible6}
									setModalVisible={setModalVisible6}
									customerDetails={userCustomerDetails}
									setCustomerDetails={setUserCustomerDetails}
								/>

								<DiscountModal
									modalVisible={modalVisible2}
									setModalVisible={setModalVisible2}
									discountBy={discountBy}
									setDiscountBy={setDiscountBy}
									setDiscountStatus={setDiscountStatus}
									discountStatus={discountStatus}
								/>

								<ProductsPrview
									allProducts={allProducts}
									allProductsAll={allProductsAll}
									allSubSKUs={allSubSKUs}
									chosenProductWithVariables={chosenProductWithVariables}
									chosenSubSKUs={chosenSubSKUs}
									setChosenProductWithVariables={setChosenProductWithVariables}
									setChosenSubSKUs={setChosenSubSKUs}
									FilterFilled={FilterFilled}
									postsPerPage={postsPerPage}
									totalPosts={allProducts.length}
									paginate={paginate}
									currentPage={currentPage}
									currentPosts={currentPosts}
									setModalVisible={setModalVisible}
								/>

								<CustomerConfirmationModal
									modalVisible={modalVisible3}
									setModalVisible={setModalVisible3}
									accountHistOrders={accountHistOrders}
									userCustomerDetails={userCustomerDetails}
									allColors={allColors}
								/>
								<CheckoutCardModal
									modalVisible={modalVisible5}
									setModalVisible={setModalVisible5}
									accountHistOrders={accountHistOrders}
									userCustomerDetails={userCustomerDetails}
									allColors={allColors}
									chosenProducts={chosenProducts}
									chosenProductWithVariables={chosenProductWithVariables}
									invoiceNumber={`ACE${new Date(
										orderCreationDate,
									).getFullYear()}${
										new Date(orderCreationDate).getMonth() + 1
									}${new Date(orderCreationDate).getDate()}000${
										lengthOfOrders + 1
									}`}
									orderCreationDate={orderCreationDate}
									discountAmount={
										Number(productsTotalAmount) -
										Number(productsTotalAmountAfterDiscount)
									}
									totalAmountAfterDiscount={Number(
										productsTotalAmountAfterDiscount,
									)}
									totalAmount={productsTotalAmount}
									paymentStatus={paymentStatus}
									employeeData={user}
									productsTotalOrderedQty={productsTotalOrderedQty}
									lengthOfOrders={lengthOfOrders}
									setLengthOfOrders={setLengthOfOrders}
								/>

								<CheckoutCashModal
									modalVisible={modalVisible4}
									setModalVisible={setModalVisible4}
									accountHistOrders={accountHistOrders}
									userCustomerDetails={userCustomerDetails}
									allColors={allColors}
									chosenProducts={chosenProducts}
									chosenProductWithVariables={chosenProductWithVariables}
									invoiceNumber={`ACE${new Date(
										orderCreationDate,
									).getFullYear()}${
										new Date(orderCreationDate).getMonth() + 1
									}${new Date(orderCreationDate).getDate()}000${
										lengthOfOrders + 1
									}`}
									orderCreationDate={orderCreationDate}
									discountAmount={
										Number(productsTotalAmount) -
										Number(productsTotalAmountAfterDiscount)
									}
									totalAmountAfterDiscount={Number(
										productsTotalAmountAfterDiscount,
									)}
									totalAmount={productsTotalAmount}
									paymentStatus={paymentStatus}
									employeeData={user}
									customerPaid={customerPaid}
									productsTotalOrderedQty={productsTotalOrderedQty}
									lengthOfOrders={lengthOfOrders}
									setLengthOfOrders={setLengthOfOrders}
								/>
							</div>
							<div className='row'>
								<div className='col-6'>
									<div className='row'>
										<div className='col-6'>
											<div
												className='ml-5'
												style={{
													fontSize: "1.3rem",
													marginTop: "20px",
													fontWeight: "bolder",
												}}>
												Subtotal{" "}
												<strong
													style={{ fontSize: "1.1rem", marginLeft: "40px" }}>
													{Number(productsTotalAmount).toFixed(2)} EGP
												</strong>
											</div>
											<div style={{ marginLeft: "100px", fontSize: "12px" }}>
												<div style={{ color: "#625e5e" }}>
													Discounts{" "}
													<span style={{ marginLeft: "20px" }}>
														{discountStatus === "Cash"
															? Number(discountBy).toFixed(2)
															: Number(
																	productsTotalAmount * (discountBy / 100),
															  ).toFixed(2)}{" "}
														EGP
													</span>
												</div>
												<div style={{ color: "#625e5e" }}>
													Coupons{" "}
													<span style={{ marginLeft: "20px" }}>0.00 EGP</span>
												</div>
											</div>
											<div className='col-7 ml-5'>
												<hr style={{ border: "1px grey solid" }} />
											</div>
											<div
												className='ml-5 mt-2'
												style={{
													fontSize: "1.3rem",
													fontWeight: "bolder",
												}}>
												Total{" "}
												{discountStatus && discountBy > 0 ? (
													<span>
														<s style={{ color: "red" }}>
															<strong
																style={{
																	fontSize: "1.3rem",
																	marginLeft: "40px",
																}}>
																{Number(productsTotalAmount).toFixed(2)} EGP
															</strong>
														</s>
														<strong
															className='ml-3'
															style={{ fontSize: "1.3rem" }}>
															{Number(productsTotalAmountAfterDiscount).toFixed(
																2,
															)}{" "}
															EGP
														</strong>
													</span>
												) : (
													<strong
														style={{ fontSize: "1.3rem", marginLeft: "40px" }}>
														{Number(productsTotalAmount).toFixed(2)} EGP
													</strong>
												)}
											</div>
										</div>

										<div
											className='col-6 mt-3'
											// style={{ border: "1px black solid" }}
										>
											<div className='row'>
												<div className='col-7'>
													<button
														onClick={() => {
															if (!paymentStatus) {
																return toast.error(
																	"Please add a payment method first",
																);
															}

															if (
																chosenProductWithVariables &&
																chosenProductWithVariables.length === 0
															) {
																return toast.error(
																	"Please add products to the order",
																);
															}
															if (paymentStatus === "cash") {
																if (!customerPaid) {
																	return toast.error(
																		"Please add how much the customer paid?",
																	);
																} else {
																	setModalVisible4(true);
																}
															} else {
																setModalVisible5(true);
															}
														}}
														style={{
															background: "#004d00",
															border: "none",
															padding: "20px 30px",
															color: "white",
															fontWeight: "bold",
															borderRadius: "10px",
															fontSize: "1.2rem",
														}}>
														CHECKOUT
													</button>
													<br />
													<button
														onClick={() => {
															setChosenSubSKUs([]);
															setChosenProductWithVariables([]);
															setChosenProducts([]);
														}}
														style={{
															background: "darkred",
															border: "none",
															padding: "5px",
															color: "white",
															fontWeight: "bold",
															borderRadius: "10px",
															marginLeft: "70px",
															marginTop: "10px",
														}}>
														CLEAR
													</button>
												</div>

												<div className='col-5'>
													<button
														onClick={() => {
															setModalVisible2(true);
														}}
														style={{
															background: "black",
															border: "none",
															padding: "5px",
															fontSize: "12px",
															color: "white",
															fontWeight: "bold",
															borderRadius: "10px",
															width: "70%",
														}}>
														DISCOUNT
													</button>
													<br />
													<button
														style={{
															background: "black",
															border: "none",
															padding: "5px",
															fontSize: "12px",
															color: "white",
															fontWeight: "bold",
															borderRadius: "10px",
															marginTop: "5px",
															width: "70%",
														}}>
														COUPONS
													</button>
													<br />
													<button
														style={{
															background: "black",
															border: "none",
															width: "70%",
															padding: "5px",
															fontSize: "12px",
															color: "white",
															fontWeight: "bold",
															borderRadius: "10px",
															marginTop: "5px",
														}}>
														GIFT
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-6'>
									<div
										style={{
											fontSize: "12px",
											marginLeft: "50px",
											marginTop: "20px",
										}}>
										<div className='grid-container3 '>
											<div className=''>
												Payment Method
												<br />
												<select
													className='py-2 mb-3'
													onChange={(e) => setPaymentStatus(e.target.value)}
													style={{
														textTransform: "uppercase",
														width: "90%",
														border: "lightgrey solid 1px",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}>
													<option value='sdf'>Please Select</option>
													<option value='cash'>Cash</option>
													<option value='card'>Card</option>
												</select>
											</div>
											<div className=''>
												Date
												<br />
												<DatePicker
													className='inputFields'
													onChange={(date) => {
														setOrderCreationDate(
															new Date(date._d).toLocaleDateString() || date._d,
														);
													}}
													max
													size='small'
													showToday={true}
													defaultValue={moment(new Date())}
													placeholder='Please pick the desired schedule date'
													style={{
														height: "auto",
														padding: "7px",
														width: "90%",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}
												/>
											</div>
											<div className=''>
												Invoice Number
												<br />
												<input
													className='py-2 mb-3'
													value={`ACE${new Date(
														orderCreationDate,
													).getFullYear()}${
														new Date(orderCreationDate).getMonth() + 1
													}${new Date(orderCreationDate).getDate()}000${
														lengthOfOrders + 1
													}`}
													type='text'
													style={{
														border: "1px lightgrey solid",
														width: "90%",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}
												/>
											</div>
										</div>
										{paymentStatus === "cash" ? (
											<div>
												<input
													placeholder='Customer Paid?'
													value={customerPaid}
													onChange={(e) => setCustomerPaid(e.target.value)}
													type='number'
													style={{
														border: "1px lightgrey solid",
														width: "23%",
														padding: "8px 5px",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}
												/>
											</div>
										) : null}
									</div>

									<div
										style={{
											fontSize: "12px",
											marginLeft: "50px",
											marginTop: "10px",
										}}>
										<Link
											to='/admin/exchange-or-return/offline-store'
											style={{
												background: "darkred",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "10px",
											}}
											onClick={() =>
												window.scrollTo({ top: 0, behavior: "smooth" })
											}>
											RETURN/ EXCHANGE
										</Link>
										<button
											onClick={() => setModalVisible6(true)}
											style={{
												background: "#0070eb",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "10px",
											}}>
											New Customer
										</button>
										<span className='ml-5'>
											<input
												className='py-2 mb-3'
												value={addedPhoneNumber}
												onChange={(e) => setAddedPhoneNumber(e.target.value)}
												placeholder='search for existing customer by phone #'
												type='text'
												style={{
													border: "1px lightgrey solid",
													width: "40%",
													boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
												}}
											/>
											<button
												onClick={() => {
													readSingleOrderByPhoneNumber(
														user._id,
														token,
														addedPhoneNumber,
													).then((data) => {
														if (data.error) {
															console.log(data.error);
														} else {
															setAccountHistOrders(data);
															setUserCustomerDetails(data[0].customerDetails);

															setModalVisible3(true);
														}
													});
												}}
												className='ml-3'
												style={{
													background: "#4a4a4a",
													border: "none",
													padding: "10px 15px",
													color: "white",
													textTransform: "uppercase",
													fontWeight: "bold",
													borderRadius: "10px",
													marginRight: "20px",
												}}>
												Submit
											</button>
										</span>
									</div>

									<div
										style={{
											fontSize: "12px",
											marginLeft: "50px",
											marginTop: "20px",
										}}>
										<Link
											to='/admin/receiving-offline-store'
											style={{
												background: "grey",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "10px",
											}}
											onClick={() =>
												window.scrollTo({ top: 0, behavior: "smooth" })
											}>
											Receive New Items
										</Link>
										<Link
											to='#'
											style={{
												background: "#042976",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "10px",
											}}
											onClick={() => setModalVisible7(true)}>
											Store Order List
										</Link>
										<Link
											to='/admin/ace-inventory-report-offline-store'
											style={{
												background: "darkgreen",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "10px",
											}}
											onClick={() =>
												window.scrollTo({ top: 0, behavior: "smooth" })
											}>
											STOCK ON HAND REPORT
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</OnsiteOrderTakingWrapper>
	);
};

export default OnsiteOrderTaking;

const OnsiteOrderTakingWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 100px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
		margin: auto;
	}

	.productsOnRight {
		padding: 0px;

		.grid-container2 {
			display: grid;
			grid-template-columns: 18.5% 18.5% 18.5% 18.5% 18.5%;
			margin: auto;
			padding-left: 2px;
			text-align: center;
		}
	}

	.grid-container3 {
		display: grid;
		margin: auto;
		grid-template-columns: 25% 25% 25% 25%;
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
