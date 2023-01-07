/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { ToastContainer, toast } from "react-toastify";
import { Select } from "antd";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../../../auth";
import { getShippingOptions, updateShippingOptions } from "../../apiAdmin";
import { ShipToData } from "./ShipToData";
import DarkBG from "../../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const UpdateShippingOptionsSingle = ({ match }) => {
	// eslint-disable-next-line
	const [allShippingOptions, setAllShippingOptions] = useState([]);
	const { user, token } = isAuthenticated();
	const [selectedShippingOption, setSelectedShippingOption] = useState([]);
	const [carrierName, setCarrierName] = useState("");
	const [carrierName_Arabic, setCarrierName_Arabic] = useState("");
	const [chosenShippingData, setChosenShippingData] = useState([]);
	const [carrierStatus, setCarrierStatus] = useState("1");
	const [allChosenGov, setAllChosenGov] = useState([]);
	const [loading, setLoading] = useState(true);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllShippingOptions = () => {
		setLoading(true);
		getShippingOptions(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllShippingOptions(data);
				setSelectedShippingOption(
					match.params.shippingId &&
						match.params.shippingId !== "undefined" &&
						data.filter((s) => s._id === match.params.shippingId),
				);
				setCarrierName(
					match.params.shippingId &&
						match.params.shippingId !== "undefined" &&
						data.filter((s) => s._id === match.params.shippingId)[0]
							.carrierName,
				);
				setCarrierName_Arabic(
					match.params.shippingId &&
						match.params.shippingId !== "undefined" &&
						data.filter((s) => s._id === match.params.shippingId)[0]
							.carrierName_Arabic,
				);
				setChosenShippingData(
					match.params.shippingId &&
						match.params.shippingId !== "undefined" &&
						data.filter((s) => s._id === match.params.shippingId)[0]
							.chosenShippingData,
				);

				setAllChosenGov(
					match.params.shippingId &&
						match.params.shippingId !== "undefined" &&
						data
							.filter((s) => s._id === match.params.shippingId)[0]
							.chosenShippingData.map((iii) => iii.governorate),
				);

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllShippingOptions();
		// eslint-disable-next-line
	}, [match.params.shippingId]);

	let getGov = ShipToData.map((i) => i.GovernorateEn);

	let UniqueGovernorates = [...new Set(getGov)];

	const handleChange1 = (e) => {
		setCarrierName(e.target.value);
	};

	const handleChange2 = (e) => {
		setCarrierName_Arabic(e.target.value);
	};

	const handleChange5 = (e) => {
		setCarrierStatus(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (carrierStatus === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Carrier?",
				)
			) {
				updateShippingOptions(match.params.shippingId, user._id, token, {
					carrierName,
					carrierName_Arabic,
					carrierStatus,
					chosenShippingData,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
						setLoading(false);
						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					} else {
						toast.success("Shipping Carrier was successfully Updated.");
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
			updateShippingOptions(match.params.shippingId, user._id, token, {
				carrierName,
				carrierName_Arabic,
				carrierStatus,
				chosenShippingData,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
					setLoading(false);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else {
					toast.success("Carrier was successfully Updated.");
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

	return (
		<UpdateShippingOptionsSingleWrapper>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<ToastContainer />
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateShippingOption'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{selectedShippingOption && allShippingOptions && !loading ? (
					<div className='col-8 contentWrapper'>
						<form
							onSubmit={clickSubmit}
							className='col-md-10 mx-auto'
							// style={{ borderLeft: "1px solid brown" }}
						>
							<h3
								style={{
									color: "#009ef7",
									fontSize: "1.15rem",
									fontWeight: "bold",
								}}
								className='text-center mt-1'>
								The Selected Carrier is "
								{selectedShippingOption &&
									selectedShippingOption[0] &&
									selectedShippingOption[0].carrierName}
								"
							</h3>

							<div className='form-group mt-5 '>
								<label className='text-muted'>Carrier Name</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange1}
									value={carrierName}
								/>
							</div>
							<div className='form-group '>
								<label className='text-muted'>اسم الناقل</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange2}
									value={carrierName_Arabic}
								/>
							</div>

							<div className='form-group mx-auto'>
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
											setChosenShippingData(
												chosenShippingData.filter(
													(i) => value.indexOf(i.governorate) > -1,
												),
											);
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
							<div className='row'>
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
																const index = chosenShippingData.findIndex(
																	(object) => {
																		return object.governorate === g;
																	},
																);

																if (index !== -1) {
																	const newArr = chosenShippingData.map(
																		(obj) => {
																			if (obj.governorate === g) {
																				return {
																					...obj,
																					shippingPrice_Carrier: e.target.value,
																				};
																			}

																			return obj;
																		},
																	);

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
															value={
																chosenShippingData.length ===
																allChosenGov.length
																	? chosenShippingData[i].shippingPrice_Carrier
																	: chosenShippingData.shippingPrice_Carrier
															}
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
																const index = chosenShippingData.findIndex(
																	(object) => {
																		return object.governorate === g;
																	},
																);

																if (index !== -1) {
																	const newArr = chosenShippingData.map(
																		(obj) => {
																			if (obj.governorate === g) {
																				return {
																					...obj,
																					shippingPrice_Client: e.target.value,
																				};
																			}

																			return obj;
																		},
																	);

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
															value={
																chosenShippingData.length ===
																allChosenGov.length
																	? chosenShippingData[i].shippingPrice_Client
																	: chosenShippingData.shippingPrice_Client
															}
															required
														/>
													</div>

													<div className='form-group col-md-4 mx-auto'>
														<label className='text-muted'>
															Estimated Days For {g}
														</label>
														<input
															type='number'
															className='form-control'
															onChange={(e) => {
																//
																const index = chosenShippingData.findIndex(
																	(object) => {
																		return object.governorate === g;
																	},
																);

																if (index !== -1) {
																	const newArr = chosenShippingData.map(
																		(obj) => {
																			if (obj.governorate === g) {
																				return {
																					...obj,
																					estimatedTimeForArrival:
																						e.target.value,
																				};
																			}

																			return obj;
																		},
																	);

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
															value={
																chosenShippingData.length ===
																allChosenGov.length
																	? chosenShippingData[i]
																			.estimatedTimeForArrival
																	: chosenShippingData.estimatedTimeForArrival
															}
															required
														/>
													</div>
												</React.Fragment>
											);
										})}
									</React.Fragment>
								) : null}
							</div>

							<div className='form-group'>
								<label className='text-muted'>Active Carrier?</label>
								<select
									onChange={handleChange5}
									className='form-control'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
									<option value='0'>Deactivate Carrier</option>
									<option value='1'>Activate Carrier</option>
								</select>
							</div>
							<button className='btn btn-outline-primary mb-3'>
								Update Carrier
							</button>
						</form>
					</div>
				) : (
					<div className='mx-auto'>Loading</div>
				)}
			</div>
		</UpdateShippingOptionsSingleWrapper>
	);
};

export default UpdateShippingOptionsSingle;

const UpdateShippingOptionsSingleWrapper = styled.div`
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
