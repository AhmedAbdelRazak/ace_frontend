/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSubCategories } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link, Redirect } from "react-router-dom";
import AdminMenu from "../AdminMenu/AdminMenu";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateSubcategory = () => {
	const [allSubcategories, setAllSubCategories] = useState([]);
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllSubcategories = () => {
		setLoading(true);
		getSubCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSubCategories(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllSubcategories();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

	return (
		<UpdateSubcategoryWrapper>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='UpdateSubcategory'
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
							Update Subcategories
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allSubcategories.length} Added Subcategories
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Subcategory You Would Like To Update...
							</p>
							{allSubcategories.map((s, i) => (
								<Link to={`/admin/update-subcategory/${s._id}`} key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.85rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.SubcategoryName}</strong>
										</li>

										{!s.subCategoryStatus && (
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
		</UpdateSubcategoryWrapper>
	);
};

export default UpdateSubcategory;

const UpdateSubcategoryWrapper = styled.div`
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
