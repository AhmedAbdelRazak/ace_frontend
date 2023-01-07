/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColors } from "../../apiCore";

const isActive = (c, sureClickedLink) => {
	if (c === sureClickedLink) {
		return {
			// color: "white !important",
			// background: "#dbeeff",
			fontWeight: "bold",
			// padding: "3px 2px",
			color:
				c === "#000000" ||
				c === "#0000ff" ||
				c === "#5e535f" ||
				c === "#630e63" ||
				c === "#b30000" ||
				c === "#006200"
					? "white"
					: "black",
			// background: c,
			textTransform: "uppercase",
			transition: "0.3s",
			fontSize: "0.9rem",
			border: "1px lightgrey solid",
			borderRadius: "10px",
			// boxShadow: "1px 2px 1px 2px rgba(0,0,0,0.1)",

			// textDecoration: "underline",
		};
	} else {
		return {
			color:
				c === "#000000" ||
				c === "#0000ff" ||
				c === "#5e535f" ||
				c === "#630e63" ||
				c === "#b30000" ||
				c === "#006200"
					? "white"
					: "black",
			// background: c,
			fontSize: "0.75rem",
			textTransform: "uppercase",
			border: "1px lightgrey solid",
			transition: "0.3s",
		};
	}
};

const isActive2 = (s, sureClickedLink, sizeAvailable) => {
	if (s === sureClickedLink && !sizeAvailable) {
		return {
			// color: "white !important",
			// background: "#dbeeff",
			fontWeight: "bold",
			padding: "2px 2px",
			color: "black",
			background: "#d8ebff",
			textTransform: "uppercase",
			transition: "0.3s",
			fontSize: "0.9rem",
			border: "1px lightgrey solid",
			borderRadius: "10px",
			// boxShadow: "1px 2px 1px 2px rgba(0,0,0,0.1)",

			// textDecoration: "underline",
		};
	} else if (!sizeAvailable) {
		return {
			color: "black",
			// background: "#d8ebff",
			textTransform: "uppercase",
			fontSize: "0.85rem",
			transition: "0.3s",
			border: "1px black solid",
		};
	} else if (sizeAvailable) {
		return {
			color: "darkgrey",
			// background: "#d8ebff",
			textTransform: "uppercase",
			fontWeight: "bolder",
			fontSize: "0.85rem",
			transition: "0.3s",
			border: "1px lightgrey solid",
		};
	} else {
		return {
			color: "black",
			// background: "#d8ebff",
			textTransform: "uppercase",
			fontSize: "0.85rem",
			transition: "0.3s",
			border: "1px black solid",
		};
	}
};

