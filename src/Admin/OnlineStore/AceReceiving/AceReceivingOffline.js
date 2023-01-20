/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../../auth";
import {
	getColors,
	getProducts,
	getReceivingLogs,
	receiveNew,
	updateProduct,
} from "../../apiAdmin";
import { Select } from "antd";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";
import LogoImage from "../../../GeneralImages/Logo2.png";
import { Link } from "react-router-dom";

const { Option } = Select;

const AceReceivingOffline = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [allSubSKUs, setAllSubSKUs] = useState([]);
	const [chosenSubSKU, setChosenSubSKU] = useState("");
	const [chosenProduct, setChosenProduct] = useState("");
	const [submittedSKU, setSubmittedSKU] = useState(false);
	const [allColors, setAllColors] = useState([]);
	const [quantityToBeReceived, setQuantityToBeReceived] = useState("");
	const [inboundQuantitySubmit, setInboundQuantitySubmit] = useState(false);

	const { user, token } = isAuthenticated();

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				getReceivingLogs().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var allAceReceiving = data2.filter(
							(i) =>
								i.storeName.toLowerCase().replace(/\s+/g, " ").trim() ===
									user.userStore.toLowerCase().replace(/\s+/g, " ").trim() &&
								i.storeBranch.toLowerCase().replace(/\s+/g, " ").trim() ===
									user.userBranch.toLowerCase().replace(/\s+/g, " ").trim(),
						);

						var totalQuantityAggregated = [];
						allAceReceiving &&
							allAceReceiving.reduce(function (res, value) {
								if (!res[value.receivedSKU]) {
									res[value.receivedSKU] = {
										SubSKU: value.receivedSKU,
										totalQuantity: 0,
									};
									totalQuantityAggregated.push(res[value.receivedSKU]);
								}
								res[value.receivedSKU].totalQuantity += Number(
									value.receivedQuantity,
								);
								return res;
							}, {});

						var allAceProducts = data.filter(
							(i) =>
								i.activeProduct === true && i.storeName.storeName === "ace",
						);

						var allAceProductAttributesModified = allAceProducts.map((i) => {
							return {
								...i,
								productAttributes: i.productAttributes.map((ii) => {
									return {
										...ii,
										quantity: ii.quantity,
										receivedQuantity:
											totalQuantityAggregated
												.map((iii) => iii.SubSKU.toLowerCase())
												.indexOf(ii.SubSKU.toLowerCase()) > -1
												? totalQuantityAggregated[
														totalQuantityAggregated
															.map((iii) => iii.SubSKU.toLowerCase())
															.indexOf(ii.SubSKU.toLowerCase())
												  ].totalQuantity
												: 0,
									};
								}),
							};
						});

						setAllProducts(allAceProductAttributesModified);

						var allAceSKUs =
							allAceProductAttributesModified &&
							allAceProductAttributesModified.map((i) =>
								i.productAttributes.map((ii) => ii.SubSKU),
							);

						var mergedSubSKUs = [].concat.apply([], allAceSKUs);

						setAllSubSKUs(mergedSubSKUs);

						var addingVariablesToMain =
							allAceProductAttributesModified &&
							allAceProductAttributesModified.map((i) =>
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
										receivedQuantity: ii.receivedQuantity
											? ii.receivedQuantity
											: 0,
									};
								}),
							);

						var mergedFinalOfFinal = [].concat.apply([], addingVariablesToMain);

						let allAttributesFinalOfFinal = [
							...new Map(
								mergedFinalOfFinal.map((item) => [item, item]),
							).values(),
						];

						setChosenProduct(
							chosenSubSKU &&
								allAttributesFinalOfFinal &&
								allAttributesFinalOfFinal.filter(
									(i) => i.SubSKU.toLowerCase() === chosenSubSKU.toLowerCase(),
								)[0],
						);
					}
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
	}, [chosenSubSKU]);

	// console.log(chosenProduct, "chosenProduct");

	var alreadyStockedQuantity =
		chosenProduct && chosenProduct.receivedQuantity
			? chosenProduct.receivedQuantity
			: 0;

	var updatedProductAttributesFinal =
		chosenProduct &&
		chosenProduct.productAttributes.map((i) =>
			i.SubSKU === chosenProduct.SubSKU
				? {
						...i,
						receivedQuantity:
							Number(alreadyStockedQuantity) + Number(quantityToBeReceived),
						quantity: Number(i.quantity) - Number(quantityToBeReceived),
				  }
				: i,
		);

	// console.log(updatedProductAttributesFinal, "updatedProductAttributesFinal");

	const submitReceivingUpdate = (e) => {
		window.scrollTo({ top: 0, behavior: "smooth" });

		const values = {
			productName: chosenProduct.productName,
			productName_Arabic: chosenProduct.productName_Arabic,
			productSKU: chosenProduct.productSKU,
			slug: chosenProduct.slug,
			slug_Arabic: chosenProduct.slug_Arabic,
			description: chosenProduct.description,
			description_Arabic: chosenProduct.description_Arabic,
			price: chosenProduct.addVariables ? 0 : chosenProduct.price,
			priceAfterDiscount: chosenProduct.addVariables
				? 0
				: chosenProduct.priceAfterDiscount,
			MSRPPriceBasic: chosenProduct.addVariables
				? 0
				: Number(chosenProduct.MSRPPriceBasic),
			price_unit: "LE",
			loyaltyPoints: 10,
			category: chosenProduct.category._id,
			viewsCount: chosenProduct.viewsCount,
			subcategory: chosenProduct.subcategory.map((i) => i._id),
			gender: chosenProduct.gender._id,
			addedByEmployee: chosenProduct.addedByEmployee._id,
			updatedByEmployee: user._id,
			quantity: chosenProduct.addVariables ? 0 : chosenProduct.stock,
			thumbnailImage: chosenProduct.thumbnailImage,
			relatedProducts:
				chosenProduct.relatedProducts &&
				chosenProduct.relatedProducts.length > 0
					? chosenProduct.relatedProducts.map((i) => i._id)
					: [],
			shipping: chosenProduct.shipping,
			addVariables: chosenProduct.addVariables,
			storeName: chosenProduct.storeName._id,
			clearance: chosenProduct.clearance,
			productAttributes:
				updatedProductAttributesFinal.length > 0
					? updatedProductAttributesFinal
					: chosenProduct.productAttributes,
			activeProduct: chosenProduct.activeProduct,
			chosenSeason: chosenProduct.chosenSeason,
			featuredProduct: chosenProduct.featured,
			activeBackorder: chosenProduct.activeBackorder,
			policy: chosenProduct.policy ? chosenProduct.policy : "",
			policy_Arabic: chosenProduct.policy_Arabic
				? chosenProduct.policy_Arabic
				: "",
			DNA: chosenProduct.DNA ? chosenProduct.DNA : "",
			DNA_Arabic: chosenProduct.DNA_Arabic ? chosenProduct.DNA_Arabic : "",
			Specs: chosenProduct.Specs ? chosenProduct.Specs : "",
			Specs_Arabic: chosenProduct.Specs_Arabic
				? chosenProduct.Specs_Arabic
				: "",
			fitCare: chosenProduct.fitCare ? chosenProduct.fitCare : "",
			fitCare_Arabic: chosenProduct.fitCare_Arabic
				? chosenProduct.fitCare_Arabic
				: "",
			sizeChart: chosenProduct.sizeChart ? chosenProduct.sizeChart : {},
		};

		// console.log(values, "inside Function");

		updateProduct(chosenProduct._id, user._id, token, {
			product: values,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Receiving Was Successfully Processed");
				setTimeout(function () {
					window.location.reload(false);
				}, 3000);
			}
		});

		receiveNew(user._id, token, {
			productName: chosenProduct.productName,
			productId: chosenProduct._id,
			receivedByEmployee: user,
			storeName: user.userStore,
			storeBranch: user.userBranch ? user.userBranch : "san stefano",
			receivedSKU: chosenSubSKU,
			receivedQuantity: quantityToBeReceived,
			receivingCase: "new",
		}).then((data) => {
			if (data.error) {
				setTimeout(function () {
					// window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Successfully Added To Your Receiving Log");
			}
		});
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	return (
		<AceReceivingOfflineWrapper>
			<div className='mainContent'>
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

				<div className='col-md-10 mx-auto mt-5'>
					<div
						style={{
							fontSize: "1.1rem",
							fontWeight: "bolder",
							letterSpacing: "2px",
							textAlign: "right",
							textDecoration: "underline",
						}}>
						<Link
							to='/admin/offline-order-taking'
							style={{
								fontSize: "1.1rem",
								fontWeight: "bolder",
								letterSpacing: "2px",
								textAlign: "right",
							}}>
							Back to POS
						</Link>
					</div>
					<div className='text-center'>
						<h3
							style={{
								textAlign: "center",
								fontSize: "1.3rem",
								fontWeight: "bolder",
								letterSpacing: "2px",
								textTransform: "uppercase",
							}}>
							RECEIVE NEW (STORE: {user && user.userBranch})
						</h3>
					</div>

					{allProducts &&
						allProducts.length > 0 &&
						allSubSKUs &&
						allSubSKUs.length > 0 && (
							<div className='form-group mx-auto'>
								<label>Pick a SKU</label>
								<br />
								<Select
									style={{
										color: "black",
										textTransform: "capitalize",
										width: "50%",
									}}
									showSearch
									placeholder='Search to Select A SKU'
									value={chosenSubSKU}
									allowClear
									onChange={(value) => {
										setChosenSubSKU(value);
									}}>
									{allSubSKUs &&
										allSubSKUs.map((subsku, i) => {
											return (
												<Option
													key={i}
													value={subsku}
													style={{ textTransform: "uppercase" }}>
													{subsku}
												</Option>
											);
										})}
								</Select>
							</div>
						)}

					{chosenSubSKU && allSubSKUs.indexOf(chosenSubSKU) > -1 ? (
						<button
							className='btn btn-primary p-1 mt-3'
							onClick={() => setSubmittedSKU(true)}>
							Submit SKU
						</button>
					) : null}

					{chosenSubSKU &&
					chosenProduct &&
					chosenProduct.productName &&
					allSubSKUs.indexOf(chosenSubSKU) > -1 &&
					submittedSKU ? (
						<div className='mt-4'>
							<h5
								style={{
									textTransform: "uppercase",
									fontWeight: "bold",
									color: "darkred",
								}}>
								SKU Details:
							</h5>

							<div className='mb-3'>
								<img
									src={chosenProduct.thumbnailImage[0].images[0].url}
									width='25%'
									alt='infinite-apps'
								/>
							</div>
							<div>
								<strong>Product Name:</strong>{" "}
								<span style={{ textTransform: "uppercase" }}>
									{chosenProduct && chosenProduct.productName}
								</span>{" "}
							</div>
							<div>
								<strong>Product Category:</strong>{" "}
								<span style={{ textTransform: "uppercase" }}>
									{chosenProduct &&
										chosenProduct.category &&
										chosenProduct.category.categoryName}
								</span>{" "}
							</div>
							<div>
								<strong>Product SKU:</strong>{" "}
								<span style={{ textTransform: "uppercase" }}>
									{chosenProduct && chosenProduct.SubSKU}
								</span>{" "}
							</div>
							<div>
								<strong>Product Color:</strong>{" "}
								<span style={{ textTransform: "uppercase" }}>
									{allColors[
										allColors.map((i) => i.hexa).indexOf(chosenProduct.color)
									]
										? allColors[
												allColors
													.map((i) => i.hexa)
													.indexOf(chosenProduct.color)
										  ].color
										: chosenProduct.color}
								</span>{" "}
							</div>
							<div>
								<strong>Product Size:</strong>{" "}
								<span style={{ textTransform: "uppercase" }}>
									{chosenProduct && chosenProduct.size}
								</span>{" "}
							</div>
							<div>
								<strong>Product Description:</strong>
								<div className='ml-3' style={{ textTransform: "" }}>
									{chosenProduct && chosenProduct.description}
								</div>{" "}
							</div>
							<div>
								<strong>Current Active Stock In Ace Store:</strong>{" "}
								{chosenProduct && chosenProduct.receivedQuantity
									? chosenProduct.receivedQuantity
									: 0}{" "}
								Items
							</div>
							<div>
								<strong>Quantity Onhand (G&Q Hub):</strong>{" "}
								{chosenProduct && chosenProduct.quantity
									? chosenProduct.quantity
									: 0}{" "}
								Items
							</div>

							<div className='form-group mt-5 '>
								<label className=''>
									Please add how many items would you like to add to your active
									stock in store?
								</label>
								<input
									onChange={(e) => {
										setQuantityToBeReceived(e.target.value);
									}}
									type='number'
									className='form-control'
									value={quantityToBeReceived}
									placeholder='Required - Inbound Quantity'
								/>
							</div>
							{quantityToBeReceived && quantityToBeReceived > 0 ? (
								<div>
									<button
										className='btn btn-info p-2 mb-5'
										onClick={() => setInboundQuantitySubmit(true)}>
										Submit Inbound Quantity
									</button>
								</div>
							) : null}

							{quantityToBeReceived &&
							quantityToBeReceived > 0 &&
							inboundQuantitySubmit &&
							chosenProduct &&
							Number(chosenProduct.quantity) >= Number(quantityToBeReceived) ? (
								<div>
									<div
										style={{
											marginTop: "20px",
											fontWeight: "bold",
											fontSize: "1rem",
										}}>
										Please be 100% certain that you have overall items for SKU{" "}
										{chosenSubSKU.toUpperCase()}
										<span style={{ color: "darkgreen" }}>
											{" "}
											(
											{Number(alreadyStockedQuantity) +
												Number(quantityToBeReceived)}{" "}
											Items)
										</span>
										<br />
										You can count the items again for QA purposes.
										<br />
										<br />
										Overall Quantity Onhand (G&Q Hub):{" "}
										<span style={{ color: "darkgreen" }}>
											{chosenProduct && chosenProduct.quantity} items.
										</span>
										<br />
										Already Available Quantity In Store:{" "}
										<span style={{ color: "darkgreen" }}>
											{alreadyStockedQuantity} items.
										</span>
										<br />
										Quantity To Be Received:{" "}
										<span style={{ color: "darkgreen" }}>
											{quantityToBeReceived} items.
										</span>
										<br />
										Overall Quantity Onhand (G&Q Hub) After Receiving:{" "}
										<span style={{ color: "darkgreen" }}>
											{chosenProduct &&
												Number(chosenProduct.quantity) -
													Number(quantityToBeReceived)}{" "}
											items.
										</span>
										<br />
										Overall Quantity Onhand (ACE Store) After Receiving:{" "}
										<span style={{ color: "darkgreen" }}>
											{Number(alreadyStockedQuantity) +
												Number(quantityToBeReceived)}{" "}
											items
										</span>
										<br />
									</div>
									<div
										className='my-3'
										style={{
											textTransform: "uppercase",
											fontSize: "1.1rem",
										}}>
										This will be received in branch:{" "}
										<strong>{user.userBranch}</strong>
									</div>
									<div
										className='my-3'
										style={{
											fontWeight: "bold",
											fontSize: "0.9rem",
											color: "darkred",
										}}>
										Are you sure you want to proceed?
									</div>
									<button
										className='btn btn-success p-2 btn-block col-3 mt-3 mb-5'
										onClick={submitReceivingUpdate}>
										Yes
									</button>
								</div>
							) : quantityToBeReceived > 0 &&
							  inboundQuantitySubmit &&
							  chosenProduct &&
							  Number(chosenProduct.quantity) <
									Number(quantityToBeReceived) ? (
								<div
									style={{
										marginTop: "20px",
										fontWeight: "bold",
										fontSize: "1rem",
										color: "red",
									}}>
									Unfortunately, The manufactured items at G&Q Hub is less than
									the quantity you want to receive.
								</div>
							) : null}
						</div>
					) : null}
				</div>
			</div>
		</AceReceivingOfflineWrapper>
	);
};

export default AceReceivingOffline;

const AceReceivingOfflineWrapper = styled.div`
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
