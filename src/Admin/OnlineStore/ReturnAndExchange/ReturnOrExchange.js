/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	getColors,
	getProducts,
	getReceivingLogs,
	readSingleOrderByInvoice,
	receiveNew,
	updateOrderExchangeOfflineStore,
	updateOrderExchangeRevert,
} from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import OrderDetails from "./OrderDetails";
import ExchangeModal from "./ExchangeModal";
import { toast } from "react-toastify";
import ReturnModal from "./ReturnModal";
import LogoImage from "../../../GeneralImages/Logo2.png";
import { Link } from "react-router-dom";

const ReturnOrExchangeOfflineStore = () => {
	const [addedInvoiceNumber, setAddedInvoiceNumber] = useState("");
	const [singleOrder, setSingleOrder] = useState("");
	const [updateSingleOrder, setUpdateSingleOrder] = useState("");
	const [allColors, setAllColors] = useState("");
	const [exchangeTrackingNumber, setExchangeTrackingNumber] = useState("");
	const [chosenProductQtyWithVariables, setChosenProductQtyWithVariables] =
		useState({});
	const [allProducts, setAllProducts] = useState([]);
	const [previousProductVariable, setPreviousProductVariable] = useState({});
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [returnDate, setReturnDate] = useState(new Date().toLocaleString());
	const [returnStatus, setReturnStatus] = useState(false);
	const [returnedItems, setReturnedItems] = useState([]);
	const [returnFullOrder, setReturnFullOrder] = useState("");
	const [pickedPrice, setPickedPrice] = useState("");

	const { user, token } = isAuthenticated();

	const gettingAllColors = () => {
		setLoading(true);
		getColors(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
				setLoading(false);
			}
		});
	};

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				getReceivingLogs().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var allAceReceiving = data2;

						//aggregating receiving

						var totalQuantityAggregated = [];
						allAceReceiving &&
							allAceReceiving.reduce(function (res, value) {
								if (!res[value.receivedSKU]) {
									res[value.receivedSKU] = {
										SubSKU: value.receivedSKU,
										totalQuantity: 0,
									};
									totalQuantityAggregated.push(res[value.receivedSKU]);
								}
								res[value.receivedSKU].totalQuantity += Number(
									value.receivedQuantity,
								);
								return res;
							}, {});

						var allAceProducts = data.filter(
							(i) =>
								i.activeProduct === true && i.storeName.storeName === "ace",
						);

						var allAceProductAttributesModified = allAceProducts.map((i) => {
							return {
								...i,
								productAttributes: i.productAttributes.map((ii) => {
									return {
										...ii,
										OrderedQty: 1,
										quantity:
											totalQuantityAggregated
												.map((iii) => iii.SubSKU.toLowerCase())
												.indexOf(ii.SubSKU.toLowerCase()) > -1
												? totalQuantityAggregated[
														totalQuantityAggregated
															.map((iii) => iii.SubSKU.toLowerCase())
															.indexOf(ii.SubSKU.toLowerCase())
												  ].totalQuantity
												: 0,
									};
								}),
							};
						});

						setAllProducts(allAceProductAttributesModified);
					}
				});
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		gettingAllProducts();
		// eslint-disable-next-line
	}, []);

	function sum_array(arr) {
		// store our final answer
		var sum = 0;

		// loop through entire array
		for (var i = 0; i < arr.length; i++) {
			// loop through each inner array
			for (var j = 0; j < arr[i].length; j++) {
				// add this number to the current final sum
				sum += arr[i][j];
			}
		}

		return sum;
	}

	const totalExchangedQty = () => {
		var habalFelGabal =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.map(
				(i) => i.exchangedProduct.SubSKU,
			);

		var unExchangedVariables =
			updateSingleOrder &&
			updateSingleOrder.chosenProductQtyWithVariables &&
			updateSingleOrder.chosenProductQtyWithVariables.map((i) =>
				i.filter(
					(ii) => habalFelGabal && habalFelGabal.indexOf(ii.SubSKU) === -1,
				),
			);

		var QtyWithVariables = unExchangedVariables.map((iii) =>
			iii.map((iiii) => Number(iiii.OrderedQty)),
		);

		var exchangedQty = updateSingleOrder.exchangedProductQtyWithVariables
			.map((i) => Number(i.OrderedQty))
			.reduce((a, b) => a + b, 0);

		return Number(exchangedQty) + Number(sum_array(QtyWithVariables));
	};

	const totalExchangedAmount = () => {
		var habalFelGabal =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.map(
				(i) => i.exchangedProduct.SubSKU,
			);

		var unExchangedVariables =
			updateSingleOrder &&
			updateSingleOrder.chosenProductQtyWithVariables &&
			updateSingleOrder.chosenProductQtyWithVariables.map((i) =>
				i.filter(
					(ii) => habalFelGabal && habalFelGabal.indexOf(ii.SubSKU) === -1,
				),
			);

		var QtyWithVariablesTotalAmount = unExchangedVariables.map((iii) =>
			iii.map((iiii) => Number(iiii.pickedPrice) * Number(iiii.OrderedQty)),
		);

		var exchangedAmount = updateSingleOrder.freeShipping
			? updateSingleOrder.exchangedProductQtyWithVariables
					.map((i) => Number(i.OrderedQty) * Number(i.pickedPrice))
					.reduce((a, b) => a + b, 0) + Number(pickedPrice)
			: updateSingleOrder.exchangedProductQtyWithVariables
					.map((i) => Number(i.OrderedQty) * Number(i.pickedPrice))
					.reduce((a, b) => a + b, 0) +
			  updateSingleOrder.shippingFees +
			  Number(pickedPrice);

		return Number(
			Number(exchangedAmount) + Number(sum_array(QtyWithVariablesTotalAmount)),
		).toFixed(2);
	};

	const UpdatingOrder = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const singleOrderModified =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.length > 0 &&
			updateSingleOrder.returnedItems &&
			updateSingleOrder.returnedItems.length > 0
				? {
						...updateSingleOrder,
						status: "Exchange And Return Processed And Stocked",
						totalAmountAfterExchange: totalExchangedAmount(),
				  }
				: {
						...updateSingleOrder,
						totalAmountAfterExchange: totalExchangedAmount(),
						status: "Exchanged - Stocked",
				  };
		updateOrderExchangeOfflineStore(
			updateSingleOrder._id,
			user._id,
			token,
			singleOrderModified,
		)
			.then((response) => {
				toast.success("Order was successfully exchanged");

				if (
					updateSingleOrder.exchangedProductQtyWithVariables &&
					updateSingleOrder.exchangedProductQtyWithVariables.length > 0
				) {
					// eslint-disable-next-line
					updateSingleOrder.exchangedProductQtyWithVariables.map((i) => {
						receiveNew(user._id, token, {
							productName: i.productName,
							productId: i.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "san stefano",
							receivedSKU: i.SubSKU,
							receivedQuantity: i.OrderedQty * -1,
							receivingCase: "outbound exchange",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("Outbounded");
							}
						});

						receiveNew(user._id, token, {
							productName: i.exchangedProduct.productName,
							productId: i.exchangedProduct.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "san stefano",
							receivedSKU: i.exchangedProduct.SubSKU,
							receivedQuantity: i.exchangedProduct.OrderedQty,
							receivingCase: "inbound exchange",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("exchanged");
							}
						});
					});
				}

				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	const UpdatingOrderRevert = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const singleOrderModified = {
			...updateSingleOrder,
			totalAmountAfterExchange: totalExchangedAmount(),
		};

		updateOrderExchangeRevert(
			updateSingleOrder._id,
			user._id,
			token,
			singleOrderModified,
		)
			.then((response) => {
				toast.success("Order was successfully exchanged");
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	const UpdatingOrderReturn = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		updateOrderExchangeOfflineStore(
			updateSingleOrder._id,
			user._id,
			token,
			updateSingleOrder,
		)
			.then((response) => {
				toast.success("Order was successfully Returned");

				if (
					updateSingleOrder.returnedItems &&
					updateSingleOrder.returnedItems.length > 0
				) {
					// eslint-disable-next-line
					updateSingleOrder.returnedItems.map((i) => {
						receiveNew(user._id, token, {
							productName: i.productName,
							productId: i.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "San Stefano",
							receivedSKU: i.SubSKU,
							receivedQuantity: i.OrderedQty,
							receivingCase: "Inbound Return",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("Inbound Return");
							}
						});
					});
				}

				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	const UpdatingOrderReturnExchange = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const singleOrderModified =
			updateSingleOrder &&
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.length > 0 &&
			updateSingleOrder.returnedItems &&
			updateSingleOrder.returnedItems.length > 0
				? {
						...updateSingleOrder,
						status: "Exchange And Return Processed And Stocked",
						totalAmountAfterExchange: totalExchangedAmount(),
				  }
				: {
						...updateSingleOrder,
						totalAmountAfterExchange: totalExchangedAmount(),
						status: "Exchanged - Stocked",
				  };
		updateOrderExchangeOfflineStore(
			updateSingleOrder._id,
			user._id,
			token,
			singleOrderModified,
		)
			.then((response) => {
				toast.success("Order was successfully exchanged");

				if (
					updateSingleOrder.exchangedProductQtyWithVariables &&
					updateSingleOrder.exchangedProductQtyWithVariables.length > 0
				) {
					// eslint-disable-next-line
					updateSingleOrder.exchangedProductQtyWithVariables.map((i) => {
						receiveNew(user._id, token, {
							productName: i.productName,
							productId: i.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "san stefano",
							receivedSKU: i.SubSKU,
							receivedQuantity: i.OrderedQty * -1,
							receivingCase: "outbound exchange",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("Outbounded");
							}
						});

						receiveNew(user._id, token, {
							productName: i.exchangedProduct.productName,
							productId: i.exchangedProduct.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "san stefano",
							receivedSKU: i.exchangedProduct.SubSKU,
							receivedQuantity: i.exchangedProduct.OrderedQty,
							receivingCase: "inbound exchange",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("exchanged");
							}
						});
					});
				}

				if (
					updateSingleOrder.returnedItems &&
					updateSingleOrder.returnedItems.length > 0
				) {
					// eslint-disable-next-line
					updateSingleOrder.returnedItems.map((i) => {
						receiveNew(user._id, token, {
							productName: i.productName,
							productId: i.productId,
							receivedByEmployee: user,
							storeName: user.userStore,
							storeBranch: user.userBranch ? user.userBranch : "San Stefano",
							receivedSKU: i.SubSKU,
							receivedQuantity: i.OrderedQty,
							receivingCase: "Inbound Return",
						}).then((data) => {
							if (data.error) {
								setTimeout(function () {
									// window.location.reload(false);
								}, 1000);
							} else {
								console.log("Inbound Return");
							}
						});
					});
				}

				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<ReturnOrExchangeOfflineStoreWrapper>
			<div style={{ padding: "30px 0px", background: "rgb(198,14,14)" }}>
				<img
					className='imgLogo2'
					src={LogoImage}
					alt='Infinite Apps'
					style={{
						width: "80px",
						position: "absolute",
						top: "10px",
						padding: "0px",
						left: "20px",
						background: "#c60e0e",
						border: "#c60e0e solid 1px",
					}}
				/>
				<span
					style={{
						fontSize: "1.2rem",
						marginLeft: "42%",
						color: "white",
						position: "absolute",
						top: "15px",
					}}>
					ACE STORE (Branch: {user && user.userBranch})
				</span>
			</div>

			<div
				style={{
					fontSize: "1.1rem",
					fontWeight: "bolder",
					letterSpacing: "2px",
					textAlign: "right",
					marginTop: "20px",
					marginRight: "40px",
					textDecoration: "underline",
				}}>
				<Link
					to='/admin/offline-order-taking'
					style={{
						fontSize: "1.1rem",
						fontWeight: "bolder",
						letterSpacing: "2px",
						textAlign: "right",
					}}>
					Back to POS
				</Link>
			</div>
			<div className='text-center mt-3'>
				<h3
					style={{
						marginTop: "20px",
						textAlign: "center",
						fontSize: "1.3rem",
						fontWeight: "bolder",
						letterSpacing: "2px",
					}}>
					RETURN OR EXCHANGE
				</h3>
			</div>
			<ExchangeModal
				allProducts={allProducts}
				updateSingleOrder={updateSingleOrder}
				setUpdateSingleOrder={setUpdateSingleOrder}
				chosenProductQtyWithVariables={chosenProductQtyWithVariables}
				setChosenProductQtyWithVariables={setChosenProductQtyWithVariables}
				totalExchangedAmount={totalExchangedAmount}
				totalExchangedQty={totalExchangedQty}
				previousProductVariable={previousProductVariable}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				exchangeTrackingNumber={exchangeTrackingNumber}
				setExchangeTrackingNumber={setExchangeTrackingNumber}
				modalVisible2={modalVisible2}
				setModalVisible2={setModalVisible2}
				pickedPrice={pickedPrice}
				setPickedPrice={setPickedPrice}
			/>

			<ReturnModal
				updateSingleOrder={updateSingleOrder}
				setUpdateSingleOrder={setUpdateSingleOrder}
				modalVisible2={modalVisible2}
				setModalVisible2={setModalVisible2}
				returnDate={returnDate}
				setReturnDate={setReturnDate}
				returnStatus={returnStatus}
				setReturnStatus={setReturnStatus}
				returnedItems={returnedItems}
				setReturnedItems={setReturnedItems}
				returnFullOrder={returnFullOrder}
				setReturnFullOrder={setReturnFullOrder}
			/>

			<div className='mt-2 mx-auto text-center'>
				<div>
					<label
						className='mt-3 mx-3'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							// color: "black",
							// borderRadius: "10px",
						}}>
						Please Scan/ Fill In an INV #
					</label>
					<br />
					<input
						className='p-2 '
						type='text'
						value={addedInvoiceNumber}
						onChange={(e) => {
							setAddedInvoiceNumber(e.target.value);
						}}
						placeholder='Invoice Number (e.g. INV01120012311)'
						style={{
							borderRadius: "5px",
							width: "50%",
							border: "1px solid lightgrey",
						}}
					/>
					<br />
					{addedInvoiceNumber.length >= 8 ? (
						<button
							className='btn btn-outline-info my-3'
							onClick={() => {
								setLoading(true);
								readSingleOrderByInvoice(
									user._id,
									token,
									addedInvoiceNumber,
								).then((data) => {
									if (data.error) {
										console.log(data.error);
									} else {
										setSingleOrder(data[0]);
										setUpdateSingleOrder(data[0]);

										setLoading(false);
									}
								});
							}}>
							Show Details
						</button>
					) : null}
				</div>
			</div>
			<>
				{singleOrder.status === "In Processing" ||
				singleOrder.status === "Ready To Ship" ||
				singleOrder.status === "Returned and Refunded" ||
				singleOrder.status === "Returned and Not Refunded" ||
				singleOrder.status === "Returned and Refunded (Partial)" ||
				singleOrder.status === "Returned and Not Refunded (Partial)" ||
				singleOrder.status === "Exchange - Shipped" ||
				singleOrder.status === "Exchange - Delivered" ||
				singleOrder.status === "Exchange And Return Processed And Stocked" ||
				singleOrder.status === "Exchanged - Stocked" ? (
					<>
						<div className='text-center mt-4'>
							<h5>Sorry, This order couldn't be Returned Or Exchanged</h5>
							<div>Current Order Status: {singleOrder.status}</div>
						</div>
					</>
				) : (
					<>
						{singleOrder &&
						updateSingleOrder &&
						!loading &&
						allColors.length > 0 ? (
							<div className='my-3 mx-auto'>
								<h5 className='text-center mb-3'>
									Order Details For Invoice {singleOrder.invoiceNumber}{" "}
								</h5>
								<OrderDetails
									singleOrder={singleOrder}
									updateSingleOrder={updateSingleOrder}
									allColors={allColors}
									setModalVisible={setModalVisible}
									setChosenProductQtyWithVariables={
										setChosenProductQtyWithVariables
									}
									setPreviousProductVariable={setPreviousProductVariable}
									totalExchangedAmount={totalExchangedAmount}
									totalExchangedQty={totalExchangedQty}
									setModalVisible2={setModalVisible2}
									returnedItems={returnedItems}
									setReturnedItems={setReturnedItems}
									returnFullOrder={returnFullOrder}
									setReturnFullOrder={setReturnFullOrder}
								/>
							</div>
						) : null}

						{updateSingleOrder &&
						updateSingleOrder.exchangedProductQtyWithVariables &&
						updateSingleOrder.exchangedProductQtyWithVariables.length > 0 &&
						singleOrder &&
						singleOrder.exchangedProductQtyWithVariables &&
						singleOrder.exchangedProductQtyWithVariables.length === 0 &&
						updateSingleOrder.returnedItems &&
						updateSingleOrder.returnedItems.length === 0 &&
						singleOrder.returnedItems &&
						singleOrder.returnedItems.length === 0 ? (
							<div className='col-md-5 mx-auto text-center my-5'>
								<button
									className='btn btn-success btn-block mb-3 mx-auto text-center'
									onClick={UpdatingOrder}>
									Exchange Order
								</button>
							</div>
						) : null}

						{(singleOrder &&
							singleOrder.exchangedProductQtyWithVariables &&
							singleOrder.exchangedProductQtyWithVariables.length > 0) ||
						(singleOrder.returnedItems &&
							singleOrder.returnedItems.length > 0) ? (
							<div className='col-md-5 mx-auto text-center my-5'>
								<button
									className='btn btn-danger btn-block mb-3 mx-auto text-center'
									onClick={UpdatingOrderRevert}>
									Revert This Order To It's Original Status
								</button>
							</div>
						) : null}

						{updateSingleOrder &&
						updateSingleOrder.exchangedProductQtyWithVariables &&
						updateSingleOrder.exchangedProductQtyWithVariables.length === 0 &&
						singleOrder &&
						singleOrder.exchangedProductQtyWithVariables &&
						singleOrder.exchangedProductQtyWithVariables.length === 0 &&
						updateSingleOrder &&
						updateSingleOrder.returnedItems &&
						updateSingleOrder.returnedItems.length > 0 &&
						singleOrder &&
						singleOrder.returnedItems &&
						singleOrder.returnedItems.length === 0 ? (
							<div className='col-md-5 mx-auto text-center my-5'>
								<button
									className='btn btn-success btn-block mb-3 mx-auto text-center'
									onClick={UpdatingOrderReturn}>
									Update Order Return
								</button>
							</div>
						) : null}

						{updateSingleOrder &&
						updateSingleOrder.exchangedProductQtyWithVariables &&
						updateSingleOrder.exchangedProductQtyWithVariables.length > 0 &&
						singleOrder &&
						singleOrder.exchangedProductQtyWithVariables &&
						singleOrder.exchangedProductQtyWithVariables.length === 0 &&
						updateSingleOrder &&
						updateSingleOrder.returnedItems &&
						updateSingleOrder.returnedItems.length > 0 &&
						singleOrder &&
						singleOrder.returnedItems &&
						singleOrder.returnedItems.length === 0 ? (
							<div className='col-md-5 mx-auto text-center my-5'>
								<button
									className='btn btn-success btn-block mb-3 mx-auto text-center'
									onClick={UpdatingOrderReturnExchange}>
									Update Order Return | Exchange
								</button>
							</div>
						) : null}
					</>
				)}
			</>
		</ReturnOrExchangeOfflineStoreWrapper>
	);
};

export default ReturnOrExchangeOfflineStore;

const ReturnOrExchangeOfflineStoreWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 100px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
		margin: auto;
	}

	.productsOnRight {
		padding: 0px;

		.grid-container2 {
			display: grid;
			grid-template-columns: 17% 17% 17% 17% 17% 17%;
			margin: auto;
			padding-left: 2px;
		}
	}

	.grid-container3 {
		display: grid;
		margin: auto;
		grid-template-columns: 25% 25% 25% 25%;
	}
`;
