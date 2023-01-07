/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const FiltersModal = ({
	setSelectedFilter,
	selectedFilter,
	setModalVisible,
	modalVisible,
}) => {
	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<div className='col-md-6 mx-auto'>
					<label
						style={{
							fontWeight: "bolder",
							fontSize: "1rem",
							color: "darkred",
						}}>
						Filter By:
					</label>
					<br />
					<select
						onChange={(e) => {
							setSelectedFilter(e.target.value);
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
						<option value='SelectStatus'>Select A Filtering Criteria</option>
						<option value='OnHold'>On Hold</option>
						<option value='InProcessing'>In Processing</option>
						<option value='ReadyToShip'>Ready To Ship</option>
						<option value='Shipped'>Shipped</option>
						<option value='Delivered'>Delivered</option>
						<option value='Return'>Returns</option>
						<option value='Exchanged'>Exchange</option>
						<option value='Cancelled'>Cancelled</option>
					</select>
				</div>
			</div>
		);
	};

	return (
		<FiltersModalWrapper>
			<Modal
				width='65%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
							color: "darkgreen",
						}}>{`Group Filtering`}</div>
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
		</FiltersModalWrapper>
	);
};

export default FiltersModal;

const FiltersModalWrapper = styled.div``;
