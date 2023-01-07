/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const ShowOrdersHistory = ({
	Orders,
	modalVisible2,
	setModalVisible2,
	setCollapsed,
	selectedDate,
}) => {
	const mainForm = () => {
		return (
			<div className='row mt-3'>
				<div className='col-1'>Item #</div>
				<div className='col-2'>Image</div>
				<div className='col-2'>Product Name</div>
				<div className='col-2'>Ordered Qty</div>
				<div className='col-3'>Ordered By</div>
				<div className='col-2'>Status</div>
				<div className='col-md-12 mx-auto'>
					<hr />
				</div>
				<>
					{Orders &&
						Orders.map((o, i) =>
							o.map((oo) =>
								oo.map((ooo, iii) => {
									return (
										<React.Fragment key={iii}>
											<>
												<div className='col-1'> {i + 1} </div>

												<div className='col-2'>
													<img
														style={{
															width: "70px",
															height: "60px",
															marginRight: "5px",
														}}
														className='userImage'
														src={ooo.productMainImage}
														alt='product'
													/>
												</div>
												<div className='col-2 text-capitalize'>
													{ooo.productName}
												</div>

												<div className='col-2'>{ooo.OrderedQty}</div>
												<div className='col-3'>{ooo.employeeName}</div>
												{ooo.status === "Cancelled" ? (
													<div
														className='col-2'
														style={{
															color: "darkred",
															fontWeight: "bold",
														}}>
														{ooo.status}
													</div>
												) : ooo.status === "Shipped" ||
												  ooo.status === "Delivered" ? (
													<div
														className='col-2'
														style={{
															color: "darkgreen",
															fontWeight: "bold",
														}}>
														{ooo.status}
													</div>
												) : (
													<div
														className='col-2'
														style={{
															color: "black",
															fontWeight: "bold",
														}}>
														{ooo.status}
													</div>
												)}

												<div className='col-md-12 mx-auto'>
													<hr />
												</div>
											</>
										</React.Fragment>
									);
								}),
							),
						)}
				</>
			</div>
		);
	};

	return (
		<ShowOrdersHistoryWrapper>
			<Modal
				width='90%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Sales Summary For ${new Date(
						selectedDate,
					).toDateString()}`}</div>
				}
				visible={modalVisible2}
				onOk={() => {
					setModalVisible2(false);
					setCollapsed(false);
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setCollapsed(false);
					setModalVisible2(false);
				}}>
				{mainForm()}
			</Modal>
		</ShowOrdersHistoryWrapper>
	);
};

export default ShowOrdersHistory;

const ShowOrdersHistoryWrapper = styled.div`
	z-index: 25000;
	.userImage {
		width: 50px;
		height: 40px;
		margin-right: 5px;
	}
`;
