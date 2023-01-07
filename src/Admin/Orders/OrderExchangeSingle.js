/** @format */
import { EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// eslint-disable-next-line
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import DarkBG from "../AdminMenu/DarkBG";
import Navbar from "../AdminNavMenu/Navbar";
// eslint-disable-next-line
import {
	getColors,
	getProducts,
	readSingleOrder,
	updateOrderExchange,
} from "../apiAdmin";
import ExchangeModal from "./UpdateModals/ExchangeModal";

const OrderExchangeSingle = (props) => {
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [modalVisible, setModalVisible] = useState(false);
	// eslint-disable-next-line
	const [updateElement, setUpdateElement] = useState("");
	const [exchangeTrackingNumber, setExchangeTrackingNumber] = useState("");
	const [singleOrder, setSingleOrder] = useState({});
	const [updateSingleOrder, setUpdateSingleOrder] = useState({});
	// eslint-disable-next-line
	const [updateCustomerDetails, setUpdateCustomerDetails] = useState({});
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allColors, setAllColors] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [chosenProductQtyWithVariables, setChosenProductQtyWithVariables] =
		useState({});
	const [previousProductVariable, setPreviousProductVariable] = useState({});
	const [redirect, setRedirect] = useState(false);

	const { user, token } = isAuthenticated();

	const loadSingleOrder = (orderId) => {
		setLoading(true);
		readSingleOrder(user._id, token, orderId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSingleOrder(data);
				setUpdateSingleOrder(data);
				setUpdateCustomerDetails(data.customerDetails);
				setLoading(false);
			}
		});
	};

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllProducts(
					data.map((i) => {
						return {
							...i,
							orderedQuantity: 1,
						};
					}),
				);
			}
		});
	};

	useEffect(() => {
		const orderId = props.match.params.orderId;
		loadSingleOrder(orderId);
		gettingAllProducts();
		// eslint-disable-next-line
	}, []);

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
		gettingAllColors();
		// eslint-disable-next-line
	}, []);

	// Return and Exchange in the side menu
	// Search for INV number
	// Below, we should find the order details.
	// On click on the SKU ask, Return or Exchange
	// Split the screen after the process.
	// Total price difference after return or exchange
	// Add an extra status for exchange to be "exchanged - Stocked"
	// stock update when exchanging only if the status is Exchange - Delivered
	// Returned Not Refunded to be returned to stock

	// Small squares under the 3 rectangles

	// If one item is backorder, don't decrease from the stock for the entire order

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

	const UpdatingOrder = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const singleOrderModified = {
			...updateSingleOrder,
			totalAmountAfterExchange: totalExchangedAmount(),
		};
		updateOrderExchange(
			updateSingleOrder._id,
			user._id,
			token,
			singleOrderModified,
		)
			.then((response) => {
				toast.success("Order was successfully exchanged");
				setTimeout(function () {
					setRedirect(true);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	function sum_array(arr) {
		// store our final answer
		var sum = 0;

		// loop through entire array
		for (var i = 0; i < arr.length; i++) {
			// loop through each inner array
			for (var j = 0; j < arr[i].length; j++) {
				// add this number to the current final sum
				sum += arr[i][j];
			}
		}

		return sum;
	}

	const totalExchangedQty = () => {
		var habalFelGabal =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.map(
				(i) => i.exchangedProduct.SubSKU,
			);

		var unExchangedVariables =
			updateSingleOrder &&
			updateSingleOrder.chosenProductQtyWithVariables &&
			updateSingleOrder.chosenProductQtyWithVariables.map((i) =>
				i.filter(
					(ii) => habalFelGabal && habalFelGabal.indexOf(ii.SubSKU) === -1,
				),
			);

		var QtyWithVariables = unExchangedVariables.map((iii) =>
			iii.map((iiii) => Number(iiii.OrderedQty)),
		);

		var exchangedQty = updateSingleOrder.exchangedProductQtyWithVariables
			.map((i) => Number(i.OrderedQty))
			.reduce((a, b) => a + b, 0);

		return Number(exchangedQty) + Number(sum_array(QtyWithVariables));
	};

	const totalExchangedAmount = () => {
		var habalFelGabal =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.map(
				(i) => i.exchangedProduct.SubSKU,
			);

		var unExchangedVariables =
			updateSingleOrder &&
			updateSingleOrder.chosenProductQtyWithVariables &&
			updateSingleOrder.chosenProductQtyWithVariables.map((i) =>
				i.filter(
					(ii) => habalFelGabal && habalFelGabal.indexOf(ii.SubSKU) === -1,
				),
			);

		var QtyWithVariablesTotalAmount = unExchangedVariables.map((iii) =>
			iii.map((iiii) => Number(iiii.pickedPrice) * Number(iiii.OrderedQty)),
		);

		var exchangedAmount = updateSingleOrder.exchangedProductQtyWithVariables
			.map((i) => Number(i.OrderedQty) * Number(i.pickedPrice))
			.reduce((a, b) => a + b, 0);

		return Number(
			Number(exchangedAmount) + Number(sum_array(QtyWithVariablesTotalAmount)),
		).toFixed(2);
	};

	return (
		<OrderExchangeSingleWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				{redirect ? <Redirect to='/admin/order-exchange' /> : null}
				<div className=''>
					<AdminMenu
						fromPage='OrderExchange'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='OrderExchange' pageScrolled={pageScrolled} />
					{loading ? (
						<div>
							<div
								style={{
									fontSize: "2rem",
									textAlign: "center",
									marginTop: "50px",
									color: "darkslategray",
									fontWeight: "bold",
								}}>
								Loading...
							</div>
						</div>
					) : (
						<div className='row ml-2'>
							<ExchangeModal
								allProducts={allProducts}
								updateSingleOrder={updateSingleOrder}
								setUpdateSingleOrder={setUpdateSingleOrder}
								chosenProductQtyWithVariables={chosenProductQtyWithVariables}
								setChosenProductQtyWithVariables={
									setChosenProductQtyWithVariables
								}
								totalExchangedAmount={totalExchangedAmount}
								totalExchangedQty={totalExchangedQty}
								previousProductVariable={previousProductVariable}
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
								setCollapsed={setCollapsed}
								exchangeTrackingNumber={exchangeTrackingNumber}
								setExchangeTrackingNumber={setExchangeTrackingNumber}
							/>

							<div className='col-md-6'>
								<div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
									Customer Details{" "}
								</div>
								<div className='col-md-4 mx-auto text-center'>
									<hr />
								</div>
								<div className='row'>
									<div className='col-md-6'>
										Customer Name:{" "}
										<strong style={{ color: "darkblue" }}>
											{updateSingleOrder.customerDetails.fullName}
										</strong>
									</div>
									<div className='col-md-6'>
										Customer Phone:{" "}
										<strong style={{ color: "darkblue" }}>
											{updateSingleOrder.customerDetails.phone}
										</strong>
									</div>
									<div className='col-md-6'>
										Customer Email:{" "}
										<strong style={{ color: "darkblue" }}>
											{" "}
											{updateSingleOrder.customerDetails.email}
										</strong>
									</div>

									<div className='col-md-6 mx-auto'>
										Customer Additional Comment:{" "}
										<strong style={{ color: "darkblue" }}>
											{updateSingleOrder.customerDetails.orderComment}
										</strong>
									</div>
								</div>
								<div className='col-md-4 mx-auto text-center'>
									<hr />
								</div>
								<div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
									Shipping Details:{" "}
									{/* <span
									className='ml-2'
									style={{ cursor: "pointer" }}
									onClick={() => {
										setModalVisible(true);
										setUpdateElement("Shipping Details");
									}}>
									<EditOutlined />
								</span> */}
								</div>
								<div className='row mt-3'>
									<div className='col-md-6'>
										Carrier Name:{" "}
										<strong style={{ color: "darkblue" }}>
											{singleOrder.chosenShippingOption &&
												singleOrder.chosenShippingOption[0] &&
												singleOrder.chosenShippingOption[0].carrierName}
										</strong>
									</div>

									<div className='col-md-6'>
										<div className='mt-1'>
											Customer Address:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.customerDetails.address}
											</strong>
										</div>
									</div>

									<div className='col-md-6'>
										<div className='mt-1'>
											Ship To Governorate:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.customerDetails.state}
											</strong>
										</div>
									</div>

									<div className='col-md-6'>
										<div className='mt-1'>
											Ship To City:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.customerDetails.cityName}
											</strong>
										</div>
									</div>

									<div className='col-md-6'>
										<div className='mt-1'>
											Ship To City Code:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.customerDetails.city}
											</strong>
										</div>
									</div>

									<div className='col-md-6'>
										<div className='mt-1'>
											Shipping Price:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.chosenShippingOption.length > 0 &&
													singleOrder.customerDetails.carrierName &&
													singleOrder.chosenShippingOption[0].chosenShippingData.filter(
														(ii) =>
															ii.governorate ===
															singleOrder.customerDetails.state,
													)[0].shippingPrice_Client}{" "}
												L.E.
											</strong>
										</div>
									</div>

									<div className='col-md-6 mx-auto'>
										<div className='mt-1'>
											Estimated Time For Arrival:{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.chosenShippingOption.length > 0 &&
													singleOrder.customerDetails.carrierName &&
													singleOrder.chosenShippingOption[0].chosenShippingData.filter(
														(ii) =>
															ii.governorate ===
															singleOrder.customerDetails.state,
													)[0].estimatedTimeForArrival}{" "}
												Day
											</strong>
										</div>
									</div>
								</div>

								<div className='col-md-4 mx-auto text-center'>
									<hr />
								</div>
								<div
									style={{
										fontSize: "1.25rem",
										fontWeight: "bolder",
										marginTop: "30px",
									}}>
									Order Details:
								</div>
								{singleOrder.productsNoVariable.length > 0 ? (
									<React.Fragment>
										<div
											className='my-3'
											style={{ fontSize: "1rem", fontWeight: "bolder" }}>
											Basic Products:
										</div>

										<div className='row'>
											{singleOrder.productsNoVariable.map((p, i) => {
												return (
													<div className='col-md-4 text-capitalize' key={i}>
														<div className='row'>
															<div className='col-md-6'>
																Product Name:{" "}
																<strong style={{ color: "darkblue" }}>
																	{p.productName}
																</strong>
																<br />
																<br />
																Quantity:{" "}
																<strong style={{ color: "darkblue" }}>
																	{p.orderedQuantity}{" "}
																</strong>
																{Number(p.orderedQuantity) > 1
																	? "Units"
																	: "Unit"}
															</div>

															<div className='col-md-6'>
																{p.productSubSKUImage ? (
																	<img
																		style={{ width: "100px" }}
																		src={
																			p.productSubSKUImage
																				? p.productSubSKUImage
																				: ""
																		}
																		alt=''
																	/>
																) : (
																	<img
																		style={{ width: "100px" }}
																		src={
																			p.productMainImage
																				? p.productMainImage
																				: ""
																		}
																		alt=''
																	/>
																)}
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</React.Fragment>
								) : null}

								{singleOrder.chosenProductQtyWithVariables.length > 0 ? (
									<>
										<div
											className='my-3'
											style={{ fontSize: "1rem", fontWeight: "bolder" }}>
											Products With Variables:
										</div>

										<div className='row'>
											{singleOrder.chosenProductQtyWithVariables.map((p, i) => {
												return (
													<React.Fragment key={i}>
														{p.map((pp, ii) => {
															return (
																<div
																	className='col-md-10 text-capitalize'
																	key={ii}>
																	<div className='row'>
																		<div className='col-md-6'>
																			Product Name:{" "}
																			<strong
																				style={{
																					color: "darkblue",
																					textTransform: "capitalize",
																				}}>
																				{pp.productName} | {pp.SubSKU} |{" "}
																				{allColors[
																					allColors
																						.map((i) => i.hexa)
																						.indexOf(pp.SubSKUColor)
																				]
																					? allColors[
																							allColors
																								.map((i) => i.hexa)
																								.indexOf(pp.SubSKUColor)
																					  ].color
																					: pp.SubSKUColor}
																			</strong>
																			<br />
																			<br />
																			Quantity:{" "}
																			<strong style={{ color: "darkblue" }}>
																				{pp.OrderedQty}{" "}
																			</strong>
																			{Number(pp.OrderedQty) > 1
																				? "Units"
																				: "Unit"}
																		</div>
																		<div className='col-md-6'>
																			{pp.productSubSKUImage ? (
																				<img
																					style={{ width: "100px" }}
																					src={
																						pp.productSubSKUImage
																							? pp.productSubSKUImage
																							: ""
																					}
																					alt=''
																				/>
																			) : (
																				<img
																					style={{ width: "100px" }}
																					src={
																						pp.productMainImage
																							? pp.productMainImage
																							: ""
																					}
																					alt=''
																				/>
																			)}
																		</div>
																	</div>
																</div>
															);
														})}
													</React.Fragment>
												);
											})}
										</div>
									</>
								) : null}

								<div className='col-md-4 mx-auto text-center'>
									<hr />
								</div>
								<br />
								<div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
									Order Total Value:
								</div>

								<div className='mt-4' style={{ fontSize: "1.2rem" }}>
									Total Amount:{" "}
									{singleOrder.totalAmount !==
									singleOrder.totalAmountAfterDiscount ? (
										<>
											<strong>
												<s style={{ color: "darkred" }}>
													{singleOrder.totalAmount} L.E.
												</s>
											</strong>{" "}
											<strong style={{ color: "darkblue" }}>
												{singleOrder.totalAmountAfterDiscount} L.E.
											</strong>
										</>
									) : (
										<strong style={{ color: "darkblue" }}>
											{singleOrder.totalAmountAfterDiscount} L.E.
										</strong>
									)}
								</div>
							</div>

							<div
								className='col-md-6'
								style={{ borderLeft: "solid black 1px", paddingLeft: "50px" }}>
								<div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
									Customer Details{" "}
								</div>
								<div className='col-md-4 mx-auto text-center'>
									<hr />
								</div>
								<div className='row'>
									<div className='form-group col-md-5 '>
										<label className=''>Customer Name</label>
										<input
											style={{ fontSize: "12px" }}
											onChange={(e) => {
												setUpdateSingleOrder({
													...updateSingleOrder,
													customerDetails: {
														...updateSingleOrder.customerDetails,
														fullName: e.target.value,
													},
												});
											}}
											type='text'
											className='form-control'
											value={updateSingleOrder.customerDetails.fullName}
											placeholder='Required - Customer Full Name'
										/>
									</div>

									<div className='form-group col-md-5 '>
										<label className=''>Customer Phone</label>
										<input
											style={{ fontSize: "12px" }}
											onChange={(e) => {
												setUpdateSingleOrder({
													...updateSingleOrder,
													customerDetails: {
														...updateSingleOrder.customerDetails,
														phone: e.target.value,
													},
												});
											}}
											type='number'
											className='form-control'
											value={updateSingleOrder.customerDetails.phone}
											placeholder='Required - Customer Phone Number'
										/>
									</div>

									<div className='form-group col-md-5 '>
										<label className=''>Customer Email</label>
										<input
											style={{ fontSize: "12px" }}
											onChange={(e) => {
												setUpdateSingleOrder({
													...updateSingleOrder,
													customerDetails: {
														...updateSingleOrder.customerDetails,
														email: e.target.value,
													},
												});
											}}
											type='text'
											className='form-control'
											value={updateSingleOrder.customerDetails.email}
											placeholder='Optional - Customer Email'
										/>
									</div>

									<div className='form-group col-md-5 '>
										<label className=''>Additional Comment</label>
										<input
											style={{ fontSize: "12px" }}
											onChange={(e) => {
												setUpdateSingleOrder({
													...updateSingleOrder,
													customerDetails: {
														...updateSingleOrder.customerDetails,
														orderComment: e.target.value,
													},
												});
											}}
											type='text'
											className='form-control'
											value={updateSingleOrder.customerDetails.orderComment}
											placeholder='Optional - Customer Additional Comments'
										/>
									</div>
									<div className='col-md-8 mx-auto'>
										<hr />
									</div>
									<div className='col-md-11 mx-auto'>
										<div
											className='my-3'
											style={{ fontSize: "1rem", fontWeight: "bolder" }}>
											Exchange Product :
										</div>

										{updateSingleOrder.chosenProductQtyWithVariables.length >
										0 ? (
											<>
												<div className='row'>
													{updateSingleOrder.chosenProductQtyWithVariables.map(
														(p, i) => {
															return (
																<React.Fragment key={i}>
																	{p.map((pp, ii) => {
																		return (
																			<div className='text-capitalize' key={ii}>
																				<div className='row'>
																					<div className='col-md-6 my-auto'>
																						Product Name:{" "}
																						<strong
																							style={{
																								color: "darkblue",
																								textTransform: "capitalize",
																							}}>
																							{pp.productName} | {pp.SubSKU} |{" "}
																							{allColors[
																								allColors
																									.map((i) => i.hexa)
																									.indexOf(pp.SubSKUColor)
																							]
																								? allColors[
																										allColors
																											.map((i) => i.hexa)
																											.indexOf(pp.SubSKUColor)
																								  ].color
																								: pp.SubSKUColor}
																						</strong>
																						<span
																							className='ml-2'
																							style={{ cursor: "pointer" }}
																							onClick={() => {
																								setModalVisible(true);
																								setChosenProductQtyWithVariables(
																									pp,
																								);
																								setPreviousProductVariable(pp);
																								setCollapsed(true);
																							}}>
																							<EditOutlined />
																						</span>
																					</div>
																					<div className='col-md-6'>
																						{pp.productSubSKUImage ? (
																							<img
																								style={{ width: "100px" }}
																								src={
																									pp.productSubSKUImage
																										? pp.productSubSKUImage
																										: ""
																								}
																								alt=''
																							/>
																						) : (
																							<img
																								style={{ width: "100px" }}
																								src={
																									pp.productMainImage
																										? pp.productMainImage
																										: ""
																								}
																								alt=''
																							/>
																						)}
																					</div>
																				</div>

																				{updateSingleOrder
																					.exchangedProductQtyWithVariables
																					.length > 0 &&
																				updateSingleOrder.exchangedProductQtyWithVariables
																					.map(
																						(iv) => iv.exchangedProduct.SubSKU,
																					)
																					.indexOf(pp.SubSKU) > -1 ? (
																					<div>
																						<div
																							className='mt-3'
																							style={{ fontWeight: "bolder" }}>
																							Exchanged By:
																						</div>

																						<div className='row'>
																							<div className='col-md-6 my-auto'>
																								Product Name:{" "}
																								<strong
																									style={{
																										color: "darkblue",
																										textTransform: "capitalize",
																									}}>
																									{
																										updateSingleOrder.exchangedProductQtyWithVariables.filter(
																											(ivv) =>
																												ivv.exchangedProduct
																													.SubSKU === pp.SubSKU,
																										)[0].productName
																									}
																									|{" "}
																									{
																										updateSingleOrder.exchangedProductQtyWithVariables.filter(
																											(ivv) =>
																												ivv.exchangedProduct
																													.SubSKU === pp.SubSKU,
																										)[0].SubSKU
																									}{" "}
																									|{" "}
																									{
																										updateSingleOrder.exchangedProductQtyWithVariables.filter(
																											(ivv) =>
																												ivv.exchangedProduct
																													.SubSKU === pp.SubSKU,
																										)[0].color
																									}
																								</strong>
																							</div>
																							<div className='col-md-6'>
																								<img
																									style={{ width: "100px" }}
																									src={
																										updateSingleOrder.exchangedProductQtyWithVariables.filter(
																											(ivv) =>
																												ivv.exchangedProduct
																													.SubSKU === pp.SubSKU,
																										)[0].productMainImage
																									}
																									alt=''
																								/>
																							</div>
																						</div>
																					</div>
																				) : null}
																				<hr />
																			</div>
																		);
																	})}
																</React.Fragment>
															);
														},
													)}
												</div>
											</>
										) : null}
									</div>
								</div>
								{updateSingleOrder.exchangedProductQtyWithVariables.length >
								0 ? (
									<>
										<strong>
											Total Quantity After Exchanging: {totalExchangedQty()}
										</strong>
										<br />
										<br />
										<strong>
											Total Amount After Exchanging: {totalExchangedAmount()}{" "}
											L.E.
										</strong>
									</>
								) : null}
							</div>
							<div className='col-md-5 mx-auto text-center my-5'>
								<button
									className='btn btn-success btn-block mb-3 mx-auto text-center'
									onClick={UpdatingOrder}>
									Exchange Order
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</OrderExchangeSingleWrapper>
	);
};

export default OrderExchangeSingle;

const OrderExchangeSingleWrapper = styled.div`
	min-height: 980px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "6% 94%" : "15% 85%")};
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
`;
