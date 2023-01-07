/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line
import { isAuthenticated } from "../../../auth";
// eslint-disable-next-line
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";
import { getColors, getProducts } from "../../apiAdmin";
import LogoImage from "../../../GeneralImages/Logo2.png";
import { FilterFilled } from "@ant-design/icons";
import ProductsPrview from "./ProductsPreview";
import OrderedItems from "./OrderedItems";
import { DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";
import FiltersModal from "./FiltersModal";
import DiscountModal from "./DiscountModal";

const OnsiteOrderTaking = () => {
	// eslint-disable-next-line
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	// eslint-disable-next-line
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	const [allProductsAll, setAllProductsAll] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [allGenders, setAllGenders] = useState([]);
	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);
	const [allSubSKUs, setAllSubSKUs] = useState([]);
	const [chosenSubSKUs, setChosenSubSKUs] = useState([]);
	const [chosenProducts, setChosenProducts] = useState([]);
	const [submittedSKU, setSubmittedSKU] = useState(false);
	const [genderFilter, setGenderFilter] = useState("men");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [chosenProductWithVariables, setChosenProductWithVariables] = useState(
		[],
	);
	const [discountStatus, setDiscountStatus] = useState("");
	const [discountBy, setDiscountBy] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line
	const [postsPerPage, setPostsPerPage] = useState(15);

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
					...new Map(mergedFinalOfFinal2.map((item) => [item, item])).values(),
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
					allAceProducts.map((i) => i.productAttributes.map((ii) => ii.SubSKU));

				var mergedSubSKUs = [].concat.apply([], allAceSKUs);
				let uniqueMergedSubSKUs = [...new Set(mergedSubSKUs)];

				setAllSubSKUs(uniqueMergedSubSKUs);

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
								receivedQuantity: ii.receivedQuantity ? ii.receivedQuantity : 0,
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
								)[0].productAttributes.filter((ss) => ss.SubSKU === i.SubSKU)[0]
									.color,
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
							quantity: i.receivedQuantity,
							SubSKUColor: i.color,
							SubSKUSize: i.size,
							SubSKUMSRP: i.MSRP,
						};
					}),
				);
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
						POS SYSTEM (Store #1)
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

								<FiltersModal
									modalVisible={modalVisible}
									setModalVisible={setModalVisible}
									allCategories={allCategories}
									allGenders={allGenders}
									setGenderFilter={setGenderFilter}
									setCategoryFilter={setCategoryFilter}
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
													fontSize: "1.6rem",
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
													style={{
														textTransform: "uppercase",
														width: "90%",
														border: "lightgrey solid 1px",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}>
													<option value='sdf'>Please Select</option>
													<option value='sdf'>Cash</option>
													<option value='sdf'>Card</option>
												</select>
											</div>
											<div className=''>
												Date
												<br />
												<DatePicker
													className='inputFields'
													// onChange={(date) => {
													// 	setSelectedDate(new Date(date._d).toLocaleDateString() || date._d);
													// }}
													// disabledDate={disabledDate}
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
													value='INV0001123131020'
													type='text'
													style={{
														border: "1px lightgrey solid",
														width: "90%",
														boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
													}}
												/>
											</div>
										</div>
									</div>

									<div
										style={{
											fontSize: "12px",
											marginLeft: "50px",
											marginTop: "10px",
										}}>
										<button
											style={{
												background: "#89c1ff",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "20px",
											}}>
											Customer List
										</button>
										<button
											style={{
												background: "#0070eb",
												border: "none",
												padding: "10px 15px",
												color: "white",
												textTransform: "uppercase",
												fontWeight: "bold",
												borderRadius: "10px",
												marginRight: "20px",
											}}>
											New Customer
										</button>
										<span>
											<input
												className='py-2 mb-3'
												value=''
												placeholder='search for customer by phone #'
												type='text'
												style={{
													border: "1px lightgrey solid",
													width: "45%",
													boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
												}}
											/>
										</span>
									</div>
								</div>
							</div>

							{chosenSubSKUs.length > 0 && allSubSKUs.length > 0 ? (
								<button
									className='btn btn-primary p-1 mt-3'
									onClick={() => setSubmittedSKU(true)}>
									Submit Order SKU's
								</button>
							) : null}

							{chosenSubSKUs &&
							chosenSubSKUs.length > 0 &&
							chosenProducts &&
							chosenProducts.length > 0 &&
							allSubSKUs.length > 0 &&
							submittedSKU ? (
								<div className='mt-4'>
									<h5
										style={{
											textTransform: "uppercase",
											fontWeight: "bold",
											color: "darkred",
										}}>
										Products Details
									</h5>
									<div className='row'>
										{chosenProductWithVariables &&
											chosenProductWithVariables.map((p, i) => {
												return (
													<div className='col-md-6 mx-auto' key={i}>
														<div className='mb-3'>
															<img
																src={p.productSubSKUImage}
																width='25%'
																alt='infinite-apps'
															/>
														</div>
														<div>
															<strong>Product Name:</strong>{" "}
															<span style={{ textTransform: "uppercase" }}>
																{chosenProducts[i] &&
																	chosenProducts[i].productName}
															</span>{" "}
														</div>

														<div>
															<strong>Product Color:</strong>{" "}
															<span style={{ textTransform: "uppercase" }}>
																{allColors[
																	allColors
																		.map((i) => i.hexa)
																		.indexOf(p.SubSKUColor)
																]
																	? allColors[
																			allColors
																				.map((i) => i.hexa)
																				.indexOf(p.SubSKUColor)
																	  ].color
																	: p.SubSKUColor}
															</span>{" "}
														</div>
														<div>
															<strong>Product Size:</strong>{" "}
															<span style={{ textTransform: "uppercase" }}>
																{p && p.SubSKUSize}
															</span>{" "}
														</div>
														<br />
														<div>
															<strong>
																Current Active Stock In Ace Store:
															</strong>{" "}
															{chosenProducts &&
															chosenProducts[i] &&
															chosenProducts[i].receivedQuantity
																? chosenProducts[i].receivedQuantity
																: 0}{" "}
															Items{" "}
															{chosenProducts &&
															chosenProducts[i] &&
															chosenProducts[i].receivedQuantity <
																p.OrderedQty ? (
																<strong
																	style={{ color: "red", fontSize: "12px" }}>
																	(No Enough Stock)
																</strong>
															) : null}
														</div>

														<div>
															<strong>Quantity Onhand (G&Q Hub):</strong>{" "}
															{chosenProducts[i] && chosenProducts[i].quantity
																? chosenProducts[i].quantity
																: 0}{" "}
															Items
														</div>
														<div>
															<strong>
																Product Available Prices (Click to choose):
															</strong>{" "}
															<ul
																style={{
																	listStyle: "none",
																	textDecoration: "underline",
																	color: "#0080ff",
																	cursor: "pointer",
																}}>
																<li
																	onClick={() => {
																		const index =
																			chosenProductWithVariables.findIndex(
																				(object) => {
																					return (
																						object.productId === p.productId &&
																						object.SubSKU === p.SubSKU
																					);
																				},
																			);

																		if (index !== -1) {
																			chosenProductWithVariables[
																				index
																			].pickedPrice =
																				p.SubSKUPriceAfterDiscount;
																			setChosenProductWithVariables([
																				...chosenProductWithVariables,
																			]);
																		}
																	}}>
																	{p.SubSKUPriceAfterDiscount} EGP
																</li>
																<li
																	onClick={() => {
																		const index =
																			chosenProductWithVariables.findIndex(
																				(object) => {
																					return (
																						object.productId === p.productId &&
																						object.SubSKU === p.SubSKU
																					);
																				},
																			);

																		if (index !== -1) {
																			chosenProductWithVariables[
																				index
																			].pickedPrice = p.SubSKURetailerPrice;
																			setChosenProductWithVariables([
																				...chosenProductWithVariables,
																			]);
																		}
																	}}>
																	{p.SubSKURetailerPrice} EGP
																</li>
																<li
																	onClick={() => {
																		const index =
																			chosenProductWithVariables.findIndex(
																				(object) => {
																					return (
																						object.productId === p.productId &&
																						object.SubSKU === p.SubSKU
																					);
																				},
																			);

																		if (index !== -1) {
																			chosenProductWithVariables[
																				index
																			].pickedPrice = p.SubSKUDropshippingPrice;
																			setChosenProductWithVariables([
																				...chosenProductWithVariables,
																			]);
																		}
																	}}>
																	{p.SubSKUDropshippingPrice} EGP
																</li>
																<li
																	onClick={() => {
																		const index =
																			chosenProductWithVariables.findIndex(
																				(object) => {
																					return (
																						object.productId === p.productId &&
																						object.SubSKU === p.SubSKU
																					);
																				},
																			);

																		if (index !== -1) {
																			chosenProductWithVariables[
																				index
																			].pickedPrice = p.SubSKUWholeSalePrice;
																			setChosenProductWithVariables([
																				...chosenProductWithVariables,
																			]);
																		}
																	}}>
																	{p.SubSKUWholeSalePrice} EGP
																</li>
																<li
																	onClick={() => {
																		const index =
																			chosenProductWithVariables.findIndex(
																				(object) => {
																					return (
																						object.productId === p.productId &&
																						object.SubSKU === p.SubSKU
																					);
																				},
																			);

																		if (index !== -1) {
																			chosenProductWithVariables[
																				index
																			].pickedPrice = p.SubSKUMSRP;
																			setChosenProductWithVariables([
																				...chosenProductWithVariables,
																			]);
																		}
																	}}>
																	{p.SubSKUMSRP} EGP
																</li>
															</ul>
														</div>
														<br />
														<div className='form-group mt-1'>
															<label className=''>Order Qty</label>
															<input
																value={p.OrderedQty}
																type='number'
																style={{
																	border: "1px lightgrey solid",
																	width: "100%",
																}}
																// max={Number(AvailableStock.quantity)}
																onChange={(e) => {
																	const index =
																		chosenProductWithVariables.findIndex(
																			(object) => {
																				return (
																					object.productId === p.productId &&
																					object.SubSKU === p.SubSKU
																				);
																			},
																		);

																	if (index !== -1) {
																		chosenProductWithVariables[
																			index
																		].OrderedQty = e.target.value;
																		setChosenProductWithVariables([
																			...chosenProductWithVariables,
																		]);
																	}
																}}
															/>
														</div>
														<div className='form-group mt-1'>
															<label className=''>
																Product Price (Please be careful while adding
																the price manually){" "}
															</label>
															<input
																type='number'
																className='form-control'
																value={p.pickedPrice}
																onChange={(e) => {
																	const index =
																		chosenProductWithVariables.findIndex(
																			(object) => {
																				return (
																					object.productId === p.productId &&
																					object.SubSKU === p.SubSKU
																				);
																			},
																		);

																	if (index !== -1) {
																		chosenProductWithVariables[
																			index
																		].pickedPrice = e.target.value;
																		setChosenProductWithVariables([
																			...chosenProductWithVariables,
																		]);
																	}
																}}
																placeholder='Required - Product Price'
															/>
														</div>
													</div>
												);
											})}
									</div>
									<div className='ml-5 mt-3' style={{ fontSize: "1.1rem" }}>
										Total Amount:{" "}
										<strong>
											{Number(productsTotalAmount).toFixed(2)} EGP
										</strong>
									</div>
								</div>
							) : null}
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
			grid-template-columns: 17% 17% 17% 17% 17% 17%;
			margin: auto;
			padding-left: 2px;
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
