/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Modal, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";
import { updateOrder, updateOrderNoDecrease } from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const ReturnModal = ({
	updateSingleOrder,
	setUpdateSingleOrder,
	returnDate,
	setReturnDate,
	modalVisible2,
	setModalVisible2,
	setCollapsed,
	returnStatus,
	setReturnStatus,
	returnedItems,
	setReturnedItems,
	returnFullOrder,
	setReturnFullOrder,
}) => {
	const [returnAmount, setReturnAmount] = useState(0);
	const [refundMethod, setRefundMethod] = useState("");
	const [reasonForReturn, setReasonForReturn] = useState("");
	const [refundNumber, setRefundNumber] = useState("");
	const { user, token } = isAuthenticated();

	const UpdatingOrder = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (!refundMethod) {
			return toast.error("Please Fill In Refund Method");
		}

		if (!refundNumber) {
			return toast.error("Please Fill In Refund Number");
		}

		if (!returnAmount || returnAmount <= 0) {
			return toast.error("Please Fill In Refund Amount");
		}

		if (!reasonForReturn) {
			return toast.error("Please Fill In The Reason For Return");
		}

		if (window.confirm("Are you sure you want to fully return this order")) {
			if (updateSingleOrder.status === "Returned and Not Refunded") {
				updateOrder(updateSingleOrder._id, user._id, token, updateSingleOrder)
					.then((response) => {
						toast.success("Order was successfully updated");
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					})

					.catch((error) => {
						console.log(error);
					});
			} else {
				updateOrderNoDecrease(
					updateSingleOrder._id,
					user._id,
					token,
					updateSingleOrder,
				)
					.then((response) => {
						toast.success("Order was successfully updated");
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					})

					.catch((error) => {
						console.log(error);
					});
			}
		}
	};

	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Pick Return Date
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						setReturnDate(new Date(date._d).toLocaleDateString() || date._d);
						setUpdateSingleOrder({
							...updateSingleOrder,
							returnDate: new Date(date._d).toLocaleDateString() || date._d,
							returnedItems: updateSingleOrder.chosenProductQtyWithVariables,
						});
					}}
					// disabledDate={disabledDate}
					max
					size='small'
					showToday={true}
					// defaultValue={moment(new Date(returnDate))}
					placeholder='Please pick Return Date'
					style={{
						height: "auto",
						width: "67%",
						marginLeft: "5px",
						padding: "10px",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						borderRadius: "10px",
					}}
				/>
				<br />
				<br />

				<div className='row'>
					<div className='col-md-6 mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Refund Method
						</label>
						<br />
						<select
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									refundMethod: e.target.value,
								});

								setRefundMethod(e.target.value);
							}}
							placeholder='Select Return Status'
							className=' mx-auto w-75'
							style={{
								paddingTop: "8px",
								paddingBottom: "8px",
								// paddingRight: "50px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								textTransform: "capitalize",
							}}>
							<option value='SelectStatus'>Select Refund Method</option>
							<option value='Fawry'>Fawry</option>
							<option value='E-Wallet'>E-Wallet</option>
							<option value='Refund in cash'>Refund in cash</option>
							<option value='Bank Transfer'>Bank Transfer</option>
							<option value='Other'>Other</option>
						</select>
					</div>
					{refundMethod ? (
						<div className='col-md-6  mx-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								Refund Number{" "}
								<span style={{ fontSize: "0.85rem" }}>
									{" "}
									(If Not Available, Please type "No")
								</span>
							</label>
							<br />

							<input
								className='w-75 form-control mx-auto'
								type='number'
								value={refundNumber}
								onChange={(e) => {
									setUpdateSingleOrder({
										...updateSingleOrder,
										refundNumber: e.target.value,
									});

									setRefundNumber(e.target.value);
								}}
								placeholder='Refund Number e.g. phone number, card number, etc...'
								// style={{ borderRadius: "20px" }}
							/>
						</div>
					) : null}

					<div className='col-md-6  mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Refund Amount
						</label>
						<br />

						<input
							className='w-75 form-control mx-auto'
							type='number'
							value={returnAmount}
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									returnAmount: e.target.value,
								});

								setReturnAmount(e.target.value);
							}}
							placeholder='Refund Amount in L.E.'
							// style={{ borderRadius: "20px" }}
						/>
					</div>
				</div>

				<br />

				<div className='row'>
					<div className=' col-md-6 my-auto mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							What is the Return Status? ({updateSingleOrder.OTNumber})
						</label>
						<br />
						<select
							onChange={(e) =>
								setUpdateSingleOrder({
									...updateSingleOrder,
									returnStatus: e.target.value,
									status: e.target.value,
									returnedItems:
										updateSingleOrder.chosenProductQtyWithVariables,
								})
							}
							placeholder='Select Return Status'
							className=' mx-auto w-75'
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
							<option value='SelectStatus'>Select A Return Status</option>
							<option value='Return Request'>Return Request</option>
							<option value='In Return'>In Return</option>
							<option value='Returned and Refunded'>
								Returned and Refunded
							</option>
							<option value='Returned and Not Refunded'>
								Returned and Not Refunded
							</option>
						</select>
					</div>
					<div className='col-md-6 my-3 mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Reason For Return...
						</label>
						<br />

						<textarea
							rows='4'
							className='p-2 form-control w-75 mx-auto '
							type='text'
							value={reasonForReturn}
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									reasonForReturn: e.target.value,
								});

								setReasonForReturn(e.target.value);
							}}
							placeholder='Reason For Return'
							// style={{ borderRadius: "20px" }}
						/>
					</div>
				</div>

				<div className='col-md-5 mx-auto'>
					<button className='btn btn-primary btn-block' onClick={UpdatingOrder}>
						Update Order
					</button>
				</div>
			</div>
		);
	};

	var selectedReturnObject = returnedItems[returnedItems.length - 1];

	const mainFormPartialReturn = () => {
		return (
			<div className='mx-auto text-center'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Pick Return Date For SKU:{" "}
					<span style={{ textTransform: "uppercase", color: "#3399ff" }}>
						{selectedReturnObject.SubSKU}
					</span>
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						setReturnDate(new Date(date._d).toLocaleDateString() || date._d);
						setUpdateSingleOrder({
							...updateSingleOrder,
							returnDate: new Date(date._d).toLocaleDateString() || date._d,
						});
					}}
					// disabledDate={disabledDate}
					max
					size='small'
					showToday={true}
					defaultValue={moment(new Date(returnDate))}
					placeholder='Please pick Return Date'
					style={{
						height: "auto",
						width: "67%",
						marginLeft: "5px",
						padding: "10px",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						borderRadius: "10px",
					}}
				/>
				<br />
				<br />
				<div className='row'>
					<div className='col-md-6 mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Refund Method
						</label>
						<br />
						<select
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									refundMethod: e.target.value,
								});

								setRefundMethod(e.target.value);
							}}
							placeholder='Select Return Status'
							className=' mx-auto w-75'
							style={{
								paddingTop: "8px",
								paddingBottom: "8px",
								// paddingRight: "50px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								textTransform: "capitalize",
							}}>
							<option value='SelectStatus'>Select Refund Method</option>
							<option value='Fawry'>Fawry</option>
							<option value='E-Wallet'>E-Wallet</option>
							<option value='Refund in cash'>Refund in cash</option>
							<option value='Bank Transfer'>Bank Transfer</option>
							<option value='Other'>Other</option>
						</select>
					</div>
					{refundMethod ? (
						<div className='col-md-6  mx-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								Refund Number{" "}
								<span style={{ fontSize: "0.85rem" }}>
									{" "}
									(If Not Available, Please type "No")
								</span>
							</label>
							<br />

							<input
								className='w-75 form-control mx-auto'
								type='number'
								value={refundNumber}
								onChange={(e) => {
									setUpdateSingleOrder({
										...updateSingleOrder,
										refundNumber: e.target.value,
									});

									setRefundNumber(e.target.value);
								}}
								placeholder='Refund Number e.g. phone number, card number, etc...'
								// style={{ borderRadius: "20px" }}
							/>
						</div>
					) : null}

					<div className='col-md-6  mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Refund Amount
						</label>
						<br />

						<input
							className='w-75 form-control mx-auto'
							type='number'
							value={returnAmount}
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									returnedItems: [
										{
											...updateSingleOrder.returnedItems,
											returnAmount: e.target.value,
										},
									],
								});

								setReturnAmount(e.target.value);
							}}
							placeholder='Refund Amount in L.E.'
							// style={{ borderRadius: "20px" }}
						/>
					</div>
				</div>
				<br />
				<div className='row'>
					<div className=' col-md-6 my-auto mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							What is the Return Status? ({updateSingleOrder.OTNumber})
						</label>
						<br />
						<select
							onChange={(e) =>
								setUpdateSingleOrder({
									...updateSingleOrder,
									returnStatus: e.target.value,
									status: e.target.value,
								})
							}
							placeholder='Select Return Status'
							className=' mx-auto w-75'
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
							<option value='SelectStatus'>Select A Return Status</option>
							<option value='Return Request (Partial)'>
								Return Request (Partial)
							</option>
							<option value='In Return (Partial)'>In Return (Partial)</option>
							<option value='Returned and Refunded (Partial)'>
								Returned and Refunded (Partial)
							</option>
							<option value='Returned and Not Refunded (Partial)'>
								Returned and Not Refunded (Partial)
							</option>
						</select>
					</div>
					<div className='col-md-6 my-3 mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Reason For Return...
						</label>
						<br />

						<textarea
							rows='4'
							className='p-2 form-control w-75 mx-auto '
							type='text'
							value={reasonForReturn}
							onChange={(e) => {
								setUpdateSingleOrder({
									...updateSingleOrder,
									reasonForReturn: e.target.value,
								});

								setReasonForReturn(e.target.value);
							}}
							placeholder='Reason For Return'
							// style={{ borderRadius: "20px" }}
						/>
					</div>
				</div>
				<div className='col-md-5 mx-auto'>
					<button
						className='btn btn-primary btn-block'
						onClick={() => {
							var returnedItemsHelper = returnedItems;
							var objIndex = returnedItemsHelper.findIndex(
								(obj) => obj.SubSKU === selectedReturnObject.SubSKU,
							);
							returnedItemsHelper[objIndex].returnAmount = returnAmount;

							var ArrayOfReturnValues = returnedItemsHelper.map((i) =>
								Number(i.returnAmount),
							);
							var finalValue = ArrayOfReturnValues.reduce((a, b) => a + b, 0);

							setUpdateSingleOrder({
								...updateSingleOrder,
								returnedItems: returnedItemsHelper,
								returnAmount: finalValue,
							});

							setReturnFullOrder("");
							setModalVisible2(false);
						}}>
						Submit Partial Return
					</button>
				</div>
			</div>
		);
	};

	return (
		<ReturnModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Order Return`}</div>
				}
				visible={modalVisible2}
				onOk={() => {
					setModalVisible2(false);
					setCollapsed(false);
					setReturnFullOrder("");
				}}
				okButtonProps={{ style: { display: "none" } }}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setCollapsed(false);
					setModalVisible2(false);
					setReturnFullOrder("");
				}}>
				{!returnFullOrder ? (
					<div className=' col-md-6 my-auto mx-auto'>
						<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
							Please Choose One:
						</label>
						<br />
						<select
							onChange={(e) => {
								if (e.target.value === "Full Order Return Request") {
									setReturnFullOrder("Full Order");
								} else {
									setReturnFullOrder("Partial Order");
								}
							}}
							placeholder='Select Return Status'
							className=' mx-auto w-75'
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
							<option value='PleaseSelect'>Select Return Kind</option>
							<option value='Full Order Return Request'>
								Full Order Return Request
							</option>
							<option value='Partial Return'>Partial Return</option>
						</select>
					</div>
				) : null}
				{returnFullOrder === "Full Order" ? mainForm() : null}
				{returnFullOrder === "Partial Order" ? mainFormPartialReturn() : null}
			</Modal>
		</ReturnModalWrapper>
	);
};

export default ReturnModal;

const ReturnModalWrapper = styled.div``;
