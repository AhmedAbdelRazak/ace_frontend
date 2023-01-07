/** @format */
// eslint-disable-next-line
import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../auth/index";
// import { Link } from "react-router-dom";
import {
	LoyaltyPointsAndStoreStatus,
	allLoyaltyPointsAndStoreStatus,
	cloudinaryUpload1,
} from "../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import styled from "styled-components";
import DarkBG from "../AdminMenu/DarkBG";
import ImageCard from "./ImageCard";

const OnlineStoreManagement = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// eslint-disable-next-line
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [loyaltyPointsAward, setLoyaltyPointsAward] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [onlineServicesFees, setOnlineServicesFees] = useState("");
	const [transactionFeePercentage, setTransactionFeePercentage] = useState("");
	const [purchaseTaxes, setPurchaseTaxes] = useState("");
	const [freeShippingLimit, setFreeShippingLimit] = useState("");
	const [discountOnFirstPurchase, setDiscountOnFirstPurchase] = useState("");
	const [addDiscountFirstPurch, setAddDiscountFirstPurch] = useState(false);
	const [activatePayOnDelivery, setActivatePayOnDelivery] = useState(false);
	const [activatePickupInStore, setActivatePickupInStore] = useState(false);
	const [activatePayOnline, setActivatePayOnline] = useState(false);
	const [daysStoreClosed, setDaysStoreClosed] = useState([]);
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [addStoreName, setAddStoreName] = useState([]);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [query, setQuery] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setLoyaltyPointsAward(e.target.value);
	};
	const handleChange2 = (e) => {
		setError("");
		setDiscountPercentage(e.target.value);
	};
	const handleChange3 = (e) => {
		setError("");
		setOnlineServicesFees(e.target.value);
	};
	const handleChange4 = (e) => {
		setError("");
		setTransactionFeePercentage(e.target.value);
	};
	const handleChange5 = (e) => {
		setError("");
		setPurchaseTaxes(e.target.value);
	};
	const handleChange6 = (e) => {
		setError("");
		setFreeShippingLimit(e.target.value);
	};
	const handleChange7 = (e) => {
		setError("");
		setDiscountOnFirstPurchase(e.target.value);
	};

	const handleChange8 = (e) => {
		setError("");
		setAddDiscountFirstPurch(e.target.value);
	};
	const handleChange9 = (e) => {
		setError("");
		setAddStoreName(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setActivatePayOnDelivery(e.target.value);
	};

	const handleChange11 = (e) => {
		setError("");
		setActivatePickupInStore(e.target.value);
	};

	const handleChange12 = (e) => {
		setError("");
		setActivatePayOnline(e.target.value);
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

	const fileUploadAndResizeLogo = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addStoreLogo;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"PNG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddStoreLogo({ ...addStoreLogo, images: allUploadedFiles });
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

	const FileUploadStoreLogo = () => {
		return (
			<>
				<ImageCard
					addThumbnail={addStoreLogo}
					handleImageRemove={handleImageRemove}
					setAddThumbnail={setAddStoreLogo}
					fileUploadAndResizeThumbNail={fileUploadAndResizeLogo}
				/>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
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
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddStoreLogo([]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				var latestStoreManagement = data && data[data.length - 1];
				setError("");
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
				setAddStoreName(latestStoreManagement.addStoreName);
				setDiscountOnFirstPurchase(
					latestStoreManagement.discountOnFirstPurchase,
				);
				setFreeShippingLimit(latestStoreManagement.freeShippingLimit);
				setActivatePayOnDelivery(latestStoreManagement.activatePayOnDelivery);
				setActivatePickupInStore(latestStoreManagement.activatePickupInStore);
				setActivatePayOnline(latestStoreManagement.activatePayOnline);
				setLoyaltyPointsAward(latestStoreManagement.loyaltyPointsAward);
				setDiscountPercentage(latestStoreManagement.discountPercentage);
				setPurchaseTaxes(latestStoreManagement.purchaseTaxes);
				setOnlineServicesFees(latestStoreManagement.onlineServicesFees);
				setTransactionFeePercentage(
					latestStoreManagement.transactionFeePercentage,
				);
				setAddStoreLogo({
					images: latestStoreManagement.addStoreLogo.map((i) => i),
				});
			}
		});
	};

	console.log(addStoreLogo, "add Store Logo");

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (addStoreLogo.length === 0) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return toast.error("Please add store logo");
		}

		LoyaltyPointsAndStoreStatus(user._id, token, {
			loyaltyPointsAward,
			discountPercentage,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			onlineServicesFees: onlineServicesFees,
			transactionFeePercentage: transactionFeePercentage,
			purchaseTaxes: purchaseTaxes,
			freeShippingLimit: freeShippingLimit,
			discountOnFirstPurchase: discountOnFirstPurchase,
			addStoreLogo: addStoreLogo.images,
			addStoreName: addStoreName,
			activatePayOnDelivery: activatePayOnDelivery,
			activatePickupInStore: activatePickupInStore,
			activatePayOnline: activatePayOnline,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success(
					"Loyalty Points and Store Properties were successfully Added.",
				);
				setError("");
				setTimeout(function () {
					setLoyaltyPointsAward("");
					setDiscountPercentage("");
					setDaysStoreClosed([]);
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};
	// console.log(alreadySetLoyaltyPointsManagement);

	const LoyaltyPointsAndStoreStatusForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='m-3 col-4'>
				{FileUploadStoreLogo()}

				<div
					className='mt-2'
					style={{ color: "red", fontWeight: "bolder", fontSize: "11px" }}>
					Logo image should have dimensions (Width: 666px, Height: 315px, Ext:
					.png)
				</div>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Brand Name</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange9}
					value={addStoreName}
					placeholder='Store Name or Brand Name'
					autoFocus
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Loyalty Points To Award</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange1}
					value={loyaltyPointsAward}
					placeholder='Number of points so you can award the customer with a specific %'
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Loyalty Points Discount Percentage</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange2}
					value={discountPercentage}
					placeholder='Percentage to be discounted from the user total if reached to the required points e.g. 10% will be added as 10'
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Transaction Fee %</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange4}
					value={transactionFeePercentage}
					placeholder='Transaction Fee % is the % charged on every transaction. e.g. 2.5% will be added as 2.5'
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Purchase Taxes %</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange5}
					value={purchaseTaxes}
					placeholder='Purchase Taxes is a percentage value'
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Online Services Fees (Flat Fee)</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange3}
					value={onlineServicesFees}
					required
					placeholder='Online Services fee is the fee charged on scheduling online (e.g. 25 cents will be added as "0.25"'
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>
					Total L.E. Value Limit To get Free Shipping
				</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange6}
					value={freeShippingLimit}
					placeholder='Min L.E. value purchase to get free shipping (e.g. 100 L.E. will be added as 100)'
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>
					Do you want to add discount from user's first purchase?
				</label>
				<div className='form-group'>
					<select onChange={handleChange8} className='form-control'>
						<option>Please select / Required*</option>
						<option value='0'>No</option>
						<option value='1'>Yes</option>
					</select>
				</div>
				{addDiscountFirstPurch === "1" ? (
					<>
						<label
							className=''
							style={{
								fontSize: "0.8rem",
								fontWeight: "bold",
								color: "black ",
							}}>
							What % would you like the customer to get off his/her first
							purchase?
						</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange7}
							value={discountOnFirstPurchase}
							placeholder='Discount off first purchase percentage (e.g. 10 precent off will be added as 10)'
						/>
					</>
				) : null}
			</div>
			<div className='w-100'>
				<label>Store Closed on days:</label>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					<label htmlFor='one' className='block '>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block'>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
						/>
						Sunday
					</label>
					<label htmlFor='three' className='block'>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
						/>
						Monday
					</label>
					<label htmlFor='four' className='block'>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block'>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block'>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
						/>
						Thursday
					</label>
					<label htmlFor='seven' className='block'>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
						/>
						Friday
					</label>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pay On Delivery:</label>

						<select onChange={handleChange10} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pickup in Store:</label>

						<select onChange={handleChange11} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pay Online:</label>

						<select onChange={handleChange12} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>
			</div>

			<button className='btn btn-outline-primary my-3'>
				Add Store Properties
			</button>
		</form>
	);

	return (
		<OnlineStoreManagementWrapper show={collapsed}>
			<ToastContainer />

			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='OnlineStoreManagement'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='navbarcontent'>
					<Navbar
						fromPage='OnlineStoreManagement'
						pageScrolled={pageScrolled}
						collapsed={collapsed}
					/>

					<div className='mx-5'>
						<h3 className='mt-1 mb-3 text-center'>Store Properties</h3>
						<div
							className='mb-3 mx-auto'
							style={{
								backgroundColor: "#f2e7e7",
								borderRadius: "10px",
								marginBottom: "20px",
								boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.5)",
							}}>
							<hr />
							<div
								style={{
									fontSize: "1.2rem",
									textAlign: "center",
									fontWeight: "bold",
									margin: "3px",
									color: "#660000",
									textShadow: "1px 2px 4px",
								}}>
								Your Latest Store Management Info:
							</div>
							<div className='row mx-auto' style={{ fontWeight: "bold" }}>
								{alreadySetLoyaltyPointsManagement && (
									<>
										<div
											className='mx-auto col-md-5'
											style={{ width: "50px", height: "50px" }}>
											Store Logo:{" "}
											<img
												src={
													alreadySetLoyaltyPointsManagement.addStoreLogo &&
													alreadySetLoyaltyPointsManagement.addStoreLogo[0] &&
													alreadySetLoyaltyPointsManagement.addStoreLogo[0].url
												}
												alt={alreadySetLoyaltyPointsManagement.addStoreName}
												style={{
													width: "25%",
													height: "100%",
													objectFit: "cover",
													boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
												}}
											/>
										</div>
										<div className='mx-auto col-md-5 my-auto'>
											Store Name:{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.addStoreName}
										</div>
										<div className='mx-auto col-md-5 mt-2'>
											Latest Loyalty Points Award:{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.loyaltyPointsAward}{" "}
											Points.
										</div>
										<div className='mx-auto col-md-5 mt-2'>
											Latest Loyalty Points Percentage:{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.discountPercentage}
											% off.
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Online Services Fee:
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.onlineServicesFees}{" "}
											L.E.
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Transaction Fee:
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.transactionFeePercentage}
											%
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Purchase Taxes:
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.purchaseTaxes}
											%
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Minimum L.E. to get free Shipping:
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.freeShippingLimit}{" "}
											L.E.
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											First Purchase Percentage Discount:{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.discountOnFirstPurchase}
											%
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Store Closed On:{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.daysStoreClosed.map(
													(i) => (
														<span key={i} className='my-1 mx-2'>
															{i}
														</span>
													),
												)}
										</div>

										<div className='mx-auto col-md-5 mt-3'>
											Pay On Delivery:{" "}
											{alreadySetLoyaltyPointsManagement &&
											alreadySetLoyaltyPointsManagement.activatePayOnDelivery
												? "Yes"
												: "No"}
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Pick up in Store:{" "}
											{alreadySetLoyaltyPointsManagement &&
											alreadySetLoyaltyPointsManagement.activatePickupInStore
												? "Yes"
												: "No"}
										</div>
										<div className='mx-auto col-md-5 mt-3'>
											Pay Online:{" "}
											{alreadySetLoyaltyPointsManagement &&
											alreadySetLoyaltyPointsManagement.activatePayOnline
												? "Yes"
												: "No"}
										</div>
									</>
								)}
							</div>
						</div>
						<br />
						{LoyaltyPointsAndStoreStatusForm()}
					</div>
				</div>
			</div>
		</OnlineStoreManagementWrapper>
	);
};

export default OnlineStoreManagement;

const OnlineStoreManagementWrapper = styled.div`
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
