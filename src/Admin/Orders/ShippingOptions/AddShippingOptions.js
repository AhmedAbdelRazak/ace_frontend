/** @format */

// eslint-disable-next-line
import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../../auth/index";
// import { Link } from "react-router-dom";
import { createShippingOptions, getShippingOptions } from "../../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { Select } from "antd";
import styled from "styled-components";
import { ShipToData } from "./ShipToData";
import Navbar from "../../AdminNavMenu/Navbar";
import DarkBG from "../../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const AddShippingOptions = () => {
	const [carrierName, setCarrierName] = useState("");
	const [carrierName_Arabic, setCarrierName_Arabic] = useState("");
	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [allShippingOptions, setAllShippingOptions] = useState([]);
	const [allChosenGov, setAllChosenGov] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [chosenShippingData, setChosenShippingData] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setCarrierName(e.target.value);
	};

	const handleChange4 = (e) => {
		setCarrierName_Arabic(e.target.value);
	};

	const gettingAllShippingOptions = () => {
		getShippingOptions(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllShippingOptions(
					data.map((carrierName) =>
						carrierName.carrierName.toLowerCase().replace(/\s/g, ""),
					),
				);
			}
		});
	};

	let getGov = ShipToData.map((i) => i.GovernorateEn);

	let UniqueGovernorates = [...new Set(getGov)];

	useEffect(() => {
		gettingAllShippingOptions();
		// eslint-disable-next-line
	}, [carrierName, carrierName_Arabic]);

	let matchingCarrierName =
		allShippingOptions.indexOf(carrierName.toLowerCase().replace(/\s/g, "")) !==
		-1;
	// console.log(matchingCarrierName, "El Logic");
	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingCarrierName) {
			return toast.error("This Carrier was added before.");
		}
		setError("");
		setSuccess(false);
		// make request to api to create ShippingOption
		createShippingOptions(user._id, token, {
			carrierName,
			carrierName_Arabic,
			chosenShippingData,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					// window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Shipping Option was successfully Added.");
				setError("");
				setTimeout(function () {
					setCarrierName("");
					setCarrierName_Arabic("");
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const newShippingOptionForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='form-group col-md-5 mx-auto'>
					<label className='text-muted'>Carrier Name</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange1}
						value={carrierName}
						autoFocus
						required
					/>
				</div>
				<div className='form-group col-md-5 mx-auto'>
					<label className='text-muted'>اسم الناقل</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange4}
						value={carrierName_Arabic}
						required
					/>
				</div>
				<div className='form-group col-md-10 mx-auto'>
					<label className='text-muted'>Ship To Governorates</label>
					<Select
						mode='multiple'
						style={{ width: "100%", textTransform: "capitalize" }}
						placeholder='Please Select Ship To Countries'
						value={allChosenGov}
						onChange={(value) => {
							if (value[0] === "all") {
								setAllChosenGov(UniqueGovernorates);
							} else {
								setAllChosenGov(value);
							}
							// console.log(value[0]);
						}}>
						<Option value='all'>---SELECT ALL---</Option>
						{UniqueGovernorates.map((ss, ii) => {
							return (
								<Option value={ss} key={ii}>
									{ss}
								</Option>
							);
						})}
					</Select>
				</div>

				{allChosenGov.length > 0 ? (
					<React.Fragment>
						{allChosenGov.map((g, i) => {
							return (
								<React.Fragment key={i}>
									<div className='form-group col-md-4 mx-auto'>
										<label className='text-muted'>
											Main Shipping Price For {g}
										</label>
										<input
											type='number'
											className='form-control'
											onChange={(e) => {
												//
												const index = chosenShippingData.findIndex((object) => {
													return object.governorate === g;
												});

												if (index !== -1) {
													const newArr = chosenShippingData.map((obj) => {
														if (obj.governorate === g) {
															return {
																...obj,
																shippingPrice_Carrier: e.target.value,
															};
														}

														return obj;
													});

													setChosenShippingData(newArr);
												} else {
													setChosenShippingData([
														...chosenShippingData,
														{
															shippingPrice_Carrier: e.target.value,
															shippingPrice_Client: 0,
															governorate: g,
															estimatedTimeForArrival: 0,
														},
													]);
												}
											}}
											value={chosenShippingData.shippingPrice_Carrier}
											required
										/>
									</div>

									<div className='form-group col-md-4 mx-auto'>
										<label className='text-muted'>
											GQ Shipping Price For {g}
										</label>
										<input
											type='number'
											className='form-control'
											onChange={(e) => {
												//
												const index = chosenShippingData.findIndex((object) => {
													return object.governorate === g;
												});

												if (index !== -1) {
													const newArr = chosenShippingData.map((obj) => {
														if (obj.governorate === g) {
															return {
																...obj,
																shippingPrice_Client: e.target.value,
															};
														}

														return obj;
													});

													setChosenShippingData(newArr);
												} else {
													setChosenShippingData([
														...chosenShippingData,
														{
															shippingPrice_Carrier: e.target.value,
															shippingPrice_Client: 0,
															governorate: g,
															estimatedTimeForArrival: 0,
														},
													]);
												}
											}}
											value={chosenShippingData.shippingPrice_Client}
											required
										/>
									</div>

									<div className='form-group col-md-4 mx-auto'>
										<label className='text-muted'>Estimated Days For {g}</label>
										<input
											type='number'
											className='form-control'
											onChange={(e) => {
												//
												const index = chosenShippingData.findIndex((object) => {
													return object.governorate === g;
												});

												if (index !== -1) {
													const newArr = chosenShippingData.map((obj) => {
														if (obj.governorate === g) {
															return {
																...obj,
																estimatedTimeForArrival: e.target.value,
															};
														}

														return obj;
													});

													setChosenShippingData(newArr);
												} else {
													setChosenShippingData([
														...chosenShippingData,
														{
															shippingPrice_Carrier: e.target.value,
															shippingPrice_Client: 0,
															governorate: g,
															estimatedTimeForArrival: 0,
														},
													]);
												}
											}}
											value={chosenShippingData.estimatedTimeForArrival}
											required
										/>
									</div>
								</React.Fragment>
							);
						})}
					</React.Fragment>
				) : null}
			</div>

			<button className='btn btn-outline-primary mb-3'>
				Add Shipping Carrier
			</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{carrierName} is created</h3>;
		}
	};

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
		<AddShippingOptionsWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<ToastContainer />
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AddShippingOption'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className=''>
					<Navbar fromPage='AddShippingOption' pageScrolled={pageScrolled} />

					<div className='container'>
						<div className=' mt-2 mx-auto p-1'>
							<h3
								style={{ color: "#009ef7", fontWeight: "bold" }}
								className='mt-1 mb-3 text-center'>
								Add Shipping Carrier
							</h3>

							{newShippingOptionForm()}
						</div>
					</div>
				</div>
			</div>
		</AddShippingOptionsWrapper>
	);
};

export default AddShippingOptions;

const AddShippingOptionsWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 87%")};
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.container {
		margin-top: 100px;
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
	}
`;
