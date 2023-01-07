/** @format */

import React from "react";
import styled from "styled-components";
import { Modal, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";

// import { toast } from "react-toastify";

const EditDateModal = ({
	selectedDate,
	setSelectedDate,
	modalVisible,
	setModalVisible,
	setCollapsed,
}) => {
	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Pick Your Desired Date
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						setSelectedDate(new Date(date._d).toLocaleDateString() || date._d);
					}}
					// disabledDate={disabledDate}
					max
					size='small'
					showToday={true}
					defaultValue={moment(new Date(selectedDate))}
					placeholder='Please pick the desired schedule date'
					style={{
						height: "auto",
						width: "50%",
						marginLeft: "5px",
						padding: "10px",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						borderRadius: "10px",
					}}
				/>
			</div>
		);
	};

	return (
		<EditDateModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Select A New Date`}</div>
				}
				visible={modalVisible}
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
		</EditDateModalWrapper>
	);
};

export default EditDateModal;

const EditDateModalWrapper = styled.div`
	z-index: 18000 !important;
`;
