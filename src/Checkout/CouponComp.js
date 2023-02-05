/** @format */

import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { readSingleCoupon } from "../apiCore";

const CouponComp = ({
	setAppliedCoupon,
	appliedCoupon,
	handleAppliedCoupon,
	appliedCouponName,
	couponApplied,
	setCouponApplied,
}) => {
	return (
		<CouponCompWrapper>
			<div className='col-md-5'>
				{/* <label className='' style={{ fontWeight: "bold" }}>
					COUPON:
				</label> */}
				<div className='row'>
					<div className='col-9'>
						<input
							className='form-control '
							placeholder='Please paste your coupon here!'
							onChange={handleAppliedCoupon}
							value={appliedCouponName}
						/>
					</div>

					<div className='col-1 mr-4'>
						<div>
							<span
								className=''
								style={{
									fontSize: "1.7rem",
									fontWeight: "bolder",
									// border: "2px grey solid",
									borderRadius: "10px",
									padding: "0px 20px",
									background: "#e8eaf3",
								}}
								disabled={appliedCouponName.length === 0 ? true : false}
								onClick={() => {
									readSingleCoupon(appliedCouponName).then((data) => {
										if (data.error) {
											console.log(data.error);
										} else {
											setCouponApplied(true);
											setAppliedCoupon(data[0]);
										}
									});
								}}>
								<ArrowRightOutlined />
							</span>
						</div>
					</div>
				</div>

				{couponApplied ? (
					<>
						{appliedCoupon && appliedCoupon.name && appliedCoupon.expiry ? (
							<div className='mt-1'>
								{new Date(appliedCoupon.expiry).setHours(0, 0, 0, 0) >=
								new Date().setHours(0, 0, 0, 0) ? (
									<div style={{ fontWeight: "bold", fontSize: "12px" }}>
										Your Coupon Was Successfully Applied{" "}
										<span style={{ fontWeight: "bold", color: "green" }}>
											{" "}
											({appliedCoupon.discount}% OFF)
										</span>
									</div>
								) : (
									<div
										className='mt-1'
										style={{
											fontWeight: "bold",
											fontSize: "12px",
											color: "red",
										}}>
										Unfortunately, This Coupon is unavailable or might be
										expired
									</div>
								)}
							</div>
						) : (
							<div
								className='mt-1'
								style={{ fontWeight: "bold", fontSize: "12px", color: "red" }}>
								Unfortunately, This Coupon is unavailable or might be expired
							</div>
						)}
					</>
				) : null}
			</div>
			<hr />
		</CouponCompWrapper>
	);
};

export default CouponComp;

const CouponCompWrapper = styled.div`
	margin-bottom: 10px;

	svg {
		top: 0px !important;
		margin-bottom: 10px;
	}
`;
