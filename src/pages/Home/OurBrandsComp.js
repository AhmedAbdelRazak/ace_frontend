/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OurBrandsComp = ({ chosenLanguage, allSubcategories }) => {
	return (
		<OurBrandsCompWrapper>
			<div
				className={
					chosenLanguage === "Arabic"
						? "titleOurCategories2 mb-3"
						: "titleOurCategories mb-3"
				}>
				<h1
					style={{ fontWeight: "bolder", fontSize: "1.4rem" }}
					className={
						chosenLanguage === "Arabic"
							? "titleOurCategories2 text-center"
							: "titleOurCategories text-center"
					}>
					{chosenLanguage === "Arabic" ? "علاماتنا التجارية" : "Our Brands"}{" "}
				</h1>
			</div>
			<div className='row'>
				{allSubcategories &&
					allSubcategories.map((i, c) => {
						return (
							<div
								className='col-lg-2 col-md-4 col-sm-6 col-6 mx-auto text-center'
								key={c}>
								<Link
									to={`/our-products?filterby=subcategory&subcategoryname=${i.SubcategorySlug}`}
									className='imgAndCategoryName'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}>
									<img
										src={i.thumbnail && i.thumbnail[0] && i.thumbnail[0].url}
										alt={`${i.SubcategoryName}`}
										className='mb-4 '
										style={{ height: "230px", width: "230px" }}
									/>
								</Link>

								{chosenLanguage === "Arabic" ? (
									<div className='CategoryTextArabic mb-5'>
										{i.SubcategoryName_Arabic}
									</div>
								) : (
									<div className='CategoryText mb-5'>{i.SubcategoryName}</div>
								)}
							</div>
						);
					})}
			</div>
		</OurBrandsCompWrapper>
	);
};

export default OurBrandsComp;

const OurBrandsCompWrapper = styled.div`
	margin-top: 70px;
	background-image: linear-gradient(white, #ececec);
	text-transform: uppercase;

	/* background-image: linear-gradient(white, #e2fff8); */

	img {
		/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
		border: 2px white solid;
		border-radius: 10px 10px;
		transition: 1s;
	}
	.CategoryText {
		font-size: 1.1rem;
		text-align: center;
		margin-bottom: 7px;
		/* font-style: italic; */
		font-weight: bold;
		letter-spacing: 3px;
		text-transform: capitalize;
		/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
		color: #330000;
	}

	img:hover {
		border-radius: 10px 10px;
		transition: 0.5s;
		height: 205px !important;
		width: 205px !important;
		box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.CategoryTextArabic {
		font-size: 1.1rem;
		text-align: center;
		margin-bottom: 7px;
		font-family: "Droid Arabic Kufi";
		/* font-style: italic; */
		font-weight: bold;
		/* letter-spacing: 3px; */
		/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
		color: #330000;
	}

	@media (max-width: 900px) {
		img {
			/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
			border: 2px white solid;
			border-radius: 10px 10px;
			transition: 1s;
		}
		.CategoryText {
			font-size: 1.1rem;
			text-align: center;
			margin-bottom: 7px;
			/* font-style: italic; */
			font-weight: bold;
			letter-spacing: 3px;
			/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
			color: #330000;
		}

		img:hover {
			border-radius: 10px 10px;
			transition: 0.5s;
			height: 205px !important;
			width: 205px !important;
			box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
		}
	}
	@media (max-width: 700px) {
		img {
			/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
			border: 2px white solid;
			border-radius: 10px 10px;
			transition: 1s;
			width: 175px !important;
			height: 175px !important;
		}
		.CategoryText {
			font-size: 1rem;
			text-align: center;
			margin-bottom: 7px;
			/* font-style: italic; */
			/* font-weight: bold; */
			letter-spacing: 3px;
			/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
			color: #330000;
			display: none;
		}

		img:hover {
			border-radius: 10px 10px;
			transition: 0.5s;
			height: 205px !important;
			width: 205px !important;
			box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
		}
	}
`;
