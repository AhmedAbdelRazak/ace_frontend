/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const EditPrice = ({
	clickedChosenProductQty,
	setChosenProductQty,
	chosenProductQty,
	modalVisible2,
	setModalVisible2,
	setCollapsed,
}) => {
	const handlePriceChange = (e, p) => {
		const habal = chosenProductQty
			.map((i) =>
				i.filter(
					(ii) => ii.productId === p.productId && ii.SubSKU === p.SubSKU,
				),
			)
			.filter((ix) => ix.length > 0)[0][0];

		chosenProductQty
			.map((i) =>
				i.filter(
					(ii) => ii.productId === p.productId && ii.SubSKU === p.SubSKU,
				),
			)
			.filter((ix) => ix.length > 0)[0][0].pickedPrice = e.target.value;
		setChosenProductQty([...chosenProductQty]);

		console.log(habal, "habal");
	};

	console.log(clickedChosenProductQty, "clickedChosenProductQty");
	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
					Please Choose a specific Price
				</label>
				<br />
				<select
					onChange={(e) => handlePriceChange(e, clickedChosenProductQty)}
					placeholder='Select a Ticket'
					className=' mb-3 col-md-10 mx-auto my-1'
					style={{
						paddingTop: "12px",
						paddingBottom: "12px",
						// paddingRight: "50px",
						// textAlign: "center",
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						fontSize: "0.9rem",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						textTransform: "capitalize",
					}}>
					<option value='Choose Price'>Please Choose Specific Price</option>
					<option value={clickedChosenProductQty.SubSKUMSRP}>
						Manufacturing Price: {clickedChosenProductQty.SubSKUMSRP} L.E.
					</option>
					<option value={clickedChosenProductQty.SubSKURetailerPrice}>
						Retailer Price: {clickedChosenProductQty.SubSKURetailerPrice} L.E.
					</option>
					<option value={clickedChosenProductQty.SubSKUWholeSalePrice}>
						Whole Sale Price: {clickedChosenProductQty.SubSKUWholeSalePrice}{" "}
						L.E.
					</option>
					<option value={clickedChosenProductQty.SubSKUDropshippingPrice}>
						Dropshipping Price:{" "}
						{clickedChosenProductQty.SubSKUDropshippingPrice} L.E.
					</option>
					<option value={clickedChosenProductQty.SubSKUPriceAfterDiscount}>
						After Discount: {clickedChosenProductQty.SubSKUPriceAfterDiscount}{" "}
						L.E.
					</option>
					<option value='0'>For Free: 0 L.E.</option>
				</select>
				<br />
			</div>
		);
	};

	return (
		<EditPriceWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Here are all available prices....`}</div>
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
		</EditPriceWrapper>
	);
};

export default EditPrice;

const EditPriceWrapper = styled.div``;
