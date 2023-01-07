/** @format */

import Slider from "react-slick";
import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { getAllAds } from "../Admin/apiAdmin";

const NavbarAds = () => {
	const [allAdsCombined, setAllAdsCombined] = useState([]);

	const gettingAllAds = () => {
		getAllAds().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAdsCombined(
					data[data.length - 1] && data[data.length - 1].ad_Name,
				);
			}
		});
	};

	useEffect(() => {
		gettingAllAds();
		// eslint-disable-next-line
	}, []);

	const settings = {
		dots: true,
		dotsClass: "slick-dots",
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 7000,
		pauseOnHover: true,
	};

	return (
		<NavbarAdsWrapper style={{ backgroundColor: "", padding: "" }}>
			{" "}
			<div className='mx-auto'>
				<div className='nav-item mainMessages mx-auto text-center'>
					<Slider {...settings}>
						{allAdsCombined &&
							allAdsCombined.map((i, e) => {
								return (
									<Fragment key={e}>
										<div className='mx-auto'>
											<span>{i}</span>
										</div>
									</Fragment>
								);
							})}
					</Slider>
				</div>
			</div>
		</NavbarAdsWrapper>
	);
};

export default NavbarAds;

const NavbarAdsWrapper = styled.nav`
	text-align: center;
	padding: 10px 0px !important;
	width: 50%;
	/* box-shadow: 8px 10px 5px 0px rgba(0, 0, 0, 0.02); */
	background: #c60e0e !important;
	border: 1px #c60e0e solid;
	text-align: center;
	margin: auto;

	span {
		color: white !important;
	}

	.slick-dots li button:hover:before,
	.slick-dots li button:focus:before {
		opacity: 1;
	}
	.slick-dots li button:before {
		font-size: 8px;
		text-align: center;
		opacity: 0.25;
		color: var(--darkGrey);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.slick-dots li.slick-active button:before {
		opacity: 1;
		color: #898989;
		/* font-weight: bold; */
	}

	.mainMessages {
		color: #000;

		font-weight: bold;
		/* font-style: italic; */
		text-align: center;
		font-size: 0.82rem;
	}
	.slick-dots li button:before {
		font-size: 10px;
		display: none;
	}

	@media (max-width: 1400px) {
		.mainMessages {
			color: #000;
			font-weight: bold;
			/* font-style: italic; */
			text-align: center;
			font-size: 0.75rem;
		}
	}
	@media (max-width: 900px) {
		width: 100% !important;
		box-shadow: none;
		margin: 0px !important;

		.mainMessages {
			color: #000;
			font-weight: bold;
			/* font-style: italic; */
			text-align: center;
			font-size: 0.75rem;
		}
		.slick-dots li button:before {
			font-size: 10px;
			display: none;
		}
	}
`;
