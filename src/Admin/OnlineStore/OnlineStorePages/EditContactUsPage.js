/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../../auth/index";
import { createContact, getContacts } from "../../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";

const EditContactUsPage = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	//Adding Variables
	const [business_hours, setBusinessHours] = useState("");
	const [business_hours_Arabic, setBusinessHours_Arabic] = useState("");
	const [address, setAddress] = useState("");
	const [address_Arabic, setAddress_Arabic] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	const [header_1, setHeader1] = useState("");
	const [header_1_Arabic, setHeader1_Arabic] = useState("");
	const [description_1, setDescription1] = useState("");
	const [description_1_Arabic, setDescription1_Arabic] = useState("");
	// eslint-disable-next-line
	const [allContacts, setAllContacts] = useState([]);

	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setBusinessHours(e.target.value);
	};
	const handleChange2 = (e) => {
		setError("");
		setBusinessHours_Arabic(e.target.value);
	};

	const handleChange3 = (e) => {
		setError("");
		setAddress(e.target.value);
	};

	const handleChange4 = (e) => {
		setError("");
		setAddress_Arabic(e.target.value);
	};

	const handleChange5 = (e) => {
		setError("");
		setPhone(e.target.value);
	};

	const handleChange6 = (e) => {
		setError("");
		setEmail(e.target.value);
	};

	const handleChange7 = (e) => {
		setError("");
		setHeader1(e.target.value);
	};
	const handleChange8 = (e) => {
		setError("");
		setHeader1_Arabic(e.target.value);
	};

	const handleChange9 = (e) => {
		setError("");
		setDescription1(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setDescription1_Arabic(e.target.value);
	};

	const gettingAllContacts = () => {
		getContacts(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllContacts(data[data.length - 1]);
				setHeader1(data[data.length - 1] && data[data.length - 1].header_1);
				setBusinessHours(
					data[data.length - 1] && data[data.length - 1].business_hours,
				);
				setBusinessHours_Arabic(
					data[data.length - 1] && data[data.length - 1].business_hours_Arabic,
				);
				setAddress(data[data.length - 1] && data[data.length - 1].address);
				setAddress_Arabic(
					data[data.length - 1] && data[data.length - 1].address_Arabic,
				);
				setPhone(data[data.length - 1] && data[data.length - 1].phone);
				setEmail(data[data.length - 1] && data[data.length - 1].email);

				setHeader1_Arabic(
					data[data.length - 1] && data[data.length - 1].header_1_Arabic,
				);
				setDescription1(
					data[data.length - 1] && data[data.length - 1].description_1,
				);
				setDescription1_Arabic(
					data[data.length - 1] && data[data.length - 1].description_1_Arabic,
				);
			}
		});
	};

	useEffect(() => {
		gettingAllContacts();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();

		setError("");
		setSuccess(false);
		// make request to api to create Category
		createContact(user._id, token, {
			address,
			address_Arabic,
			email,
			phone,
			business_hours,
			business_hours_Arabic,
			header_1,
			header_1_Arabic,
			description_1,
			description_1_Arabic,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("About Us was successfully Added.");
				setError("");

				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const newContactForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='col-md-5 mx-auto'>
					<label className='text-muted'>Add Business Hours</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange1}
						value={business_hours}
						required
					/>
				</div>
				<div className='col-md-5 mx-auto'>
					<label className='text-muted'>أضف ساعات العمل</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange2}
						value={business_hours_Arabic}
						required
					/>
				</div>
				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Add Store Address</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange3}
						value={address}
						required
					/>
				</div>
				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>أضف عنوان المتجر</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange4}
						value={address_Arabic}
						required
					/>
				</div>

				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Phone</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange5}
						value={phone}
						required
					/>
				</div>
				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Email</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange6}
						value={email}
						required
					/>
				</div>
			</div>
			<div className='form-group mt-4'>
				<label className='text-muted'>Add Header For Contact Us Page</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange7}
					value={header_1}
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>أضف عنوان لصفحة اتصل بنا</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange8}
					value={header_1_Arabic}
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Add Description For The Header</label>
				<textarea
					rows='8'
					type='text'
					className='form-control'
					onChange={handleChange9}
					value={description_1}
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>أضف وصفًا للعنوان</label>
				<textarea
					rows='8'
					type='text'
					className='form-control'
					onChange={handleChange10}
					value={description_1_Arabic}
					required
				/>
			</div>

			<button className='btn btn-outline-primary mb-3'>Submit Changes</button>
		</form>
	);

	return (
		<EditContactUsPageWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='WebsiteEditContact'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
			</div>

			<div className='navbarcontent'>
				<div
					className='col-md-7 mx-auto py-3 mt-4'
					// style={{ border: "solid red 1px" }}
				>
					<h3 className='mt-1 mb-5 text-center'>Edit "Contact Us" Page</h3>
					<ToastContainer />

					{newContactForm()}
				</div>
			</div>
		</EditContactUsPageWrapper>
	);
};

export default EditContactUsPage;

const EditContactUsPageWrapper = styled.div`
	margin-bottom: 20px;

	min-height: 880px;
	margin-bottom: 10px;
	/* background: #fafafa; */
	overflow-x: hidden;

	.grid-container {
		display: grid;
		/* grid-template-columns: 16% 84%; */
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15% 85%"};

		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.navbarcontent > nav > ul {
		list-style-type: none;
		background: white;
	}

	.navbarcontent > div > ul > li {
		background: white;
		font-size: 0.8rem;
		font-weight: bolder !important;
		color: #545454;
	}

	h3 {
		font-weight: bold;
	}

	@media (max-width: 1750px) {
		/* background: white; */

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
		/* background: white; */

		.grid-container {
			display: grid;
			grid-template-columns: 8% 92%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}

		.storeSummaryFilters {
			position: "";
			width: "";
		}
	}
`;
