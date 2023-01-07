/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import { isAuthenticated } from "../../auth/index";
import {
	cloudinaryUpload1,
	getAllUsers,
	getStores,
	updateUserByAdmin,
} from "../apiAdmin";
import Resizer from "react-image-file-resizer";
import axios from "axios";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployeeSingle = ({ match }) => {
	const { user, token } = isAuthenticated();
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allStore, setAllStores] = useState([]);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		activeUser: true,
		success: false,
		misMatch: false,
		loading: false,
		employeeImage: "",
		role: 1,
		userRole: "",
		userStore: "",
	});

	const { name, email, password, password2, employeeImage } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			misMatch: false,
			[name]: event.target.value,
		});
	};

	const gettingAllStores = () => {
		getStores(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllStores(data);
			}
		});
	};

	useEffect(() => {
		gettingAllStores();
		// eslint-disable-next-line
	}, []);

	const gettingAllUsers = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "getting all users error");
			} else {
				setValues({
					...values,
					name:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].name,
					email:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].email,
					role:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].role,

					userRole:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].userRole,

					userStore:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].userStore,

					employeeImage:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].employeeImage,
				});
			}
		});
	};

	useEffect(() => {
		gettingAllUsers();

		// eslint-disable-next-line
	}, [match.params.userId]);

	const clickSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setValues({
				...values,
				success: false,
				misMatch: true,
			});

			return <React.Fragment>{toast.error(MisMatchError)}</React.Fragment>;
		} else {
			updateUserByAdmin(match.params.userId, user._id, token, {
				userId: match.params.userId,
				name: values.name,
				role: values.role,
				password: values.password,
				activeUser: values.activeUser,
				employeeImage: employeeImage,
				email: values.email,
				userRole: values.userRole,
				userStore: values.userStore,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					window.scrollTo({ top: 0, behavior: "smooth" });
					toast.success("Employee was successfully Updated.");
					setTimeout(function () {
						window.location.reload(false);
					}, 2000);
				}
			});
		}
	};

	const signUpForm = () => (
		<FormSignup>
			<div className='container-fluid mx-auto'>
				<div className='col-xl-8  mx-auto '>
					<div
						className='form-container text-center p-4'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
						}}>
						<h1 className='mb-3'>
							Account <span className='text-primary'>Update</span>
						</h1>
						<div className='mt-5 col-10'>
							<div className='col-12'>
								{addThumbnail &&
									addThumbnail.images &&
									addThumbnail.images.map((image, ii) => {
										return (
											<div className='my-3 mx-auto col-3 ' key={ii}>
												<button
													type='button'
													className='close'
													onClick={() => {
														handleImageRemove(image.public_id);

														var array = addThumbnail.images.filter(function (
															s,
														) {
															return s.public_id !== image.public_id;
														});

														setAddThumbnail({
															images: array,
														});
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
						<form onSubmit={clickSubmit}>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='name' style={{ fontWeight: "bold" }}>
									Full Name
								</label>
								<input
									className='w-75 mx-auto'
									type='text'
									name='name'
									value={name}
									onChange={handleChange("name")}
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Phone or Email
								</label>
								<input
									className='w-75 mx-auto'
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
								/>
							</div>

							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password' style={{ fontWeight: "bold" }}>
									Password
								</label>
								<input
									className='w-75 mx-auto'
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									Confirm Password
								</label>
								<input
									className='w-75 mx-auto'
									type='password'
									name='password2'
									value={password2}
									onChange={handleChange("password2")}
								/>
							</div>

							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									Update Employee Role
								</label>
								<select
									onChange={handleChosenRole}
									className='w-75 mx-auto'
									style={{ fontSize: "0.80rem" }}>
									{values.userRole ? (
										<option>{values.userRole}</option>
									) : (
										<option>Please select / Required*</option>
									)}

									<option value='Admin Account'>Admin Account</option>
									<option value='Owner Account'>Owner Account</option>
									<option value='Order Taker'>Order Taker</option>
									<option value='Operations'>Operations</option>
									<option value='Finance'>Finance</option>
								</select>
							</div>

							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									Update Associated Store
								</label>
								<select
									onChange={handleChosenStore}
									className='w-75 mx-auto'
									style={{ fontSize: "0.80rem" }}>
									{values.userRole ? (
										<option>{values.userStore}</option>
									) : (
										<option>Please select / Required*</option>
									)}

									{allStore &&
										allStore.map((s, i) => {
											return (
												<option
													key={i}
													value={s.storeName}
													style={{ textTransform: "uppercase" }}>
													{s.storeName}
												</option>
											);
										})}
								</select>
							</div>

							<input
								type='submit'
								value='Update Employee'
								className='btn btn-primary w-75 btn-block mx-auto mt-4'
								//onClick={sendEmail}
							/>
						</form>
						<hr />
					</div>
				</div>
			</div>
		</FormSignup>
	);

	const handleChosenRole = (event) => {
		setValues({ ...values, userRole: event.target.value });
	};

	const handleChosenStore = (event) => {
		setValues({ ...values, userStore: event.target.value });
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
								console.log(allUploadedFiles, "AllUploadedFiles");
								setValues({
									...values,
									error: false,
									misMatch: false,
									employeeImage: allUploadedFiles[0].url,
								});
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
					style={{
						cursor: "pointer",
						fontSize: "0.95rem",
						marginLeft: "100px",
					}}>
					Update Employee Image
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

	const handleImageRemove = (public_id) => {
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
				const { images } = addThumbnail;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setAddThumbnail({ ...addThumbnail, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				window.location.reload(false);
			});
	};

	const MisMatchError = "Passwords Don't Match, Please Try Again!!";

	return (
		<UpdateEmployeeSingleWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" || user.userRole === "Operations" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='UpdateEmployee'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='AddEmployee' />
					<h3 className='mx-auto text-center mb-5'>Update Employee</h3>
					{signUpForm()}
				</div>
			</div>
		</UpdateEmployeeSingleWrapper>
	);
};

export default UpdateEmployeeSingle;

const FormSignup = styled.div`
	margin-top: 1.5%;
	margin-bottom: 95px;
	input[type="text"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
	}
	input[type="text"]:focus,
	input[type="email"]:focus,
	input[type="password"]:focus,
	input[type="date"]:focus,
	select:focus,
	textarea:focus,
	label:focus {
		outline: none;
		border: 1px solid var(--primaryColor);

		box-shadow: 5px 8px 3px 0px rgba(0, 0, 0, 0.3);
		transition: 0.3s;
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 900px) {
		font-size: 14px !important;
		h1 {
			font-size: 1.5rem;
		}
		.loginFont {
			font-size: 13px;
		}
	}
`;

const UpdateEmployeeSingleWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: 15.5% 84.5%;
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}

	.tableData {
		overflow-x: auto;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 50px;
		margin-left: 50px;
		.table > tbody > tr > td {
			vertical-align: middle !important;
		}
		@media (max-width: 1100px) {
			font-size: 0.5rem;
			/* margin-right: 5px;
		margin-left: 5px; */
		}
	}
`;
