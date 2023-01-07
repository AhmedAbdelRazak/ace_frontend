/** @format */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CouponComp from "../CouponComp";
// import { states } from "./Utils";

const FormStep2 = ({
	customerDetails,
	UniqueGovernorates,
	handleChangeCarrier,
	handleChangeState,
	handleChangeCity,
	chosenCity,
	allShippingOptions,
	shippingFee,
	appliedCoupon,
	setAppliedCoupon,
	handleAppliedCoupon,
	setAppliedCouponName,
	appliedCouponName,
	couponApplied,
	setCouponApplied,
}) => {
	const customerDetailsForm = () => {
		return (
			<div
				className='mx-auto customerDetailsWrapper'
				style={{
					background: "white",
					padding: "0px 200px",
					borderRadius: "10px",
				}}>
				<h4 className='mb-4'>Shipping Information</h4>
				<div>
					<label className=''>Please Select Your Governorate</label>
					<br />
					<select
						onChange={handleChangeState}
						placeholder='Select a Ticket'
						className=' mb-3 col-md-10 mx-auto my-1'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "50px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							fontSize: "0.9rem",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							textTransform: "capitalize",
						}}>
						{customerDetails.state ? (
							<option value={customerDetails.state}>
								{customerDetails.state}
							</option>
						) : (
							<option value='SelectGovernorate'>Select A Governorate</option>
						)}

						{UniqueGovernorates.map((g, ii) => {
							return <option key={ii}>{g}</option>;
						})}
					</select>
				</div>

				{chosenCity.length > 0 ? (
					<div>
						<label className=''>Please Select Your City</label>
						<br />
						<select
							onChange={handleChangeCity}
							placeholder='Select a Ticket'
							className=' mb-3 col-md-10 mx-auto my-1'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "50px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								textTransform: "capitalize",
							}}>
							{customerDetails.cityName ? (
								<option value={customerDetails.cityName}>
									{customerDetails.cityName}
								</option>
							) : (
								<option value='SelectGovernorate'>Select City</option>
							)}
							{chosenCity.map((g, ii) => {
								return (
									<option value={g.City.AreaEn} key={ii}>
										{g.City.AreaEn} | {g.LoctionCode}
									</option>
								);
							})}
						</select>
					</div>
				) : null}
				<br />
				{customerDetails.state && allShippingOptions.length > 0 ? (
					<div>
						<br />
						<div
							className='mt-3'
							style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Shipping Fee: {shippingFee} L.E.
						</div>
					</div>
				) : (
					<div>
						{customerDetails.state && allShippingOptions.length === 0 ? (
							<div>
								No Available Shipping Option for the selected Governorate
							</div>
						) : null}
					</div>
				)}
			</div>
		);
	};

	return (
		<FormStep2Wrapper>
			<div>
				<CouponComp
					appliedCoupon={appliedCoupon}
					setAppliedCoupon={setAppliedCoupon}
					handleAppliedCoupon={handleAppliedCoupon}
					setAppliedCouponName={setAppliedCouponName}
					appliedCouponName={appliedCouponName}
					couponApplied={couponApplied}
					setCouponApplied={setCouponApplied}
				/>
			</div>
			<div>{customerDetailsForm()}</div>
		</FormStep2Wrapper>
	);
};

export default FormStep2;

const FormStep2Wrapper = styled.div`
	margin: 30px 0px;
	text-align: center;
	min-height: 300px;
	background: white;

	.countryCodePhone {
		margin-left: 100px;
	}

	label {
		font-weight: bold;
	}

	@media (max-width: 1000px) {
		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}
		.countryCodePhone {
			margin: 6px 35px;
		}

		.customerDetailsWrapper {
			padding: 10px 40px !important;
		}
	}
`;
