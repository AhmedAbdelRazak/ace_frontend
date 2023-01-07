/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	updateSubcategory,
	getCategories,
	getSubCategories,
	cloudinaryUpload1,
} from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
// eslint-disable-next-line
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateSubcategorySingle = ({ match }) => {
	// eslint-disable-next-line
	const [allCategories, setAllCategories] = useState([]);
	const { user, token } = isAuthenticated();
	const [selectedSubcategory, setSelectedSubcategory] = useState({});
	const [SubcategoryName, setSubcategoryName] = useState("");
	const [SubcategoryName_Arabic, setSubcategoryName_Arabic] = useState("");
	const [subCategoryStatus, setSubCategoryStatus] = useState("1");
	// eslint-disable-next-line
	const [linkClick, setLinkClick] = useState(false);
	const [loading, setLoading] = useState(false);
	const [SubcategorySlug, setSubcategorySlug] = useState("");
	const [SubcategorySlug_Arabic, setSubcategorySlug_Arabic] = useState("");
	const [categoryId, setSubCategory_CategoryId] = useState("");
	// eslint-disable-next-line
	const [allSubCategoriesForCheck, setAllSubCategoriesForCheck] = useState([]);
	// eslint-disable-next-line
	const [allSubCategories, setAllSubcategories] = useState([]);
	const [imageDeletedFlag1, setImageDeletedFlag1] = useState(false);
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllCategories = () => {
		getCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data);

				//gettingSubCategories
				getSubCategories(token).then((data2) => {
					if (data2.error) {
						console.log(data2.error, "error getting subcategories");
					} else {
						setAllSubcategories(data2);
						setAllSubCategoriesForCheck(
							data2.map(
								(subcategory) =>
									subcategory.SubcategoryName.toLowerCase().replace(
										/\s/g,
										"",
									) &&
									subcategory.SubcategoryName.toLowerCase()
										.replace(/\s/g, "")
										.concat(subcategory.categoryId),
							),
						);
						setSelectedSubcategory(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId),
						);
						setSubcategoryName(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.SubcategoryName,
						);
						setSubcategoryName_Arabic(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.SubcategoryName_Arabic,
						);
						setSubcategorySlug(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.SubcategorySlug,
						);
						setSubcategorySlug_Arabic(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.SubcategorySlug_Arabic,
						);
						setSubCategory_CategoryId(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.categoryId,
						);
						setSubCategoryStatus(
							match.params.subcategoryId &&
								match.params.subcategoryId !== "undefined" &&
								data2.filter((s) => s._id === match.params.subcategoryId)[0]
									.subCategoryStatus,
						);
					}
				});
				//End Of GettingSubCategories
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, [match.params.subcategoryId, loading]);

	const handleChange1 = (e) => {
		setSubcategoryName(e.target.value);
		setSubcategorySlug(e.target.value.split(" ").join("-"));
	};

	const handleChange2 = (e) => {
		setSubCategory_CategoryId(e.target.value);
	};
	const handleChange3 = (e) => {
		setSubcategoryName_Arabic(e.target.value);
		setSubcategorySlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const handleChange5 = (e) => {
		setSubCategoryStatus(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (subCategoryStatus === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Subcategory?",
				)
			) {
				updateSubcategory(match.params.subcategoryId, user._id, token, {
					SubcategoryName,
					SubcategoryName_Arabic,
					subCategoryStatus,
					SubcategorySlug,
					SubcategorySlug_Arabic,
					categoryId,
					thumbnail:
						addThumbnail && addThumbnail.images !== undefined
							? addThumbnail && addThumbnail.images
							: selectedSubcategory &&
							  selectedSubcategory.length > 0 &&
							  selectedSubcategory[0].thumbnail,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
						setLoading(false);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					} else {
						toast.success("Subcategory was successfully Updated.");
						setTimeout(function () {
							setLinkClick(false);
							setLoading(false);
						}, 2000);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					}
				});
			}
		} else {
			updateSubcategory(match.params.subcategoryId, user._id, token, {
				SubcategoryName,
				SubcategoryName_Arabic,
				subCategoryStatus,
				SubcategorySlug,
				SubcategorySlug_Arabic,
				categoryId,
				thumbnail:
					addThumbnail && addThumbnail.images !== undefined
						? addThumbnail && addThumbnail.images
						: selectedSubcategory &&
						  selectedSubcategory.length > 0 &&
						  selectedSubcategory[0].thumbnail,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
					setLoading(false);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else {
					toast.success("Subcategory was successfully Updated.");
					setTimeout(function () {
						setLinkClick(false);
						setLoading(false);
					}, 2000);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				}
			});
		}
	};

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail;
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
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.85rem" }}>
					Update Subcategory Thumbnail
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail}
					/>
				</label>
			</>
		);
	};
	// console.log(addThumbnail);

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
				setLoading(false);
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	return (
		<UpdateSubcategorySingleWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateSubcategory'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='col-8'>
					<div className='contentWrapper' data-aos='fade-down'>
						<form
							onSubmit={clickSubmit}
							className=''
							// style={{ borderLeft: "1px solid brown" }}
						>
							<h3
								style={{
									fontSize: "1.15rem",
									fontWeight: "bold",
									textTransform: "capitalize",
									color: "#009ef7",
								}}
								className='text-center mt-1'>
								The Selected Subcategory is "
								{selectedSubcategory &&
									selectedSubcategory[0] &&
									selectedSubcategory[0].SubcategoryName}
								"
							</h3>
							<div className='m-3 col-8'>
								<div className='col-12'>
									{addThumbnail && addThumbnail.images !== undefined ? (
										<>
											{addThumbnail.images.map((image) => {
												return (
													<div className='m-3 col-2'>
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
										</>
									) : (
										<>
											{imageDeletedFlag1 ? null : (
												<div className='m-3 col-2 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(
																selectedSubcategory &&
																	selectedSubcategory.length > 0 &&
																	selectedSubcategory[0].thumbnail[0].public_id,
															);
															setAddThumbnail([]);
															setImageDeletedFlag1(true);
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
														src={
															selectedSubcategory &&
															selectedSubcategory.length > 0 &&
															selectedSubcategory[0].thumbnail[0].url
														}
														alt='Img Not Found'
														style={{
															width: "90px",
															height: "90px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
													/>
												</div>
											)}
										</>
									)}
								</div>
								{FileUploadThumbnail()}
							</div>
							<div className='form-group mt-5 '>
								<label className='text-muted'>Subcategory Name</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange1}
									value={SubcategoryName}
								/>
							</div>
							<div className='form-group mt-5 '>
								<label className='text-muted'>اسم الفئة الفرعية</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange3}
									value={SubcategoryName_Arabic}
								/>
							</div>

							<div className='form-group my-4 '>
								<label className='text-muted'>Category</label>
								<select onChange={handleChange2} className='form-control'>
									<option>Please select a category</option>
									{allCategories &&
										allCategories.map((c, i) => {
											return (
												<option
													style={{ textTransform: "capitalize" }}
													value={c._id}
													key={i}
													selected={c._id === categoryId}>
													{c.categoryName}
												</option>
											);
										})}
								</select>
							</div>

							<div className='form-group'>
								<label className='text-muted'>Active Subcategory?</label>
								<select
									onChange={handleChange5}
									className='form-control'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
									<option value='0'>Deactivate Subcategory</option>
									<option value='1'>Activate Subcategory</option>
								</select>
							</div>
							<button className='btn btn-outline-primary mb-3'>
								Update Subcategory
							</button>
						</form>
					</div>
				</div>
			</div>
		</UpdateSubcategorySingleWrapper>
	);
};

export default UpdateSubcategorySingle;

const UpdateSubcategorySingleWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;

	.contentWrapper {
		margin-top: 100px;
		margin-bottom: 15px;
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
	}
`;
