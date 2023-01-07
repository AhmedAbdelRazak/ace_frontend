/** @format */

import React from "react";
import styled from "styled-components";

const OrderDetailsExchange = ({
	updateSingleOrder,
	allColors,
	totalExchangedQty,
	totalExchangedAmount,
}) => {
	return (
		<OrderDetailsExchangeWrapper>
			<div className='col-md-12 mx-auto'>
				<div
					className='my-2'
					style={{
						fontSize: "1.25rem",
						fontWeight: "bolder",
						marginTop: "30px",
					}}>
					Order Exchange | Return:
				</div>
				<div
					className='mb-3'
					style={{
						fontSize: "1rem",
						fontWeight: "bolder",
						marginTop: "30px",
					}}>
					Exchange Tracking #: {updateSingleOrder.exchangeTrackingNumber}
				</div>

				{updateSingleOrder.chosenProductQtyWithVariables.length > 0 ? (
					<>
						<div className='row'>
							{updateSingleOrder.chosenProductQtyWithVariables.map((p, i) => {
								return (
									<React.Fragment key={i}>
										{p.map((pp, ii) => {
											var exchangedColor =
												updateSingleOrder.exchangedProductQtyWithVariables.filter(
													(ivv) => ivv.exchangedProduct.SubSKU === pp.SubSKU,
												)[0] &&
												updateSingleOrder.exchangedProductQtyWithVariables.filter(
													(ivv) => ivv.exchangedProduct.SubSKU === pp.SubSKU,
												)[0].color;

											var returnedColor =
												updateSingleOrder.returnedItems.filter(
													(ivv) => ivv.SubSKU === pp.SubSKU,
												)[0] &&
												updateSingleOrder.returnedItems.filter(
													(ivv) => ivv.SubSKU === pp.SubSKU,
												)[0].SubSKUColor;

											var productCorrespondToExchange = exchangedColor
												? true
												: false;

											var productCorrespondReturn = returnedColor
												? true
												: false;

											return (
												<div className='text-capitalize' key={ii}>
													<div
														className='row'
														style={{
															display:
																productCorrespondToExchange ||
																productCorrespondReturn
																	? "none"
																	: "",
														}}>
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
													</div>

													{updateSingleOrder.exchangedProductQtyWithVariables
														.length > 0 &&
													updateSingleOrder.exchangedProductQtyWithVariables
														.map((iv) => iv.exchangedProduct.SubSKU)
														.indexOf(pp.SubSKU) > -1 ? (
														<div
															style={{ background: "#e0e0e0", padding: "5px" }}>
															<div className='row'>
																<div className='col-md-6'>
																	Product Name:{" "}
																	<strong
																		style={{
																			color: "darkblue",
																			textTransform: "capitalize",
																		}}>
																		{
																			updateSingleOrder.exchangedProductQtyWithVariables.filter(
																				(ivv) =>
																					ivv.exchangedProduct.SubSKU ===
																					pp.SubSKU,
																			)[0].productName
																		}
																		|{" "}
																		{
																			updateSingleOrder.exchangedProductQtyWithVariables.filter(
																				(ivv) =>
																					ivv.exchangedProduct.SubSKU ===
																					pp.SubSKU,
																			)[0].SubSKU
																		}{" "}
																		|{" "}
																		{allColors[
																			allColors
																				.map((i) => i.hexa)
																				.indexOf(exchangedColor)
																		]
																			? allColors[
																					allColors
																						.map((i) => i.hexa)
																						.indexOf(exchangedColor)
																			  ].color
																			: exchangedColor}
																		<br />
																		<br />
																		Quantity:{" "}
																		<strong style={{ color: "darkblue" }}>
																			{
																				updateSingleOrder.exchangedProductQtyWithVariables.filter(
																					(ivv) =>
																						ivv.exchangedProduct.SubSKU ===
																						pp.SubSKU,
																				)[0].OrderedQty
																			}{" "}
																		</strong>
																		{Number(pp.OrderedQty) > 1
																			? "Units"
																			: "Unit"}
																		<br />
																		Item Price:{" "}
																		<strong style={{ color: "darkblue" }}>
																			{
																				updateSingleOrder.exchangedProductQtyWithVariables.filter(
																					(ivv) =>
																						ivv.exchangedProduct.SubSKU ===
																						pp.SubSKU,
																				)[0].pickedPrice
																			}
																		</strong>{" "}
																		L.E.
																	</strong>
																</div>
																<div className='col-md-6'>
																	<img
																		style={{ width: "100px" }}
																		src={
																			updateSingleOrder.exchangedProductQtyWithVariables.filter(
																				(ivv) =>
																					ivv.exchangedProduct.SubSKU ===
																					pp.SubSKU,
																			)[0].productMainImage
																		}
																		alt=''
																	/>
																</div>
															</div>
														</div>
													) : null}

													{updateSingleOrder.returnedItems &&
														updateSingleOrder.returnedItems.length > 0 &&
														updateSingleOrder.returnedItems
															.map((iv) => iv.SubSKU)
															.indexOf(pp.SubSKU) > -1 &&
														updateSingleOrder.returnedItems.map((ppp, iii) => {
															var arrayOfDisplay = [];
															arrayOfDisplay = [...arrayOfDisplay, pp];
															var alreadyDisplayed =
																arrayOfDisplay
																	.map((iv) => iv.SubSKU)
																	.indexOf(ppp.SubSKU) === -1;
															return (
																<React.Fragment key={iii}>
																	{ppp.productName && ppp.SubSKU ? (
																		<div
																			className='text-capitalize'
																			style={{
																				display: alreadyDisplayed ? "none" : "",
																				background: "#ffe0e3",
																				padding: "5px",
																			}}>
																			<div className='row'>
																				<div className='col-md-6'>
																					Product Name:{" "}
																					<strong
																						style={{
																							color: "darkblue",
																							textTransform: "capitalize",
																						}}>
																						{ppp.productName} | {ppp.SubSKU} |{" "}
																						{allColors[
																							allColors
																								.map((i) => i.hexa)
																								.indexOf(ppp.SubSKUColor)
																						]
																							? allColors[
																									allColors
																										.map((i) => i.hexa)
																										.indexOf(ppp.SubSKUColor)
																							  ].color
																							: ppp.SubSKUColor}
																					</strong>
																					<br />
																					<br />
																					Quantity:{" "}
																					<strong style={{ color: "darkblue" }}>
																						{ppp.OrderedQty}{" "}
																					</strong>
																					{Number(ppp.OrderedQty) > 1
																						? "Units"
																						: "Unit"}
																					<br />
																					Refund Amount:{" "}
																					<strong style={{ color: "darkblue" }}>
																						{ppp.returnAmount}
																					</strong>{" "}
																					L.E.
																				</div>
																				<div className='col-md-6'>
																					{ppp.productSubSKUImage ? (
																						<img
																							style={{ width: "100px" }}
																							src={
																								ppp.productSubSKUImage
																									? ppp.productSubSKUImage
																									: ""
																							}
																							alt=''
																						/>
																					) : (
																						<img
																							style={{ width: "100px" }}
																							src={
																								ppp.productMainImage
																									? ppp.productMainImage
																									: ""
																							}
																							alt=''
																						/>
																					)}
																				</div>
																			</div>

																			<hr />
																		</div>
																	) : (
																		<h5
																			className='my-5'
																			style={{
																				fontWeight: "bold",
																				color: "darkred",
																			}}>
																			Product Was Fully Returned
																		</h5>
																	)}
																</React.Fragment>
															);
														})}
													<hr />
												</div>
											);
										})}
									</React.Fragment>
								);
							})}
						</div>
					</>
				) : null}

				{updateSingleOrder.exchangedProductQtyWithVariables.length > 0 ? (
					<>
						{totalExchangedQty() && totalExchangedQty() > 0 ? (
							<strong>
								Total Quantity After Exchanging: {totalExchangedQty()} Items
							</strong>
						) : null}

						<br />
						<br />
						<strong>
							Total Amount After Exchanging: {totalExchangedAmount()} L.E.
						</strong>
						<br />
						<br />
						<strong style={{ fontWeight: "bold", color: "darkgoldenrod" }}>
							Total Amount Due AFTER EXCH:{" "}
							{totalExchangedAmount() -
								updateSingleOrder.totalAmountAfterDiscount}{" "}
							L.E.
						</strong>
					</>
				) : null}
				<br />
				{updateSingleOrder.returnedItems.length > 0 ? (
					<div className='mt-3'>
						<strong>
							Total Return Refund Amount: {updateSingleOrder.returnAmount} L.E.
						</strong>
						<br />
						<br />
						{updateSingleOrder.returnedItems.length > 0 &&
							updateSingleOrder.exchangedProductQtyWithVariables.length ===
								0 && (
								<strong>
									Total Amount After Refunding:{" "}
									{updateSingleOrder.totalAmountAfterDiscount -
										updateSingleOrder.returnAmount}{" "}
									L.E.
								</strong>
							)}
						{updateSingleOrder.returnedItems.length > 0 &&
							updateSingleOrder.exchangedProductQtyWithVariables.length > 0 && (
								<strong
									style={{
										color: "darkgoldenrod",
										fontSize: "1.1rem",
										fontWeight: "bolder",
									}}>
									Total Amount Due After RETURN AND EXCHANGE:{" "}
									<span
										style={{
											fontSize: "1.4rem",
										}}>
										{totalExchangedAmount() -
											updateSingleOrder.totalAmountAfterDiscount -
											updateSingleOrder.returnAmount}{" "}
										L.E.
									</span>
								</strong>
							)}
					</div>
				) : null}
			</div>
		</OrderDetailsExchangeWrapper>
	);
};

export default OrderDetailsExchange;

const OrderDetailsExchangeWrapper = styled.div``;
