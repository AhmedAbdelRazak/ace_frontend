/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../../AdminMenu/AdminMenu";
import {
	getProducts,
	getListOfSubs,
	updateProduct,
	cloudinaryUpload1,
} from "../../apiAdmin";
import { isAuthenticated } from "../../../auth";
import { toast } from "react-toastify";
import DarkBG from "../../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { Select } from "antd";
import SizeChartImageCard from "./SizeChartImageCard";

const { Option } = Select;

const UpdateSpecs = ({ match }) => {
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [productName, setProductName] = useState("");
	const [productName_Arabic, setProductName_Arabic] = useState("");
	const [productSKU, setProductSKU] = useState("");
	// eslint-disable-next-line
	const [slug, setSlug] = useState("");
	const [viewsCount, setViewsCount] = useState(0);
	// eslint-disable-next-line
	const [slug_Arabic, setSlug_Arabic] = useState("");
	const [description, setDescription] = useState("");
	const [description_Arabic, setDescription_Arabic] = useState("");
	const [chosenSubcategories, setChosenSubcategories] = useState("");
	const [allProducts, setAllProducts] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	// eslint-disable-next-line
	const [chosenCategory, setChosenCategory] = useState("");
	const [chosenGender, setChosenGender] = useState("");
	// eslint-disable-next-line
	const [subsOptions, setSubsOptions] = useState([]);

	const [addThumbnail, setAddThumbnail] = useState([]);
	const [price, setPrice] = useState("");
	const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
	const [MSRPPriceBasic, setMSRPPriceBasic] = useState("");
	const [chosenSeason, setChosenSeason] = useState("");
	const [stock, setStock] = useState("");
	// eslint-disable-next-line
	const [chosenSizes, setChosenSizes] = useState([]);
	// eslint-disable-next-line
	const [chosenColors, setChosenColors] = useState([]);
	const [addVariables, setAddVariables] = useState(false);

	const [clearance, setClearance] = useState(false);
	const [activeBackorder, setActiveBackorder] = useState(false);
	const [shipping, setShipping] = useState(true);
	const [activeProduct, setActiveProduct] = useState(true);
	const [featured, setFeatured] = useState(false);
	const [productAttributesFinal, setProductAttributesFinal] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [storeName, setStoreName] = useState("");
	const [sizeChart, setSizeChart] = useState({
		chartImage: [],
		chartSize: [],
		chartLength: [],
		chartWidth: [],
	});

	const [policy, setPolicy] = useState("");
	const [policy_Arabic, setPolicy_Arabic] = useState("");
	const [DNA, setDNA] = useState("");
	const [DNA_Arabic, setDNA_Arabic] = useState("");
	const [Specs, setSpecs] = useState("");
	const [Specs_Arabic, setSpecs_Arabic] = useState("");
	const [fitCare, setFitCare] = useState("");
	const [fitCare_Arabic, setFitCare_Arabic] = useState("");

	// eslint-disable-next-line
	var productAttributes = [];

	const { user, token } = isAuthenticated();

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				productAttributes = data.filter(
					(e) => e._id === match.params.productId,
				)[0].productAttributes;

				setAllProducts(
					data.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					),
				);

				setProductName(
					data.filter((e) => e._id === match.params.productId)[0].productName,
				);
				setProductName_Arabic(
					data.filter((e) => e._id === match.params.productId)[0]
						.productName_Arabic,
				);
				setViewsCount(
					data.filter((e) => e._id === match.params.productId)[0].viewsCount,
				);
				setSlug(data.filter((e) => e._id === match.params.productId)[0].slug);
				setSlug_Arabic(
					data.filter((e) => e._id === match.params.productId)[0].slug_Arabic,
				);
				setProductSKU(
					data.filter((e) => e._id === match.params.productId)[0].productSKU,
				);
				setDescription(
					data.filter((e) => e._id === match.params.productId)[0].description,
				);
				setDescription_Arabic(
					data.filter((e) => e._id === match.params.productId)[0]
						.description_Arabic,
				);
				setSizeChart(
					data.filter((e) => e._id === match.params.productId)[0].sizeChart
						? data.filter((e) => e._id === match.params.productId)[0].sizeChart
						: {
								chartImage: [],
								chartSize: [
									...new Set(
										data
											.filter((e) => e._id === match.params.productId)[0]
											.productAttributes.map((ii) => ii.size),
									),
								],
								chartLength: [],
								chartWidth: [],
						  },
				);
				setChosenSubcategories(
					data.filter((e) => e._id === match.params.productId)[0].subcategory &&
						data
							.filter((e) => e._id === match.params.productId)[0]
							.subcategory.map((iii) => iii._id),
				);
				setChosenCategory(
					data.filter((e) => e._id === match.params.productId)[0].category,
				);
				setChosenGender(
					data.filter((e) => e._id === match.params.productId)[0].gender,
				);
				setAddThumbnail(
					data.filter((e) => e._id === match.params.productId)[0]
						.thumbnailImage[0].images[0]
						? data.filter((e) => e._id === match.params.productId)[0]
								.thumbnailImage[0]
						: [],
				);

				setPrice(data.filter((e) => e._id === match.params.productId)[0].price);
				setPriceAfterDiscount(
					data.filter((e) => e._id === match.params.productId)[0]
						.priceAfterDiscount,
				);
				setMSRPPriceBasic(
					data.filter((e) => e._id === match.params.productId)[0]
						.MSRPPriceBasic,
				);
				setStock(
					data.filter((e) => e._id === match.params.productId)[0].quantity,
				);

				setChosenSeason(
					data.filter((e) => e._id === match.params.productId)[0].chosenSeason,
				);

				setAddVariables(
					data.filter((e) => e._id === match.params.productId)[0].addVariables,
				);
				setClearance(
					data.filter((e) => e._id === match.params.productId)[0].clearance,
				);
				setActiveBackorder(
					data.filter((e) => e._id === match.params.productId)[0]
						.activeBackorder
						? data.filter((e) => e._id === match.params.productId)[0]
								.activeBackorder
						: false,
				);
				setShipping(
					data.filter((e) => e._id === match.params.productId)[0].shipping,
				);
				setActiveProduct(
					data.filter((e) => e._id === match.params.productId)[0].activeProduct,
				);
				setFeatured(
					data.filter((e) => e._id === match.params.productId)[0]
						.featuredProduct,
				);
				setStoreName(
					data.filter((e) => e._id === match.params.productId)[0].storeName,
				);
				setProductAttributesFinal(
					data.filter((e) => e._id === match.params.productId)[0]
						.productAttributes,
				);

				setChosenColors([
					...new Set(
						data
							.filter((e) => e._id === match.params.productId)[0]
							.productAttributes.map((ii) => ii.color),
					),
				]);
				setChosenSizes([
					...new Set(
						data
							.filter((e) => e._id === match.params.productId)[0]
							.productAttributes.map((ii) => ii.size),
					),
				]);
				getListOfSubs(
					data.filter((e) => e._id === match.params.productId)[0].category._id,
				).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setSubsOptions(data);
					}
				});

				setPolicy(
					data.filter((e) => e._id === match.params.productId)[0].policy,
				);
				setPolicy_Arabic(
					data.filter((e) => e._id === match.params.productId)[0].policy_Arabic,
				);
				setDNA(data.filter((e) => e._id === match.params.productId)[0].DNA);
				setDNA_Arabic(
					data.filter((e) => e._id === match.params.productId)[0].DNA_Arabic,
				);
				setSpecs(data.filter((e) => e._id === match.params.productId)[0].Specs);
				setSpecs_Arabic(
					data.filter((e) => e._id === match.params.productId)[0].Specs_Arabic,
				);
				setFitCare(
					data.filter((e) => e._id === match.params.productId)[0].fitCare,
				);
				setFitCare_Arabic(
					data.filter((e) => e._id === match.params.productId)[0]
						.fitCare_Arabic,
				);
				setRelatedProducts(
					data.filter((e) => e._id === match.params.productId)[0]
						.relatedProducts &&
						data
							.filter((e) => e._id === match.params.productId)[0]
							.relatedProducts.map((i) => i._id),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();

		// eslint-disable-next-line
	}, [match.params.productId]);

	const UpdateProductToDatabase = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		const values = {
			productName: productName,
			productName_Arabic: productName_Arabic,
			productSKU: productSKU,
			slug: slug,
			slug_Arabic: slug_Arabic,
			description: description,
			description_Arabic: description_Arabic,
			price: addVariables ? 0 : price,
			priceAfterDiscount: addVariables ? 0 : priceAfterDiscount,
			MSRPPriceBasic: addVariables ? 0 : Number(MSRPPriceBasic),
			price_unit: "LE",
			loyaltyPoints: 10,
			category: chosenCategory,
			subcategory: chosenSubcategories,
			gender: chosenGender,
			addedByEmployee: user._id,
			updatedByEmployee: user._id,
			quantity: addVariables ? 0 : stock,
			thumbnailImage: addThumbnail,
			relatedProducts:
				relatedProducts && relatedProducts.length > 0 ? relatedProducts : [],
			shipping: shipping,
			addVariables: addVariables,
			viewsCount: viewsCount,
			storeName: storeName,
			clearance: clearance,
			productAttributes:
				productAttributesFinal.length > 0 ? productAttributesFinal : [],
			activeProduct: activeProduct,
			chosenSeason: chosenSeason,
			featuredProduct: featured,
			activeBackorder: activeBackorder,
			policy: policy ? policy : "",
			policy_Arabic: policy_Arabic ? policy_Arabic : "",
			DNA: DNA ? DNA : DNA,
			DNA_Arabic: DNA_Arabic ? DNA_Arabic : "",
			Specs: Specs ? Specs : "",
			Specs_Arabic: Specs_Arabic ? Specs_Arabic : "",
			fitCare: fitCare ? fitCare : fitCare,
			fitCare_Arabic: fitCare_Arabic ? fitCare_Arabic : "",
			sizeChart: sizeChart ? sizeChart : {},
		};
		updateProduct(match.params.productId, user._id, token, {
			product: values,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Product Was Successfully Updated");
				setTimeout(function () {
					window.location.reload(false);
				}, 3000);
			}
		});
	};

	const fileUploadAndResizeSizeChart = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = sizeChart.chartImage;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setSizeChart({ ...sizeChart, chartImage: allUploadedFiles });
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

	const FileUploadStoreLogo = () => {
		return (
			<>
				<SizeChartImageCard
					sizeChart={sizeChart}
					handleImageRemove={handleImageRemove}
					setSizeChart={setSizeChart}
					fileUploadAndResizeThumbNail={fileUploadAndResizeSizeChart}
				/>
			</>
		);
	};

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
				const { images } = sizeChart.chartImage;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setSizeChart({ ...sizeChart, chartImage: [] });
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const extraFeatures = () => {
		return (
			<form className='mt-4 ml-5 mb-5'>
				<div className='row mr-2'>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Policy
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setPolicy(e.target.value)}
							value={policy}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Policy Arabic
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setPolicy_Arabic(e.target.value)}
							value={policy_Arabic}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product DNA
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setDNA(e.target.value)}
							value={DNA}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product DNA Arabic
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setDNA_Arabic(e.target.value)}
							value={DNA_Arabic}
						/>
					</div>

					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Delivery & Return
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setSpecs(e.target.value)}
							value={Specs}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Delivery & Return Arabic
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setSpecs_Arabic(e.target.value)}
							value={Specs_Arabic}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Fit Care
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setFitCare(e.target.value)}
							value={fitCare}
						/>
					</div>
					<div className='form-group col-md-3'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "14px" }}>
							Product Fit Care Arabic
						</label>
						<textarea
							type='text'
							rows={8}
							className='form-control'
							onChange={(e) => setFitCare_Arabic(e.target.value)}
							value={fitCare_Arabic}
						/>
					</div>
					<div className='col-md-6 mx-auto'>
						{allProducts && allProducts.length > 0 && (
							<>
								<label>Related Products (Product You May Also Like) </label>
								<Select
									mode='multiple'
									style={{ width: "100%" }}
									placeholder='Please Select Related Products'
									value={relatedProducts}
									onChange={(value) => setRelatedProducts(value)}>
									{allProducts &&
										allProducts.map((product, i) => {
											return (
												<Option key={i} value={product._id}>
													{product.productName}
												</Option>
											);
										})}
								</Select>
							</>
						)}
					</div>
				</div>
				<h5 className='mt-5' style={{ fontWeight: "bolder" }}>
					Update Size Chart/ Size
				</h5>
				<div className='col-md-4'>{FileUploadStoreLogo()}</div>
				{chosenSizes &&
					chosenSizes.length > 0 &&
					chosenSizes.map((s, i) => {
						return (
							<div className='row mt-4 mx-5'>
								<div className='col-md-4 mx-auto' key={i}>
									<label
										className='text-muted'
										style={{ fontWeight: "bold", fontSize: "14px" }}>
										Size{" "}
										<span style={{ textTransform: "uppercase" }}>({s})</span>
									</label>
									<input
										type='text'
										className='form-control'
										// onChange={() =>
										// 	setSizeChart({
										// 		...sizeChart,
										// 		chartSize: [s],
										// 	})
										// }
										value={s}
									/>
								</div>
								<div className='col-md-4 mx-auto'>
									<label
										className='text-muted'
										style={{ fontWeight: "bold", fontSize: "14px" }}>
										{chosenCategory &&
										chosenCategory.categoryName.toLowerCase() &&
										(chosenCategory.categoryName
											.toLowerCase()
											.includes("tops") ||
											chosenCategory.categoryName
												.toLowerCase()
												.includes("shirts"))
											? "Chest"
											: "Waist"}{" "}
										<span style={{ textTransform: "uppercase" }}>({s})</span>
									</label>
									<input
										type='text'
										className='form-control'
										onChange={(e) => {
											var clone = [...sizeChart.chartLength];
											let obj = clone[i];
											obj = e.target.value;
											clone[i] = obj;
											setSizeChart({
												...sizeChart,
												chartLength: [...clone],
											});
										}}
										value={
											sizeChart.chartLength[i] ? sizeChart.chartLength[i] : null
										}
									/>
								</div>
								<div className='col-md-4 mx-auto'>
									<label
										className='text-muted'
										style={{ fontWeight: "bold", fontSize: "14px" }}>
										{chosenCategory &&
										chosenCategory.categoryName.toLowerCase() &&
										(chosenCategory.categoryName
											.toLowerCase()
											.includes("tops") ||
											chosenCategory.categoryName
												.toLowerCase()
												.includes("shirts"))
											? "Waist"
											: "Inside Leg"}{" "}
										<span style={{ textTransform: "uppercase" }}>({s})</span>
									</label>
									<input
										type='text'
										className='form-control'
										onChange={(e) => {
											var clone = [...sizeChart.chartWidth];
											let obj = clone[i];
											obj = e.target.value;
											clone[i] = obj;
											setSizeChart({
												...sizeChart,
												chartWidth: [...clone],
											});
										}}
										value={
											sizeChart.chartWidth[i] ? sizeChart.chartWidth[i] : null
										}
									/>
								</div>
							</div>
						);
					})}

				<br />
				<br />
				<br />
				<div className='mx-auto text-center mt-5'>
					<button
						className='btn btn-success mb-3 mx-auto text-center'
						onClick={UpdateProductToDatabase}>
						Update Product To Your Online Store
					</button>
				</div>
			</form>
		);
	};

	return (
		<UpdateSpecsWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='ProductSpecs'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				<div className='mainContent'>
					<h4
						style={{
							fontWeight: "bold",
							textAlign: "center",
							marginTop: "20px",
							marginBottom: "20px",
						}}>
						Extra Features For Product Display in the Online Store
						<br />
						<br />
						PRODUCT: {productName.toLocaleUpperCase()}
					</h4>
					<div className='col-md-6 mx-auto'>
						<hr />
					</div>

					{extraFeatures()}
				</div>
			</div>
		</UpdateSpecsWrapper>
	);
};

