/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const DiscountModal = ({
	modalVisible,
	setModalVisible,
	discountBy,
	setDiscountBy,
	setDiscountStatus,
	discountStatus,
}) => {
	const mainForm = () => {
		return (
			<div
				className='mx-auto text-center col-6 p-3 mx-auto'
				style={{ background: "#0e6ac6", minHeight: "300px" }}>
				<div className='row mx-5'>
					<div
						className='col-5 mx-auto p-2'
						style={{
							cursor: "pointer",
							color: "white",
							border: "1px lightgrey solid",
						}}
						onClick={() => {
							setDiscountStatus("Cash");
						}}>
						Discount By Cash
					</div>
					<div
						className='col-5 mx-auto p-2'
						style={{
							cursor: "pointer",
							color: "white",
							border: "1px lightgrey solid",
						}}
						onClick={() => {
							setDiscountStatus("Percentage");
						}}>
						Discount By %
					</div>
				</div>

				{discountStatus ? (
					<div className='mt-5'>
						<span style={{ color: "white" }}>
							Discount By {discountStatus} (Only Numbers)
						</span>
						<br />
						<input
							className='py-2 mb-3'
							onChange={(e) => setDiscountBy(e.target.value)}
							value={discountBy}
							placeholder={
								discountStatus === "Percentage"
									? "Please add a number that represents % off"
									: "Please add a number that represents cash off"
							}
							type='text'
							style={{
								border: "1px lightgrey solid",
								width: "90%",
								boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.3)",
								color: "black",
							}}
						/>
					</div>
				) : null}
			</div>
		);
	};

	return (
		<DiscountModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Total Discount`}</div>
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
		</DiscountModalWrapper>
	);
};

export default DiscountModal;

const DiscountModalWrapper = styled.div`
	z-index: 18000 !important;
`;
