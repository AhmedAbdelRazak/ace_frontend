/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { isAuthenticated, getSingleUser } from "../../auth/index";
import styled from "styled-components";
// eslint-disable-next-line
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHeros } from "../../Admin/apiAdmin";

const HeroComponent3 = () => {
	const [homePage, setHomePage] = useState({});

	const gettingAllHomes = () => {
		getAllHeros().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHomePage(data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingAllHomes();
		localStorage.removeItem("Cleared");
		return () => {
			setHomePage([]);
		};
		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	const settingsHero = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		adaptiveHeight: true,
	};
	return (
		<HeroComponent3Wrapper className='mx-auto text-center mt-5'>
			{homePage && homePage.thumbnail3 && homePage.thumbnail3[0] && (
				<div className='heroPicMain deskTopBanner'>
					{/* <h3
						className='mx-auto text-center'
						style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
						Main Section
					</h3> */}
					<Link
						to='/our-products'
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						<img
							src={
								homePage &&
								homePage.thumbnail3 &&
								homePage.thumbnail3[0] &&
								homePage.thumbnail3[0].images &&
								homePage.thumbnail3[0].images[0] &&
								homePage.thumbnail3[0].images[0].url
							}
							alt='ShopPhoto'
							className='mt-3'
						/>
					</Link>
				</div>
			)}

			{homePage &&
				homePage.thumbnail3_Phone &&
				homePage.thumbnail3_Phone[0] && (
					<div className=' phoneBanner'>
						<Link
							to='/our-products'
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
							<img
								src={
									homePage &&
									homePage.thumbnail3_Phone &&
									homePage.thumbnail3_Phone[0] &&
									homePage.thumbnail3_Phone[0].images &&
									homePage.thumbnail3_Phone[0].images[0] &&
									homePage.thumbnail3_Phone[0].images[0].url
								}
								alt='ShopPhoto'
								className='mt-3'
							/>
						</Link>
					</div>
				)}
		</HeroComponent3Wrapper>
	);
};

export default HeroComponent3;

const HeroComponent3Wrapper = styled.div`
	text-align: center;
	background-image: linear-gradient(white, white);

	.heroPicMain img {
		width: 100%;
		text-align: center;
		margin: auto;
		/* object-fit: cover !important; */
		/* border-radius: 5%; */
	}

	.slick-arrow {
		/* background-color: black; */
	}

	.slick-next {
		position: absolute !important;
		right: 1.2%;
		color: white !important;
	}

	.slick-prev {
		position: absolute !important;
		left: 0.5%;
		z-index: 200;
	}

	.slick-prev:before,
	.slick-next:before {
		font-family: "slick";
		font-size: 25px;
		line-height: 1;
		opacity: 0.75;
		color: grey;
		/* background-color: black; */
		padding-top: 5px !important;
		padding-bottom: 2px !important;
		padding-right: 3px;
		padding-left: 3px;
		border-radius: 10px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.slick-dots li button:before {
		font-size: 15px;
		margin-top: 10px;
	}

	.deskTopBanner img {
		display: block;
	}

	.phoneBanner img {
		display: none;
	}

	@media (max-width: 1000px) {
		.heroPicMain {
			width: 100%;
			opacity: 1;
			align: center;
			/* border-radius: 5%; */
		}

		.deskTopBanner img {
			display: none;
		}

		.phoneBanner img {
			width: 100% !important;
			/* object-fit: cover !important; */
			display: block;
		}

		.slick-next {
			right: 5% !important;
		}

		.slick-prev {
			left: 2%;
		}

		.slick-dots li button:before {
			font-size: 10px;
		}

		.slick-prev:before,
		.slick-next:before {
			font-family: "slick";
			font-size: 20px;
			line-height: 1;
			opacity: 0.75;
			color: white;
			background-color: black;
			padding-top: 3px !important;
			padding-bottom: 2px !important;
			padding-right: 3px;
			padding-left: 3px;
			border-radius: 10px;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			display: none;
		}
	}
`;
