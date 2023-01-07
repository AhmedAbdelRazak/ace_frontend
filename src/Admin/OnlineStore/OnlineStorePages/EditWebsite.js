/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditAboutUsPage from "./EditAboutUsPage";
import AdminMenu from "../../AdminMenu/AdminMenu";
import DarkBG from "../../AdminMenu/DarkBG";
import EditContactUsPage from "./EditContactUsPage";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			// color: "white !important",
			background: "#2b0612",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const EditWebsite = ({ history, match }) => {
	const [selectedLink, setSelectedLink] = useState(match.params.pageedit);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [collapsed, setCollapsed] = useState(false);
	// eslint-disable-next-line
	const [pageScrolled, setPageScrolled] = useState(false);

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
		<EditWebsiteWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='WebsiteEdit'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				<div className='navbarcontent'>
					<div className='row'>
						<div className='col-md-3'>
							<ul className='mt-4'>
								<hr />
								<li>
									<Link
										data-aos='fade-down'
										style={isActive(
											history,
											`/admin/website-edit/aboutus-edit`,
										)}
										to={`/admin/website-edit/aboutus-edit`}
										onClick={() => {
											setSelectedLink("aboutus-edit");
										}}>
										Edit About Us Page
									</Link>
								</li>
								<hr />

								<li>
									<Link
										data-aos='fade-down'
										style={isActive(
											history,
											`/admin/website-edit/contactus-edit`,
										)}
										to={`/admin/website-edit/contactus-edit`}
										onClick={() => {
											setSelectedLink("contactus-edit");
										}}>
										Edit Contact Us Page
									</Link>
								</li>
								<hr />
							</ul>
						</div>
						<div className='col-md-8 mx-auto'>
							{selectedLink === "aboutus-edit" && (
								<div>
									<EditAboutUsPage />
								</div>
							)}

							{selectedLink === "logo-edit" && (
								<div>
									<EditAboutUsPage />
								</div>
							)}

							{selectedLink === "contactus-edit" && (
								<div>
									<EditContactUsPage />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</EditWebsiteWrapper>
	);
};

export default EditWebsite;

const EditWebsiteWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 10px;
	/* background: #fafafa; */
	overflow-x: hidden;

	.grid-container {
		display: grid;
		/* grid-template-columns: 16% 84%; */
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15% 85%"};

		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.navbarcontent > nav > ul {
		list-style-type: none;
		background: white;
	}

	.navbarcontent > div > ul > li {
		background: white;
		font-size: 0.8rem;
		font-weight: bolder !important;
		color: #545454;
	}

	@media (max-width: 1750px) {
		/* background: white; */

		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 1400px) {
		/* background: white; */

		.grid-container {
			display: grid;
			grid-template-columns: 8% 92%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}

		.storeSummaryFilters {
			position: "";
			width: "";
		}
	}
`;
