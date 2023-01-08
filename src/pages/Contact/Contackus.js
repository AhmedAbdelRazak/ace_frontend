/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { contactUs } from "../../auth/index";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { getContacts } from "../../Admin/apiAdmin";
import styled from "styled-components";
import ReactGA from "react-ga";

const Contactus = () => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	const [values, setValues] = useState({
		name: "",
		email: "",
		subject: "",
		text: "",
		success: false,
		loading: false,
	});
	const [contact, setContact] = useState({});

	const { name, email, subject, text, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		console.log("Form was submitted");
		window.scrollTo({ top: 0, behavior: "smooth" });

		contactUs({ name, email, subject, text, loading: true }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
				toast.error(data.error);
			} else {
				toast.success(SuccessfullySubmitted);

				setValues({
					subject: "",
					text: "",
					success: false,
					loading: false,
				});
			}
		});
	};

	const gettingAllContacts = () => {
		getContacts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setContact(data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingAllContacts();
		// eslint-disable-next-line
	}, []);

	const SuccessfullySubmitted =
		"Your form was successfully submitted. Our support team will contact you!";

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<ContactUsWrapper dir='ltr'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Ace Online Shop | Contact Us</title>

				<meta name='description' content='Ace Online Shop' />
				<link rel='icon' href='gq_frontend\src\GeneralImgs\favicon.ico' />
				<link rel='canonical' href='https://acesportive.com/contact' />
			</Helmet>
			{/* <div className='ad-class my-3 text-center mx-auto'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<div>
				<div className='row mt-5 ml-3'>
					<div className='col-md-4 my-3'>
						<h3
							style={{ color: "var(--orangePrimary)" }}
							className='text-center'>
							Do you have any inquiries...?
						</h3>
						<p className='Contact-us-paragraph mt-5'>
							Please allow up to 24 hours for our Resort Support Team to answer
							your inquiry by filling out the form.
						</p>

						<p className='Contact-us-paragraph'>
							<div className='mt-3'>
								<strong style={{ color: "var(--orangePrimary)" }}>
									Business Hour:
								</strong>{" "}
								{contact && contact.business_hours}.
							</div>
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Address:
							</strong>{" "}
							{contact && contact.address}.
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Phone #:
							</strong>{" "}
							{contact && contact.phone}.
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Email:
							</strong>{" "}
							{contact && contact.email}.
							<br />
						</p>

						<div className='mt-5'>
							<h3
								style={{ color: "var(--orangePrimary)" }}
								className='text-center'>
								{contact && contact.header_1}
							</h3>

							<p className='mt-3' style={{ fontSize: "0.85rem" }}>
								&nbsp;&nbsp;&nbsp;&nbsp; {contact && contact.description_1}
							</p>
						</div>
					</div>
					<Fragment left>
						<div
							className='col-md-7 my-3 mx-auto'
							style={
								{
									// boxShadow: "3px 0px 3px 3px rgba(0,0,0,0.5)",
								}
							}>
							<Fragment duration={5000}>
								<h2
									style={{ color: "var(--mainBlue)" }}
									className='text-center'>
									Contact Us
								</h2>
							</Fragment>
							{loading ? (
								<h2>Loading...</h2>
							) : (
								<form className='mt-5 mr-3 ' onSubmit={clickSubmit}>
									<ToastContainer />
									{/*first:  adding your name*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{
												fontWeight: "bold",
												fontSize: "1.1rem",
											}}>
											Name:
										</label>
										<input
											type='text'
											name='name'
											onChange={handleChange("name")}
											value={name}
											className='form-control'
											placeholder='Fullname e.g.: John Don'
											required
										/>
									</div>
									{/*email:  adding your emailaddress*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
											Email Address:
										</label>

										<input
											type='email'
											name='email'
											onChange={handleChange("email")}
											value={email}
											className='form-control'
											placeholder='Email e.g.: Name@email.com'
											required
										/>
									</div>
									{/*Subject:  Adding your subject line*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
											Subject:
										</label>

										<input
											type='text'
											name='subject'
											onChange={handleChange("subject")}
											value={subject}
											className='form-control'
											placeholder='Subject'
										/>
									</div>
									{/*message */}
									<div className='form'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
											Your Inquiry / Complaint:
										</label>

										<textarea
											name='text'
											className='form-control'
											onChange={handleChange("text")}
											value={text}
											rows='10'
											placeholder='Please place your message/comments here'
											required></textarea>
									</div>
									{/*message */}
									<input
										type='submit'
										value='Submit'
										className='form-control bg-primary text-white'
									/>
								</form>
							)}
						</div>
					</Fragment>

					<hr />
				</div>
			</div>
			{/* <div className='ad-class my-3 text-center mx-auto'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<hr />
		</ContactUsWrapper>
	);
};

export default Contactus;

const ContactUsWrapper = styled.div`
	overflow: hidden;
	.labelStyle {
		text-align: center !important;
	}
`;
