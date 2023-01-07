/** @format */

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import AdminMenu from "../AdminMenu/AdminMenu";
import {
	getCategories,
	getProducts,
	getSubCategories,
	removeCategory,
} from "../apiAdmin";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const DeleteCategory = () => {
	const [allCategories, setAllCategories] = useState([]);
	const [allSubCategories, setAllSubCategories] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
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
				getProducts().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setAllProducts(data2);
					}
				});
				getSubCategories(token).then((data3) => {
					if (data3.error) {
						console.log(data3.error);
					} else {
						setAllSubCategories(data3);
					}
				});
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, []);

	const handleRemove = (categoryId) => {
		var productCheck =
			allProducts && allProducts.filter((i) => i.category._id === categoryId);

		if (productCheck.length > 0) {
			return toast.error(
				`Product (${productCheck[0].productName}) is connected to this category, Please delete/update product first`,
			);
		}

		var subcategoryCheck =
			allSubCategories &&
			allSubCategories.filter(
				(i) =>
					i.categoryId && i.categoryId._id && i.categoryId._id === categoryId,
			);

		if (subcategoryCheck.length > 0) {
			return toast.error(
				`Subcategory (${subcategoryCheck[0].SubcategoryName}) is connected to this category, Please delete/update Subcategory first`,
			);
		}

		if (window.confirm("Are You Sure You Want To Delete?")) {
			setLoading(true);
			removeCategory(categoryId, user._id, token)
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
		<DeleteCategoryWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='row'>
				<div className='col-3 mb-3'>
					<AdminMenu
						fromPage='DeleteCategory'
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
							Delete Category
						</h3>

						<br />
						<ul className='list-group text-center'>
							<h3 className='text-center mt-5'>
								Total of {allCategories.length} Added Categories
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which Category You Would Like To Delete...
							</p>
							{allCategories.map((s, i) => (
								<div key={i}>
									<div className='row text-center mx-auto'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-9 mx-auto'
											style={{
												fontSize: "0.95rem",
												textTransform: "capitalize",
											}}>
											<strong>{s.categoryName}</strong>
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
		</DeleteCategoryWrapper>
	);
};

export default DeleteCategory;

const DeleteCategoryWrapper = styled.div`
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
