/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import { getCategories, updateCategory, cloudinaryUpload1 } from "../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../../auth";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const UpdateCategorySingle = ({ match }) => {
	// eslint-disable-next-line
	const [allCategories, setAllCategories] = useState([]);
	const { user, token } = isAuthenticated();
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const [categoryName_Arabic, setCategoryName_Arabic] = useState("");
	const [categoryStatus, setCategoryStatus] = useState("1");
	const [loading, setLoading] = useState(true);
	const [categorySlug, setCategorySlug] = useState("");
	const [categorySlug_Arabic, setCategorySlug_Arabic] = useState("");
	// eslint-disable-next-line
	const [imageDeletedFlag1, setImageDeletedFlag1] = useState(false);
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllCategories = () => {
		setLoading(true);
		getCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data);
				setSelectedCategory(
					match.params.categoryId &&
						match.params.categoryId !== "undefined" &&
						data.filter((s) => s._id === match.params.categoryId),
				);
				setCategoryName(
					match.params.categoryId &&
						match.params.categoryId !== "undefined" &&
						data.filter((s) => s._id === match.params.categoryId)[0]
							.categoryName,
				);
				setCategorySlug(
					match.params.categoryId &&
						match.params.categoryId !== "undefined" &&
						data.filter((s) => s._id === match.params.categoryId)[0]
							.categorySlug,
				);
				setCategoryName_Arabic(
					match.params.categoryId &&
						match.params.categoryId !== "undefined" &&
						data.filter((s) => s._id === match.params.categoryId)[0]
							.categoryName_Arabic,
				);
				setCategorySlug_Arabic(
					match.params.categoryId &&
						match.params.categoryId !== "undefined" &&
						data.filter((s) => s._id === match.params.categoryId)[0]
							.categorySlug_Arabic,
				);

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, [match.params.categoryId]);

	const handleChange1 = (e) => {
		setCategoryName(e.target.value);
		setCategorySlug(e.target.value.split(" ").join("-"));
	};

	const handleChange2 = (e) => {
		setCategoryName_Arabic(e.target.value);
		setCategorySlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const handleChange5 = (e) => {
		setCategoryStatus(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (categoryStatus === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Category?",
				)
			) {
				updateCategory(match.params.categoryId, user._id, token, {
					categoryName,
					categoryName_Arabic,
					categoryStatus,
					categorySlug,
					categorySlug_Arabic,
					thumbnail:
						addThumbnail && addThumbnail.images !== undefined
							? addThumbnail && addThumbnail.images
							: selectedCategory &&
							  selectedCategory.length > 0 &&
							  selectedCategory[0].thumbnail,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
						setLoading(false);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					} else {
						toast.success("Category was successfully Updated.");
						setTimeout(function () {
							setLoading(false);
						}, 2000);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					}
				});
			}
		} else {
			updateCategory(match.params.categoryId, user._id, token, {
				categoryName,
				categoryName_Arabic,
				categoryStatus,
				categorySlug,
				categorySlug_Arabic,
				thumbnail:
					addThumbnail && addThumbnail.images !== undefined
						? addThumbnail && addThumbnail.images
						: selectedCategory &&
						  selectedCategory.length > 0 &&
						  selectedCategory[0].thumbnail,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
					setLoading(false);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else {
					toast.success("Category was successfully Updated.");
					setTimeout(function () {
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
					Update Category Thumbnail
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
		<UpdateCategorySingleWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			<ToastContainer />
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateCategory'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='col-8'>
					{selectedCategory && allCategories && !loading ? (
						<div className='contentWrapper'>
							<form
								onSubmit={clickSubmit}
								className='col-md-5 mx-auto'
								// style={{ borderLeft: "1px solid brown" }}
							>
								<h3
									style={{
										color: "#009ef7",
										fontSize: "1.15rem",
										fontWeight: "bold",
									}}
									className='text-center mt-1'>
									The Selected Category is "
									{selectedCategory &&
										selectedCategory[0] &&
										selectedCategory[0].categoryName}
									"
								</h3>
								<div className='m-3 col-8'>
									<div className='col-12'>
										{addThumbnail && addThumbnail.images !== undefined ? (
											<>
												{addThumbnail.images.map((image) => {
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
											</>
										) : (
											<>
												{imageDeletedFlag1 ? null : (
													<div className='m-3 col-6 '>
														<button
															type='button'
															className='close'
															onClick={() => {
																handleImageRemove(
																	selectedCategory &&
																		selectedCategory.length > 0 &&
																		selectedCategory[0].thumbnail[0].public_id,
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
																selectedCategory &&
																selectedCategory.length > 0 &&
																selectedCategory[0].thumbnail[0].url
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
									<label className='text-muted'>Category Name</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange1}
										value={categoryName}
									/>
								</div>
								<div className='form-group '>
									<label className='text-muted'> اسم الفئة </label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange2}
										value={categoryName_Arabic}
									/>
								</div>

								<div className='form-group'>
									<label className='text-muted'>Active Category?</label>
									<select
										onChange={handleChange5}
										className='form-control'
										style={{ fontSize: "0.80rem" }}>
										<option>Please select / Required*</option>
										<option value='0'>Deactivate Category</option>
										<option value='1'>Activate Category</option>
									</select>
								</div>
								<button className='btn btn-outline-primary mb-3'>
									Update Category
								</button>
							</form>
						</div>
					) : (
						<div className='mx-auto'>Loading</div>
					)}
				</div>
			</div>
		</UpdateCategorySingleWrapper>
	);
};

export default UpdateCategorySingle;

const UpdateCategorySingleWrapper = styled.div`
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
