/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCategories } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link, Redirect } from "react-router-dom";
import AdminMenu from "../AdminMenu/AdminMenu";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateCategory = () => {
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllCategories = () => {
		setLoading(true);
		getCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	return (
		<UpdateCategoryWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateCategory'
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
							Update Categories
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allCategories.length} Added Categories
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Category You Would Like To Update...
							</p>
							{allCategories.map((s, i) => (
								<Link to={`/admin/update-category/${s._id}`} key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.85rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.categoryName}</strong>
										</li>

										{!s.categoryStatus && (
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
		</UpdateCategoryWrapper>
	);
};

export default UpdateCategory;

const UpdateCategoryWrapper = styled.div`
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