const ColorsAndSizes = ({
	Product,
	allColors,
	allSizes,
	allAddedColors,
	setChosenImages,
	setChosenProductAttributes,
	chosenProductAttributes,
	colorSelected,
	setColorSelected,
	setModalVisible2,
	colorFromLocalStorage,
	setClickedLink,
	clickedLink,
}) => {
	const [clickedLink2, setClickedLink2] = useState("");
	const [allColoring, setAllColors] = useState([]);

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
		gettingAllColors();

		// eslint-disable-next-line
	}, []);

	const SizesWithNoStock =
		Product &&
		Product.productAttributes &&
		Product.productAttributes.filter(
			(i) => chosenProductAttributes.SubSKUColor === i.color && i.quantity <= 0,
		);

	return (
		<ColorsAndSizesWrapper>
			<div className='text-capitalize text-title' style={{ color: "#0052a5" }}>
				<span className='chooseColor'>
					Color:{" "}
					<span style={{ color: "darkgrey" }}>
						{allColoring[allColoring.map((i) => i.hexa).indexOf(clickedLink)]
							? allColoring[allColoring.map((i) => i.hexa).indexOf(clickedLink)]
									.color
							: clickedLink}
					</span>
				</span>
				<div className='my-2 gridContainer'>
					{allAddedColors &&
						allAddedColors.map((c, i) => {
							return (
								<div
									className='attStyling imgWrapper'
									key={i}
									onClick={() => {
										var images = Product.productAttributes.filter(
											(im) => im.color === c.color,
										);
										if (chosenProductAttributes.SubSKUSize) {
											var chosenAttribute = images.filter(
												(ca) =>
													ca.color.toLowerCase() === c.color.toLowerCase() &&
													ca.size.toLowerCase() ===
														chosenProductAttributes.SubSKUSize.toLowerCase(),
											)[0];

											setChosenProductAttributes({
												...chosenProductAttributes,
												SubSKUColor: c.color,
												SubSKU: chosenAttribute.SubSKU,
												OrderedQty: 1,
												productSubSKUImage: images[0].productImages.map(
													(ii) => ii.url,
												)[0],
												SubSKUPriceAfterDiscount:
													chosenAttribute.priceAfterDiscount,
												SubSKURetailerPrice: chosenAttribute.MSRP,
												SubSKUWholeSalePrice: chosenAttribute.WholeSalePrice,
												SubSKUDropshippingPrice:
													chosenAttribute.DropShippingPrice,
												pickedPrice: chosenAttribute.priceAfterDiscount,
												SubSKUMSRP: chosenAttribute.MSRP,
												quantity: chosenAttribute.quantity,
											});
										} else {
											setChosenProductAttributes({
												...chosenProductAttributes,
												SubSKUColor: c.color,
											});
										}

										setChosenImages(
											images[0].productImages.map((ii) => ii.url),
										);
										setClickedLink(c.color);
										setColorSelected(true);
									}}
									style={isActive(c.color, clickedLink)}>
									{c.productImages && c.productImages.length > 0 ? (
										<img
											style={{ height: "75%", width: "75%" }}
											src={c.productImages[0].url}
											alt='ACE'
										/>
									) : null}
								</div>
							);
						})}
				</div>
			</div>
			<br />
			<div className='text-capitalize text-title' style={{ color: "#0052a5" }}>
				<div className='row '>
					<div className='col-7'>
						<span className='chooseSize'>
							Choose a Size:{" "}
							<span style={{ color: "darkgrey" }}>{clickedLink2}</span>{" "}
						</span>
					</div>
					{Product &&
					Product.sizeChart &&
					Product.sizeChart.chartLength &&
					Product.sizeChart.chartLength.length > 0 ? (
						<div
							onClick={() => setModalVisible2(true)}
							className='col-4 ml-auto'
							style={{
								fontWeight: "bolder",
								textDecoration: "underline",
								cursor: "pointer",
								color: "black",
								textTransform: "uppercase",
							}}>
							Size Guide
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								role='img'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fill-rule='evenodd'
									clip-rule='evenodd'
									d='M6.44305 7.07914C6.44305 6.31518 7.00822 5.75 7.77219 5.75C8.53616 5.75 9.10134 6.31518 9.10134 7.07914C9.10134 7.84311 8.53616 8.40829 7.77219 8.40829C7.00822 8.40829 6.44305 7.84311 6.44305 7.07914ZM7.77219 4.25C6.1798 4.25 4.94305 5.48675 4.94305 7.07914C4.94305 8.67154 6.1798 9.90829 7.77219 9.90829C9.36459 9.90829 10.6013 8.67154 10.6013 7.07914C10.6013 5.48675 9.36459 4.25 7.77219 4.25ZM5 10.4874H4.25V11.2374V15.3957V15.6228L4.37596 15.8117L5.6361 17.7019V20.2471V20.9971H6.3861H9.15829H9.90829V20.2471V17.7019L11.1684 15.8117L11.2944 15.6228V15.3957V11.2374V10.4874H10.5444H5ZM5.75 15.1686V11.9874H9.79438V15.1686L8.53425 17.0588L8.40829 17.2478V17.4749V19.4971H7.1361V17.4749V17.2478L7.01013 17.0588L5.75 15.1686Z'
									fill='black'></path>
								<path
									fill-rule='evenodd'
									clip-rule='evenodd'
									d='M19.611 4.25H13.2596V7.71524V9.21524V10.4874V11.9874V13.2596V14.7596V16.0318V17.5318V20.9971H19.611V4.25ZM14.759 17.5318V19.497H18.11V5.75H14.759V7.71524H16.8388V9.21524H14.759V10.4874H16.1457V11.9874H14.759V13.2596H16.8388V14.7596H14.759V16.0318H16.1457V17.5318H14.759Z'
									fill='black'></path>
							</svg>
						</div>
					) : null}
				</div>

				<div className='my-2 text-center gridContainer2'>
					{allSizes &&
						allSizes.map((s, i) => {
							return (
								<div
									onClick={() => {
										var images = Product.productAttributes.filter(
											(im) => im.size === s,
										);
										var images2 = Product.productAttributes.filter(
											(im) => im.color === chosenProductAttributes.SubSKUColor,
										);
										if (chosenProductAttributes.SubSKUColor) {
											var chosenAttribute = images.filter(
												(ca) =>
													ca.size.toLowerCase() === s.toLowerCase() &&
													ca.color.toLowerCase() ===
														chosenProductAttributes.SubSKUColor.toLowerCase(),
											)[0];

											setChosenProductAttributes({
												...chosenProductAttributes,
												SubSKUSize: s,
												SubSKU: chosenAttribute.SubSKU,
												OrderedQty: 1,
												productSubSKUImage: images2[0].productImages.map(
													(ii) => ii.url,
												)[0],
												SubSKUPriceAfterDiscount:
													chosenAttribute.priceAfterDiscount,
												SubSKURetailerPrice: chosenAttribute.MSRP,
												SubSKUWholeSalePrice: chosenAttribute.WholeSalePrice,
												SubSKUDropshippingPrice:
													chosenAttribute.DropShippingPrice,
												pickedPrice: chosenAttribute.priceAfterDiscount,
												SubSKUMSRP: chosenAttribute.MSRP,
												quantity: chosenAttribute.quantity,
											});
										} else {
											setChosenProductAttributes({
												...chosenProductAttributes,
												SubSKUSize: s,
											});
										}

										setClickedLink2(s);
									}}
									className='attStyling my-auto ml-2 py-2'
									key={i}
									style={isActive2(
										s,
										clickedLink2,
										SizesWithNoStock.map((iiii) => iiii.size).indexOf(s) >= 0,
									)}>
									{SizesWithNoStock.map((iiii) => iiii.size).indexOf(s) >= 0 ? (
										<div>
											<div>
												{s}
												<div class='line1'></div>
											</div>
										</div>
									) : s.toLowerCase() === "small" ? (
										"s"
									) : s.toLowerCase() === "medium" ? (
										"m"
									) : s.toLowerCase() === "large" ? (
										"l"
									) : (
										s
									)}
								</div>
							);
						})}
				</div>
			</div>

			{(chosenProductAttributes.quantity ||
				chosenProductAttributes.quantity <= 0) &&
			chosenProductAttributes.pickedPrice ? (
				<>
					<p
						className='text-capitalize text-title chooseSize mt-3'
						style={{ color: "#0052a5" }}>
						{chosenProductAttributes.quantity > 0 ? null : (
							<span style={{ color: "red", textTransform: "uppercase" }}>
								<span style={{ color: "black" }}>Availability:</span>{" "}
								Unavailable
							</span>
						)}
					</p>
				</>
			) : null}
			{/* <p
				className='text-capitalize text-title chooseSize'
				style={{ color: "#0052a5" }}>
				Product SKU:{" "}
				<span style={{ color: "black", textTransform: "uppercase" }}>
					{Product.productSKU}
				</span>
			</p> */}
			<br />
		</ColorsAndSizesWrapper>
	);
};

