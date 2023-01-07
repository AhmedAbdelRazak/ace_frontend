/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../auth/index";
// import { Link } from "react-router-dom";
import { updateAds, getAllAds } from "../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import DarkBG from "../AdminMenu/DarkBG";
import styled from "styled-components";

const UpdateTopAds = () => {
	const [allAdsCombined, setAllAdsCombined] = useState([]);
	const [allAdsCombined_Arabic, setAllAdsCombined_Arabic] = useState([]);
	// eslint-disable-next-line
	const [ads, setAds] = useState("");
	const [ads_Arabic, setAds_Arabic] = useState("");
	const [adsId, setAdsId] = useState("");
	const [activeAds, setActiveAds] = useState(true);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setAds(e.target.value);
	};

	const handleChange2 = (e) => {
		setError("");
		setActiveAds(e.target.value);
	};
	const handleChange3 = (e) => {
		setError("");
		setAds_Arabic(e.target.value);
	};

	const gettingAllAds = () => {
		getAllAds(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAdsCombined(
					data[data.length - 1] && data[data.length - 1].ad_Name,
				);
				setAllAdsCombined_Arabic(
					data[data.length - 1] && data[data.length - 1].ad_Name_Arabic,
				);
				setActiveAds(data[data.length - 1] && data[data.length - 1].show_ad);
				setAdsId(data[data.length - 1] && data[data.length - 1]._id);
			}
		});
	};

	useEffect(() => {
		gettingAllAds();
		// eslint-disable-next-line
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

	const clickSubmit = (e) => {
		e.preventDefault();

		// make request to api to create Category
		updateAds(adsId, user._id, token, {
			ad_Name: allAdsCombined,
			ad_Name_Arabic: allAdsCombined_Arabic,
			show_ad: activeAds,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				// setTimeout(function () {
				// 	window.location.reload(false);
				// }, 1000);
			} else {
				toast.success("Ads were successfully Updated.");
				setError("");
				setTimeout(function () {
					setActiveAds("");
					setAllAdsCombined([]);
					setAds("");
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const pushToAllAds = (e) => {
		e.preventDefault();
		setAllAdsCombined([...allAdsCombined, ads]);
		setAds("");
	};

	const pushToAllAds_Arabic = (e) => {
		e.preventDefault();
		setAllAdsCombined_Arabic([...allAdsCombined_Arabic, ads_Arabic]);
		setAds_Arabic("");
	};

	const newAdsForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Update Ads</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange1}
					value={ads}
					autoFocus
					required
				/>
			</div>
			<button
				onClick={pushToAllAds}
				className='btn btn-outline-info mb-3 text-center ml-5'>
				Update Ad.
			</button>
			<div className='mt-4'>
				الإعلانات المضافة:
				<ul>
					{allAdsCombined_Arabic &&
						allAdsCombined_Arabic.map((i, e) => (
							<li
								style={{
									listStyle: "none",
									marginLeft: "20px",
									fontSize: "12px",
									marginTop: "5px",
								}}
								key={e}>
								<button
									type='button'
									onClick={() => {
										var array =
											allAdsCombined_Arabic &&
											allAdsCombined_Arabic.filter(function (s) {
												return s !== i;
											});
										setAllAdsCombined_Arabic(array);
									}}
									style={{
										color: "white",
										background: "black",
										fontSize: "15px",
										borderRadius: "15px",
										marginRight: "10px",
									}}
									aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
								{i}
							</li>
						))}
				</ul>
			</div>
			<div className='form-group'>
				<label className='text-muted'>تعديل إعلان</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange3}
					value={ads_Arabic}
					required
				/>
			</div>
			<button
				onClick={pushToAllAds_Arabic}
				className='btn btn-outline-info mb-3 text-center ml-5'>
				أضف إعلان
			</button>

			<div className='form-group'>
				<label className='text-muted'>Active Ads?</label>
				<select
					onChange={handleChange2}
					className='form-control'
					style={{ fontSize: "0.80rem" }}>
					<option>Please select / Required*</option>
					<option value='0'>Deactivate Added Ads</option>
					<option value='1'>Activate Added Ads</option>
				</select>
			</div>

			<br />
			<button
				onClick={clickSubmit}
				className='btn btn-outline-primary btn-block mb-3 mx-auto mt-3'>
				Update Ads
			</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{ads} is created</h3>;
		}
	};

	return (
		<UpdateTopAdsWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='UpdateTopAds'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='navbarcontent'>
					<Navbar
						fromPage='UpdateTopAds'
						pageScrolled={pageScrolled}
						collapsed={collapsed}
					/>
					{allAdsCombined && allAdsCombined.length === 0 ? (
						<div>
							<div>No Ads were added before...</div>
						</div>
					) : (
						<>
							<div
								className='col-md-6 col-sm-6 offset-md-2 mt-5 mx-auto p-3'
								style={{
									border: "1px black solid",
									borderRadius: "20px",
									marginBottom: "260px",
								}}>
								<h3 className='mt-1 mb-3 text-center'>Update Ads</h3>
								<ToastContainer />
								<div>
									Added Ads:
									<ul>
										{allAdsCombined &&
											allAdsCombined.map((ad, e) => (
												<li
													style={{
														listStyle: "none",
														marginLeft: "20px",
														fontSize: "12px",
														marginTop: "5px",
													}}
													key={e}>
													<button
														type='button'
														onClick={() => {
															var array =
																allAdsCombined &&
																allAdsCombined.filter(function (s) {
																	return s !== ad;
																});
															setAllAdsCombined(array);
														}}
														style={{
															color: "white",
															background: "black",
															fontSize: "15px",
															borderRadius: "15px",
															marginRight: "10px",
														}}
														aria-label='Close'>
														<span aria-hidden='true'>&times;</span>
													</button>
													{ad}
												</li>
											))}
									</ul>
								</div>
								{newAdsForm()}
							</div>
						</>
					)}
				</div>
			</div>
		</UpdateTopAdsWrapper>
	);
};

export default UpdateTopAds;

const UpdateTopAdsWrapper = styled.div`
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