export default UpdateSpecs;

const UpdateSpecsWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15.2% 84.8%"};
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.mainContent {
		margin-top: 50px;
	}

	.mainUL {
		list-style: none;
	}

	.mainLi {
		font-weight: bold;
		transition: 0.3s;
	}

	.mainLi:hover {
		background: #002a52 !important;
		padding: 1px;
		color: white !important;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
	}

	.variableLinksItem {
		font-weight: bold;
		transition: 0.3s;
	}

	.variableLinksItem:hover {
		background: #002a52 !important;
		/* padding: 1px; */
		color: white !important;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
	}

	.rightContentWrapper {
		border-left: 1px lightgrey solid;
		min-height: 550px;
	}

	.formwrapper {
		background: white !important;
		padding: 10px 20px;
		border-radius: 5px;
	}

	@media (max-width: 1550px) {
		.mainUL > li {
			font-size: 0.75rem;
			margin-left: 20px;
		}

		label {
			font-size: 0.8rem !important;
		}

		h3 {
			font-size: 1.2rem !important;
		}
		.rightContentWrapper {
			border-left: 1px lightgrey solid;
			min-height: 550px;
			margin-left: 30px !important;
		}
	}
	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 16% 84%; */
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "0% 100%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
		h3 {
			margin-top: 60px !important;
		}

		.rightContentWrapper {
			margin-top: 20px;
			margin-left: ${(props) => (props.show ? "0px" : "20px")};
		}

		.mainUL {
			display: none;
		}
	}
`;
