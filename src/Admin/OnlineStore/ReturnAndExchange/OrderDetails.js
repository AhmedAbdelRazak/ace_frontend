/** @format */

import React from "react";
import styled from "styled-components";
import OrderDetailsExchange from "./OrderDetailsExchange";
// eslint-disable-next-line
import OrderDetailsReturns from "./OrderDetailsReturns";

const OrderDetails = ({
	singleOrder,
	updateSingleOrder,
	allColors,
	setModalVisible,
	setChosenProductQtyWithVariables,
	setPreviousProductVariable,
	totalExchangedAmount,
	totalExchangedQty,
	modalVisible2,
	setModalVisible2,
	returnedItems,
	setReturnedItems,
	returnFullOrder,
	setReturnFullOrder,
}) => {
	var alreadyExchanged =
		updateSingleOrder.exchangedProductQtyWithVariables &&
		updateSingleOrder.exchangedProductQtyWithVariables.length > 0;

	var alreadyReturned =
		updateSingleOrder.returnedItems &&
		updateSingleOrder.returnedItems.length > 0;

	return (
		<OrderDetailsWrapper>
			<div className='col-md-10 mx-auto'>
				<div style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
					Customer Details{" "}
				</div>

				<div className='row my-3'>
					<div className='col-md-6'>
						Customer Name:{" "}
						<strong style={{ color: "darkblue" }}>
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.fullName}
						</strong>
					</div>
					<div className='col-md-6'>
						Customer Phone:{" "}
						<strong style={{ color: "darkblue" }}>
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.phone}
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

				<div
					className='mt-2'
					style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>
					Shipping Details:{" "}
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
								{singleOrder.chosenShippingOption &&
									singleOrder.chosenShippingOption.length > 0 &&
									singleOrder.customerDetails.carrierName &&
									singleOrder.chosenShippingOption[0].chosenShippingData.filter(
										(ii) =>
											ii.governorate === singleOrder.customerDetails.state,
									)[0].shippingPrice_Client}{" "}
								L.E.
							</strong>
						</div>
					</div>

					<div className='col-md-6 mx-auto'>
						<div className='mt-1'>
							Estimated Time For Arrival:{" "}
							<strong style={{ color: "darkblue" }}>
								{singleOrder.chosenShippingOption &&
									singleOrder.chosenShippingOption.length > 0 &&
									singleOrder.customerDetails.carrierName &&
									singleOrder.chosenShippingOption[0].chosenShippingData.filter(
										(ii) =>
											ii.governorate === singleOrder.customerDetails.state,
									)[0].estimatedTimeForArrival}{" "}
								Day
							</strong>
						</div>
					</div>
				</div>

				{singleOrder.productsNoVariable.length > 0 ? (
					<React.Fragment>
						<div
							className='mb-3 mt-5'
							style={{
								fontSize: "1.25rem",
								fontWeight: "bolder",
								marginTop: "30px",
							}}>
							Order Details:
						</div>
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
												{Number(p.orderedQuantity) > 1 ? "Units" : "Unit"}
											</div>

											<div className='col-md-6'>
												{p.productSubSKUImage ? (
													<img
														style={{ width: "100px" }}
														src={
															p.productSubSKUImage ? p.productSubSKUImage : ""
														}
														alt=''
													/>
												) : (
													<img
														style={{ width: "100px" }}
														src={p.productMainImage ? p.productMainImage : ""}
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
						<div className='row mt-5'>
							<div
								className={
									alreadyExchanged || alreadyReturned
										? "col-md-6 text-capitalize"
										: "col-md-12 text-capitalize"
								}>
								<div
									className='my-2'
									style={{
										fontSize: "1.25rem",
										fontWeight: "bolder",
										marginTop: "30px",
									}}>
									Order Details:
								</div>
								<div
									className='mb-3'
									style={{
										fontSize: "1rem",
										fontWeight: "bolder",
										marginTop: "30px",
									}}>
									Tracking #: {updateSingleOrder.trackingNumber}
								</div>
								{singleOrder.chosenProductQtyWithVariables &&
									singleOrder.chosenProductQtyWithVariables.map((p, i) => {
										return (
											<React.Fragment key={i}>
												{p.map((pp, ii) => {
													return (
														<div className='col-md-10 text-capitalize' key={ii}>
															<div className='row'>
																<div className='col-md-6'>
																	Product Name:{" "}
																	<strong
																		style={{
																			color: "darkblue",
																			textTransform: "capitalize",
																		}}>
																		{pp.productName} | {pp.SubSKU} |{" "}
																		{allColors &&
																			allColors[
																				allColors
																					.map((ii) => ii.hexa)
																					.indexOf(pp.SubSKUColor)
																			] &&
																			allColors[
																				allColors
																					.map((ii) => ii.hexa)
																					.indexOf(pp.SubSKUColor)
																			].color}
																	</strong>
																	<br />
																	<br />
																	Quantity:{" "}
																	<strong style={{ color: "darkblue" }}>
																		{pp.OrderedQty}{" "}
																	</strong>
																	{Number(pp.OrderedQty) > 1 ? "Units" : "Unit"}
																	<br />
																	Item Price:{" "}
																	<strong style={{ color: "darkblue" }}>
																		{pp.pickedPrice}
																	</strong>{" "}
																	L.E.
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
																{singleOrder &&
																(singleOrder.status === "Shipped" ||
																	singleOrder.status === "Delivered" ||
																	singleOrder.status ===
																		"Exchange - In Processing" ||
																	singleOrder.status ===
																		"Exchange - Ready To Ship" ||
																	singleOrder.status === "Return Request" ||
																	singleOrder.status === "In Return" ||
																	singleOrder.status ===
																		"In Return (Partial)") ? (
																	<div className=''>
																		<div className='row'>
																			<div className='col-md-6'>
																				<button
																					onClick={() => {
																						setModalVisible2(true);
																						setReturnedItems(
																							returnedItems.length === 0
																								? [{ ...pp, returnAmount: 0 }]
																								: [
																										...returnedItems,
																										{ ...pp, returnAmount: 0 },
																								  ],
																						);
																					}}
																					className='mr-5 btn btn-block'
																					style={{
																						background: "#767600",
																						color: "white",
																						border: "none",
																						padding: "5px",
																					}}>
																					Return
																				</button>
																			</div>

																			<div className='col-md-6'>
																				<button
																					className='btn btn-block'
																					style={{
																						background: "#005ab3",
																						color: "white",
																						border: "none",
																						padding: "5px",
																					}}
																					onClick={() => {
																						setModalVisible(true);
																						setChosenProductQtyWithVariables(
																							pp,
																						);
																						setPreviousProductVariable(pp);
																					}}>
																					Exchange
																				</button>
																			</div>
																		</div>
																	</div>
																) : null}
															</div>

															<div className='mb-3 col-md-8 mx-auto'>
																<hr />
															</div>
														</div>
													);
												})}
											</React.Fragment>
										);
									})}

								<div className='mt-4' style={{ fontSize: "1.2rem" }}>
									Total Amount (Original Order):{" "}
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
							{alreadyExchanged || alreadyReturned ? (
								<div className='col-md-6 text-capitalize'>
									<OrderDetailsExchange
										updateSingleOrder={updateSingleOrder}
										allColors={allColors}
										totalExchangedAmount={totalExchangedAmount}
										totalExchangedQty={totalExchangedQty}
									/>
								</div>
							) : null}
							{/* {alreadyReturned ? (
								<div className='col-md-6 text-capitalize'>
									<OrderDetailsReturns
										updateSingleOrder={updateSingleOrder}
										allColors={allColors}
									/>
								</div>
							) : null} */}
						</div>
					</>
				) : null}

				<div className='col-md-4 mx-auto text-center'>
					<hr />
				</div>
				<br />
			</div>
		</OrderDetailsWrapper>
	);
};

export default OrderDetails;

const OrderDetailsWrapper = styled.div`
	margin-bottom: 100px;
`;
