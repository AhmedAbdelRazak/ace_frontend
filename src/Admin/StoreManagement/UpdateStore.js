/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStores } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link, Redirect } from "react-router-dom";
import AdminMenu from "../AdminMenu/AdminMenu";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateStore = () => {
	const [allStore, setAllStores] = useState([]);
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

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	return (
		<UpdateStoreWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateStore'
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
							Update Stores
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allStore.length} Added Stores
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Store You Would Like To Update...
							</p>
							{allStore.map((s, i) => (
								<Link to={`/admin/update-store/${s._id}`} key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.85rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.storeName}</strong>
										</li>

										{!s.storeStatus && (
											<li
												className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3 mx-auto'
												style={{
													fontSize: "0.7rem",
													color: "red",
													fontWeight: "bold",
												}}>
												<strong>Deactivated</strong>
											</li>
										)}
									</div>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>
		</UpdateStoreWrapper>
	);
};

export default UpdateStore;

const UpdateStoreWrapper = styled.div`
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

	@media (max-width: 1750px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 18% 82%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 1400px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 12% 85%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}
`;
