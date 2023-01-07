/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Select } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// import { updateOrder } from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import { getColors } from "../../apiAdmin";
// import { toast } from "react-toastify";
const { Option } = Select;

// import { toast } from "react-toastify";

const ExchangeModal = ({
	updateSingleOrder,
	setUpdateSingleOrder,
	modalVisible,
	setModalVisible,
	setCollapsed,
	allProducts,
	chosenProductQtyWithVariables,
	setChosenProductQtyWithVariables,
	previousProductVariable,
	exchangeTrackingNumber,
	setExchangeTrackingNumber,
}) => {
	const [chosenProduct, setChosenProduct] = useState({});
	const [chosenProductVariables, setChosenProductVariables] = useState({});
	const [pickedQuantity, setPickedQuantity] = useState(0);
	const [pickedPrice, setPickedPrice] = useState(0);
	const [allColors, setAllColors] = useState([]);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	// console.log(updateSingleOrder, "updateSingleOrder");
	// console.log(chosenProductQtyWithVariables, "chosenProductQtyWithVariables");
	// console.log(chosenProduct, "chosenProduct");

	const gettingAllColors = () => {
		getColors(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		// eslint-disable-next-line
	}, []);

	const mainForm = () => {
		return (
			<div className='mx-auto text-center'>
				<html>
					<head>
						<title>Chapter 1</title>
					</head>
					<body></body>
				</html>
				{allProducts && allProducts.length > 0 && (
					<div className='form-group mx-auto'>
						<label>Choose Product</label>
						<br />
						<Select
							style={{
								color: "black",
								textTransform: "capitalize",
								width: "80%",
							}}
							placeholder='Please Select a product'
							value={chosenProduct.productName}
							onChange={(value) => {
								setChosenProduct(allProducts.filter((i) => i._id === value)[0]);
							}}>
							{allProducts &&
								allProducts.map((p, i) => {
									return (
										<Option key={i} value={p._id}>
											{p.productName}
										</Option>
									);
								})}
						</Select>
					</div>
				)}

				{chosenProduct &&
					chosenProduct.productAttributes &&
					chosenProduct.productAttributes.length > 0 && (
						<div className='form-group mx-auto'>
							<label>Choose Attribute </label>{" "}
							{chosenProductVariables ? (
								<span style={{ color: "black", textTransform: "capitalize" }}>
									{allColors[
										allColors
											.map((i) => i.hexa)
											.indexOf(chosenProductVariables.color)
									]
										? allColors[
												allColors
													.map((i) => i.hexa)
													.indexOf(chosenProductVariables.color)
										  ].color
										: chosenProductVariables.color}
									{" | "}
									{chosenProductVariables.size}
									{" | "}
									<strong>
										Stock Onhand: {chosenProductVariables.quantity}
									</strong>
								</span>
							) : null}
							<br />
							<Select
								style={{ width: "80%" }}
								placeholder='Please Select a product'
								value={chosenProductVariables.SubSKU}
								onChange={(value) => {
									setChosenProductVariables(
										chosenProduct.productAttributes.filter(
											(i) => i._id === value,
										)[0],
									);

									setChosenProductQtyWithVariables(
										chosenProduct.productAttributes
											.filter((i) => i._id === value)
											.map((ii) => {
												return {
													...ii,
													productId: chosenProduct._id,
													productName: chosenProduct.productName,
													productMainImage: chosenProduct.thumbnailImage[0]
														.images[0]
														? chosenProduct.thumbnailImage[0].images[0].url
														: null,
													exchangedProduct: previousProductVariable,
												};
											})[0],
									);
								}}>
								{chosenProduct &&
									chosenProduct.productAttributes.map((att, ii) => {
										return (
											<Option value={att._id} key={ii}>
												{att.SubSKU}
												{" | "}{" "}
												<span style={{ color: "black" }}>
													{allColors[
														allColors.map((i) => i.hexa).indexOf(att.color)
													]
														? allColors[
																allColors.map((i) => i.hexa).indexOf(att.color)
														  ].color
														: att.color}
												</span>
												{" | "}
												{att.size}
												{" | "}
												<strong>Stock Onhand: {att.quantity}</strong>
											</Option>
										);
									})}
							</Select>
						</div>
					)}
				{chosenProduct &&
					chosenProduct.productAttributes &&
					chosenProduct.productAttributes.length > 0 &&
					chosenProductVariables && (
						<div className='form-group mx-auto col-md-10 '>
							<label className=''>Adjust Quantity</label>
							<input
								style={{ textAlign: "center" }}
								onChange={(e) => {
									setPickedQuantity(e.target.value);
									setChosenProductQtyWithVariables({
										...chosenProductQtyWithVariables,
										OrderedQty: e.target.value,
									});
								}}
								type='number'
								className='form-control'
								value={pickedQuantity}
								placeholder='Required - Product Quantity'
							/>
						</div>
					)}

				{chosenProduct &&
					chosenProduct.productAttributes &&
					chosenProduct.productAttributes.length > 0 &&
					chosenProductVariables && (
						<div className='form-group mx-auto col-md-10 '>
							<label className=''>Add Required Price</label>
							<input
								style={{ textAlign: "center" }}
								onChange={(e) => {
									setPickedPrice(e.target.value);
									setChosenProductQtyWithVariables({
										...chosenProductQtyWithVariables,
										pickedPrice: e.target.value,
									});
								}}
								type='number'
								className='form-control'
								value={pickedPrice}
								placeholder='Required - Product Price'
							/>
						</div>
					)}

				{chosenProduct &&
					chosenProduct.productAttributes &&
					chosenProduct.productAttributes.length > 0 &&
					chosenProductVariables && (
						<div className='form-group mx-auto col-md-10 '>
							<label className=''>Exchange Tracking Number</label>
							<input
								style={{ textAlign: "center" }}
								onChange={(e) => {
									setExchangeTrackingNumber(e.target.value);
								}}
								type='text'
								className='form-control'
								value={exchangeTrackingNumber}
								placeholder='Shipping/ Tracking Number For Exchange'
							/>
						</div>
					)}

				<div className='col-md-5 mx-auto'>
					<button
						className='btn btn-primary btn-block'
						onClick={() => {
							setUpdateSingleOrder({
								...updateSingleOrder,
								status: "Exchange - In Processing",
								exchangeTrackingNumber: exchangeTrackingNumber,
								exchangedProductQtyWithVariables: [
									...updateSingleOrder.exchangedProductQtyWithVariables,
									{
										...chosenProductQtyWithVariables,
									},
								],
							});

							setChosenProduct([]);
							setChosenProductQtyWithVariables({});
							setPickedQuantity(0);
							setPickedPrice(0);
							setModalVisible(false);
							setExchangeTrackingNumber("");
						}}>
						Submit Changes
					</button>
				</div>
			</div>
		);
	};

	return (
		<ExchangeModalWrapper>
			<Modal
				width='70%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Order Exchange`}</div>
				}
				visible={modalVisible}
				onOk={() => {
					setModalVisible(false);
					setCollapsed(false);
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setCollapsed(true);
					setModalVisible(false);
				}}>
				{mainForm()}
			</Modal>
		</ExchangeModalWrapper>
	);
};

export default ExchangeModal;

const ExchangeModalWrapper = styled.div`
	z-index: 20002 !important;
`;
