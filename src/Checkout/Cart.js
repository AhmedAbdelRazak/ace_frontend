/** @format */
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useCartContext } from "./cart_context";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { isAuthenticated } from "../auth/index";
import { allLoyaltyPointsAndStoreStatus, getColors } from "../apiCore";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { Helmet } from "react-helmet";
// import Slider from "react-slick";
// import CardForRelatedProducts from "../SingleProduct/CardForRelatedProducts";

const Cart = ({ chosenLanguage }) => {
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [
		// eslint-disable-next-line
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);
	const [allColors, setAllColors] = useState([]);

	const {
		cart,
		// eslint-disable-next-line
		clearCart,
		removeItem,
		toggleAmount,
		// eslint-disable-next-line
		total_amount,
		// eslint-disable-next-line
		shipping_fee,
		changeSize,
		changeColor,
	} = useCartContext();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

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
		gettingPreviousLoyaltyPointsManagement();
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

	const CartItem = (i, id, image, name, price, amount, nameArabic) => {
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

		var chosenAttribute = i.allProductDetailsIncluded.productAttributes.filter(
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
			<WrapperCartItem
				className='row '
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<img
						src={image}
						alt={name}
						style={{ width: "80px", height: "80px" }}
					/>
				</div>
				<div
					className='col-md-4 mx-auto text-center my-auto'
					style={{
						fontSize: "0.7rem",
						fontWeight: "bold",
						textTransform: "capitalize",
					}}>
					{chosenLanguage === "Arabic" ? nameArabic : name}
					<div style={{ color: "darkgray" }}>
						Available Items: {i.max} items
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
											iii.size.toLowerCase() === e.target.value.toLowerCase(),
									)[0];
								changeSize(
									i.id,
									e.target.value,
									i.color,
									chosenAttribute2.quantity,
									i.size,
								);
							}}>
							<option style={{ textTransform: "capitalize" }}>{i.size}</option>

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
									allColors[allColors.map((ii) => ii.hexa).indexOf(i.color)] &&
									allColors[allColors.map((ii) => ii.hexa).indexOf(i.color)]
										.color}
							</option>

							{uniqueProductColors &&
								uniqueProductColors.map((cc, ii) => {
									return (
										<option key={ii} value={cc}>
											{allColors &&
												allColors[allColors.map((ii) => ii.hexa).indexOf(cc)] &&
												allColors[allColors.map((ii) => ii.hexa).indexOf(cc)]
													.color}
										</option>
									);
								})}
						</select>
					</div>
				</div>
				<div className='col-md-2 mx-auto text-center my-auto buttons-up-down'>
					{" "}
					<span
						type='button'
						className='amount-btn py-2'
						style={{ border: "solid #f1f1f1 1px", width: "100%" }}
						onClick={decrease}>
						<FaMinus />
					</span>
					<span
						style={{ border: "solid #f1f1f1 1px", width: "100%" }}
						className='amount py-2'>
						{amount}
					</span>
					<span
						type='button'
						className='amount-btn py-2'
						style={{ border: "solid #f1f1f1 1px", width: "100%" }}
						onClick={increase}>
						<FaPlus />
					</span>
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<span
						style={{
							fontSize: "0.9rem",
							fontWeight: "bold",
							letterSpacing: "3px",
							color: "goldenrod",
						}}>
						{price * amount} L.E.
					</span>
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					<button
						type='button'
						style={{
							padding: "0px",
							background: "none",
							color: "red",
							border: "none",
							fontWeight: "bold",
						}}
						onClick={() => removeItem(id, i.size, i.color)}>
						<FaTrash />
					</button>
				</div>
			</WrapperCartItem>
		);
	};

	const CartColumns = () => {
		return (
			<WrapperCartColumns
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
				className='row my-auto'
				style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
				<div className='col-md-2 mx-auto text-center my-auto'>
					{chosenLanguage === "Arabic" ? "المنتجات" : "Item"}
				</div>
				<div className='col-md-4 mx-auto text-center my-auto'>
					{chosenLanguage === "Arabic" ? "تفاصيل" : "Details"}
				</div>

				<div className='col-md-2 mx-auto text-center my-auto'>
					{chosenLanguage === "Arabic" ? "الكمية" : "Quantity"}
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					{chosenLanguage === "Arabic" ? "المجموع الفرعي" : "Subtotal"}
				</div>
				<div className='col-md-2 mx-auto text-center my-auto'>
					{chosenLanguage === "Arabic" ? "إزالة" : "Remove"}
				</div>
				<hr />
			</WrapperCartColumns>
		);
	};

	// eslint-disable-next-line
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: relatedProducts && relatedProducts.length >= 4 ? 4 : 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: relatedProducts && relatedProducts.length >= 2 ? 2 : 1,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	return (
		<CartV2Styling>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Demo Ecommerce Web App | Developed By Infinite-Apps</title>

				<meta
					name='description'
					content='This is a demo website created by Infinite-Apps. This web app is mainly focusing on Ecommerce business/Web Shops and it could be used for Brick and Mortar stores to increase your sales. Infinite Apps can help with your SEO (Search Engine Optimization) so you can market for your business and rank higher with Google. If you are interested, Please contact infinite apps 9099914386 (www.infinite-apps.com)'
				/>
				<link
					rel='stylesheet'
					href='http://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			{cart.length === 0 ? (
				<div
					className='text-center emptyCart'
					style={{
						fontSize: "2rem",
						fontWeight: "bold",
						marginTop: "50px",
						marginLeft: "110px",
					}}>
					Your Cart Is Empty
					<br />
					<Link
						to='/our-products'
						style={{
							fontSize: "1.5rem",
							fontWeight: "bold",
							// background: "grey",
						}}>
						Continue Shopping
					</Link>
				</div>
			) : (
				<>
					<h3 className='pt-2 mx-auto text-center'>SHOPPING BAG</h3>
					<div className='fullScreen'>
						{CartColumns()}
						<hr />
						{cart.map((i, k) => {
							return (
								<Fragment key={k}>
									<span>
										{CartItem(
											i,
											i.id,
											i.image,
											i.name,
											i.priceAfterDiscount,
											i.amount,
											i.nameArabic,
										)}
									</span>
									<hr />
								</Fragment>
							);
						})}
						<div className='Totals'>Total Amount: {total_amount} L.E.</div>
						<div className='link-container'>
							<Link
								to='/our-products'
								className='link-btn btn-primary'
								style={{ borderRadius: "10px", background: "grey" }}>
								continue shopping
							</Link>
							<Link
								type='button'
								to='/checkout'
								style={{
									background: "#007db5",
									color: "white",
									textTransform: "uppercase",
									borderRadius: "10px",
								}}
								className='link-btn clear-btn'
								// onClick={clearCart}
							>
								Continue To Check Out
							</Link>
						</div>
					</div>
					<div className='cellPhoneLayout mt-5'>
						{cart.map((i, k) => {
							var productColors =
								i.allProductDetailsIncluded.productAttributes.map(
									(iii) => iii.color,
								);
							var uniqueProductColors = [
								...new Map(productColors.map((item) => [item, item])).values(),
							];

							var productSizes =
								i.allProductDetailsIncluded.productAttributes.map(
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
										<div className='col-3'>
											<span>
												<img
													src={i.image}
													alt={i.name}
													style={{ width: "80px", height: "80px" }}
												/>
											</span>
										</div>
										<div className='col-9 mx-auto my-auto'>
											<div
												style={{
													fontSize: "12px",
													fontWeight: "bold",
													marginLeft: "10px",
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
											{chosenLanguage === "Arabic" ? (
												<span
													className='buttons-up-down'
													style={{ color: "#282491", marginTop: "10px" }}>
													<button
														type='button'
														className='amount-btn'
														onClick={increase}>
														<FaPlus />
													</button>
													<span className='amount'>{i.amount}</span>

													<button
														type='button'
														className='amount-btn'
														onClick={decrease}>
														<FaMinus />
													</button>
													<span style={{ color: "black" }}>الكمية</span>
												</span>
											) : (
												<span
													className='buttons-up-down'
													style={{ color: "#282491", marginTop: "10px" }}>
													<span style={{ color: "black" }}>Quantity</span>
													<button
														type='button'
														className='amount-btn'
														onClick={decrease}>
														<FaMinus />
													</button>
													<span className='amount'>{i.amount}</span>
													<button
														type='button'
														className='amount-btn'
														onClick={increase}>
														<FaPlus />
													</button>
												</span>
											)}
											<div
												style={{
													fontSize: "0.9rem",
													fontWeight: "bold",
													letterSpacing: "3px",
													color: "goldenrod",
													marginLeft: "70px",
													marginTop: "10px",
												}}>
												{i.priceAfterDiscount * i.amount} L.E.
											</div>
											<button
												type='button'
												style={{
													marginLeft: "250px",
													color: "red",
													border: "none",
													fontWeight: "bold",
												}}
												onClick={() => removeItem(i.id, i.size, i.color)}>
												<FaTrash />
											</button>
										</div>
									</div>

									<hr />
								</div>
							);
						})}
						<div className='Totals'>Total Amount: {total_amount} L.E.</div>
						<div className='link-container'>
							<Link
								to='/our-products'
								className='link-btn btn-primary ml-1'
								style={{
									borderRadius: "10px",
									background: "grey",
								}}>
								continue shopping
							</Link>
							<Link
								type='button'
								to='/checkout'
								style={{
									background: "#007db5",
									color: "white",
									textTransform: "uppercase",
									borderRadius: "10px",
								}}
								className='link-btn clear-btn'
								// onClick={clearCart}
							>
								Continue To Check Out
							</Link>
						</div>
					</div>
				</>
			)}
			{/* {relatedProducts && relatedProducts.length > 0 ? (
				<ProductWrapperRelated>
					<React.Fragment>
						<div className='title mb-2'>
							<h1 className='title'>Products You May Like!</h1>
						</div>
					</React.Fragment>
					<div className='container-fluid my-3 ProductSlider'>
						<Slider {...settings} className='mb-5'>
							{relatedProducts &&
								relatedProducts.map((product, i) => (
									<div className='img-fluid images ' key={i}>
										<CardForRelatedProducts product={product} key={i} />
									</div>
								))}
						</Slider>
					</div>
				</ProductWrapperRelated>
			) : null} */}
		</CartV2Styling>
	);
};

