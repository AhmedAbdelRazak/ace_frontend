/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ReceiptPDF from "./ReceiptPDF";

// import { toast } from "react-toastify";

const CheckoutCardModal = ({
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
}) => {
	const mainForm = () => {
		return (
			<div
				className='mx-auto mx-auto'
				style={{ background: "", minHeight: "300px" }}>
				<div className='row'>
					<div
						className='col-5 mx-auto'
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
						<ReceiptPDF
							chosenProductWithVariables={chosenProductWithVariables}
							invoiceNumber={invoiceNumber}
							orderCreationDate={orderCreationDate}
							discountAmount={discountAmount}
							totalAmountAfterDiscount={totalAmountAfterDiscount}
							totalAmount={totalAmount}
							paymentStatus={paymentStatus}
							employeeData={employeeData}
						/>
					</div>
				</div>
				<div className='text-center mx-auto col-3 mt-4 '>
					<div
						className='btn btn-primary btn-block mx-auto text-center'
						style={{
							background: "darkgreen",
							color: "white",
							border: "1px darkgreen solid",
						}}>
						Submit Order
					</div>
				</div>
			</div>
		);
	};

	return (
		<CheckoutCardModalWrapper>
			<Modal
				width='75%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`CARD CHECKOUT`}</div>
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
		</CheckoutCardModalWrapper>
	);
};

export default CheckoutCardModal;

const CheckoutCardModalWrapper = styled.div`
	z-index: 18000 !important;
`;
