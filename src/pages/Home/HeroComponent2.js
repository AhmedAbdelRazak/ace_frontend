/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { isAuthenticated, getSingleUser } from "../../auth/index";
import styled from "styled-components";
// eslint-disable-next-line
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowRight } from "react-icons/bs";
import { getAllHeros } from "../../Admin/apiAdmin";

const HeroComponent2 = () => {
	const [homePage, setHomePage] = useState({});
	const [photoCell2, setPhotoCell2] = useState("");

	const gettingAllHomes = () => {
		getAllHeros().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var latestHome = data[data.length - 1];
				var heroCellPhone2 = latestHome.thumbnail2_Phone[0].images[0].url;
				setPhotoCell2(heroCellPhone2);
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
		<HeroComponent2Wrapper className='mx-auto text-center mt-5'>
			{homePage && homePage.thumbnail2 && homePage.thumbnail2[0] && (
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
								homePage.thumbnail2 &&
								homePage.thumbnail2[0] &&
								homePage.thumbnail2[0].images &&
								homePage.thumbnail2[0].images[0] &&
								homePage.thumbnail2[0].images[0].url
							}
							alt='ShopPhoto'
							className='mt-3'
						/>
					</Link>
				</div>
			)}

			{homePage &&
				homePage.thumbnail2_Phone &&
				homePage.thumbnail2_Phone[0] && (
					<div className='heroPicMain phoneBanner'>
						<Link
							to='/our-products'
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
							<img src={photoCell2} alt='ShopPhoto2' className='mt-3' />
						</Link>
						<div className='textWrapper col-11 mx-auto mt-3'>
							<h3> BE THE FIRST TO KNOW ABOUT NEW ARRIVALS</h3>

							<div
								className='btn col-11 mx-auto btn-block'
								style={{
									background: "#c60e0e",
									color: "white",
									fontWeight: "bolder",
									textAlign: "left",
									padding: "10px 0px",
								}}>
								<Link
									style={{
										color: "white",
										// textTransform: "uppercase",
										marginLeft: "10px",
									}}
									to={`/signin`}
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "smooth" })
									}>
									Create an account{" "}
									<span
										style={{
											color: "white",
											fontSize: "2rem",
											padding: "0px",
											margin: "0px",
											fontWeight: "1000",
											position: "absolute",
											top: "-4px",
											right: "20px",
										}}>
										<BsArrowRight />
									</span>
								</Link>
							</div>
						</div>
					</div>
				)}
		</HeroComponent2Wrapper>
	);
};

export default HeroComponent2;

const HeroComponent2Wrapper = styled.div`
	text-align: center;
	/* background-image: linear-gradient(white, white); */

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

	.phoneBanner {
		display: none;
	}

	.phoneBanner img {
		display: none;
	}

	@media (max-width: 1000px) {
		.phoneBanner {
			display: block;
		}
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
			width: 100%;
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

		.textWrapper > h3 {
			font-weight: 1000 !important;
			text-transform: uppercase;
			text-align: center;
			font-size: 1.3rem;
		}
	}
`;