export default Cart;

const CartV2Styling = styled.div`
	min-height: 800px;
	background-color: white;
	margin-top: 0px !important;

	.fullScreen {
		margin-right: 10%;
		margin-left: 10%;
	}

	.link-container {
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
	}
	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: var(--clr-primary-5);
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		cursor: pointer;
	}
	.cellPhoneLayout {
		display: none;
	}

	.Totals {
		text-align: right;
		margin-right: 200px;
		font-size: 1.3rem;
		font-weight: bold;
	}

	@media (max-width: 770px) {
		.emptyCart {
			margin: auto !important;
			padding-top: 70px;
			text-transform: uppercase;
		}

		.link-container {
			display: flex;
			justify-content: space-between;
			margin-top: 3rem;
		}
		.link-btn {
			background: transparent;
			border-color: transparent;
			text-transform: capitalize;
			padding: 0.25rem 0.5rem;
			background: var(--clr-primary-5);
			color: var(--clr-white);
			border-radius: var(--radius);
			letter-spacing: var(--spacing);
			font-weight: 400;
			cursor: pointer;
		}
		.fullScreen {
			display: none;
		}
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
		.Totals {
			text-align: center;
			margin: auto;
			font-size: 1.1rem;
			font-weight: bold;
		}
	}
`;
const WrapperCartColumns = styled.div`
	/* text-align: center; */
	/* border: 2px solid red; */
	background-color: #eeeeee;
	padding: 10px 0px;
`;

const WrapperCartItem = styled.div`
	.buttons-up-down {
		display: grid;
		width: 100px;
		justify-items: center;
		grid-template-columns: repeat(3, 1fr);
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
		h2 {
			margin-bottom: 0;
		}
	}
`;

// eslint-disable-next-line
const ProductWrapperRelated = styled.div`
	margin-top: 50px;

	.title {
		text-align: center;
		font-size: 2rem;
		letter-spacing: 7px;
		font-weight: bold;
		text-shadow: 3px 3px 10px;
	}

	.titleArabic {
		text-align: center;
		font-size: 2rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		text-shadow: 3px 3px 10px;
	}

	.images {
		margin-left: 20px;
		margin-bottom: 30px;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}
	@media (max-width: 1200px) {
		.ProductSlider {
			padding: 0px 10px 0px 10px;
		}
	}
`;
