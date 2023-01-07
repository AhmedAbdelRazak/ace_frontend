/** @format */

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import { getStores, removeStore } from "../apiAdmin";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const DeleteStore = () => {
	const [allStores, setAllStores] = useState([]);
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllStores = () => {
		setLoading(true);
		getStores(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllStores(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllStores();
		// eslint-disable-next-line
	}, []);

	const handleRemove = (storeId) => {
		if (window.confirm("Are You Sure You Want To Delete?")) {
			setLoading(true);
			removeStore(storeId, user._id, token)
				.then((res) => {
					setLoading(false);
					toast.error(`Gender "${res.data.name}" deleted`);
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	return (
		<DeleteStoreWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='DeleteStore'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='col-8'>
					<div className='contentWrapper' data-aos='fade-down'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'>
							Delete Store
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allStores.length} Added Stores
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Store You Would Like To Delete...
							</p>
							{allStores.map((s, i) => (
								<div key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.95rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.storeName}</strong>
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
		</DeleteStoreWrapper>
	);
};

export default DeleteStore;

const DeleteStoreWrapper = styled.div`
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
