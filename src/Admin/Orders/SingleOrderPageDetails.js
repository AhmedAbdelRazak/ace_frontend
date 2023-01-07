/** @format */

import React from "react";
import styled from "styled-components";
import OrderDetailsExchange from "./ReturnAndExchange/OrderDetailsExchange";

const SingleOrderPageDetails = ({
	singleOrder,
	updateSingleOrder,
	allColors,
	totalExchangedAmount2,
	totalExchangedQty2,
}) => {
	var alreadyExchanged =
		updateSingleOrder.exchangedProductQtyWithVariables &&
		updateSingleOrder.exchangedProductQtyWithVariables.length > 0;

	var alreadyReturned =
		updateSingleOrder.returnedItems &&
		updateSingleOrder.returnedItems.length > 0;

	const totalExchangedAmount = () => {
		return totalExchangedAmount2;
	};

	const totalExchangedQty = () => {
		return totalExchangedQty2;
	};

	return (
		<SingleOrderPageDetailsWrapper>
			<div className='col-md-10 mx-auto'>
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
		</SingleOrderPageDetailsWrapper>
	);
};

export default SingleOrderPageDetails;

const SingleOrderPageDetailsWrapper = styled.div`
	margin-bottom: 100px;
`;
