/** @format */

// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import { signup, isAuthenticated } from "../../auth";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { cloudinaryUpload1, getStores } from "../apiAdmin";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const AddEmployee = () => {
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allStore, setAllStores] = useState([]);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		employeeImage: "",
		success: false,
		role: 1,
		misMatch: false,
		loading: false,
		userRole: "Order Taker",
		userStore: "g&q",
	});

	// eslint-disable-next-line
	const {
		name,
		email,
		password,
		password2,
		misMatch,
		employeeImage,
		// eslint-disable-next-line
		role,
		userRole,
		userStore,
	} = values;

	const { user, token } = isAuthenticated();

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

	const clickSubmit = (event) => {
		event.preventDefault();
		if (!name) {
			return toast.error("Name is Required");
		}

		if (!email) {
			return toast.error("Email Or Phone Is Required");
		}
		if (!password) {
			return toast.error("Password Is Required");
		}

		if (!employeeImage) {
			return toast.error("Please Add Employee Image");
		}

		if (password !== password2) {
			setValues({
				...values,
				success: false,
				misMatch: true,
			});
			return <React.Fragment>{toast.error(MisMatchError)}</React.Fragment>;
		} else {
			setValues({ ...values, error: false, misMatch: false });
			signup({
				name,
				email,
				password,
				password2,
				employeeImage,
				misMatch,
				role: 1,
				userRole,
				userStore,
			}).then((data) => {
				console.log(data);
				if (data.error || data.misMatch) {
					setValues({ ...values, error: data.error, success: false });
					toast.error(data.error);
				} else {
					window.scrollTo({ top: 0, behavior: "smooth" });
					toast.success("Employee Was Successfully Added");
					setValues({
						name: "",
						email: "",
						password: "",
						password2: "",
						error: "",
						employeeImage: "",
						success: false,
						misMatch: false,
						loading: false,
						userStore: "",
					});
					setTimeout(function () {
						window.location.reload(false);
					}, 2000);
				}
			});
		}
	};

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
					Add Employee Image (Required)
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail}
						required
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

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	const signUpForm = () => (
		<FormSignup>
			<div className='container-fluid mx-auto' data-aos='fade-down'>
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
							Account <span className='text-primary'>Register</span>
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
									Add Employee Role
								</label>
								<select
									onChange={handleChosenRole}
									className='w-75 mx-auto'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
									<option value='Admin Account'>Admin Account</option>
									<option value='Owner Account'>Owner Account</option>
									<option value='Order Taker'>Order Taker</option>
									<option value='Operations'>Operations</option>
									<option value='Finance'>Finance</option>
									<option value='offlineStore'>Offline Store</option>
								</select>
							</div>

							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									Add Associated Store
								</label>
								<select
									onChange={handleChosenStore}
									className='w-75 mx-auto'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
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
								value='Register'
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

	const MisMatchError = "Passwords Don't Match, Please Try Again!!";

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

	return (
		<AddEmployeeWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AddEmployee'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='AddEmployee' pageScrolled={pageScrolled} />
					<h3 className='mx-auto text-center mb-5'>Add A New Employee/ User</h3>
					{signUpForm()}
				</div>
			</div>
		</AddEmployeeWrapper>
	);
};

export default AddEmployee;

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

const AddEmployeeWrapper = styled.div`
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
