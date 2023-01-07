/** @format */

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { isAuthenticated } from "../../auth";
import { getCoupons, removeCoupon, createCoupon } from "../apiAdmin";
import DarkBG from "../AdminMenu/DarkBG";
import AdminMenu from "../AdminMenu/AdminMenu";
import moment from "moment";
import styled from "styled-components";

const CouponManagement = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// eslint-disable-next-line
	const [offset, setOffset] = useState(0);
	// eslint-disable-next-line
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [name, setName] = useState("");
	const [expiry, setExpiry] = useState("");
	const [discount, setDiscount] = useState("");
	const [loading, setLoading] = useState("");
	const [coupons, setCoupons] = useState([]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		loadAllCoupons();
	}, []);

	const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name.length <= 5) {
			return toast.error(
				"Coupon Name should be more than 5 letters, Please try again",
			);
		}

		if (name.length >= 25) {
			return toast.error(
				"Coupon Name should be less than 25 letters, Please try again",
			);
		}

		setLoading(true);
		// console.table(name, expiry, discount);
		createCoupon(user._id, token, { name, expiry, discount })
			.then((res) => {
				setLoading(false);
				loadAllCoupons(); // load all coupons
				setName("");
				setDiscount("");
				setExpiry("");
				toast.success(`"${res.data.name}" is created`);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			})
			.catch((err) => console.log("create coupon err", err));
	};
	const handleRemove = (couponId) => {
		if (window.confirm("Delete?")) {
			setLoading(true);
			removeCoupon(couponId, user._id, token)
				.then((res) => {
					loadAllCoupons(); // load all coupons
					setLoading(false);
					toast.error(`Coupon "${res.data.name}" deleted`);
				})
				.catch((err) => console.log(err));
		}
	};
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
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
		<CouponManagementWrapper>
			<ToastContainer />

			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='CouponManagement'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='navbarcontent'>
					<div className='container my-4 mx-auto'>
						<div className='col-md-10 ' style={{ marginBottom: "180px" }}>
							{loading ? (
								<h4 className='text-danger'>Loading...</h4>
							) : (
								<h4 className='mb-3'>Create a New Coupon:</h4>
							)}

							<form onSubmit={handleSubmit} className='mx-auto'>
								<div className='form-group'>
									<label className='text-muted'>Coupon Name/Text</label>
									<input
										type='text'
										className='form-control'
										onChange={(e) => setName(e.target.value)}
										value={name}
										autoFocus
										required
									/>
								</div>

								<div className='form-group'>
									<label className='text-muted'>Discount %</label>
									<input
										type='text'
										className='form-control'
										onChange={(e) => setDiscount(e.target.value)}
										value={discount}
										required
									/>
								</div>

								<div className='form-group'>
									<label className='text-muted'>Expiry</label>
									<br />
									<DatePicker
										className='form-control'
										disabledDate={disabledDate}
										onChange={(date) =>
											setExpiry(date || new Date(date._d).toLocaleDateString())
										}
										required
									/>
								</div>

								<button className='btn btn-outline-primary'>Save</button>
							</form>

							<br />
							<hr />
							<h4 className='my-3'>
								Created Coupons: {coupons.length} Coupons
							</h4>

							<table className='table table-bordered'>
								<thead className='thead-light'>
									<tr>
										<th scope='col'>Name</th>
										<th scope='col'>Expiry</th>
										<th scope='col'>Discount</th>
										<th scope='col'>Action</th>
									</tr>
								</thead>

								<tbody>
									{coupons.map((c) => (
										<tr key={c._id}>
											<td>{c.name}</td>
											<td>{new Date(c.expiry).toLocaleDateString()}</td>
											<td>{c.discount}%</td>
											<td>
												<span
													onClick={() => {
														handleRemove(c._id);
														setTimeout(function () {
															window.location.reload(false);
														}, 1500);
													}}
													className='badge badge-danger badge-pill align-items-center d-flex justify-content-between'
													style={{ cursor: "pointer" }}>
													Delete
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</CouponManagementWrapper>
	);
};

export default CouponManagement;

const CouponManagementWrapper = styled.div`
	margin: 100px auto;
	min-height: 800px;
`;
