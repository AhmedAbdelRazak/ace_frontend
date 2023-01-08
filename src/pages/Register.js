/** @format */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import {
	signup,
	authenticate,
	isAuthenticated,
	signin,
	authenticate2,
} from "../auth";
// eslint-disable-next-line
import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import ReactGA from "react-ga";
// eslint-disable-next-line
import Helmet from "react-helmet";

const Register = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		success: false,
		misMatch: false,
		loading: false,
	});

	const { name, email, password, password2, success, misMatch, loading } =
		values;

	console.log(success);

	// eslint-disable-next-line
	const { user } = isAuthenticated();
	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			misMatch: false,
			[name]: event.target.value,
		});
	};

	console.log(loading);

	// eslint-disable-next-line
	const informParent = (response) => {
		setValues({ ...values, error: false, loading: true });
		if (response.error) {
			setValues({ ...values, error: response.error, loading: false });
			toast.error(response.error);
		} else {
			authenticate2(response, () => {
				setValues({
					...values,
				});
			});
		}
	};

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
				misMatch,
			}).then((data) => {
				console.log(data);
				if (data.error || data.misMatch) {
					setValues({ ...values, error: data.error, success: false });
					toast.error(data.error);
				} else
					signin({ email, password }).then((data) => {
						if (data.error) {
							setValues({ ...values, error: data.error, loading: false });
						} else {
							authenticate(data, () => {
								setValues({
									...values,
								});
								window.location.reload(false);
							});
						}
					});
			});
		}
	};

	const redirectUser = () => {
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const signUpForm = () => (
		<FormSignup>
			<div className='container-fluid mx-auto'>
				<div className='col-lg-6  mx-auto '>
					<div
						className='form-container text-center p-4'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							// boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<h1 className='mb-3'>
							Account <span className='text-primary'>Register</span>
						</h1>
						{/* <Google informParent={informParent} /> */}
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
									Phone
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
							<input
								type='submit'
								value='Register'
								className='btn btn-primary w-75 btn-block mx-auto'
								//onClick={sendEmail}
							/>
						</form>
						<hr />
						<p
							style={{
								fontSize: "0.9rem",
								textAlign: "center",
							}}>
							If You Already have an account, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
								<Link to='/signin' className='btn btn-sm btn-outline-primary'>
									Login Here
								</Link>
							</strong>
						</p>
						<hr />
					</div>
				</div>
			</div>
		</FormSignup>
	);

	const MisMatchError = "Passwords Don't Match, Please Try Again!!";

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<WholeSignup>
			<Helmet>
				<meta charSet='utf-8' />
				<title>ACE Sports Wear Online Shop | Account Register</title>
				<meta
					name='description'
					content='ACE Online Shop Platform Developed By https://infinite-apps.com'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			<br />

			<ToastContainer />

			{signUpForm()}
			{redirectUser()}
		</WholeSignup>
	);
};

export default Register;

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

		box-shadow: 2px 5px 1px 0px rgba(0, 0, 0, 0.3);
		transition: 0.3s;
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 900px) {
		.form-container {
			margin-left: 10px;
			margin-right: 10px;
		}

		h1 {
			font-size: 1.5rem;
		}
		h1 > span {
			font-size: 1.5rem;
		}
		.loginFont {
			font-size: 13px;
		}

		input {
			width: 100% !important;
		}
	}
`;

const WholeSignup = styled.div`
	background: #dbe4eb;
	padding-bottom: 15px;
	.infiniteAppsLogo {
		width: 159px;
		height: 79px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		/* border-radius: 15px; */
	}

	.imgLogo {
		width: 189px;
		height: 109px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 50px;
		border-radius: 15px;
	}
	.kokoko {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		/* text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1); */
		letter-spacing: 2px;
	}
	.kokoko2 {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		/* text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1); */
		letter-spacing: 2px;
	}
	.kokoko3 {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		/* text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1); */
		letter-spacing: 2px;
	}
	@media (max-width: 1000px) {
		.infiniteAppsLogo {
			width: 48px;
			height: 48px;
		}
	}
`;
