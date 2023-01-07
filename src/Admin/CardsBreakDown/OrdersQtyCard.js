/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const OrdersQtyCard = ({ allOrders }) => {
	var cancelledOrders = allOrders.filter((i) => i.status === "Cancelled");
	const overallQtyArrayCancelled =
		cancelledOrders && cancelledOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyCancelled = overallQtyArrayCancelled.reduce(
		(a, b) => a + b,
		0,
	);

	var onHoldOrders = allOrders.filter((i) => i.status === "On Hold");
	const overallQtyArrayOnHold =
		onHoldOrders && onHoldOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyOnHold = overallQtyArrayOnHold.reduce((a, b) => a + b, 0);

	var processingOrders = allOrders.filter((i) => i.status === "In Processing");
	const overallQtyArrayProcessing =
		processingOrders && processingOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyProcessing = overallQtyArrayProcessing.reduce(
		(a, b) => a + b,
		0,
	);

	var readyToShipOrders = allOrders.filter((i) => i.status === "Ready To Ship");
	const overallQtyArrayReadyToShip =
		readyToShipOrders && readyToShipOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyReadyToShip = overallQtyArrayReadyToShip.reduce(
		(a, b) => a + b,
		0,
	);

	var shippedOrders = allOrders.filter((i) => i.status === "Shipped");
	const overallQtyArrayShipped =
		shippedOrders && shippedOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyShipped = overallQtyArrayShipped.reduce((a, b) => a + b, 0);

	var deliveredOrders = allOrders.filter(
		(i) => i.status === "Delivered" || i.status === "Exchange - Delivered",
	);
	const overallQtyArrayDelivered =
		deliveredOrders && deliveredOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyDelivered = overallQtyArrayDelivered.reduce(
		(a, b) => a + b,
		0,
	);

	var exchangeRequiredOrders = allOrders.filter(
		(i) =>
			i.status === "Exchange - In Processing" ||
			i.status === "Exchange - Ready To Ship",
	);
	const overallQtyArrayExcReq =
		exchangeRequiredOrders &&
		exchangeRequiredOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyExcReq = overallQtyArrayExcReq.reduce((a, b) => a + b, 0);

	var returnReqOrders = allOrders.filter(
		(i) =>
			i.status === "Return Request (Partial)" ||
			i.status === "Return Request" ||
			i.status === "In Return (Partial)" ||
			i.status === "In Return",
	);
	const overallQtyArrayRetReq =
		returnReqOrders && returnReqOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyRetReq = overallQtyArrayRetReq.reduce((a, b) => a + b, 0);

	var returnNotRefOrders = allOrders.filter(
		(i) =>
			i.status === "Returned and Not Refunded (Partial)" ||
			i.status === "Returned and Not Refunded",
	);
	const overallQtyArrayReturnNotRef =
		returnNotRefOrders && returnNotRefOrders.map((i) => i.totalOrderQty);
	const ArrayOfQtyReturnNotRef = overallQtyArrayReturnNotRef.reduce(
		(a, b) => a + b,
		0,
	);

	return (
		<OrdersQtyCardWrapper>
			<div className='container-fluid'>
				<h5
					className='mt-3 mb-1 text-center'
					style={{
						fontSize: "1rem",
						fontWeight: "bold",
						textTransform: "uppercase",
						letterSpacing: "1px",
						color: "#009ef7",
					}}>
					Breakdown By Ordered Items/ Quantity
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
									end={ArrayOfQtyOnHold}
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
									end={ArrayOfQtyProcessing}
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
									end={ArrayOfQtyReadyToShip}
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
									end={ArrayOfQtyShipped}
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
									end={ArrayOfQtyCancelled}
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
									end={ArrayOfQtyDelivered}
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
									end={ArrayOfQtyExcReq}
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
									end={ArrayOfQtyRetReq}
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
									end={ArrayOfQtyReturnNotRef}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</OrdersQtyCardWrapper>
	);
};

export default OrdersQtyCard;

const OrdersQtyCardWrapper = styled.div`
	.card {
		min-height: 65px;
	}
`;
