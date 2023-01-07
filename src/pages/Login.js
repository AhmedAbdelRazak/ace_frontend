/** @format */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { authenticate, isAuthenticated, signin, authenticate2 } from "../auth";
// eslint-disable-next-line
import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import ReactGA from "react-ga";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
// eslint-disable-next-line
import StoreImage from "../GeneralImages/LoginImg.jpg";

const Login = ({ history }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, loading, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

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
					redirectToReferrer: true,
				});
			});
		}
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
				toast.error(data.error);
			} else if (data.user.activeUser === false) {
				setValues({ ...values, error: data.error, loading: false });
				return toast.error(
					"User was deactivated, Please reach out to the admin site",
				);
			} else {
				console.log(data);
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const showLoading = () =>
		loading && (
			<div className='alert alert-info'>
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		// let intendedDestination = history.location.state;
		if (redirectToReferrer) {
			if (user.role === 1) {
				return <Redirect to='/admin/dashboard' />;
			} else if (user.role === 3) {
				return <Redirect to='/order-taker/create-new-order' />;
			} else if (user.role === 4) {
				return <Redirect to='/operations/sales-history' />;
			} else {
				return <Redirect to='/' />;
			}
		}
	};

	useEffect(() => {
		// window.scrollTo({ top: 150, behavior: "smooth" });
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	// useEffect(() => {
	// 	const reloadCount = sessionStorage.getItem("reloadCount");
	// 	if (reloadCount < 2) {
	// 		sessionStorage.setItem("reloadCount", String(reloadCount + 1));
	// 		window.location.reload();
	// 	} else {
	// 		sessionStorage.removeItem("reloadCount");
	// 	}
	// 	// eslint-disable-next-line
	// }, []);

	const signinForm = () => (
		<FormSignin>
			<div className='container-fluid mx-auto'>
				<div className='mx-auto text-center'>
					<h1>
						<span className='storeName'>ACE Online Shop</span>
					</h1>
				</div>
				<div className=' mx-auto'>
					<div
						className='form-container p-3 mx-auto'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							// boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<h1 className='mb-2 text-center'>
							Account <span className='text-primary'>Login</span>{" "}
						</h1>
						{/* <Google informParent={informParent} /> */}

						<form onSubmit={clickSubmit}>
							<div
								className='form-group'
								style={{ marginTop: "25px", textAlign: "center" }}>
								<div
									style={{
										fontWeight: "bold",
										textAlign: "center",
									}}>
									Phone
								</div>
								<input
									className='w-50 mx-auto'
									style={{ border: "1px #f0f0f0 solid" }}
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<div
									style={{
										fontWeight: "bold",
										textAlign: "center",
										marginRight: "20px",
										right: "4px",
									}}>
									Password
								</div>
								<input
									className='w-50 mx-auto'
									style={{ border: "1px #f0f0f0 solid" }}
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
								/>
							</div>
							<input
								type='submit'
								value='login'
								className='btn btn-primary w-50 btn-block mx-auto mt-5 loginFont'
								//onClick={sendEmail}
							/>
						</form>
						<hr />

						<p
							style={{
								fontSize: "0.9rem",
								textAlign: "center",
							}}>
							Forgot Your Password, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
								<Link
									to='/auth/password/forgot'
									className='btn btn-sm btn-outline-danger'>
									Reset Your Password
								</Link>
							</strong>
						</p>
					</div>
				</div>
			</div>
		</FormSignin>
	);

	return (
		<WholeSignin>
			<Helmet>
				<meta charSet='utf-8' />
				<title>ACE Online Shop | Account Login</title>

				<meta
					name='description'
					content='GQ Main Order Platform Developed By https://infinite-apps.com'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>

			<ToastContainer />
			{showLoading()}
			<div className='row'>
				<div className='col-md-6 my-auto mx-auto'>{signinForm()}</div>
				{/* <div className='col-md-6 theImage'>
					<img className='heroImage' src={StoreImage} alt='GQ_Shop' />
				</div> */}
			</div>
			{redirectUser()}
		</WholeSignin>
	);
};

export default Login;

const FormSignin = styled.div`
	margin: 40px auto !important;

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
		.loginFont {
			font-size: 13px;
		}

		.form-container {
			margin-left: 10px;
			margin-right: 10px;
		}

		input {
			width: 100% !important;
		}
	}
`;

const WholeSignin = styled.div`
	overflow-x: hidden;
	/* background: white; */
	min-height: 500px;
	margin: 0px !important;

	.storeName {
		color: darkred;
		letter-spacing: 5px;
		font-size: 1.8rem;
		font-weight: bold;
	}

	.theImage {
		min-height: 900px;
		/* background: darkblue; */
		/* margin-right: 20px !important; */
	}

	.heroImage {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 1000px) {
		.infiniteAppsLogo {
			width: 48px;
			height: 48px;
		}
	}
`;
