/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated, signout } from "../auth";
import { useCartContext } from "../Checkout/cart_context";
import MostViewedSideBar from "./MostViewedSideBar";

const isActive = (history, path, gendersLength) => {
	if (history.genderName === path.genderName) {
		return {
			color: "black",
			fontWeight: "bold",
			// textDecoration: "underline",
			margin: gendersLength === 2 ? "0px 30px" : "0px 15px",
		};
	} else {
		return {
			color: "darkGrey",
			fontWeight: "bold",
			margin: gendersLength === 2 ? "0px 30px" : "0px 15px",
		};
	}
};

const isActive2 = (history, allGenders) => {
	const genderIndex =
		allGenders &&
		allGenders.map((i) => i.genderName).indexOf(history.genderName);
	if (history.genderName && genderIndex >= 0) {
		return {
			borderBottom: "1px solid black",
			position: "absolute",
			top: genderIndex === 0 ? "-15px" : "-15px",
			left: genderIndex === 0 ? "70px" : "182px",
		};
	} else {
		return {
			color: "white",
		};
	}
};

const Sidebar = ({
	language,
	setLanguage,
	history,
	allGenders,
	genderClicked,
	setGenderClicked,
	allCategories,
}) => {
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
								if (
									g.genderName.toLowerCase() === "men" ||
									g.genderName.toLowerCase() === "women"
								) {
									return (
										<Link
											// to={`/our-products?filterby=gender&gendername=${g.genderName}`}
											to='#'
											className='genderItem'
											// style={{
											// 	margin: allGenders.length === 2 ? "0px 20px" : "0px 15px",
											// }}

											style={isActive(genderClicked, g, allGenders.length)}
											key={i}
											// onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}
											onClick={() => setGenderClicked(g)}>
											{g.genderName}
										</Link>
									);
								} else {
									return null;
								}
							})}
					</li>

					<div className='col-12 mx-auto'>
						<hr />
						<hr
							className='col-2 mx-auto'
							style={isActive2(genderClicked, allGenders)}
						/>
					</div>

					<div className='mx-auto text-center'>
						{genderClicked &&
							genderClicked.thumbnail &&
							genderClicked.thumbnail[0] && (
								<img
									src={genderClicked.thumbnail[0].url}
									alt='infinite-apps.com'
									style={{
										width: "90%",
										height: "40%",
										textAlign: "center",
										marginTop: "10px",
									}}
								/>
							)}
					</div>
					<li
						className='mt-3'
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							to='/'
							className='sik'
							style={{
								textTransform: "capitalize",
								marginLeft: "25px",
								fontWeight: "bolder",
								color: "#c60e0e",
							}}
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							Sale
						</Link>
						<br />
						<Link
							to={`/our-products?filterby=gender&gendername=${genderClicked.genderName}`}
							className='sik'
							style={{
								textTransform: "capitalize",
								fontWeight: "bolder",
								padding: "0.2rem 1.1rem",
								marginLeft: "10px",
								color: "black",
							}}
							onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
							All Products
						</Link>
						{allCategories &&
							allCategories.map((c, i) => {
								return (
									<Link
										to={`/our-products?filterby=category&categoryName=${c.categorySlug}`}
										key={i}
										className='sidebar-link'
										style={{
											textTransform: "uppercase",
											padding: "0.2rem 1.1rem",
											marginLeft: "10px",
											// fontWeight: "bolder",
										}}
										onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}>
										{c.categoryName}
									</Link>
								);
							})}
					</li>

					<div className='col-12 mx-auto'>
						<hr />
					</div>

					<MostViewedSideBar chosenLanguage='English' />

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
										"Shop"
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
					{/* <li
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
					</li> */}
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
	width: 90%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 500;
	border-right: 3px solid lightgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
	/* top: ${(props) => (props.show2 ? "66px" : "107px")}; */
	top: 0px;
	overflow-y: auto;
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
		border-bottom: 1px solid lightgray;
	}

	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 0.5rem 1.1rem;
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
		color: #c60e0e;
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
