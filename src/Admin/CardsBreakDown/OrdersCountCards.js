/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const OrdersCountCards = ({ allOrders }) => {
	var cancelledOrders = allOrders.filter((i) => i.status === "Cancelled");
	var onHoldOrders = allOrders.filter((i) => i.status === "On Hold");
	var processingOrders = allOrders.filter((i) => i.status === "In Processing");
	var readyToShipOrders = allOrders.filter((i) => i.status === "Ready To Ship");
	var shippedOrders = allOrders.filter((i) => i.status === "Shipped");
	var deliveredOrders = allOrders.filter(
		(i) => i.status === "Delivered" || i.status === "Exchange - Delivered",
	);
	var exchangeRequiredOrders = allOrders.filter(
		(i) =>
			i.status === "Exchange - In Processing" ||
			i.status === "Exchange - Ready To Ship",
	);

	var returnReqOrders = allOrders.filter(
		(i) =>
			i.status === "Return Request (Partial)" ||
			i.status === "Return Request" ||
			i.status === "In Return (Partial)" ||
			i.status === "In Return",
	);
	var returnNotRefOrders = allOrders.filter(
		(i) =>
			i.status === "Returned and Not Refunded (Partial)" ||
			i.status === "Returned and Not Refunded",
	);

	return (
		<OrdersCountCardsWrapper>
			<div className='container-fluid'>
				<h5
					className='mt-3 mb-1 text-center'
					style={{
						fontSize: "1rem",
						fontWeight: "bold",
						textTransform: "uppercase",
						letterSpacing: "1px",
						color: "#d61040",
					}}>
					Breakdown By Orders Count
				</h5>
				<div className='row'>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#e28a2b" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									On Hold
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={onHoldOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#005ab3" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Processing
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={processingOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#6317a9" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Ready 2B Shipped
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={readyToShipOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#17a963" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Shipped
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={shippedOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#f1416c" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Cancelled
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={cancelledOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#062f1b" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Delivered
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={deliveredOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#4f4f09" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									EXCH. REQ
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={exchangeRequiredOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#4f2c09" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Ret. REQ
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={returnReqOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-xl-1 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#4f0909" }}>
							<div className='p-1'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "11px",
									}}>
									Return (Not Refunded)
								</h5>
								<CountUp
									style={{ color: "white", fontSize: "15px" }}
									duration='4'
									delay={2}
									end={returnNotRefOrders.length}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</OrdersCountCardsWrapper>
	);
};

export default OrdersCountCards;

const OrdersCountCardsWrapper = styled.div`
	.card {
		min-height: 65px;
	}
`;
