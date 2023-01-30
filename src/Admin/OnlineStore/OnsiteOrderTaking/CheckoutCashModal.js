/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ReceiptPDF from "./ReceiptPDF";
import {
	createOrderOfflineStore,
	ordersLength,
	receiveNew,
} from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const CheckoutCashModal = ({
	modalVisible,
	setModalVisible,
	chosenProductWithVariables,
	invoiceNumber,
	orderCreationDate,
	discountAmount,
	totalAmountAfterDiscount,
	totalAmount,
	paymentStatus,
	employeeData,
	customerPaid,
	userCustomerDetails,
	productsTotalOrderedQty,
	lengthOfOrders,
	setLengthOfOrders,
	allColors,
}) => {
	const [moneyReceived, setMoneyReceived] = useState(false);

	const { user, token } = isAuthenticated();

	// console.log(user, "user");

	const submitOrderCash = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		ordersLength(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLengthOfOrders(data);
			}
		});

		var today = new Date(
			new Date().toLocaleString("en-US", {
				timeZone: "Africa/Cairo",
			}),
		);

		//In Processing, Ready To Ship, Shipped, Delivered
		const createOrderData = {
			productsNoVariable: [],
			chosenProductQtyWithVariables: [chosenProductWithVariables],
			customerDetails: userCustomerDetails,
			totalOrderQty: Number(productsTotalOrderedQty),
			status: "Delivered",
			totalAmount: totalAmount,
			// Number(Number(total_amount * 0.01).toFixed(2))
			totalAmountAfterDiscount: totalAmountAfterDiscount,
			// Number(Number(total_amount * 0.01).toFixed(2))
			totalOrderedQty: Number(productsTotalOrderedQty),
			orderTakerDiscount: discountAmount,
			employeeData: user,
			chosenShippingOption: {},
			orderSource: "ace",
			sendSMS: false,
			trackingNumber: "",
			invoiceNumber: `ACE${new Date(orderCreationDate).getFullYear()}${
				new Date(orderCreationDate).getMonth() + 1
			}${new Date(orderCreationDate).getDate()}000${lengthOfOrders + 1}`,
			appliedCoupon: {},
			OTNumber: `OT${new Date(orderCreationDate).getFullYear()}${
				new Date(orderCreationDate).getMonth() + 1
			}${new Date(orderCreationDate).getDate()}000${lengthOfOrders + 1}`,
			returnStatus: "Not Returned",
			shipDate: today,
			returnDate: today,
			exchangedProductQtyWithVariables: [],
			exhchangedProductsNoVariable: [],
			freeShipping: false,
			orderCreationDate: orderCreationDate,
			shippingFees: 0,
			appliedShippingFees: false,
			totalAmountAfterExchange: 0,
			exchangeTrackingNumber: "Not Added",
			onHoldStatus: "Not On Hold",
			paymobData: { status: "Paid In Cash" },
			paymentStatus: "Paid In Store",
			forAI: {},
		};
		createOrderOfflineStore(user._id, token, createOrderData)
			.then((response) => {
				toast.success("Order Was Successfully Taken");

				chosenProductWithVariables &&
					// eslint-disable-next-line
					chosenProductWithVariables.map((i) => {
						receiveNew(user._id, token, {
							productName: i.productName,
							productId: i.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "san stefano",
							receivedSKU: i.SubSKU,
							receivedQuantity: i.OrderedQty * -1,
							receivingCase: "outbound",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("Outbounded");
							}
						});
					});

				setTimeout(function () {
					window.location.reload(false);
				}, 1500);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	const mainForm = () => {
		return (
			<div
				className='mx-auto mx-auto'
				style={{ background: "", minHeight: "300px" }}>
				<div className='row'>
					<div
						className='col-12 mx-auto'
						style={{
							background: "white",
							borderRight: "2px grey solid",
							borderLeft: "2px grey solid",
						}}>
						<div
							style={{
								fontSize: "1rem",
								fontWeight: "bold",
								marginLeft: "10px",
								textTransform: "uppercase",
							}}>
							Order Receipt
						</div>
						<div className='col-8 mx-auto'>
							<hr />
						</div>

						<div className='mt-3'>
							<div>
								<strong>Customer Paid:</strong>{" "}
								<span
									className='ml-5'
									style={{ color: "darkblue", fontWeight: "bolder" }}>
									{customerPaid && Number(customerPaid).toFixed(2)} EGP
								</span>
							</div>
							<div>
								<strong>Customer Change: </strong>
								<span
									className='ml-4'
									style={{ color: "darkred", fontWeight: "bolder" }}>
									{Number(customerPaid - totalAmountAfterDiscount).toFixed(2)}{" "}
									EGP
								</span>{" "}
							</div>
							<div className='mt-3'>
								Are You Sure You Received The Cash And Returned The Change?{" "}
								<input
									type='checkbox'
									checked={moneyReceived}
									onChange={(e) => setMoneyReceived(!moneyReceived)}
								/>
							</div>
						</div>
						<div className='text-center mx-auto col-3 mt-4 '>
							<button
								disabled={!moneyReceived}
								className='btn btn-primary btn-block mx-auto text-center'
								onClick={submitOrderCash}
								style={{
									background: "darkgreen",
									color: "white",
									border: "1px darkgreen solid",
								}}>
								Submit Order
							</button>
						</div>
						<div className='col-8 mx-auto'>
							<hr />
						</div>
						<ReceiptPDF
							chosenProductWithVariables={chosenProductWithVariables}
							invoiceNumber={invoiceNumber}
							orderCreationDate={orderCreationDate}
							discountAmount={discountAmount}
							totalAmountAfterDiscount={totalAmountAfterDiscount}
							totalAmount={totalAmount}
							paymentStatus={paymentStatus}
							employeeData={employeeData}
							allColors={allColors}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<CheckoutCashModalWrapper>
			<Modal
				width='75%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`CASH CHECKOUT`}</div>
				}
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}>
				{mainForm()}
			</Modal>
		</CheckoutCashModalWrapper>
	);
};

export default CheckoutCashModal;

const CheckoutCashModalWrapper = styled.div`
	z-index: 18000 !important;
`;
