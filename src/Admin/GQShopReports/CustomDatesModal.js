/** @format */

import React from "react";
import styled from "styled-components";
import { Modal, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";

// import { toast } from "react-toastify";

const CustomDatesModal = ({
	day1,
	setDay1,
	day2,
	setDay2,
	modalVisible,
	setModalVisible,
	setRequiredSKU,
}) => {
	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Date From:
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						setDay2(new Date(date._d) || date._d);
						setRequiredSKU("");
					}}
					// disabledDate={disabledDate}
					max
					size='small'
					showToday={true}
					defaultValue={moment(new Date(day2).toISOString()).utcOffset(120)}
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
				<br />
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Date To:
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						setDay1(new Date(date._d) || date._d);
						setRequiredSKU("");
					}}
					// disabledDate={disabledDate}
					max
					size='small'
					showToday={true}
					defaultValue={moment(new Date(day1).toISOString()).utcOffset(120)}
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
		<CustomDatesModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Select A New Date Range`}</div>
				}
				visible={modalVisible}
				onOk={() => {
					setModalVisible(false);
					setRequiredSKU("");
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
					setRequiredSKU("");
				}}>
				{mainForm()}
			</Modal>
		</CustomDatesModalWrapper>
	);
};

export default CustomDatesModal;

const CustomDatesModalWrapper = styled.div`
	z-index: 18000 !important;
`;
