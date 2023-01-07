/** @format */

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import { getProducts, getSubCategories, removeSubcategory } from "../apiAdmin";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const DeleteSubcategory = () => {
	const [allSubCategories, setAllSubCategories] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const { user, token } = isAuthenticated();
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const gettingAllSubCategories = () => {
		setLoading(true);
		getSubCategories(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSubCategories(data);

				getProducts().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setAllProducts(data2);
					}
				});

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllSubCategories();
		// eslint-disable-next-line
	}, []);

	const handleRemove = (subcategoryId) => {
		var productCheck =
			allProducts &&
			allProducts.filter((i) => i.subcategory.indexOf(subcategoryId) > -1);

		console.log(productCheck, subcategoryId, "productCheck");

		if (productCheck.length > 0) {
			return toast.error(
				`Product (${productCheck[0].productName}) is connected to this subcategory, Please delete/update product first`,
			);
		}

		if (window.confirm("Are You Sure You Want To Delete?")) {
			setLoading(true);
			removeSubcategory(subcategoryId, user._id, token)
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
		<DeleteSubcategoryWrapper>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='DeleteSubcategory'
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
							Delete Subcategory
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allSubCategories.length} Added Subcategories
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Subcategory You Would Like To Delete...
							</p>
							{allSubCategories.map((s, i) => (
								<div key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.95rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.SubcategoryName}</strong>
										</li>

										<li
											onClick={() => {
												handleRemove(s._id);
												setTimeout(function () {
													window.location.reload(false);
												}, 4000);
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
		</DeleteSubcategoryWrapper>
	);
};

export default DeleteSubcategory;

const DeleteSubcategoryWrapper = styled.div`
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
