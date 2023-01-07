/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const OrdersTotalAmountCards = ({ allOrders }) => {
	var cancelledOrders = allOrders.filter((i) => i.status === "Cancelled");
	const overallAmountArrayCancelled =
		cancelledOrders && cancelledOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountCancelled = overallAmountArrayCancelled.reduce(
		(a, b) => a + b,
		0,
	);

	var onHoldOrders = allOrders.filter((i) => i.status === "On Hold");
	const overallAmountArrayOnHold =
		onHoldOrders && onHoldOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountOnHold = overallAmountArrayOnHold.reduce(
		(a, b) => a + b,
		0,
	);

	var processingOrders = allOrders.filter((i) => i.status === "In Processing");
	const overallAmountArrayProcessing =
		processingOrders && processingOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountProcessing = overallAmountArrayProcessing.reduce(
		(a, b) => a + b,
		0,
	);

	var readyToShipOrders = allOrders.filter((i) => i.status === "Ready To Ship");
	const overallAmountArrayReadyToShip =
		readyToShipOrders &&
		readyToShipOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountReadyToShip = overallAmountArrayReadyToShip.reduce(
		(a, b) => a + b,
		0,
	);

	var shippedOrders = allOrders.filter((i) => i.status === "Shipped");
	const overallAmountArrayShipped =
		shippedOrders && shippedOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountShipped = overallAmountArrayShipped.reduce(
		(a, b) => a + b,
		0,
	);

	var deliveredOrders = allOrders.filter(
		(i) => i.status === "Delivered" || i.status === "Exchange - Delivered",
	);
	const overallAmountArrayDelivered =
		deliveredOrders && deliveredOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountDelivered = overallAmountArrayDelivered.reduce(
		(a, b) => a + b,
		0,
	);

	var exchangeRequiredOrders = allOrders.filter(
		(i) =>
			i.status === "Exchange - In Processing" ||
			i.status === "Exchange - Ready To Ship",
	);
	const overallAmountArrayExcReq =
		exchangeRequiredOrders &&
		exchangeRequiredOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountExcReq = overallAmountArrayExcReq.reduce(
		(a, b) => a + b,
		0,
	);

	var returnReqOrders = allOrders.filter(
		(i) =>
			i.status === "Return Request (Partial)" ||
			i.status === "Return Request" ||
			i.status === "In Return (Partial)" ||
			i.status === "In Return",
	);
	const overallAmountArrayRetReq =
		returnReqOrders && returnReqOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountRetReq = overallAmountArrayRetReq.reduce(
		(a, b) => a + b,
		0,
	);

	var returnNotRefOrders = allOrders.filter(
		(i) =>
			i.status === "Returned and Not Refunded (Partial)" ||
			i.status === "Returned and Not Refunded",
	);
	const overallAmountArrayReturnNotRef =
		returnNotRefOrders &&
		returnNotRefOrders.map((i) => i.totalAmountAfterDiscount);
	const ArrayOfAmountReturnNotRef = overallAmountArrayReturnNotRef.reduce(
		(a, b) => a + b,
		0,
	);

	return (
		<OrdersTotalAmountCardsWrapper>
			<div className='container-fluid'>
				<h5
					className='mt-3 mb-1 text-center'
					style={{
						fontSize: "1rem",
						fontWeight: "bold",
						textTransform: "uppercase",
						letterSpacing: "1px",
						color: "#2ea263",
					}}>
					Breakdown By Orders Total Amount (L.E.)
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
									end={ArrayOfAmountOnHold}
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
									end={ArrayOfAmountProcessing}
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
									end={ArrayOfAmountReadyToShip}
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
									end={ArrayOfAmountShipped}
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
									end={ArrayOfAmountCancelled}
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
									end={ArrayOfAmountDelivered}
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
									end={ArrayOfAmountExcReq}
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
									end={ArrayOfAmountRetReq}
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
									end={ArrayOfAmountReturnNotRef}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</OrdersTotalAmountCardsWrapper>
	);
};

export default OrdersTotalAmountCards;

const OrdersTotalAmountCardsWrapper = styled.div`
	.card {
		min-height: 65px;
	}
`;