export default ColorsAndSizes;

const ColorsAndSizesWrapper = styled.div`
	.gridContainer {
		display: grid;
		grid-template-columns: 15% 15% 15% 15% 15% 15%;
		margin: auto 10px;
	}
	.fa-check {
		color: darkgreen;
		font-size: 1rem;
	}

	.gridContainer2 {
		display: grid;
		grid-template-columns: 20% 20% 20% 20% 20%;
		margin: auto 10px;
	}

	.imgWrapper {
		width: 100%;
		height: 100%;
		border: white solid 1px !important;
	}

	.imgWrapper > img {
		width: 90% !important;
		height: 90% !important;
	}

	.attStyling:hover {
		cursor: pointer;
		font-weight: bolder;
		font-size: 0.9rem;
	}

	.chooseColor {
		font-weight: bold;
		color: black;
		text-transform: uppercase;
	}
	.chooseSize {
		font-weight: bold;
		color: black;
		text-transform: uppercase;
	}

	.line1 {
		width: 18.3%;
		height: 0px;
		border-bottom: 1px solid black;
		-webkit-transform: translateY(-11px) translateX(-5px) rotate(16deg);
		position: absolute;
		/* top: -20px; */
	}

	@media (max-width: 1000px) {
		.chooseColor {
			margin-left: 10px !important;
		}
		.chooseSize {
			margin-left: 10px !important;
		}

		.imgWrapper {
			width: 100% !important;
			height: 100% !important;
			border: white solid 1px !important;
		}

		.imgWrapper > img {
			width: 100% !important;
			height: 100% !important;
		}
		.gridContainer {
			display: grid;
			grid-template-columns: 20% 20% 20% 20% 20%;
			margin: auto 10px;
		}
	}

	@media (max-width: 1300px) {
		.line1 {
			width: 17%;
			height: 0px;
			border-bottom: 1px solid black;
			-webkit-transform: translateY(-11px) translateX(-3%) rotate(24deg);
			position: absolute;
			/* top: -20px; */
		}
	}

	@media (max-width: 770px) {
		.line1 {
			width: 18%;
			height: 0px;
			border-bottom: 1px solid black;
			-webkit-transform: translateY(-11px) translateX(-3%) rotate(17deg);
			position: absolute;
			/* top: -20px; */
		}
	}

	@media (max-width: 540px) {
		.line1 {
			width: 17.5%;
			height: 0px;
			border-bottom: 1px solid black;
			-webkit-transform: translateY(-11px) translateX(-3%) rotate(20deg);
			position: absolute;
			/* top: -20px; */
		}
	}

	@media (max-width: 420px) {
		.line1 {
			width: 17.5%;
			height: 0px;
			border-bottom: 1px solid black;
			-webkit-transform: translateY(-11px) translateX(-7%) rotate(30deg);
			position: absolute;
			/* top: -20px; */
		}
	}
`;
