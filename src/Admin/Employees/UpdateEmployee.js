/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import { getAllUsers } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";
import { Link, Redirect } from "react-router-dom";
import DarkBG from "../AdminMenu/DarkBG";

const UpdateEmployee = () => {
	const [allUsersAvailable, setAllUsersAvailable] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const { user, token } = isAuthenticated();

	const gettingAllUsers = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "getting all users error");
			} else {
				setAllUsersAvailable(data);
			}
		});
	};

	useEffect(() => {
		gettingAllUsers();

		// eslint-disable-next-line
	}, []);

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
		<UpdateEmployeeWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" || user.userRole === "Operations" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='UpdateEmployee'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='UpdateEmployee' pageScrolled={pageScrolled} />
					<h3 className='mx-auto text-center mb-5'>Update Employee Profile</h3>
					{allUsersAvailable.length > 0 ? (
						<div className='container'>
							<div className='row'>
								<div className='col-md-10 mx-auto'>
									<ul className='list-group col-md-10'>
										<h3
											style={{ fontSize: "1.4rem" }}
											className='text-center mt-2'>
											{allUsersAvailable && allUsersAvailable.length} Employees
											in your business have accounts
										</h3>
										<p className='mt-2 text-center'>
											Please Select a <strong>User</strong> to Update his/her
											Account...
										</p>
										{allUsersAvailable &&
											allUsersAvailable.map((e, i) => (
												<Link
													to={`/admin/update-employee/${e._id}`}
													// onClick={() => setLinkClick(true)}
												>
													<li
														key={i}
														className='list-group-item '
														style={{ fontSize: "1.1rem" }}>
														<strong>{e.name}</strong>
														<span>
															{" "}
															<img
																width='60px'
																height='60px'
																style={{ marginLeft: "100px" }}
																src={e.employeeImage}
																alt={e.name}
															/>{" "}
														</span>
													</li>
												</Link>
											))}
									</ul>
								</div>
							</div>
						</div>
					) : (
						<div
							style={{
								textAlign: "center",
								fontSize: "1.2rem",
								fontWeight: "bold",
							}}>
							No Employees Account Available To Update
						</div>
					)}
				</div>
			</div>
		</UpdateEmployeeWrapper>
	);
};

export default UpdateEmployee;

const UpdateEmployeeWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: 15.5% 84.5%;
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}
`;
