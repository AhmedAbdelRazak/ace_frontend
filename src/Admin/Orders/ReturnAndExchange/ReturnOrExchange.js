/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DarkBG from "../../AdminMenu/DarkBG";
import AdminMenu from "../../AdminMenu/AdminMenu";
import Navbar from "../../AdminNavMenu/Navbar";
import {
	getColors,
	getProducts,
	readSingleOrderByInvoice,
	updateOrder,
	updateOrderExchange,
	updateOrderExchangeRevert,
	updateOrderNoDecrease,
} from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import OrderDetails from "./OrderDetails";
import ExchangeModal from "./ExchangeModal";
import { toast } from "react-toastify";
import ReturnModal from "./ReturnModal";

const ReturnOrExchange = () => {
	// eslint-disable-next-line
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
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

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll, { passive: true });
		if (window.pageYOffset > 0) {
			setPageScrolled(true);
		} else {
			setPageScrolled(false);
		}
		return () => window.removeEventListener("scroll", onScroll);
	}, [offset]);

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
				setAllProducts(
					data.map((i) => {
						return {
							...i,
							orderedQuantity: 1,
						};
					}),
				);
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
						status: "Exchange - In Processing | In Return (Partial)",
						totalAmountAfterExchange: totalExchangedAmount(),
				  }
				: {
						...updateSingleOrder,
						totalAmountAfterExchange: totalExchangedAmount(),
				  };
		updateOrderExchange(
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

		if (updateSingleOrder.status === "Returned and Not Refunded (Partial)") {
			updateOrder(updateSingleOrder._id, user._id, token, updateSingleOrder)
				.then((response) => {
					toast.success("Order was successfully updated");
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				})

				.catch((error) => {
					console.log(error);
				});
		} else {
			updateOrderNoDecrease(
				updateSingleOrder._id,
				user._id,
				token,
				updateSingleOrder,
			)
				.then((response) => {
					toast.success("Order was successfully updated");
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				})

				.catch((error) => {
					console.log(error);
				});
		}
	};

	const UpdatingOrderReturnExchange = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const singleOrderModified =
			updateSingleOrder.exchangedProductQtyWithVariables &&
			updateSingleOrder.exchangedProductQtyWithVariables.length > 0 &&
			updateSingleOrder.returnedItems &&
			updateSingleOrder.returnedItems.length > 0
				? {
						...updateSingleOrder,
						status: "Exchange - In Processing | In Return (Partial)",
						totalAmountAfterExchange: totalExchangedAmount(),
				  }
				: {
						...updateSingleOrder,
						totalAmountAfterExchange: totalExchangedAmount(),
				  };
		updateOrderExchange(
			updateSingleOrder._id,
			user._id,
			token,
			singleOrderModified,
		)
			.then((response) => {
				toast.success("Order was successfully updated");
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			})

			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<ReturnOrExchangeWrapper show={collapsed}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='ReturnOrExchange'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='navbarcontent'>
					<Navbar
						fromPage='ReturnOrExchange'
						pageScrolled={pageScrolled}
						collapsed={collapsed}
					/>

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
						setCollapsed={setCollapsed}
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
						setCollapsed={setCollapsed}
						returnDate={returnDate}
						setReturnDate={setReturnDate}
						returnStatus={returnStatus}
						setReturnStatus={setReturnStatus}
						returnedItems={returnedItems}
						setReturnedItems={setReturnedItems}
						returnFullOrder={returnFullOrder}
						setReturnFullOrder={setReturnFullOrder}
					/>

					<div className='mt-5 mx-auto text-center'>
						<div>
							<label
								className='mt-3 mx-3'
								style={{
									fontWeight: "bold",
									fontSize: "1.05rem",
									// color: "black",
									// borderRadius: "10px",
								}}>
								Please Fill In an INV #
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
						singleOrder.status ===
							"Exchange And Return Processed And Stocked" ||
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
											setCollapsed={setCollapsed}
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
								updateSingleOrder.exchangedProductQtyWithVariables.length ===
									0 &&
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
				</div>
			</div>
		</ReturnOrExchangeWrapper>
	);
};

export default ReturnOrExchange;

const ReturnOrExchangeWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 10px;
	/* background: #fafafa; */
	overflow-x: hidden;

	.grid-container {
		display: grid;
		/* grid-template-columns: 16% 84%; */
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15% 85%"};

		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.navbarcontent > nav > ul {
		list-style-type: none;
		background: white;
	}

	.navbarcontent > div > ul > li {
		background: white;
		font-size: 0.8rem;
		font-weight: bolder !important;
		color: #545454;
	}
	@media (max-width: 1750px) {
		/* background: white; */

		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 1400px) {
		/* background: white; */

		.grid-container {
			display: grid;
			grid-template-columns: 8% 92%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}

		.storeSummaryFilters {
			position: "";
			width: "";
		}
	}

	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 16% 84%; */
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "18% 82%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}
`;
