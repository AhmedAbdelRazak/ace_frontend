/** @format */

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuthenticated } from "../../../auth";
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";
import { getShippingOptions, removeShippingOption } from "../../apiAdmin";

const DeleteShippOptions = () => {
	const [allShippingOptions, setAllShippingOptions] = useState([]);
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
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
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllShippingOptions();
		// eslint-disable-next-line
	}, []);

	const handleRemove = (shippingId) => {
		if (window.confirm("Are You Sure You Want To Delete?")) {
			setLoading(true);
			removeShippingOption(shippingId, user._id, token)
				.then((res) => {
					setLoading(false);
					toast.error(`Carrier "${res.data.name}" deleted`);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<DeleteShippOptionsWrapper>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='DeleteShippingOption'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='col-8'>
					<div className='contentWrapper'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'>
							Delete Shipping Carrier
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allShippingOptions.length} Added Carriers
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Carrier You Would Like To Delete...
							</p>
							{allShippingOptions.map((s, i) => (
								<div key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{ fontSize: "0.95rem" }}>
											<strong>{s.carrierName}</strong>
										</li>

										<li
											onClick={() => {
												handleRemove(s._id);
												setTimeout(function () {
													window.location.reload(false);
												}, 1000);
											}}
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3 mx-auto'
											style={{
												fontSize: "0.9rem",
												color: "red",
												fontWeight: "bold",
												cursor: "pointer",
											}}>
											<strong>
												<i className='fa fa-trash' aria-hidden='true'></i>{" "}
												Delete{" "}
											</strong>
										</li>
									</div>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</DeleteShippOptionsWrapper>
	);
};

export default DeleteShippOptions;

const DeleteShippOptionsWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.contentWrapper {
		margin-top: 100px;
		margin-bottom: 15px;
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
	}
`;
