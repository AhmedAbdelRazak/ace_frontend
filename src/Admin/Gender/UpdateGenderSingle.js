/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import { getGenders, updateGender, cloudinaryUpload1 } from "../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../../auth";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateGenderSingle = ({ match }) => {
	// eslint-disable-next-line
	const [allGenders, setAllGenders] = useState([]);
	const { user, token } = isAuthenticated();
	const [selectedGender, setSelectedGender] = useState([]);
	const [genderName, setGenderName] = useState("");
	const [genderName_Arabic, setGenderName_Arabic] = useState("");
	const [genderNameStatus, setGenderNameStatus] = useState("1");
	const [loading, setLoading] = useState(true);
	const [genderNameSlug, setGenderNameSlug] = useState("");
	const [genderNameSlug_Arabic, setGenderNameSlug_Arabic] = useState("");
	// eslint-disable-next-line
	const [imageDeletedFlag1, setImageDeletedFlag1] = useState(false);
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllGenders = () => {
		setLoading(true);
		getGenders(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllGenders(data);
				setSelectedGender(
					match.params.genderId &&
						match.params.genderId !== "undefined" &&
						data.filter((s) => s._id === match.params.genderId),
				);
				setGenderName(
					match.params.genderId &&
						match.params.genderId !== "undefined" &&
						data.filter((s) => s._id === match.params.genderId)[0].genderName,
				);
				setGenderNameSlug(
					match.params.genderId &&
						match.params.genderId !== "undefined" &&
						data.filter((s) => s._id === match.params.genderId)[0]
							.genderNameSlug,
				);
				setGenderName_Arabic(
					match.params.genderId &&
						match.params.genderId !== "undefined" &&
						data.filter((s) => s._id === match.params.genderId)[0]
							.genderName_Arabic,
				);
				setGenderNameSlug_Arabic(
					match.params.genderId &&
						match.params.genderId !== "undefined" &&
						data.filter((s) => s._id === match.params.genderId)[0]
							.genderNameSlug_Arabic,
				);

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllGenders();
		// eslint-disable-next-line
	}, [match.params.genderId]);

	const handleChange1 = (e) => {
		setGenderName(e.target.value);
		setGenderNameSlug(e.target.value.split(" ").join("-"));
	};

	const handleChange2 = (e) => {
		setGenderName_Arabic(e.target.value);
		setGenderNameSlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const handleChange5 = (e) => {
		setGenderNameStatus(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (genderNameStatus === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Gender?",
				)
			) {
				updateGender(match.params.genderId, user._id, token, {
					genderName,
					genderName_Arabic,
					genderNameStatus,
					genderNameSlug,
					genderNameSlug_Arabic,
					thumbnail:
						addThumbnail && addThumbnail.images !== undefined
							? addThumbnail && addThumbnail.images
							: selectedGender &&
							  selectedGender.length > 0 &&
							  selectedGender[0].thumbnail,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
						setLoading(false);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					} else {
						toast.success("Gender was successfully Updated.");
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
			updateGender(match.params.genderId, user._id, token, {
				genderName,
				genderName_Arabic,
				genderNameStatus,
				genderNameSlug,
				genderNameSlug_Arabic,
				thumbnail:
					addThumbnail && addThumbnail.images !== undefined
						? addThumbnail && addThumbnail.images
						: selectedGender &&
						  selectedGender.length > 0 &&
						  selectedGender[0].thumbnail,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
					setLoading(false);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else {
					toast.success("Gender was successfully Updated.");
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
					Update Gender Thumbnail
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
		<UpdateGenderSingleWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<ToastContainer />
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateGender'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{selectedGender && allGenders && !loading ? (
					<div className='col-8 contentWrapper'>
						<form
							onSubmit={clickSubmit}
							className='col-md-5 mx-auto'
							// style={{ borderLeft: "1px solid brown" }}
						>
							<h3
								style={{
									fontSize: "1.15rem",
									color: "#009ef7",
									fontWeight: "bold",
								}}
								className='text-center mt-1'>
								The Selected Gender is "
								{selectedGender &&
									selectedGender[0] &&
									selectedGender[0].genderName}
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
																selectedGender &&
																	selectedGender.length > 0 &&
																	selectedGender[0].thumbnail[0].public_id,
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
															selectedGender &&
															selectedGender.length > 0 &&
															selectedGender[0].thumbnail[0].url
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
								<label className='text-muted'>Gender Name</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange1}
									value={genderName}
								/>
							</div>
							<div className='form-group '>
								<label className='text-muted'> نوع الجنس</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange2}
									value={genderName_Arabic}
								/>
							</div>

							<div className='form-group'>
								<label className='text-muted'>Active Gender?</label>
								<select
									onChange={handleChange5}
									className='form-control'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
									<option value='0'>Deactivate Gender</option>
									<option value='1'>Activate Gender</option>
								</select>
							</div>
							<button className='btn btn-outline-primary mb-3'>
								Update Gender
							</button>
						</form>
					</div>
				) : (
					<div className='mx-auto'>Loading</div>
				)}
			</div>
		</UpdateGenderSingleWrapper>
	);
};

export default UpdateGenderSingle;

const UpdateGenderSingleWrapper = styled.div`
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
