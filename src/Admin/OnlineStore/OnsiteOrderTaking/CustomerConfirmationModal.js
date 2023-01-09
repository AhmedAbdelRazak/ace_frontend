/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const CustomerConfirmationModal = ({
	modalVisible,
	setModalVisible,
	userCustomerDetails,
	accountHistOrders,
	allColors,
}) => {
	const selectedDateOrdersSKUsModified = () => {
		const modifiedArray =
			accountHistOrders &&
			accountHistOrders.map((i) =>
				i.chosenProductQtyWithVariables.map((ii) =>
					ii.map((iii) => {
						return {
							productName: iii.productName,
							employeeData: i.employeeData,
							OrderedQty: iii.OrderedQty,
							orderCreationDate: i.orderCreationDate,
							status: i.status,
							productMainImage: iii.productMainImage,
							SubSKU: iii.SubSKU,
							SubSKUColor: iii.SubSKUColor,
							SubSKUSize: iii.SubSKUSize,
							productSubSKUImage: iii.productSubSKUImage,
							totalPaidAmount:
								Number(iii.pickedPrice).toFixed(2) *
								Number(iii.OrderedQty).toFixed(2),
						};
					}),
				),
			);

		return modifiedArray;
	};

	var destructingNestedArraySKUs = [];
	selectedDateOrdersSKUsModified() &&
		selectedDateOrdersSKUsModified().map((i) =>
			i.map((ii) => destructingNestedArraySKUs.push(...ii)),
		);

	function sortTopOrdersProductsSKUs(a, b) {
		const TotalAppointmentsA = a.totalPaidAmount;
		const TotalAppointmentsB = b.totalPaidAmount;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	var TopSoldProductsSKUs = [];
	destructingNestedArraySKUs &&
		destructingNestedArraySKUs.reduce(function (res, value) {
			if (!res[value.productName + value.SubSKU]) {
				res[value.productName + value.SubSKU] = {
					productName: value.productName,
					productMainImage: value.productMainImage,
					productSubSKUImage: value.productSubSKUImage,
					orderCreationDate: value.orderCreationDate,
					status: value.status,
					employeeData: value.employeeData,
					SubSKU: value.SubSKU,
					SubSKUColor: value.SubSKUColor,
					SubSKUSize: value.SubSKUSize,
					OrderedQty: 0,
					totalPaidAmount: 0,
				};
				TopSoldProductsSKUs.push(res[value.productName + value.SubSKU]);
			}

			res[value.productName + value.SubSKU].OrderedQty += Number(
				value.OrderedQty,
			);
			res[value.productName + value.SubSKU].totalPaidAmount += Number(
				value.totalPaidAmount,
			);

			return res;
		}, {});

	TopSoldProductsSKUs.sort(sortTopOrdersProductsSKUs);

	const mainForm = () => {
		return (
			<div
				className='mx-auto p-3 mx-auto'
				style={{ background: "#f0f0f0", minHeight: "300px" }}>
				<div
					className=' mx-auto p-2 mb-2'
					style={{
						cursor: "pointer",
						color: "black",
						fontWeight: "bold",
						border: "1px lightgrey solid",
					}}>
					Customer Details
				</div>
				<div className='mb-4'>
					Customer Name: {userCustomerDetails.fullName}
					<br />
					Customer Phone: {userCustomerDetails.phone}
					<br />
					Customer Address: {userCustomerDetails.address}
				</div>

				<div
					className=' mx-auto p-2'
					style={{
						cursor: "pointer",
						color: "black",
						fontWeight: "bold",
						border: "1px lightgrey solid",
					}}>
					Customer Purchase History: {accountHistOrders.length}{" "}
					{accountHistOrders.length === 1 ? "Purchase" : "Purchases"}
				</div>

				<table
					className='table table-bordered table-md-responsive table-hover'
					style={{ fontSize: "0.75rem", overflowX: "auto" }}>
					<thead className=''>
						<tr
							style={{
								fontSize: "0.75rem",
								textTransform: "capitalize",
								textAlign: "center",
								backgroundColor: "#009ef7",
								color: "wheat",
							}}>
							<th scope='col'>#</th>
							<th scope='col'>SKU</th>
							<th scope='col'>Product Name</th>
							<th scope='col'>Color</th>
							<th scope='col'>Size</th>
							<th scope='col'>Ordered Qty</th>
							<th scope='col'>Employee</th>
							<th scope='col'>Order Date</th>
							<th scope='col'>Status</th>
						</tr>
					</thead>
					<tbody
						className='my-auto'
						style={{
							fontSize: "0.75rem",
							textTransform: "capitalize",
							fontWeight: "bolder",
						}}>
						{TopSoldProductsSKUs &&
							TopSoldProductsSKUs.map((s, i) => {
								return (
									<tr key={i} className=''>
										<td className='my-auto'>{i + 1}</td>
										<td>{s.SubSKU}</td>
										<td>{s.productName}</td>
										<td>
											{allColors[
												allColors.map((i) => i.hexa).indexOf(s.SubSKUColor)
											]
												? allColors[
														allColors.map((i) => i.hexa).indexOf(s.SubSKUColor)
												  ].color
												: s.SubSKUColor}
										</td>

										<td>{s.SubSKUSize}</td>
										<td>{s.OrderedQty}</td>
										<td>{s.employeeData && s.employeeData.name}</td>
										<td>{new Date(s.orderCreationDate).toDateString()}</td>
										<td>{s.status}</td>

										{/* <td>{Invoice(s)}</td> */}
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<CustomerConfirmationModalWrapper>
			<Modal
				width='70%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Customer Details`}</div>
				}
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
		</CustomerConfirmationModalWrapper>
	);
};

export default CustomerConfirmationModal;

const CustomerConfirmationModalWrapper = styled.div`
	z-index: 18000 !important;
`;
