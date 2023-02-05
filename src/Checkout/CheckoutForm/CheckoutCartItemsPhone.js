/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getColors } from "../../apiCore";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartContext } from "../cart_context";
import { Link } from "react-router-dom";

const CheckoutCartItemsPhone = ({
	chosenLanguage,
	shippingFee,
	couponApplied,
	appliedCoupon,
}) => {
	// eslint-disable-next-line
	const [relatedProducts, setRelatedProducts] = useState([]);

	// console.log(couponApplied, "appliedCoupon");
	const [allColors, setAllColors] = useState([]);

	const {
		cart,
		toggleAmount,
		// eslint-disable-next-line
		total_amount,
		// eslint-disable-next-line
		shipping_fee,
		changeSize,
		changeColor,
	} = useCartContext();

	const gettingAllColors = () => {
		getColors().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	useEffect(() => {
		if (
			cart &&
			cart[0] &&
			cart[0].relatedProducts &&
			cart[0].relatedProducts.length > 0
		) {
			setRelatedProducts(cart[0].relatedProducts);
		} else if (
			cart &&
			cart[1] &&
			cart[1].relatedProducts &&
			cart[1].relatedProducts.length > 0
		) {
			setRelatedProducts(cart[1].relatedProducts);
		} else {
			setRelatedProducts([]);
		}
		gettingAllColors();

		// eslint-disable-next-line
	}, []);

	var checkingAvailability = [];
	return (
		<CheckoutCartItemsPhoneWrapper>
			<div className='cellPhoneLayout'>
				{cart.map((i, k) => {
					var productColors = i.allProductDetailsIncluded.productAttributes.map(
						(iii) => iii.color,
					);
					var uniqueProductColors = [
						...new Map(productColors.map((item) => [item, item])).values(),
					];

					var productSizes = i.allProductDetailsIncluded.productAttributes.map(
						(iii) => iii.size,
					);
					var uniqueProductSizes = [
						...new Map(productSizes.map((item) => [item, item])).values(),
					];

					var chosenAttribute =
						i.allProductDetailsIncluded.productAttributes.filter(
							(iii) => iii.color === i.color && iii.size === i.size,
						)[0];

					if (i.allProductDetailsIncluded.activeBackorder) {
						checkingAvailability.push(true);
					} else {
						checkingAvailability.push(chosenAttribute.quantity >= i.amount);
					}

					const increase = () => {
						toggleAmount(i.id, "inc", chosenAttribute, i.max);
					};
					const decrease = () => {
						toggleAmount(i.id, "dec", chosenAttribute, i.max);
					};

					return (
						<div key={k} className='mt-2'>
							<div className='row'>
								<div className='col-2'>
									<span>
										<img
											src={i.image}
											alt={i.name}
											style={{ width: "80px", height: "80px" }}
										/>
									</span>
								</div>
								<div className='col-9 my-auto ml-4'>
									<div
										style={{
											fontSize: "12px",
											fontWeight: "bold",
											marginLeft: "0px",
											textTransform: "uppercase",
										}}>
										{chosenLanguage === "Arabic" ? i.nameArabic : i.name}
									</div>
									<div className='my-2'>
										<span className='mr-1'>Size: </span>
										<select
											style={{
												textTransform: "capitalize",
												minWidth: "40%",
												border: "lightgrey solid 1px",
											}}
											onChange={(e) => {
												var chosenAttribute2 =
													i.allProductDetailsIncluded.productAttributes.filter(
														(iii) =>
															iii.color === i.color &&
															iii.size.toLowerCase() ===
																e.target.value.toLowerCase(),
													)[0];
												changeSize(
													i.id,
													e.target.value,
													i.color,
													chosenAttribute2.quantity,
													i.size,
												);
											}}>
											<option style={{ textTransform: "capitalize" }}>
												{i.size}
											</option>

											{uniqueProductSizes &&
												uniqueProductSizes.map((ss, ii) => {
													return (
														<option key={ii} value={ss}>
															{ss}
														</option>
													);
												})}
										</select>
										<br />
										Color:{" "}
										<select
											style={{
												textTransform: "capitalize",
												minWidth: "40%",
												marginTop: "10px",
												border: "lightgrey solid 1px",
											}}
											onChange={(e) => {
												var chosenColorImageHelper =
													i.allProductDetailsIncluded.productAttributes.filter(
														(iii) => iii.color === e.target.value,
													)[0];

												var chosenColorImage =
													chosenColorImageHelper &&
													chosenColorImageHelper.productImages &&
													chosenColorImageHelper.productImages[0] &&
													chosenColorImageHelper.productImages[0].url;

												var chosenAttribute2 =
													i.allProductDetailsIncluded.productAttributes.filter(
														(iii) =>
															iii.color.toLowerCase() ===
																e.target.value.toLowerCase() &&
															iii.size.toLowerCase() === i.size,
													)[0];
												changeColor(
													i.id,
													e.target.value,
													i.size,
													chosenColorImage,
													chosenAttribute2.quantity,
													i.color,
												);
											}}>
											<option style={{ textTransform: "capitalize" }}>
												{allColors &&
													allColors[
														allColors.map((ii) => ii.hexa).indexOf(i.color)
													] &&
													allColors[
														allColors.map((ii) => ii.hexa).indexOf(i.color)
													].color}
											</option>

											{uniqueProductColors &&
												uniqueProductColors.map((cc, ii) => {
													return (
														<option key={ii} value={cc}>
															{allColors &&
																allColors[
																	allColors.map((ii) => ii.hexa).indexOf(cc)
																] &&
																allColors[
																	allColors.map((ii) => ii.hexa).indexOf(cc)
																].color}
														</option>
													);
												})}
										</select>
									</div>
									<div
										style={{
											fontSize: "0.9rem",
											fontWeight: "bold",
											letterSpacing: "3px",
											color: "goldenrod",
											// marginLeft: "70px",
											marginTop: "10px",
										}}>
										{i.priceAfterDiscount * i.amount} L.E.
									</div>
									<div
										className='buttons-up-down'
										style={{
											fontSize: "12px",
											fontWeight: "bold",
											marginLeft: "15px",
											marginTop: "10px",
											textTransform: "capitalize",
											color: "darkgreen",
										}}>
										<button
											type='button'
											className='amount-btn'
											style={{
												border: "lightgrey solid 1px",
												backgroundColor: "white",
												color: "darkgrey",
												padding: "13px",
											}}
											onClick={decrease}>
											<FaMinus />
										</button>
										<span
											className='amount my-auto mx-auto'
											style={{
												border: "lightgrey solid 1px",
												backgroundColor: "white",
												color: "black",
												padding: "3.3px 14px 3.3px 14px",
											}}>
											{i.amount}
										</span>
										<button
											style={{
												border: "lightgrey solid 1px",
												backgroundColor: "white",
												color: "darkgrey",
												padding: "13px",
											}}
											type='button'
											className='amount-btn'
											onClick={increase}>
											<FaPlus style={{ fontSize: "1.2rem" }} />
										</button>
									</div>
								</div>
							</div>

							<hr />
						</div>
					);
				})}
				<div className='Totals  m-0 p-0 w-100'>
					<div className='row'>
						<div className='col-8'>Subtotal:</div>

						<div className='col-4' style={{ fontWeight: "bold" }}>
							EGP {total_amount}
						</div>

						<div className='col-8'>Shipping Fee:</div>

						<div className='col-4' style={{ fontWeight: "bold" }}>
							EGP {shippingFee}
						</div>

						<div className='col-8'>Trans. Fee (1%):</div>

						<div className='col-4' style={{ fontWeight: "bold" }}>
							EGP {total_amount * 0.01}
						</div>

						{couponApplied ? (
							<>
								<div className='col-8'>Coupon Disc.:</div>

								<div className='col-4' style={{ fontWeight: "bold" }}>
									EGP{" "}
									{(
										(Number(total_amount) * Number(appliedCoupon.discount)) /
										100
									).toFixed(2)}
								</div>
							</>
						) : null}
					</div>
					<hr />
					{couponApplied ? (
						<>
							{appliedCoupon && appliedCoupon.name && appliedCoupon.expiry ? (
								<div className='mt-1'>
									<div className='row'>
										<div className='col-8'>Total </div>

										<div className='col-4'>
											{new Date(appliedCoupon.expiry).setHours(0, 0, 0, 0) >=
											new Date().setHours(0, 0, 0, 0) ? (
												<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
													EGP{" "}
													{Number(
														Number(total_amount) +
															Number(shippingFee) +
															Number(Number(total_amount * 0.01).toFixed(2)) -
															(Number(total_amount) *
																Number(appliedCoupon.discount)) /
																100,
													).toFixed(2)}{" "}
													<div>
														<s
															style={{
																color: "red",
																marginRight: "10px",
																fontSize: "13px",
															}}>
															EGP{" "}
															{Number(total_amount) +
																Number(shippingFee) +
																Number(
																	Number(total_amount * 0.01).toFixed(2),
																)}{" "}
														</s>
													</div>
												</div>
											) : (
												<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
													Total EGP
													{Number(total_amount) +
														Number(shippingFee) +
														Number(Number(total_amount * 0.01).toFixed(2))}{" "}
												</div>
											)}
										</div>
									</div>
								</div>
							) : (
								<div style={{ fontWeight: "bold", fontSize: "1rem" }}>
									Total{" "}
									{Number(total_amount) +
										Number(shippingFee) +
										Number(Number(total_amount * 0.01).toFixed(2))}{" "}
									L.E.{" "}
								</div>
							)}
						</>
					) : (
						<div style={{ fontSize: "1rem" }}>
							<div className='row'>
								<div className='col-8'>Total </div>

								<div className='col-4' style={{ fontWeight: "bolder" }}>
									EGP{" "}
									{Number(total_amount) +
										Number(shippingFee) +
										Number(Number(total_amount * 0.01).toFixed(2))}{" "}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className='link-container my-5'>
					<Link
						to='/our-products'
						className='link-btn btn-primary ml-1 p-2'
						style={{ borderRadius: "10px" }}>
						continue shopping
					</Link>
				</div>
			</div>
		</CheckoutCartItemsPhoneWrapper>
	);
};

export default CheckoutCartItemsPhone;

const CheckoutCartItemsPhoneWrapper = styled.div`
	display: none;

	.cellPhoneLayout {
		display: block;
		.buttons-up-down {
			margin-left: 30px;
			display: grid;
			font-size: 12px;
			width: 100px;
			font-weight: bold;
			justify-items: center;
			grid-template-columns: repeat(4, 1fr);
			align-items: center;
			h2 {
				margin-bottom: 0;
			}
			button {
				background: transparent;
				border-color: transparent;
				cursor: pointer;
				padding: 1rem 0;
				width: 2rem;
				height: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.link-container {
		margin: auto;
		text-align: center;
	}

	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: grey;
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		text-align: center;
		cursor: pointer;
		width: 75% !important;
	}

	.Totals {
		font-size: 1.1rem;
		/* font-weight: bold; */
	}

	@media (max-width: 900px) {
		display: block;

		.Totals {
			font-size: 0.85rem;
			/* font-weight: bold; */
			background: #f5f6fa;
			padding: 20px 5px !important;
			width: 102% !important;
		}
	}
`;
