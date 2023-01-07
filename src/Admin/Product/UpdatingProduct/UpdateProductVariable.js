/** @format */

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Resizer from "react-image-file-resizer";
import { cloudinaryUpload1, getColors, getSizes } from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import axios from "axios";

const { Option } = Select;

const isActive2 = (clickedLink, sureClickedLink) => {
	if (clickedLink === sureClickedLink) {
		return {
			// color: "white !important",
			background: "#dbeeff",
			fontWeight: "bold",
			padding: "3px",
			borderRadius: "5px",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const UpdatingProductVariable = ({
	clickedVariableLink,
	setClickedVariableLink,
	setAddVariables,
	addVariables,
	setChosenColors,
	chosenColors,
	setChosenSizes,
	chosenSizes,
	setVariablesSubmit,
	variablesSubmit,
	productAttributesFinal,
	setProductAttributesFinal,
	setClickedLink,
	productAttributes,
	addThumbnail,
	setAddThumbnail,
}) => {
	const [allColors, setAllColors] = useState([]);
	const [allSizes, setAllSizes] = useState([]);
	const { user, token } = isAuthenticated();

	//
	const ColorsImageUpload = (e, c) => {
		// console.log(e.target.files, "From Upload Function");
		let pickedAttribute = productAttributesFinal.filter(
			(i) => i.color === c,
		)[0];

		let files = e.target.files;

		let allUploadedFiles = pickedAttribute.productImages;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"JPEG",
					100,
					0,
					// eslint-disable-next-line
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								pickedAttribute = {
									...pickedAttribute,
									productImages: allUploadedFiles,
								};
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}

			const index = productAttributesFinal.findIndex((object) => {
				return object.color === c;
			});

			if (index !== -1) {
				setClickedVariableLink("ImagesLoading");
				productAttributesFinal[index].productImages =
					pickedAttribute.productImages;
				setTimeout(() => {
					setClickedVariableLink("SizesColorsImages");
				}, 3000);
			}

			// console.log(pickedAttribute, "From The Function");
			// console.log(productAttributes, "Product From The Function");
		}
	};

	const adjustingQuantity = (e, p) => {
		// if (productAttributesFinal.length > 0) {
		// 	setProductAttributesFinal([]);
		// }
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].quantity = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
		// console.log(productAttributesFinal, "From OnChange Stock Level");
	};

	const adjustingPrice = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].price = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	const adjustingPriceAfterDiscount = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].priceAfterDiscount = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	const adjustingMSRP = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].MSRP = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	const adjustingWholeSalePrice = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].WholeSalePrice = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	const adjustingDropShippingPrice = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].DropShippingPrice = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	const adjustingVariablesSkus = (e, p) => {
		const index = productAttributesFinal.findIndex((object) => {
			return object.PK === p.size + p.color;
		});

		if (index !== -1) {
			productAttributesFinal[index].SubSKU = e.target.value;
			setProductAttributesFinal([...productAttributesFinal]);
		}
	};

	// eslint-disable-next-line
	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddThumbnail({ ...addThumbnail, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	// const FileUploadThumbnail = () => {
	// 	return (
	// 		<>
	// 			<label
	// 				className='btn btn-info btn-raised'
	// 				style={{ cursor: "pointer", fontSize: "0.95rem" }}>
	// 				Add Product Thumbnail (Main Image)
	// 				<input
	// 					type='file'
	// 					hidden
	// 					accept='images/*'
	// 					onChange={fileUploadAndResizeThumbNail}
	// 					required
	// 				/>
	// 			</label>
	// 		</>
	// 	);
	// };

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				// eslint-disable-next-line
				const { images } = addThumbnail;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setAddThumbnail({ ...addThumbnail, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				// setTimeout(function () {
				// 	window.location.reload(false);
				// }, 1000);
			});
	};

	const gettingAllColors = () => {
		getColors(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	const gettingAllSizes = () => {
		getSizes(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSizes(data);
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		gettingAllSizes();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='mb-5'>
			<div className='row mx-auto text-center variableLinkWrapper'>
				<div
					className='col-3 variableLinksItem'
					onClick={() => setClickedVariableLink("SizesColorsImages")}
					style={isActive2("SizesColorsImages", clickedVariableLink)}>
					Add Sizes, Colors And Images
				</div>
				{productAttributes.length > 0 && variablesSubmit ? (
					<>
						<div
							className='col-3 variableLinksItem '
							onClick={() => {
								setClickedVariableLink("StockLevel");
							}}
							style={isActive2("StockLevel", clickedVariableLink)}>
							Add Stock Level
						</div>
						<div
							className='col-3 variableLinksItem '
							onClick={() => setClickedVariableLink("ProductPrices")}
							style={isActive2("ProductPrices", clickedVariableLink)}>
							Add Product Prices
						</div>
						<div
							className='col-3 variableLinksItem '
							onClick={() => setClickedVariableLink("VariableSkus")}
							style={isActive2("VariableSkus", clickedVariableLink)}>
							Add Variables SKUs
						</div>
					</>
				) : null}
			</div>
			<hr />
			<form>
				{clickedVariableLink === "SizesColorsImages" ? (
					<div className='form-group   col-md-8'>
						<label>Product Available Sizes</label>
						<Select
							mode='multiple'
							style={{ width: "100%" }}
							placeholder='Please Select Sizes'
							value={chosenSizes}
							onChange={(value) => setChosenSizes(value)}>
							{allSizes &&
								allSizes.map((ss, iii) => {
									return (
										<Option
											style={{ textTransform: "uppercase" }}
											key={iii}
											value={ss.size}>
											{ss.size}
										</Option>
									);
								})}
						</Select>{" "}
						{chosenSizes.length > 0 ? (
							<div className='mt-4'>
								<label>Product Available Colors</label>
								<Select
									mode='multiple'
									style={{ width: "100%" }}
									placeholder='Please Select Colors'
									value={chosenColors}
									onChange={(value) => setChosenColors(value)}>
									{allColors &&
										allColors.map((c, ii) => {
											return (
												<Option
													style={{ textTransform: "capitalize" }}
													key={ii}
													value={c.hexa}>
													{c.color}
												</Option>
											);
										})}
								</Select>
								{chosenColors.length > 0 && chosenSizes.length > 0 ? (
									<button
										className='btn btn-outline-primary my-3'
										onClick={(e) => {
											e.preventDefault();
											setVariablesSubmit(true);
										}}>
										Submit Updated Variables
									</button>
								) : null}
							</div>
						) : null}
					</div>
				) : null}

				{clickedVariableLink === "ImagesLoading" ? (
					<div
						className='mx-auto text-center ml-5'
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
							color: "#0053a0",
						}}>
						Images Are Being Loaded....
					</div>
				) : null}

				{clickedVariableLink === "SizesColorsImages" ? (
					<div className='mt-5'>
						{/* {variablesSubmit ? (
							<div className='m-3 col-4'>
								<div className='col-10'>
									{addThumbnail &&
										addThumbnail.images &&
										addThumbnail.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);
															setAddThumbnail([]);
														}}
														style={{
															color: "white",
															background: "black",
															fontSize: "20px",
														}}
														aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
													<img
														src={image.url}
														alt='Img Not Found'
														style={{
															width: "90px",
															height: "90px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{FileUploadThumbnail()}
							</div>
						) : null} */}

						<div className='row'>
							{chosenColors &&
								variablesSubmit &&
								chosenColors.map((c, i) => {
									return (
										<div key={i} className='mx-auto col-md-3 text-center mt-4'>
											{productAttributesFinal[i] &&
											productAttributesFinal[i].productImages &&
											productAttributesFinal[i].productImages.length > 0 ? (
												<>
													{productAttributesFinal[i].productImages.map(
														(imag, iiii) => {
															return (
																<React.Fragment>
																	<img
																		alt='nothing'
																		key={iiii}
																		width='30%'
																		className='mb-2'
																		src={imag.url}
																	/>

																	<button
																		type='button'
																		onClick={() => {
																			handleImageRemove(imag.public_id);

																			var array = productAttributesFinal[
																				i
																			].productImages.filter(function (s) {
																				return s !== imag;
																			});

																			const index =
																				productAttributesFinal.findIndex(
																					(object) => {
																						return (
																							object.PK ===
																							productAttributesFinal[i].PK
																						);
																					},
																				);

																			if (index !== -1) {
																				const newArr =
																					productAttributesFinal.map((obj) => {
																						if (
																							obj.PK ===
																							productAttributesFinal[i].PK
																						) {
																							return {
																								...obj,
																								productImages: array,
																							};
																						}

																						return obj;
																					});

																				setProductAttributesFinal(newArr);
																			}
																		}}
																		style={{
																			transform: "translate(-100%, -100%)",
																			color: "white",
																			background: "black",
																			fontSize: "15px",
																			padding: "0px",
																			borderRadius: "50%",
																		}}
																		aria-label='Close'>
																		<span aria-hidden='true'>&times;</span>
																	</button>
																</React.Fragment>
															);
														},
													)}
												</>
											) : null}
											<br />
											<br />
											<label
												className='btn btn-raised'
												style={{
													cursor: "pointer",
													fontSize: "0.95rem",
													backgroundColor: c,
													color: "white",
													boxShadow: "2px 2px 2px 3px rgba(0,0,0,0.1)",
												}}>
												Update Product Images{" "}
												<span className='text-capitalize'>
													{" "}
													((
													{allColors[allColors.map((i) => i.hexa).indexOf(c)]
														? allColors[allColors.map((i) => i.hexa).indexOf(c)]
																.color
														: ""}
													))
												</span>
												<input
													type='file'
													hidden
													multiple
													accept='images/*'
													onChange={(e) => ColorsImageUpload(e, c)}
													required
												/>
											</label>
										</div>
									);
								})}
						</div>
						<div>
							{variablesSubmit ? (
								<button
									className='btn btn-outline-primary my-5 ml-3'
									onClick={(e) => {
										e.preventDefault();
										setClickedVariableLink("StockLevel");
									}}>
									Next: Add Stock Level
								</button>
							) : null}
						</div>
					</div>
				) : null}

				{clickedVariableLink === "StockLevel" && variablesSubmit ? (
					<>
						{variablesSubmit ? (
							<div className='row mt-4'>
								{productAttributesFinal &&
									productAttributesFinal.map((p, i) => {
										return (
											<div className='form-group col-md-6 mx-auto' key={i}>
												<label
													className='text-muted'
													style={{ fontWeight: "bold", fontSize: "17px" }}>
													Product Stock Level (Color:{" "}
													<span style={{ color: "black" }}>
														{allColors[
															allColors.map((i) => i.hexa).indexOf(p.color)
														]
															? allColors[
																	allColors.map((i) => i.hexa).indexOf(p.color)
															  ].color
															: p.color}
													</span>{" "}
													Size: {p.size})
												</label>
												<input
													type='number'
													className='form-control'
													onChange={(e) => adjustingQuantity(e, p)}
													value={productAttributesFinal[i].quantity}
													required
												/>
											</div>
										);
									})}
							</div>
						) : null}
						{variablesSubmit ? (
							<button
								className='btn btn-outline-primary my-5 ml-3'
								onClick={(e) => {
									e.preventDefault();
									setClickedVariableLink("ProductPrices");
								}}>
								Next: Add Product Prices
							</button>
						) : null}
					</>
				) : null}

				{clickedVariableLink === "ProductPrices" && variablesSubmit ? (
					<>
						{variablesSubmit ? (
							<div className='row mt-4'>
								{productAttributes &&
									productAttributes.map((p, i) => {
										return (
											<React.Fragment key={i}>
												<div className='form-group col-md-4 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "13px" }}>
														Manufacturing Price (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors[
																allColors.map((i) => i.hexa).indexOf(p.color)
															]
																? allColors[
																		allColors
																			.map((i) => i.hexa)
																			.indexOf(p.color)
																  ].color
																: p.color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='text'
														className='form-control'
														onChange={(e) => adjustingMSRP(e, p)}
														value={productAttributesFinal[i].MSRP}
														required
													/>
												</div>
												<div className='form-group col-md-4 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "13px" }}>
														Retailer Price (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors[
																allColors.map((i) => i.hexa).indexOf(p.color)
															]
																? allColors[
																		allColors
																			.map((i) => i.hexa)
																			.indexOf(p.color)
																  ].color
																: p.color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='number'
														className='form-control'
														required
														onChange={(e) => adjustingPrice(e, p)}
														value={productAttributesFinal[i].price}
													/>
												</div>
												<div className='form-group col-md-4 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "13px" }}>
														Price After Discount (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors[
																allColors.map((i) => i.hexa).indexOf(p.color)
															]
																? allColors[
																		allColors
																			.map((i) => i.hexa)
																			.indexOf(p.color)
																  ].color
																: p.color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='text'
														className='form-control'
														onChange={(e) => adjustingPriceAfterDiscount(e, p)}
														value={productAttributesFinal[i].priceAfterDiscount}
														required
													/>
												</div>

												<div className='form-group col-md-5 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "13px" }}>
														Whole Sale Price (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors &&
																allColors[0] &&
																allColors[
																	allColors.map((i) => i.hexa).indexOf(p.color)
																].color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='text'
														className='form-control'
														onChange={(e) => adjustingWholeSalePrice(e, p)}
														value={productAttributesFinal[i].WholeSalePrice}
														required
													/>
												</div>

												<div className='form-group col-md-5 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "13px" }}>
														Dropshipping Price (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors &&
																allColors[0] &&
																allColors[
																	allColors.map((i) => i.hexa).indexOf(p.color)
																].color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='text'
														className='form-control'
														onChange={(e) => adjustingDropShippingPrice(e, p)}
														value={productAttributesFinal[i].DropShippingPrice}
														required
													/>
												</div>
											</React.Fragment>
										);
									})}
							</div>
						) : null}
						<button
							className='btn btn-outline-primary my-5 ml-3'
							onClick={(e) => {
								e.preventDefault();
								setClickedVariableLink("VariableSkus");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Next: Add Variables SKU's
						</button>
					</>
				) : null}

				{clickedVariableLink === "VariableSkus" && variablesSubmit ? (
					<>
						{variablesSubmit ? (
							<div className='row mt-4'>
								{productAttributes &&
									productAttributes.map((p, i) => {
										return (
											<React.Fragment key={i}>
												<div className='form-group col-md-6 mx-auto'>
													<label
														className='text-muted'
														style={{ fontWeight: "bold", fontSize: "17px" }}>
														Variable SKU (Color:{" "}
														<span style={{ color: "black" }}>
															{allColors[
																allColors.map((i) => i.hexa).indexOf(p.color)
															]
																? allColors[
																		allColors
																			.map((i) => i.hexa)
																			.indexOf(p.color)
																  ].color
																: p.color}
														</span>{" "}
														Size: {p.size})
													</label>
													<input
														type='text'
														className='form-control'
														onChange={(e) => adjustingVariablesSkus(e, p)}
														value={productAttributesFinal[i].SubSKU}
														required
													/>
												</div>
											</React.Fragment>
										);
									})}
							</div>
						) : null}
						<button
							className='btn btn-outline-primary my-5 ml-3'
							onClick={(e) => {
								e.preventDefault();
								setClickedLink("ExtraOptions");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Next: Add Product Extra Options
						</button>
					</>
				) : null}
			</form>
		</div>
	);
};

export default UpdatingProductVariable;
