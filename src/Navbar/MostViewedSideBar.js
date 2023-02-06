/** @format */

import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import CardInHomePage from "./CardInHomePage";
import Slider from "react-slick";
import { getSortedProducts } from "../apiCore";

const MostViewedSideBar = ({ chosenLanguage }) => {
	const [productsByMostViews, setProductsByMostViews] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadFilteredResultsMostViewed = () => {
		setLoading(true);
		getSortedProducts("viewsCount").then((data) => {
			if (data.err) {
				console.log(data.err);
			} else {
				setProductsByMostViews(
					data
						.filter(
							(i) =>
								i.activeProduct === true && i.storeName.storeName === "ace",
						)
						.map((ii) => {
							return {
								...ii,
								quantity: 12,
							};
						}),
				);
			}
			setLoading(false);
		});
	};

	// console.log(productsByMostViews, "productsByMostViews");

	useEffect(() => {
		loadFilteredResultsMostViewed();
		return () => {
			setProductsByMostViews([]);
		};
		// eslint-disable-next-line
	}, []);
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
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
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplaySpeed: 3000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};
	return (
		<MostViewedSideBarWrapper>
			{loading ? (
				<div>Loading</div>
			) : (
				<>
					<Fragment>
						<div
							className={
								chosenLanguage === "Arabic" ? "titleArabic mb-2" : "title mb-2"
							}>
							<h1
								className={
									chosenLanguage === "Arabic" ? "titleArabic" : "title"
								}>
								{chosenLanguage === "Arabic"
									? "المنتجات الأكثر مشاهدة"
									: "Most Viewed!"}{" "}
							</h1>
						</div>
					</Fragment>
					<div className='container-fluid my-3 ProductSlider'>
						<Slider {...settings} className='mb-5'>
							{productsByMostViews &&
								productsByMostViews.map((product, i) => (
									<div className='img-fluid images ' key={i}>
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
				</>
			)}
		</MostViewedSideBarWrapper>
	);
};

export default MostViewedSideBar;

const MostViewedSideBarWrapper = styled.div`
	margin-top: 50px;

	.title {
		text-align: center;
		font-size: 2rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		/* color: #ffc4c4; */
		color: black;
		text-transform: uppercase;
		/* text-shadow: 3px 3px 10px; */
	}

	.titleArabic {
		text-align: center;
		font-size: 2rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		color: black;
		font-family: "Droid Arabic Kufi";
		/* text-shadow: 3px 3px 10px; */
	}

	.images {
		margin-left: 20px;
		margin-bottom: 30px;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}
	@media (max-width: 1200px) {
		.ProductSlider {
			padding: 0px 10px 0px 10px;
		}

		.title {
			font-size: 1.2rem;
			text-align: left;
			margin-left: 20px;
			font-weight: bold;
			text-transform: "uppercase";
			/* text-shadow: 3px 3px 10px; */
		}

		.titleArabic {
			text-align: left;
			margin-left: 20px;
			font-size: 1.2rem;
			/* letter-spacing: 7px; */
			font-weight: bold;
			/* text-shadow: 3px 3px 10px; */
		}

		.slick-dots {
			display: none !important;
		}
	}
`;
