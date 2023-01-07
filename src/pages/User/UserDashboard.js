/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColors, readSingleUserHistory, readUser } from "../../apiCore";
import { isAuthenticated } from "../../auth";
import UserHistory from "./UserHistory";

const UserDashboard = () => {
	const [userDetails, setUserDetails] = useState({});
	const [allColors, setAllColors] = useState([]);
	const [useHistOrders, setUsersHistOrders] = useState([]);

	const { user, token } = isAuthenticated();

	const readingUser = () => {
		readUser(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setUserDetails(data);
				readSingleUserHistory(data.email, user._id, token).then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setUsersHistOrders(data2);
					}
				});
			}
		});
	};

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
		readingUser();
		gettingAllColors();
		// eslint-disable-next-line
	}, []);

	const lastPurchase =
		userDetails &&
		userDetails.history &&
		userDetails.history.length > 0 &&
		useHistOrders &&
		useHistOrders.length > 0 &&
		useHistOrders[useHistOrders.length - 1];

	return (
		<UserDashboardWrapper>
			<div
				style={{
					textTransform: "uppercase",
					padding: "40px",
					textAlign: "center",
					fontSize: "1.4rem",
					fontWeight: "bolder",
					color: "darkred",
				}}>
				Welcome back {userDetails.name}{" "}
			</div>
			<div className='container'>
				{useHistOrders && useHistOrders.length === 0 ? (
					<div
						style={{
							textTransform: "uppercase",
							padding: "40px",
							textAlign: "center",
							fontSize: "1.2rem",
							fontWeight: "bolder",
							color: "darkgrey",
						}}>
						You Currently Have No Orders
					</div>
				) : (
					<>
						<div
							style={{
								fontWeight: "bolder",
								fontSize: "1.2rem",
								color: "darkgrey",
							}}>
							Your last purchase details:
							<div className='col-md-3'>
								<hr style={{ borderBottom: "1px darkgrey solid" }} />
							</div>
						</div>

						<div
							className='ml-3'
							style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Shipping details:
						</div>
						<div
							className='ml-5 row'
							style={{ color: "#0482ff", fontWeight: "bolder" }}>
							<div className='col-md-6 mt-2'>
								Name:{" "}
								{lastPurchase &&
									lastPurchase.customerDetails &&
									lastPurchase.customerDetails.fullName}
							</div>
							<div className='col-md-6 mt-2'>
								Phone:{" "}
								{lastPurchase &&
									lastPurchase.customerDetails &&
									lastPurchase.customerDetails.phone}
							</div>
							<div className='col-md-6 mt-2'>
								Ship To Address:{" "}
								{lastPurchase &&
									lastPurchase.customerDetails &&
									lastPurchase.customerDetails.address}
							</div>
							<div className='col-md-6 mt-2'>
								Ship To Governorate:{" "}
								{lastPurchase &&
									lastPurchase.customerDetails &&
									lastPurchase.customerDetails.state}
							</div>
							<div className='col-md-6 mt-2'>
								Payment:{" "}
								{lastPurchase &&
								lastPurchase.customerDetails &&
								lastPurchase.customerDetails.payOnline
									? "Paid Online"
									: lastPurchase &&
									  lastPurchase.customerDetails &&
									  lastPurchase.customerDetails.payOnDelivery
									? "Pay on Delivery"
									: "Not Pair"}
							</div>
							<div className='col-md-6 mt-2'>
								Order Comment:{" "}
								{lastPurchase &&
									lastPurchase.customerDetails &&
									lastPurchase.customerDetails.orderComment}
							</div>
							<div
								className='col-md-4 my-3'
								style={{ fontSize: "1rem", color: "darkred" }}>
								Order Tracking Number:{" "}
								<span style={{ color: "black" }}>
									{lastPurchase && lastPurchase.trackingNumber}
								</span>
							</div>
							<div
								className='col-md-4 my-3'
								style={{ fontSize: "1rem", color: "darkred" }}>
								Order Status:{" "}
								<span style={{ color: "black" }}>
									{lastPurchase && lastPurchase.status}
								</span>
							</div>
							<div
								className='col-md-4 my-3'
								style={{ fontSize: "1rem", color: "darkred" }}>
								Invoice Number:{" "}
								<span style={{ color: "black" }}>
									{lastPurchase && lastPurchase.invoiceNumber}
								</span>
							</div>
						</div>
						<div
							className='ml-3 mt-4'
							style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Purchased product details:
						</div>
						<div className='ml-5 row'>
							<div className='col-md-8'>
								{lastPurchase &&
								lastPurchase.chosenProductQtyWithVariables &&
								lastPurchase.chosenProductQtyWithVariables.length > 0 ? (
									<>
										<div className='row mt-3'>
											{lastPurchase.chosenProductQtyWithVariables.map(
												(p, i) => {
													return (
														<React.Fragment key={i}>
															{p.map((pp, ii) => {
																return (
																	<div
																		className='col-md-9 text-capitalize'
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
																				<br />
																				Price:{" "}
																				<strong style={{ color: "darkblue" }}>
																					{pp.pickedPrice}
																				</strong>{" "}
																				L.E
																			</div>

																			<div className='col-md-6'>
																				{pp.productSubSKUImage ? (
																					<img
																						style={{ width: "80px" }}
																						src={
																							pp.productSubSKUImage
																								? pp.productSubSKUImage
																								: ""
																						}
																						alt=''
																					/>
																				) : (
																					<img
																						style={{ width: "80px" }}
																						src={
																							pp.productMainImage
																								? pp.productMainImage
																								: ""
																						}
																						alt={pp.productName}
																					/>
																				)}
																			</div>
																		</div>
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

							<div className='col-md-4 mt-3'>
								<span style={{ fontWeight: "bold" }}>Subtotal:</span>{" "}
								<span style={{ fontWeight: "bold", color: "#737373" }}>
									{Number(
										Number(
											lastPurchase && lastPurchase.totalAmountAfterDiscount,
										) - Number(lastPurchase && lastPurchase.shippingFees),
									).toFixed(2)}{" "}
									L.E.
								</span>
								<br />
								<span style={{ fontWeight: "bold" }}>Shipping Fee:</span>{" "}
								<span style={{ fontWeight: "bold", color: "#737373" }}>
									{Number(lastPurchase && lastPurchase.shippingFees).toFixed(2)}{" "}
									L.E.
								</span>
								<br />
								<span style={{ fontWeight: "bold" }}>COD%:</span>{" "}
								<span style={{ fontWeight: "bold", color: "#737373" }}>
									1.00%
								</span>
								<br />
								<span style={{ fontWeight: "bold" }}>
									COD surcharge rate:
								</span>{" "}
								<span style={{ fontWeight: "bold", color: "#737373" }}>
									{Number(
										(Number(lastPurchase && lastPurchase.totalAmount) -
											Number(lastPurchase && lastPurchase.shippingFees)) *
											0.01,
									).toFixed(2)}{" "}
									L.E.
								</span>
								<br />
								<br />
								<span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
									Total Amount Due:{" "}
								</span>{" "}
								<span
									style={{
										fontWeight: "bold",
										color: "#737373",
										fontSize: "1.2rem",
									}}>
									{Number(
										Number(
											lastPurchase && lastPurchase.totalAmountAfterDiscount,
										) +
											(Number(lastPurchase && lastPurchase.totalAmount) -
												Number(lastPurchase && lastPurchase.shippingFees)) *
												0.01,
									).toFixed(2)}{" "}
									L.E.
								</span>
							</div>
						</div>
						<div className='col-md-8 mx-auto mt-5'>
							<hr style={{ borderBottom: "1px darkgrey solid" }} />
						</div>
						<div
							className='mt-4'
							style={{
								fontWeight: "bolder",
								fontSize: "1.2rem",
								color: "darkgrey",
							}}>
							Your Purchase History:
							<div className='col-md-3'>
								<hr style={{ borderBottom: "1px darkgrey solid" }} />
							</div>
						</div>
						<div
							className='ml-3'
							style={{ fontSize: "1rem", fontWeight: "bold" }}>
							You have{" "}
							{userDetails &&
							userDetails.history &&
							userDetails.history.length &&
							userDetails.history.length === 1 &&
							useHistOrders &&
							useHistOrders.length > 0
								? `${useHistOrders.length} order with ACE shop`
								: userDetails &&
								  userDetails.history &&
								  userDetails.history.length &&
								  userDetails.history.length > 1 &&
								  useHistOrders &&
								  useHistOrders.length > 0
								? `${useHistOrders.length} orders with ACE shop`
								: "Orders"}
							:
						</div>
						<UserHistory currentPosts={useHistOrders} />
					</>
				)}
			</div>
		</UserDashboardWrapper>
	);
};

export default UserDashboard;

const UserDashboardWrapper = styled.div`
	min-height: 700px;
	padding-bottom: 200px;
	background: white;
`;
