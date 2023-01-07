/** @format */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	signup,
	authenticate,
	isAuthenticated,
	signin,
	authenticate2,
} from "../../../auth";
// eslint-disable-next-line
import Google from "../../../auth/Google";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import ReactGA from "react-ga";

const Register = ({ setSignRegister }) => {
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
							});
						}
					});
			});
		}
	};

	const signUpForm = () => (
		<FormSignup>
			<div className='container-fluid mx-auto'>
				<div className='mx-auto text-center'>
					<h1>
						<span className='storeName'>ACE Online Shop</span>
					</h1>
				</div>
				<div className=' mx-auto'>
					<div
						className='form-container'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							// boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<h1 className='mb-2 text-center'>
							Account <span className='text-primary'>Register</span>{" "}
						</h1>
						{/* <Google informParent={informParent} /> */}
						<form onSubmit={clickSubmit}>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='name' style={{ fontWeight: "bold" }}>
									Full Name
								</label>
								<input
									className='w-50 mx-auto'
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
									className='w-50 mx-auto'
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
									className='w-50 mx-auto'
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
									className='w-50 mx-auto'
									type='password'
									name='password2'
									value={password2}
									onChange={handleChange("password2")}
								/>
							</div>
							<input
								type='submit'
								value='Register'
								className='btn btn-primary w-50 btn-block mx-auto'
								//onClick={sendEmail}
							/>
						</form>
						<hr />
						<p
							onClick={() => {
								setSignRegister("Login");
							}}
							style={{
								fontSize: "0.9rem",
								textAlign: "center",
							}}>
							Already have an account, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
								<Link to='+' className='btn btn-sm btn-outline-primary'>
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

	return <WholeSignup>{signUpForm()}</WholeSignup>;
};

export default Register;

const FormSignup = styled.div`
	margin: 20px !important;

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

	@media (max-width: 900px) {
		font-size: 14px !important;
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
	background: white;
	margin: 0px !important;

	.storeName {
		color: darkred;
		letter-spacing: 5px;
		font-size: 1.8rem;
		font-weight: bold;
	}

	@media (max-width: 1000px) {
		input {
			width: 100% !important;
		}
	}
`;
