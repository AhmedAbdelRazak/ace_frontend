/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated, signout } from "../auth";
import { useCartContext } from "../Checkout/cart_context";

const Sidebar = ({ language, setLanguage, history, allGenders }) => {
	const [pageScrolled, setPageScrolled] = useState(false);
	const [offset, setOffset] = useState(0);

	const { openSidebar2, closeSidebar2, isSidebarOpen2 } = useCartContext();

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
		<>
			<SideWrapper show={isSidebarOpen2} show2={pageScrolled}>
				<ul>
					<li
						className='mt-3 genderWrapper'
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						{allGenders &&
							allGenders.map((g, i) => {
								return (
									<Link
										to={`/our-products?filterby=gender&gendername=${g.genderName}`}
										className='genderItem'
										style={{
											margin: allGenders.length === 2 ? "0px 20px" : "0px 15px",
										}}
										key={i}
										onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
										{g.genderName}
									</Link>
								);
							})}
					</li>
					<div className='col-12 mx-auto'>
						<hr />
					</div>
					<li
						className='mt-3'
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							to='/'
							className='sidebar-link'
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							<Fragment>
								<i className='fas fa-home fontawesome-icons'></i>
								<>
									{language === "Arabic" ? (
										<span className='sidebarArabic'>الصفحة الرئيسية</span>
									) : (
										"Home"
									)}{" "}
								</>
							</Fragment>
						</Link>
					</li>
					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							to='/our-products'
							className='sidebar-link'
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							<Fragment>
								<i className='fas fa-box-open fontawesome-icons'></i>

								<>
									{language === "Arabic" ? (
										<span className='sidebarArabic'>منتجاتنا</span>
									) : (
										"Our Products"
									)}
								</>
							</Fragment>
						</Link>
					</li>
					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							to='/about'
							className='sidebar-link'
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							<Fragment>
								<i className='fas fa-comment-alt fontawesome-icons'></i>
								<>
									{language === "Arabic" ? (
										<span className='sidebarArabic'>من نحن</span>
									) : (
										"About"
									)}
								</>
							</Fragment>
						</Link>
					</li>
					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							to='/contact'
							className='sidebar-link'
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							<Fragment>
								<i className='fas fa-envelope fontawesome-icons'></i>
								<>
									{language === "Arabic" ? (
										<span className='sidebarArabic'>اتصل بنا</span>
									) : (
										"Contact Us"
									)}
								</>
							</Fragment>
						</Link>
					</li>

					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li
							className='nav-item mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								className='nav-link fontawesome-icons myAccount '
								to='/user/dashboard'
								onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
								My Account/Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<>
							<li
								className='nav-item mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link fontawesome-icons myAccount '
									to='/admin/dashboard'
									onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
									Admin Dashboard
								</Link>
							</li>
							<li
								className='nav-item mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link fontawesome-icons myAccount'
									to='/user/dashboard'
									onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
									My Account/Dashboard
								</Link>
							</li>
						</>
					)}

					{!isAuthenticated() && (
						<Fragment>
							<li
								className='nav-item mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link fontawesome-icons '
									to='/signin'
									onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
									Login
								</Link>
							</li>

							<li
								className='nav-item mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link fontawesome-icons'
									to='/signup'
									onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
									Register
								</Link>
							</li>
						</Fragment>
					)}

					{isAuthenticated() && (
						<li
							className='nav-item'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<span>
								<span
									className='signoutbutton nav-link mt-3 '
									style={{
										cursor: "pointer",
										// margin: 10,
										fontWeight: "bold",
										textDecoration: "underline",
										color: "red",
										fontSize: "18px",
									}}
									onClick={() =>
										signout(() => {
											history.push("/");
											localStorage.removeItem("userHistoryPurchases");
											localStorage.removeItem("order");
										})
									}>
									<span className='myAccount'>Signout</span>
								</span>
							</span>
						</li>
					)}
					<li
						className='nav-item mx-3'
						style={{ marginTop: "150px" }}
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<span style={{ color: "black", fontWeight: "bold" }}>Language</span>{" "}
						<span
							className=' ml-4 btn'
							style={{ padding: "1px" }}
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							{language === "English" ? (
								<span
									style={{ background: "#c40000", color: "white" }}
									className='btn '
									onClick={() => {
										setLanguage("Arabic");

										// window.location.reload(false);
									}}>
									Arabic
								</span>
							) : (
								<span
									style={{ background: "#c40000", color: "white" }}
									className='btn '
									onClick={() => {
										setLanguage("English");

										// window.location.reload(false);
									}}>
									English
								</span>
							)}
						</span>
					</li>
				</ul>
			</SideWrapper>
		</>
	);
};

export default Sidebar;

const SideWrapper = styled.nav`
	position: fixed;
	/* top: 101px; */
	left: 0;
	width: 70%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 500;
	border-right: 3px solid lightgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
	top: ${(props) => (props.show2 ? "66px" : "107px")};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.genderItem {
		font-weight: bold;
		text-transform: uppercase;
		color: darkgrey;
	}
	.genderWrapper {
		text-align: center;
	}
	hr {
		border-bottom: 1px solid darkgrey;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}
	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}
	.fontawesome-icons {
		color: darkred;
		margin-right: 10px;
		/* font-weight: bold; */
	}
	.sidebarArabic {
		font-family: "Droid Arabic Kufi";
		letter-spacing: 0px;
	}
	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (min-width: 680px) {
		display: none;
	}
	@media (max-width: 700px) {
		.sidebar-link {
			font-size: 0.8rem;
		}
		.myAccount {
			font-size: 0.8rem;
		}
	}
`;
