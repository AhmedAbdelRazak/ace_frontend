/** @format */

import React from "react";
import styled from "styled-components";
import CouponComp from "../CouponComp";

const FormStep1 = ({
	customerDetails,
	handleChange,
	setCustomerDetails,
	alreadySetLoyaltyPointsManagement,
	appliedCoupon,
	setAppliedCoupon,
	handleAppliedCoupon,
	appliedCouponName,
	couponApplied,
	setCouponApplied,
	stringChecker,
}) => {
	var payOnDelivery_OnlineLogic =
		alreadySetLoyaltyPointsManagement.activatePayOnDelivery &&
		alreadySetLoyaltyPointsManagement.activatePayOnline;

	const requiredText = () => {
		return (
			<span
				style={{
					fontWeight: "bold",
					color: "darkred",
					fontSize: "0.7rem",
					marginLeft: "10px",
				}}>
				(Required*)
			</span>
		);
	};
	const customerDetailsForm = () => {
		return (
			<div
				className='mx-auto customerDetailsWrapper'
				style={{
					background: "white",
					padding: "0px 40px",
					borderRadius: "10px",
				}}>
				<h5 className='mb-4'>Customer Information</h5>
				<div className='row'>
					<div className='form-group col-md-6 '>
						<label className=''>
							Full Name{" "}
							{customerDetails.fullName.length < 2 ? requiredText() : null}
						</label>
						<input
							onChange={handleChange("fullName")}
							type='text'
							className='form-control'
							value={customerDetails.fullName}
							placeholder='Required - Full Name'
						/>
					</div>

					<div className='form-group col-md-6 '>
						<label className=''>
							Phone {customerDetails.phone.length < 8 ? requiredText() : null}
							{stringChecker(customerDetails.phone) ? (
								<strong
									style={{ fontSize: "10px", marginLeft: "3px", color: "red" }}>
									Should be digits only*
								</strong>
							) : null}
						</label>
						<input
							onChange={handleChange("phone")}
							type='text'
							className='form-control'
							value={customerDetails.phone}
							placeholder='Required - Phone Number => Should Be 11 Digits'
						/>
					</div>

					<div className='form-group col-md-6 '>
						<label className=''>Email Address</label>
						<input
							onChange={handleChange("email")}
							type='text'
							className='form-control'
							value={customerDetails.email}
							placeholder='Optional - Email Address'
						/>
					</div>
					<div className='form-group col-md-6 '>
						<label className=''>
							Physical Address{" "}
							{customerDetails.address.length < 5 ? requiredText() : null}
						</label>
						<input
							onChange={handleChange("address")}
							type='text'
							className='form-control'
							value={customerDetails.address}
							placeholder='Required - Physical Address'
						/>
					</div>
					{payOnDelivery_OnlineLogic ? (
						<div className='form-group col-md-6 mx-auto mt-2 '>
							<label className=''>
								How Would You Like To Pay?{" "}
								{customerDetails.payOnDelivery && customerDetails.payOnline
									? requiredText()
									: null}
							</label>
							<br />
							<select
								onChange={(e) => {
									if (e.target.value === "Pay On Delivery") {
										setCustomerDetails({
											...customerDetails,
											payOnDelivery: true,
											payOnline: false,
										});
									} else {
										setCustomerDetails({
											...customerDetails,
											payOnDelivery: false,
											payOnline: true,
										});
									}
								}}
								className=' mb-3 mx-auto w-100'
								style={{
									paddingTop: "9px",
									paddingBottom: "9px",
									// paddingRight: "50px",
									// textAlign: "center",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									fontSize: "0.9rem",
									// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
									textTransform: "uppercase",
								}}>
								{customerDetails.payOnDelivery && !customerDetails.payOnline ? (
									<option value='Pay On Delivery'>Pay On Delivery</option>
								) : !customerDetails.payOnDelivery &&
								  customerDetails.payOnline ? (
									<option value='Pay Online'>Pay Online</option>
								) : (
									<option value='SelectGovernorate'>Please Select</option>
								)}

								<option value='Pay On Delivery'>Pay On Delivery</option>
								<option value='Pay Online'>Pay Online</option>
							</select>
						</div>
					) : null}

					<div className='form-group col-md-6 mx-auto '>
						<label className=''>Order Comment</label>
						<textarea
							row='5'
							onChange={handleChange("orderComment")}
							// type='text'
							className='form-control'
							value={customerDetails.orderComment}
							placeholder='Optional - Add Any Relatable Comment'
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<FormStep1Wrapper>
			<div>
				<CouponComp
					appliedCoupon={appliedCoupon}
					setAppliedCoupon={setAppliedCoupon}
					handleAppliedCoupon={handleAppliedCoupon}
					appliedCouponName={appliedCouponName}
					couponApplied={couponApplied}
					setCouponApplied={setCouponApplied}
				/>
			</div>
			<div>{customerDetailsForm()}</div>
			<br />
		</FormStep1Wrapper>
	);
};

export default FormStep1;

const FormStep1Wrapper = styled.div`
	margin: 10px 0px;
	/* text-align: center; */

	.dataPointsReview {
		font-size: 0.8rem;
		text-transform: capitalize;
	}

	.coupon-available {
		margin-top: 10px;
		font-weight: bolder;
		color: darkgreen;
		text-transform: capitalize;
	}

	.coupon-unavailable {
		margin-top: 10px;
		font-weight: bolder;
		color: darkred;
		text-transform: capitalize;
	}

	@media (max-width: 900px) {
		.inputFields {
			padding-top: 9px;
			padding-bottom: 9px;
			/* text-align: center; */
			border: #cfcfcf solid 1px;
			border-radius: 4px !important;
			width: 80% !important;
			font-size: 0.8rem !important;
			/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
			margin-bottom: 15px;
		}
		.inputFields2 {
			padding-top: 9px;
			padding-bottom: 9px;
			padding-right: 20px !important;
			/* text-align: center; */
			border: #cfcfcf solid 1px;
			border-radius: 4px !important;
			width: 80% !important;
			font-size: 0.8rem !important;
			/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
			margin-bottom: 15px;
		}

		.customerDetailsWrapper {
			padding: 10px 40px !important;
		}
	}
`;
