/** @format */

import React from "react";
import styled from "styled-components";
import { Collapse } from "antd";
import CheckoutCartItemsPhone from "./CheckoutCartItemsPhone";
const { Panel } = Collapse;

const CartSummaryPhone = ({
	total_amount,
	shippingFee,
	appliedCoupon,
	couponApplied,
}) => {
	return (
		<CartSummaryPhoneWrapper>
			<Collapse style={{ background: "#f5f6fa" }} accordion>
				<Panel
					collapsible
					style={{ marginBottom: "5px" }}
					header={
						<div className='row'>
							<div className='col-8' style={{ color: "#1f66e5" }}>
								<i className='fa-sharp fa-solid fa-cart-shopping'></i>
								{"     "}
								<span
									style={{
										// fontWeight: "bold",

										fontSize: "0.8rem",
										color: "#1f66e5",
									}}>
									Show order summary
								</span>
							</div>

							<div
								className='col-4'
								style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
								EGP {total_amount}
							</div>
						</div>
					}>
					<div
						style={{
							position: "relative",
							left: "-13px",
							background: "#f5f6fa",
							width: "108%",
							padding: "10px 5px",
						}}>
						<CheckoutCartItemsPhone
							shippingFee={shippingFee}
							appliedCoupon={appliedCoupon}
							couponApplied={couponApplied}
						/>
					</div>
				</Panel>
			</Collapse>
		</CartSummaryPhoneWrapper>
	);
};

export default CartSummaryPhone;

const CartSummaryPhoneWrapper = styled.div`
	display: none;

	@media (max-width: 900px) {
		display: block;

		.ant-collapse-item:last-child > .ant-collapse-content {
			background: #f5f6fa !important;
		}
	}
`;
