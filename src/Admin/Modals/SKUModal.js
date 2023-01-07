/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const SKUModal = ({
	allOrders,
	setAllOrders,
	modalVisible2,
	setModalVisible2,
	setRequiredSKU,
	requiredSKU,
}) => {
	const handleChangeSKU = (e) => {
		setRequiredSKU(e.target.value);
	};

	const mainForm = () => {
		return (
			<div className='mx-auto text-center mx-auto'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Pick Your Desired SKU
				</label>
				<br />
				<input
					onChange={handleChangeSKU}
					type='text'
					className='form-control w-50 mx-auto'
					value={requiredSKU}
					placeholder='Search for SKU'
				/>
			</div>
		);
	};

	return (
		<SKUModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Select A Specific SKU`}</div>
				}
				visible={modalVisible2}
				onOk={() => {
					setModalVisible2(false);
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible2(false);
				}}>
				{mainForm()}
			</Modal>
		</SKUModalWrapper>
	);
};

export default SKUModal;

const SKUModalWrapper = styled.div`
	z-index: 18000 !important;
`;
