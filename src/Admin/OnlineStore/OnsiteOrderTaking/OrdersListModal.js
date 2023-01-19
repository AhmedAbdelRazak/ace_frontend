/** @format */

import React, { useState } from "react";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import styled from "styled-components";
import LogoImage from "../../../GeneralImages/Logo2.png";
import { Link } from "react-router-dom";

// import { toast } from "react-toastify";

const OrdersListModal = ({ modalVisible, setModalVisible, orders, user }) => {
	const [q, setQ] = useState("");
	const [selectedOrder, setSelectedOrder] = useState("");

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.orderCreationDate).toLocaleDateString();
			return (
				row.customerDetails.phone.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.state.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.cityName.toString().toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.fullName.toString().toLowerCase().indexOf(q) > -1 ||
				row.customerDetails.email.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.invoiceNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.OTNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.trackingNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.employeeData.name.toString().toLowerCase().indexOf(q) > -1 ||
				row.orderSource.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	const mainForm = () => {
		return (
			<React.Fragment>
				<div style={{ padding: "30px 0px", background: "rgb(198,14,14)" }}>
					<img
						className='imgLogo2'
						src={LogoImage}
						alt='Infinite Apps'
						style={{
							width: "80px",
							position: "absolute",
							top: "35px",
							padding: "0px",
							left: "30px",
							background: "#c60e0e",
							border: "#c60e0e solid 1px",
						}}
					/>
					<span
						style={{
							fontSize: "1.2rem",
							marginLeft: "42%",
							color: "white",
							position: "absolute",
							top: "35px",
						}}>
						ACE STORE (Branch: {user && user.userBranch})
					</span>
				</div>
				<div className='col-md-12 mx-auto'>
					<div style={{ background: "#f7f7f7", padding: "4px" }}>
						<h3
							style={{
								fontSize: "1.2rem",
								fontWeight: "bold",
								textAlign: "center",
								marginTop: "10px",
							}}>
							Sales List
						</h3>
						<div
							style={{
								marginRight: "10px",
								position: "absolute",
								top: "10px",
								right: "20px",
							}}>
							<input
								style={{
									border: "1px lightgrey solid",
									borderRadius: "20px",
									padding: "5px",
									width: "300px",
								}}
								type='text'
								placeholder='Search'
								value={q}
								onChange={(e) => {
									setQ(e.target.value.toLowerCase());
								}}
							/>
						</div>
					</div>
					<div className='col-11'>
						<hr style={{ borderBottom: "darkred solid 1px" }} />
					</div>
					<div>
						<div className='row'>
							<div className='col-3 mx-auto'>
								<div
									style={{
										marginLeft: "150px",
										border: "1px darkred solid",
										textAlign: "center",
										padding: "10px",
									}}>
									<span style={{ fontSize: "1.1rem" }}>INV. VALUE:</span>
									<br />
									<span style={{ fontSize: "1.2rem", fontWeight: "bolder" }}>
										{selectedOrder &&
											selectedOrder.totalAmountAfterDiscount.toFixed(2)}{" "}
										EGP
									</span>
								</div>
							</div>
							<div className='col-8 mx-auto'>
								<div className='row'>
									<div className='col-6 mx-auto'>
										<div>
											{" "}
											<span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
												Invoice No
											</span>{" "}
											<span style={{ fontSize: "1.2rem" }}>
												{selectedOrder && selectedOrder.invoiceNumber}
											</span>{" "}
										</div>
										<div style={{ fontWeight: "bolder" }}>
											Invoice Date:{" "}
											{selectedOrder &&
												new Date(
													selectedOrder.orderCreationDate,
												).toDateString()}
										</div>
										<div style={{ fontWeight: "bolder" }}>
											Payment:{" "}
											{selectedOrder &&
											selectedOrder.paymobData &&
											selectedOrder.paymobData.status
												? selectedOrder.paymobData.status
												: selectedOrder.paymobData}{" "}
										</div>

										<div style={{ fontWeight: "bolder" }}>
											Discounts:{" "}
											{selectedOrder &&
											selectedOrder.totalAmountAfterDiscount ===
												selectedOrder.totalAmount
												? "No"
												: Number(
														Number(selectedOrder.totalAmount) -
															Number(selectedOrder.totalAmountAfterDiscount),
												  ).toFixed(2)}{" "}
										</div>
										<div style={{ fontWeight: "bolder" }}>Status: PAID</div>
									</div>
									{selectedOrder && selectedOrder.customerDetails ? (
										<div className='col-6 mx-auto'>
											<div
												style={{ fontSize: "1.35rem", fontWeight: "bolder" }}>
												{selectedOrder &&
												selectedOrder.customerDetails &&
												selectedOrder.customerDetails.fullName &&
												selectedOrder.customerDetails.fullName ===
													"Offline Store"
													? "Unknown Customer"
													: selectedOrder.customerDetails.fullName}
											</div>
											<div style={{ fontWeight: "bolder" }}>
												TEL:{" "}
												{selectedOrder &&
												selectedOrder.customerDetails &&
												selectedOrder.customerDetails.phone === "Offline Store"
													? "Unknown Phone #"
													: selectedOrder.customerDetails.phone}{" "}
											</div>
											<div style={{ fontWeight: "bolder" }}>
												Address:{" "}
												{selectedOrder &&
												selectedOrder.customerDetails &&
												selectedOrder.customerDetails.address ===
													"Offline Store"
													? "Unknown Address"
													: selectedOrder.customerDetails.address}{" "}
											</div>

											<div style={{ fontWeight: "bolder" }}>
												Email:{" "}
												{selectedOrder &&
												selectedOrder.customerDetails &&
												selectedOrder.customerDetails.email === "Offline Store"
													? "Unknown Phone #"
													: selectedOrder.customerDetails.email}{" "}
											</div>
											<div style={{ fontWeight: "bolder" }}>
												<Link
													to={`/admin/single-order/${selectedOrder._id}`}
													onClick={() =>
														window.scrollTo({ top: 0, behavior: "smooth" })
													}>
													Show More Details
												</Link>
											</div>
											{/* <div style={{ fontWeight: "bolder" }}>Orders</div> */}
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>

					<div className='col-11'>
						<hr style={{ borderBottom: "darkred solid 1px" }} />
					</div>

					<table
						className='table table-bordered table-md-responsive table-hover text-center'
						style={{ fontSize: "0.75rem" }}>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Purchase Date</th>
								<th scope='col'>INV #</th>
								<th scope='col'>Amount</th>
								<th scope='col'>Quantity</th>
								<th scope='col'>Payment</th>
								<th scope='col'>Status</th>
								<th scope='col'>Name</th>
								<th scope='col'>Phone</th>
								<th scope='col'>Invoicing</th>
								<th scope='col' style={{ width: "10%" }}>
									Taker
								</th>
							</tr>
						</thead>

						<tbody className='my-auto'>
							{search(orders).map((s, i) => {
								return (
									<tr key={i} className=''>
										{s.orderCreationDate ? (
											<td style={{ width: "10%" }}>
												{new Date(s.orderCreationDate).toDateString()}{" "}
											</td>
										) : (
											<td style={{ width: "10%" }}>
												{new Date(s.createdAt).toDateString()}{" "}
											</td>
										)}

										<td
											style={{
												width: "10%",
												color: "blue",
												cursor: "pointer",
												background:
													s.invoiceNumber === "Not Added" ? "#f4e4e4" : "",
											}}
											onClick={() => setSelectedOrder(s)}>
											{s.invoiceNumber}
										</td>
										<td>{s.totalAmountAfterDiscount.toFixed(0)} EGP</td>
										<td>{s.totalOrderQty} Items</td>
										<td style={{ background: "darkgreen", color: "white" }}>
											{s.paymobData.status ? s.paymobData.status : s.paymobData}
										</td>
										<td
											style={{
												background: "darkgreen",
												color: "white",
												width: "10px",
											}}>
											PAID
										</td>

										<td style={{ width: "11%" }}>
											{s.customerDetails.fullName === "Offline Store"
												? "N/A"
												: s.customerDetails.fullName}
										</td>
										<td>
											{s.customerDetails.phone === "Offline Store"
												? "N/A"
												: s.customerDetails.phone}
										</td>
										<td style={{ textTransform: "uppercase" }}>
											<Link to='#'>Print Invoice</Link>
										</td>
										<td
											style={{
												background:
													s.employeeData === "Online Order" ? "#ffc994" : "",
											}}>
											{s.employeeData.name
												? s.employeeData.name
												: s.employeeData === "Online Order"
												? "Online Self Service"
												: ""}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	};

	return (
		<OrdersListModalWrapper>
			<Modal
				width='80%'
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}>
				{mainForm()}
			</Modal>
		</OrdersListModalWrapper>
	);
};

export default OrdersListModal;

const OrdersListModalWrapper = styled.div`
	z-index: 18000 !important;
`;
