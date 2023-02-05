/** @format */

import React from "react";
import styled from "styled-components";

const FormStep3 = ({
	customerDetails,
	cart,
	total_amount,
	total_items,
	shippingFee,
	appliedCoupon,
	couponApplied,
	appliedCouponName,
}) => {
	const overAllReviewPayOnDelivery = () => {
		return (
			<div>
				<h5>Order Review</h5>

				<div className='row'>
					<div className='col-5'>Name:</div>

					<div className='col-5'>
						<strong>{customerDetails.fullName}</strong>{" "}
					</div>

					<div className='col-5'>Phone #:</div>

					<div className='col-5'>
						<strong>{customerDetails.phone}</strong>{" "}
					</div>

					<div className='col-5'>Email:</div>
					<div className='col-5'>
						{customerDetails.email ? (
							<div>
								<strong> {customerDetails.email}</strong>
							</div>
						) : null}
					</div>

					<div className='col-5 mt-4'>Governorate:</div>
					<div className='col-5 mt-4'>
						<strong>{customerDetails.state}</strong>{" "}
					</div>

					<div className='col-5'>City:</div>
					<div className='col-5'>
						<strong>{customerDetails.cityName}</strong>{" "}
					</div>

					<div className='col-5'>Address:</div>
					<div className='col-5'>
						<strong>{customerDetails.address}</strong>{" "}
					</div>

					<div className='col-5 mt-4'>Total Purchased Items:</div>
					<div className='col-5 mt-4'>
						<strong className=''>{total_items} items</strong>
					</div>

					<div className='col-5'>Shipping Fee:</div>
					<div className='col-5'>
						<strong className=''>EGP {shippingFee}</strong>{" "}
					</div>

					<div className='col-5'>Trans. Fee:</div>
					<div className='col-5'>
						<strong>EGP {Number(total_amount * 0.01).toFixed(2)} (1%)</strong>{" "}
					</div>
					{couponApplied ? <div className='col-5'>Coupon Disc.:</div> : null}
					{couponApplied ? (
						<div className='col-5' style={{ fontWeight: "bold" }}>
							EGP -
							{(
								(Number(total_amount) * Number(appliedCoupon.discount)) /
								100
							).toFixed(2)}
						</div>
					) : null}

					<div className='col-5'>Subtotal:</div>
					<div className='col-5'>
						<strong>EGP {Number(total_amount).toFixed(2)}</strong>{" "}
					</div>
				</div>

				<br />
				{couponApplied ? (
					<>
						{appliedCoupon && appliedCoupon.name && appliedCoupon.expiry ? (
							<div className='mt-1'>
								<div className='row'>
									<div className='col-8'>Total </div>

									<div className='col-4'>
										{new Date(appliedCoupon.expiry).setHours(0, 0, 0, 0) >=
										new Date().setHours(0, 0, 0, 0) ? (
											<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
												EGP{" "}
												{Number(
													Number(total_amount) +
														Number(shippingFee) +
														Number(Number(total_amount * 0.01).toFixed(2)) -
														(Number(total_amount) *
															Number(appliedCoupon.discount)) /
															100,
												).toFixed(2)}{" "}
												<div>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "13px",
														}}>
														EGP{" "}
														{Number(total_amount) +
															Number(shippingFee) +
															Number(
																Number(total_amount * 0.01).toFixed(2),
															)}{" "}
													</s>
												</div>
											</div>
										) : (
											<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
												Total EGP
												{Number(total_amount) +
													Number(shippingFee) +
													Number(Number(total_amount * 0.01).toFixed(2))}{" "}
											</div>
										)}
									</div>
								</div>
							</div>
						) : (
							<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
								Total{" "}
								{Number(total_amount) +
									Number(shippingFee) +
									Number(Number(total_amount * 0.01).toFixed(2))}{" "}
								L.E.{" "}
							</div>
						)}
					</>
				) : (
					<div style={{ fontSize: "1rem" }}>
						<div className='row'>
							<div className='col-5'>Total </div>

							<div className='col-5' style={{ fontWeight: "bolder" }}>
								EGP{" "}
								{Number(total_amount) +
									Number(shippingFee) +
									Number(Number(total_amount * 0.01).toFixed(2))}{" "}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};
	return (
		<FormStep3Wrapper>
			<div>{overAllReviewPayOnDelivery()}</div>
		</FormStep3Wrapper>
	);
};

export default FormStep3;

const FormStep3Wrapper = styled.div`
	margin: 30px 5px;
	text-align: left;
	margin-left: 100px;

	.reviewHeader {
		display: none;
	}

	@media (max-width: 1000px) {
		margin: 30px 5px;

		/* margin: 0px 0px; */

		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.reviewHeader {
			display: block;
			color: var(--orangePrimary);
			font-weight: bolder;
			text-align: center !important;
			margin: 0px auto !important;
		}

		h5 {
			font-size: 1.7rem;
			text-transform: uppercase;
			font-weight: bolder;
			text-align: left !important;
		}
	}
`;
