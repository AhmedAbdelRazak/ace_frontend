/** @format */

import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import styled from "styled-components";

// import { toast } from "react-toastify";

const NewCustomerModal = ({
	modalVisible,
	setModalVisible,
	customerDetails,
	setCustomerDetails,
}) => {
	const mainForm = () => {
		return (
			<div
				className='mx-auto  col-10 p-3 mx-auto'
				style={{ background: "white", minHeight: "300px" }}>
				<div>Customer Details</div>
				<div className='container'>
					<div className='mt-3'>
						{" "}
						<strong>Required*</strong>{" "}
					</div>
					<div className='mt-3'>
						<span>Phone #</span>{" "}
						<input
							type='number'
							style={{
								border: "solid 1px lightgrey",
								padding: "5px 2px",
								marginLeft: "20px",
							}}
							className=' w-25'
							placeholder='Phone # Should Be 11 Digits'
							onChange={(e) => {
								if (!customerDetails) {
									setCustomerDetails({ phone: e.target.value });
								} else {
									setCustomerDetails({
										...customerDetails,
										phone: e.target.value,
										address: "",
										state: "",
										city: "",
										cityName: "",
										carrierName: "",
									});
								}
							}}
						/>
					</div>

					<div className='mt-3'>
						<span>Name</span>{" "}
						<input
							onChange={(e) => {
								if (!customerDetails) {
									setCustomerDetails({ fullName: e.target.value });
								} else {
									setCustomerDetails({
										...customerDetails,
										fullName: e.target.value,
										address: "",
										state: "",
										city: "",
										cityName: "",
										carrierName: "",
									});
								}
							}}
							type='text'
							style={{
								border: "solid 1px lightgrey",
								padding: "5px 2px",
								marginLeft: "35px",
							}}
							className=' w-25'
							placeholder='Customer Full Name'
						/>
					</div>
					<div className='mt-3'>
						<span>Email</span>{" "}
						<input
							onChange={(e) => {
								if (!customerDetails) {
									setCustomerDetails({ email: e.target.value });
								} else {
									setCustomerDetails({
										...customerDetails,
										email: e.target.value,
										address: "",
										state: "",
										city: "",
										cityName: "",
										carrierName: "",
									});
								}
							}}
							type='text'
							style={{
								border: "solid 1px lightgrey",
								padding: "5px 2px",
								marginLeft: "35px",
							}}
							className=' w-25'
							placeholder='Customer Email Address'
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<NewCustomerModalWrapper>
			<Modal
				width='70%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Submit a new loyal customer`}</div>
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
		</NewCustomerModalWrapper>
	);
};

export default NewCustomerModal;

const NewCustomerModalWrapper = styled.div`
	z-index: 18000 !important;
`;
