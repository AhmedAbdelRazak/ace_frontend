/** @format */

import React from "react";
import styled from "styled-components";

const OrderDetailsReturns = ({ updateSingleOrder, allColors }) => {
	return (
		<OrderDetailsReturnsWrapper>
			<div className='col-md-12 mx-auto'>
				<div
					className='my-2'
					style={{
						fontSize: "1.25rem",
						fontWeight: "bolder",
						marginTop: "30px",
					}}>
					Order Returns Details:
				</div>

				{updateSingleOrder.returnedItems.length > 0 ? (
					<>
						<div className='row'>
							{updateSingleOrder.returnedItems.map((p, i) => {
								return (
									<React.Fragment key={i}>
										{p.productName && p.SubSKU ? (
											<div className='text-capitalize'>
												<div className='row'>
													<div className='col-md-6'>
														Product Name:{" "}
														<strong
															style={{
																color: "darkblue",
																textTransform: "capitalize",
															}}>
															{p.productName} | {p.SubSKU} |{" "}
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
														</strong>
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
																	p.productMainImage ? p.productMainImage : ""
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
												style={{ fontWeight: "bold", color: "darkred" }}>
												Product Was Fully Returned
											</h5>
										)}
									</React.Fragment>
								);
							})}
						</div>
					</>
				) : null}

				{updateSingleOrder.returnedItems.length > 0 ? (
					<>
						<strong>
							Total Refund Amount: {updateSingleOrder.returnAmount} L.E.
						</strong>
						<br />
						<br />
						<strong>
							Total Amount After Refunding:{" "}
							{updateSingleOrder.totalAmountAfterDiscount -
								updateSingleOrder.returnAmount}{" "}
							L.E.
						</strong>
					</>
				) : null}
			</div>
		</OrderDetailsReturnsWrapper>
	);
};

export default OrderDetailsReturns;

const OrderDetailsReturnsWrapper = styled.div``;
