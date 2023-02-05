/** @format */
// eslint-disable-next-line
import { CarOutlined } from "@ant-design/icons";
import React from "react";
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
	// console.log(allShippingOptions, "allShippingOptions");

	const ChosenCityAndState =
		allShippingOptions &&
		allShippingOptions.map((i) => i.chosenShippingData) &&
		allShippingOptions
			.map((i) => i.chosenShippingData)[0]
			.filter((ii) => customerDetails.state === ii.governorate)[0];

	// console.log(ChosenCityAndState, "ChosenCityAndState");

	const customerDetailsForm = () => {
		return (
			<div
				className=' customerDetailsWrapper'
				style={{
					background: "white",
					padding: "0px 200px",
					borderRadius: "10px",
				}}>
				<h5 className='mb-1' style={{ textAlign: "left" }}>
					Shipping Information
				</h5>
				<div>
					<label className=' mt-2' style={{ float: "left" }}>
						Please Select Your Governorate
					</label>
					<br />
					<select
						onChange={handleChangeState}
						placeholder='Select a Governorate'
						className=' mb-3 col-md-10 mx-auto my-1 w-100'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "50px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "3px",
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
						<label className='' style={{ float: "left" }}>
							Please Select Your City
						</label>
						<br />
						<select
							onChange={handleChangeCity}
							placeholder='Select a City'
							className=' mb-3 col-md-10 mx-auto my-1'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "50px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "3px",

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
						<div
							className='mt-3 py-2 px-1'
							style={{
								fontSize: "1rem",
								border: "1px solid lightgrey",
							}}>
							<div
								style={{
									fontSize: "0.85rem",
									textTransform: "uppercase",
									fontWeight: "bold",
								}}>
								Standard Delivery
							</div>

							<div className='row' style={{ fontSize: "0.8rem" }}>
								<div className='col-6'>
									<div>
										<CarOutlined /> {customerDetails.carrierName}{" "}
										{ChosenCityAndState &&
											ChosenCityAndState.estimatedTimeForArrival +
												" - " +
												(Number(ChosenCityAndState.estimatedTimeForArrival) +
													1)}{" "}
										Days
									</div>
								</div>

								<div className='col-6'>
									Shipping Fee:{" "}
									<span style={{ fontWeight: "bolder" }}>
										EGP {shippingFee}
									</span>{" "}
								</div>
							</div>
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
	text-align: left;
	min-height: 300px;
	background: white;

	.countryCodePhone {
		margin-left: 100px;
	}

	label {
		font-weight: bold;
	}

	h5 {
		font-size: 1.7rem;
		text-transform: uppercase;
		font-weight: bolder;
		text-align: left !important;
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
			padding: 10px 10px !important;
		}
		h5 {
			font-size: 1.7rem;
			text-transform: uppercase;
			font-weight: bolder;
			text-align: left !important;
		}
	}
`;
