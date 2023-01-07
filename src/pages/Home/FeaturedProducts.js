/** @format */

import React from "react";
import styled from "styled-components";
import CardInHomePage from "./CardInHomePage";
import Slider from "react-slick";

const FeaturedProducts = ({ allProducts, chosenLanguage }) => {
	var allFeaturedProducts =
		allProducts &&
		allProducts
			.filter((i) => i.featuredProduct === true)
			.map((ii) => {
				return {
					...ii,
					quantity: 12,
				};
			});

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 2,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
					// variableWidth: true,
				},
			},
		],
	};

	return (
		<FeaturedProductsWrapper>
			<div
				className={
					chosenLanguage === "Arabic" ? "titleArabic mb-2" : "title mb-2"
				}>
				<h1
					style={{
						fontWeight: "bolder",
						fontSize: "1.3rem",
						marginLeft: "35px",
					}}
					className={chosenLanguage === "Arabic" ? "titleArabic" : "title"}>
					{chosenLanguage === "Arabic"
						? "منتجات مميزة"
						: "EXPLORE THE COLLECTION"}{" "}
				</h1>
			</div>
			<div className='container-fluid my-3 ProductSlider'>
				<Slider {...settings} className='mb-5'>
					{allFeaturedProducts &&
						allFeaturedProducts.map((product, i) => (
							<div className='images' key={i}>
								<CardInHomePage
									i={i}
									product={product}
									key={i}
									chosenLanguage={chosenLanguage}
								/>
							</div>
						))}
				</Slider>
			</div>
			<div className='headerWrapper'>
				<h3>BECOME A MEMBER</h3>
				<p>Join now and get 10% off your next purchase</p>
			</div>
		</FeaturedProductsWrapper>
	);
};

export default FeaturedProducts;

const FeaturedProductsWrapper = styled.div`
	margin-top: 50px;

	.title {
		text-align: left;
		font-size: 2rem;
		/* letter-spacing: 7px; */
		margin-left: 35px;
		font-weight: bold;
		/* color: #ffc4c4; */
		color: black;
		margin-left: 0px;
		text-transform: uppercase;
		/* text-shadow: 3px 3px 10px; */
	}

	.titleArabic {
		text-align: left;
		font-size: 2rem;
		margin-left: 35px;
		/* letter-spacing: 7px; */
		font-weight: bold;
		color: black;
		margin-left: 0px;
		font-family: "Droid Arabic Kufi";
		/* text-shadow: 3px 3px 10px; */
	}

	.headerWrapper {
		display: none;
	}

	.images {
		margin-left: 20px;
		margin-bottom: 30px;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	.slick-slide {
		margin: 0 0px;
		padding: 0px !important;
	}

	/* the parent */
	.slick-list {
		margin: 0 0px;
		padding: 0px !important;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}
	@media (max-width: 1200px) {
		.ProductSlider {
			padding: 0px 0px 0px 0px;
			margin: 0px !important;
		}

		.title {
			font-size: 1.1rem !important;
			font-weight: bold;
		}

		.titleArabic {
			font-size: 1.1rem !important;
			font-weight: bold;
		}

		.headerWrapper {
			display: block;
			background: black;
			text-align: center;
		}

		.headerWrapper > h3 {
			color: white;
			font-size: 1.2rem;
			font-weight: bold;
			text-align: center;
			padding-top: 10px;
		}
		.headerWrapper > p {
			color: white;
			font-size: 0.9rem;
			/* font-weight: bold; */
			text-align: center;
			padding-bottom: 10px;
		}
		.slick-dots {
			display: none !important;
		}
	}
`;
