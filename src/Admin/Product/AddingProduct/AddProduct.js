/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { Select } from "antd";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {
	cloudinaryUpload1,
	createProduct,
	getCategories,
	getColors,
	getGenders,
	getListOfSubs,
	getStores,
	getSubCategories,
} from "../../apiAdmin";
import BasicDataForm from "./BasicDataForm";
import { isAuthenticated } from "../../../auth";
import AddingProductVariable from "./AddingProductVariable";
import { toast } from "react-toastify";
import Navbar from "../../AdminNavMenu/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../../AdminMenu/DarkBG";
import ImageCard from "./ImageCard";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const isActive = (clickedLink, sureClickedLink) => {
	if (clickedLink === sureClickedLink) {
		return {
			// color: "white !important",
			background: "#dbeeff",
			fontWeight: "bold",
			padding: "3px 2px",
			borderRadius: "5px",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#a1a5b7", fontWeight: "bold" };
	}
};

const AddProduct = () => {
	const [clickedLink, setClickedLink] = useState("MainData");
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [productName, setProductName] = useState("");
	const [productName_Arabic, setProductName_Arabic] = useState("");
	const [productSKU, setProductSKU] = useState("");
	// eslint-disable-next-line
	const [slug, setSlug] = useState("");
	// eslint-disable-next-line
	const [slug_Arabic, setSlug_Arabic] = useState("");
	const [description, setDescription] = useState("");
	const [description_Arabic, setDescription_Arabic] = useState("");
	const [chosenSubcategories, setChosenSubcategories] = useState("");
	// eslint-disable-next-line
	const [chosenSeason, setChosenSeason] = useState("");
	const [chosenCategory, setChosenCategory] = useState("");
	const [chosenGender, setChosenGender] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [subsOptions, setSubsOptions] = useState([]);
	// eslint-disable-next-line
	const [allSubcategories, setAllSubcategories] = useState([]);
	// eslint-disable-next-line
	const [allGenders, setAllGenders] = useState([]);
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [price, setPrice] = useState("");
	const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
	const [MSRPPriceBasic, setMSRPPriceBasic] = useState("");
	const [stock, setStock] = useState("");
	const [chosenSizes, setChosenSizes] = useState([]);
	const [chosenColors, setChosenColors] = useState([]);
	const [addVariables, setAddVariables] = useState(true);
	const [clickedVariableLink, setClickedVariableLink] =
		useState("SizesColorsImages");
	const [variablesSubmit, setVariablesSubmit] = useState(false);
	const [clearance, setClearance] = useState(false);
	const [activeBackorder, setActiveBackorder] = useState(false);
	const [shipping, setShipping] = useState(true);
	const [activeProduct, setActiveProduct] = useState(true);
	const [featured, setFeatured] = useState(false);
	const [productAttributesFinal, setProductAttributesFinal] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [parentPrice1, setParentPrice1] = useState(0);
	const [parentPrice2, setParentPrice2] = useState(0);
	const [parentPrice3, setParentPrice3] = useState(0);
	const [parentPrice4, setParentPrice4] = useState(0);
	const [parentPrice5, setParentPrice5] = useState(0);

	const [WholeSalePriceBasic, setWholePriceBasic] = useState(0);
	const [DropShippingPriceBasic, setDropShippingBasic] = useState(0);

	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [inheritPrice, setInheritPrice] = useState(false);
	const [inheritParentSKU, setInheritParentSKU] = useState(false);
	const [allColors, setAllColors] = useState([]);
	const [allStore, setAllStores] = useState([]);
	const [storeName, setStoreName] = useState("");

	let productAttributes = [];

	const { user, token } = isAuthenticated();

	const BasicDataFormFunction = () => (
		<React.Fragment>
			<BasicDataForm
				setProductName={setProductName}
				productName={productName}
				productName_Arabic={productName_Arabic}
				setProductName_Arabic={setProductName_Arabic}
				description={description}
				setDescription={setDescription}
				description_Arabic={description_Arabic}
				setDescription_Arabic={setDescription_Arabic}
				setSlug={setSlug}
				setSlug_Arabic={setSlug_Arabic}
				productSKU={productSKU}
				setProductSKU={setProductSKU}
				setAddVariables={setAddVariables}
				addVariables={addVariables}
				setClickedLink={setClickedLink}
				chosenSeason={chosenSeason}
				setChosenSeason={setChosenSeason}
				parentPrice1={parentPrice1}
				setParentPrice1={setParentPrice1}
				parentPrice2={parentPrice2}
				setParentPrice2={setParentPrice2}
				parentPrice3={parentPrice3}
				setParentPrice3={setParentPrice3}
				parentPrice4={parentPrice4}
				setParentPrice4={setParentPrice4}
				parentPrice5={parentPrice5}
				setParentPrice5={setParentPrice5}
				inheritPrice={inheritPrice}
				setInheritPrice={setInheritPrice}
				inheritParentSKU={inheritParentSKU}
				setInheritParentSKU={setInheritParentSKU}
			/>
		</React.Fragment>
	);

	const loadAllStores = () => {
		getStores(token).then((data2) => {
			if (data2.error) {
				console.log(data2.error);
			} else {
				setAllStores(data2);
			}
		});
	};

	const gettingAllCategories = () => {
		getCategories(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data.filter((c) => c.categoryStatus === true));
			}
		});
	};

	const gettingAllSubcategories = () => {
		getSubCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSubcategories(data.filter((c) => c.subCategoryStatus === true));
			}
		});
	};

	const gettingAllGenders = () => {
		getGenders(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllGenders(data);
			}
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

	useEffect(() => {
		gettingAllCategories();
		gettingAllSubcategories();
		gettingAllGenders();
		gettingAllColors();
		loadAllStores();
		// eslint-disable-next-line
	}, []);

	const handleCategoryChange = (e) => {
		setChosenCategory(e.target.value);
		setChosenSubcategories([]);

		getListOfSubs(e.target.value).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSubsOptions(data);
			}
		});
	};

	const handleChangeGender = (e) => {
		setChosenGender(e.target.value);
	};

	const handleChangeStoreName = (e) => {
		setStoreName(e.target.value);
	};

	const CategorySubcategoryEntry = () => {
		return (
			<form className='formwrapper ml-5 py-4 mt-4' style={{ maxWidth: "80%" }}>
				<div className='form-group '>
					<div className=''>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							Add Category/ Subcategory
						</h5>
					</div>
					<label className='mt-3'>Gender</label>
					<select
						name='gender'
						className='form-control'
						onChange={handleChangeGender}>
						<option>Please select</option>
						{allGenders.length > 0 &&
							allGenders.map((c) => (
								<option key={c._id} value={c._id}>
									{c.genderName}
								</option>
							))}
					</select>
				</div>
				<div className='form-group '>
					<label>Category</label>
					<select
						name='category'
						className='form-control'
						onChange={handleCategoryChange}>
						<option>Please select</option>
						{allCategories.length > 0 &&
							allCategories.map((c) => (
								<option key={c._id} value={c._id}>
									{c.categoryName}
								</option>
							))}
					</select>
				</div>
				{subsOptions && subsOptions.length > 0 && (
					<div className='form-group'>
						<label>Sub Category</label>
						<Select
							mode='multiple'
							style={{ width: "100%" }}
							placeholder='Please Select a subcategory'
							value={chosenSubcategories}
							onChange={(value) => setChosenSubcategories(value)}>
							{subsOptions &&
								subsOptions.map((sub, i) => {
									return (
										<Option key={i} value={sub._id}>
											{sub.SubcategoryName}
										</Option>
									);
								})}
						</Select>
					</div>
				)}
				<div className='form-group '>
					<label>Store Name</label>
					<select
						name='storeName'
						className='form-control'
						onChange={handleChangeStoreName}>
						<option>Please select</option>
						{allStore &&
							allStore.length > 0 &&
							allStore.map((c) => (
								<option key={c._id} value={c._id}>
									{c.storeName}
								</option>
							))}
					</select>
				</div>
			</form>
		);
	};

	const handleChange3 = (e) => {
		setPrice(e.target.value);
	};

	const handleChange4 = (e) => {
		setPriceAfterDiscount(e.target.value);
	};

	const handleChange5 = (e) => {
		setStock(e.target.value);
	};

	const handleChange6 = (e) => {
		setMSRPPriceBasic(e.target.value);
	};

	const handleChangeWholeSaleBasic = (e) => {
		setWholePriceBasic(e.target.value);
	};

	const handleChangeDropShippingBasic = (e) => {
		setDropShippingBasic(e.target.value);
	};

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

	const FileUploadThumbnail = () => {
		return (
			<>
				<ImageCard
					uploadFrom='BasicProduct'
					addThumbnail={addThumbnail}
					handleImageRemove={handleImageRemove}
					setAddThumbnail={setAddThumbnail}
					fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail}
				/>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
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
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				// setTimeout(function () {
				// 	window.location.reload(false);
				// }, 1000);
			});
	};

	const AddPricesStockBasic = () => {
		return (
			<form>
				<div className='form-group mt-4'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Add Other Variables
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => {
							setAddVariables(!addVariables);
							setClickedLink("AddVariables");
						}}
						checked={addVariables === true ? true : false}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Manufacturing Price
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange6}
						value={MSRPPriceBasic}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Product Retail Price
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange3}
						value={price}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Product Price After Discount
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange4}
						value={priceAfterDiscount}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Whole Sale Price
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChangeWholeSaleBasic}
						value={WholeSalePriceBasic}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Dropshipping Price
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChangeDropShippingBasic}
						value={DropShippingPriceBasic}
					/>
				</div>

				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Product Stock Level
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange5}
						value={stock}
					/>
				</div>

				<button
					className='btn btn-outline-primary mb-3'
					onClick={() => {
						setClickedLink("ExtraOptions");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}>
					Next: Add Other Features
				</button>
			</form>
		);
	};

	const AddingProductVariableFunction = () => {
		return (
			<React.Fragment>
				<AddingProductVariable
					clickedVariableLink={clickedVariableLink}
					setClickedVariableLink={setClickedVariableLink}
					setAddVariables={setAddVariables}
					addVariables={addVariables}
					setChosenColors={setChosenColors}
					chosenColors={chosenColors}
					setChosenSizes={setChosenSizes}
					chosenSizes={chosenSizes}
					setVariablesSubmit={setVariablesSubmit}
					variablesSubmit={variablesSubmit}
					productAttributesFinal={productAttributesFinal}
					setProductAttributesFinal={setProductAttributesFinal}
					setClickedLink={setClickedLink}
					productAttributes={productAttributes}
					setAddThumbnail={setAddThumbnail}
					addThumbnail={addThumbnail}
					parentPrice1={parentPrice1}
					setParentPrice1={setParentPrice1}
					parentPrice2={parentPrice2}
					setParentPrice2={setParentPrice2}
					parentPrice3={parentPrice3}
					setParentPrice3={setParentPrice3}
					parentPrice4={parentPrice4}
					setParentPrice4={setParentPrice4}
					parentPrice5={parentPrice5}
					setParentPrice5={setParentPrice5}
					inheritPrice={inheritPrice}
					setInheritPrice={setInheritPrice}
					inheritParentSKU={inheritParentSKU}
					setInheritParentSKU={setInheritParentSKU}
					productSKU={productSKU}
				/>
			</React.Fragment>
		);
	};

	const fileUploadAndResizeThumbNail2 = (e) => {
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

	const FileUploadThumbnail2 = () => {
		return (
			<>
				<ImageCard
					addThumbnail={addThumbnail}
					handleImageRemove={handleImageRemove2}
					setAddThumbnail={setAddThumbnail}
					fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail2}
				/>
			</>
		);
	};

	const handleImageRemove2 = (public_id) => {
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
				// eslint-disable-next-line
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				// setAddThumbnail({ ...addThumbnail, images: filteredImages });
				setAddThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				// setTimeout(function () {
				// 	window.location.reload(false);
				// }, 1000);
			});
	};

	const AddProductToDatabase = (e) => {
		e.preventDefault();
		setClickedLink("MainData");
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (
			!productName ||
			!productName_Arabic ||
			!productSKU ||
			!description ||
			!description_Arabic ||
			!chosenSeason
		) {
			setClickedLink("MainData");
			return toast.error("Please Add Product Main Data");
		}

		if (addThumbnail.length === 0) {
			return toast.error("Please Add Product Main Image");
		}

		if (!chosenCategory || chosenSubcategories.length < 1 || !chosenGender) {
			return toast.error("Please Add Product Categories & Subcategories");
		}

		if (!addVariables) {
			if (!price || !priceAfterDiscount || !stock) {
				setClickedLink("AddPrices");
				return toast.error("Please Add Product Categories & Subcategories");
			}
		}

		if (addVariables) {
			if (!variablesSubmit) {
				setClickedVariableLink("SizesColorsImages");
				return toast.error("Please Submit Your Added Variables");
			}
		}
		if (addVariables) {
			if (chosenColors.length < 1 || chosenSizes.length < 1) {
				setClickedVariableLink("SizesColorsImages");
				return toast.error("Please Add Your Product Colors & Sizes");
			}
		}

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
			DropShippingPriceBasic: addVariables ? 0 : DropShippingPriceBasic,
			WholeSalePriceBasic: addVariables ? 0 : WholeSalePriceBasic,
			price_unit: "LE",
			loyaltyPoints: 10,
			category: chosenCategory,
			subcategory: chosenSubcategories,
			gender: chosenGender,
			addedByEmployee: user._id,
			updatedByEmployee: user._id,
			quantity: addVariables ? 0 : stock,
			thumbnailImage: addThumbnail,
			storeName: storeName,
			relatedProducts: [],
			shipping: shipping,
			addVariables: addVariables,
			clearance: clearance,
			activeBackorder: activeBackorder,
			productAttributes: addVariables ? productAttributesFinal : [],
			activeProduct: activeProduct,
			chosenSeason: chosenSeason,
			featuredProduct: featured,
			policy: "",
			policy_Arabic: "",
			DNA: "",
			DNA_Arabic: "",
			Specs: "",
			Specs_Arabic: "",
			fitCare: "",
			fitCare_Arabic: "",
		};

		createProduct(user._id, token, values).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Product Was Successfully Added");
				setTimeout(function () {
					window.location.reload(false);
				}, 3000);
			}
		});
	};

	const extraFeatures = () => {
		return (
			<form className='mt-4 ml-5'>
				<div className='form-group'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "17px" }}>
						Active Product
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setActiveProduct(!activeProduct)}
						checked={activeProduct === true ? true : false}
					/>
				</div>

				<div className='form-group mt-5'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "17px" }}>
						Shippable Product
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setShipping(!shipping)}
						checked={shipping === true ? true : false}
					/>
				</div>

				<div className='form-group mt-5'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "17px" }}>
						Outlet
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setClearance(!clearance)}
						checked={clearance === true ? true : false}
					/>
				</div>

				<div className='form-group mt-5'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "17px" }}>
						Allow Backorder
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setActiveBackorder(!activeBackorder)}
						checked={activeBackorder === true ? true : false}
					/>
				</div>

				<div className='form-group mt-5'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "17px" }}>
						Add First Thing In Home Page
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setFeatured(!featured)}
						checked={featured === true ? true : false}
					/>
				</div>
				<div className='mx-auto text-center'>
					<button
						className='btn btn-success mb-3 mx-auto text-center'
						onClick={AddProductToDatabase}>
						Add Product To Your Online Store Inventory
					</button>
				</div>
			</form>
		);
	};

	const f = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
	const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

	let combinationsOfColorSizes = cartesian(chosenSizes, chosenColors);

	console.log(combinationsOfColorSizes, "Main Combination");

	for (let i = 1; i <= combinationsOfColorSizes.length; i++) {
		// console.log(combinationsOfColorSizes[i - 1], "From first Loop");

		for (let ii = 1; ii < combinationsOfColorSizes[i - 1].length; ii++) {
			productAttributes = [
				...productAttributes,
				{
					size: combinationsOfColorSizes[i - 1][ii - 1],
					color: combinationsOfColorSizes[i - 1][ii],
					quantity: 0,
					receivedQuantity: 0,
					price: inheritPrice ? parentPrice2 : 0,
					priceAfterDiscount: inheritPrice ? parentPrice3 : 0,
					MSRP: inheritPrice ? parentPrice1 : 0,
					WholeSalePrice: inheritPrice ? parentPrice4 : 0,
					DropShippingPrice: inheritPrice ? parentPrice5 : 0,
					productImages:
						productAttributesFinal &&
						productAttributesFinal.length > 0 &&
						combinationsOfColorSizes[i - 1][ii - 1] ===
							productAttributesFinal[i] &&
						productAttributesFinal[i].size &&
						combinationsOfColorSizes[i - 1][ii] === productAttributesFinal[i] &&
						productAttributesFinal[i].color &&
						productAttributesFinal[i].productImages &&
						productAttributesFinal[i].productImages.length > 0
							? productAttributesFinal[i].productImages
							: [],
					SubSKU: inheritParentSKU
						? productSKU +
						  "-" +
						  (allColors &&
								allColors[0] &&
								allColors[
									allColors
										.map((i) => i.hexa)
										.indexOf(combinationsOfColorSizes[i - 1][ii])
								].color.substring(0, 3)) +
						  "-" +
						  combinationsOfColorSizes[i - 1][ii - 1].substring(0, 4)
						: "",
					PK:
						combinationsOfColorSizes[i - 1][ii - 1] +
						combinationsOfColorSizes[i - 1][ii],
				},
			];
		}
	}

	useEffect(() => {
		setProductAttributesFinal(productAttributes);
		// eslint-disable-next-line
	}, [
		variablesSubmit,
		chosenSizes,
		chosenColors,
		inheritPrice,
		inheritParentSKU,
	]);

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

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

	const upperMainMenu = () => {
		return (
			<ul className='mainUL'>
				<div className='row'>
					<div className='col-3 mx-auto'>
						<li
							className='my-2 mainLi'
							onClick={() => setClickedLink("MainData")}
							style={isActive("MainData", clickedLink)}>
							Basic/ Main Data
						</li>
					</div>

					{/* <div className='col-3 mx-auto'>
					<li
						className='my-2 mainLi'
						onClick={() => setClickedLink("AddCategorySubcategory")}
						style={isActive("AddCategorySubcategory", clickedLink)}>
						Add Category/ Subcategory
					</li>
				</div> */}

					<div className='col-3 mx-auto'>
						{!addVariables ? (
							<>
								<li
									className='my-2 mainLi'
									onClick={() => setClickedLink("AddPrices")}
									style={isActive("AddPrices", clickedLink)}>
									Product Prices And Stock
								</li>
							</>
						) : (
							<>
								<li
									className='my-2 mainLi'
									onClick={() => setClickedLink("AddVariables")}
									style={isActive("AddVariables", clickedLink)}>
									Product Attributes
								</li>
							</>
						)}
					</div>

					<div className='col-3 mx-auto'>
						<li
							className='my-2 mainLi'
							onClick={() => setClickedLink("ExtraOptions")}
							style={isActive("ExtraOptions", clickedLink)}>
							Product Extra Options
						</li>
					</div>
				</div>
				<div className='col-md-9 mx-auto'>
					<hr />
				</div>
			</ul>
		);
	};

	return (
		<AddProductWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AddProduct'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='AddProduct' pageScrolled={pageScrolled} />

					{/* <h3
						className='mx-auto text-center py-2 col-md-6 mx-auto'
						style={{
							color: "#009ef7",
							fontWeight: "bold",
							background: "white",
							fontSize: "1.2rem",
						}}>
						{clickedLink === "MainData"
							? "Add A New Product (Basic Data)"
							: clickedLink === "AddCategorySubcategory"
							? `Add Category & Subcategory For Product ${productName}`
							: clickedLink === "AddPrices"
							? `Add Prices & Inventory For Product ${productName}`
							: clickedLink === "ExtraOptions"
							? "Add Product Features & Status"
							: "Add Suitable Variables and Photos"}
					</h3> */}

					<div className='row mt-4'>
						<div className='col-md-3' data-aos='fade-up'>
							<h3
								className='ml-5'
								style={{
									color: "black",
									fontWeight: "bold",
									// background: "white",
									fontSize: "1.2rem",
									padding: "4px 2px",
									maxWidth: "80%",
								}}>
								Product Form
							</h3>
							{addVariables ? (
								<div className='ml-5 '>{FileUploadThumbnail2()}</div>
							) : (
								<div className='ml-5 '>{FileUploadThumbnail()}</div>
							)}

							{CategorySubcategoryEntry()}
						</div>

						{clickedLink === "MainData" ? (
							<div
								data-aos='fade-down'
								className='col-md-8 ml-3 rightContentWrapper'
								// style={{ borderLeft: "darkred 2px solid" }}
							>
								{upperMainMenu()}
								{BasicDataFormFunction()}
							</div>
						) : null}

						{clickedLink === "AddPrices" ? (
							<div
								className='col-8 ml-3 rightContentWrapper'
								// style={{ borderLeft: "darkred 2px solid" }}
							>
								{upperMainMenu()}

								{AddPricesStockBasic()}
							</div>
						) : null}

						{clickedLink === "AddVariables" ? (
							<div
								className='col-8 ml-3 rightContentWrapper'
								// style={{ borderLeft: "darkred 2px solid" }}
							>
								{upperMainMenu()}

								{AddingProductVariableFunction()}
							</div>
						) : null}

						{clickedLink === "ExtraOptions" ? (
							<div
								className='col-8 ml-3 rightContentWrapper'
								// style={{ borderLeft: "darkred 2px solid" }}
							>
								{upperMainMenu()}

								{extraFeatures()}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</AddProductWrapper>
	);
};

export default AddProduct;

const AddProductWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	margin-bottom: 20px;
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
		/* margin-top: 50px; */
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

	@media (max-width: 1750px) {
		background: white;

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
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 12% 88%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
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
