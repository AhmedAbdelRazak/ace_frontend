/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryWrapperComp = ({ chosenLanguage, categories }) => {
	return (
		<CategoriesPics className='mt-5'>
			<div
				className={
					chosenLanguage === "Arabic"
						? "titleOurCategories2 mb-3"
						: "titleOurCategories mb-3"
				}>
				<h1
					className={
						chosenLanguage === "Arabic"
							? "titleOurCategories2 text-center"
							: "titleOurCategories text-center"
					}>
					{chosenLanguage === "Arabic" ? "الفئات المتاحة" : "Our Categories"}{" "}
				</h1>
			</div>
			<div className='row mx-auto text-center'>
				{categories &&
					categories.map((i, c) => {
						return (
							<div className='col-lg-4 col-md-4 col-sm-6 col-6 mx-auto' key={c}>
								<Link
									to={`/our-products?filterby=category&categoryName=${i.categorySlug}`}
									className='imgAndCategoryName'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}>
									<img
										src={i.thumbnail && i.thumbnail[0] && i.thumbnail[0].url}
										alt={`${i.categoryName}`}
										className='mb-4 '
										style={{ height: "230px", width: "230px" }}
									/>
									{/* <div className='hamadaTest'>
													{chosenLanguage === "Arabic"
														? i.categoryName_Arabic
														: i.categoryName}
												</div> */}
								</Link>
								{/* {chosenLanguage === "Arabic" ? (
									<div className='CategoryTextArabic mb-5'>
										{i.categoryName_Arabic}
									</div>
								) : (
									<div className='CategoryText mb-5'>{i.categoryName}</div>
								)} */}
							</div>
						);
					})}
			</div>
		</CategoriesPics>
	);
};

export default CategoryWrapperComp;

const CategoriesPics = styled.div`
    margin-top: 5px;
	/* background-image: linear-gradient(white, #ececec); */
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
		/* letter-spacing: 3px; */
		/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
		color: #330000;
        text-transform: capitalize;

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


	img:hover {
		border-radius: 10px 10px;
		transition: 0.5s;
		height: 205px !important;
		width: 205px !important;
		box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.titleOurCategories {
		text-transform: uppercase;
		color: darkred;
		text-align: left !important;
		margin-left: 30px;
		letter-spacing: 0px;
		font-size: 2rem !important;
		font-weight: bold;

	}

	.titleOurCategories2 {
		text-transform: uppercase;
		color: darkred;
		text-align: left !important;
		letter-spacing: 0px
		font-size: 2rem !important;
		font-weight: bold;
		margin-left: 30px;

	}


	@media (max-width: 900px) {
		text-align: center;

	.row {
		margin: auto !important;

	}
		img {
			/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
			border: 2px white solid;
			border-radius: 10px 10px;
			transition: 1s;
			margin: 0px !important;
		}
		.CategoryText {
			font-size: 1.1rem;
			text-align: center;
			margin-bottom: 7px;
			/* font-style: italic; */
			font-weight: bold;
			/* letter-spacing: 3px; */
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
			width: 160px !important;
			height: 160px !important;
		}
		.CategoryText {
			font-size: 1rem;
			text-align: center;
			margin-bottom: 7px;
			color: black;
			display: none;
		}

		.CategoryTextArabic {
		font-size: 1rem;
		color: black;
	}

	.titleOurCategories ,  .titleOurCategories2{
		color: black;
		text-align: center !important;
		font-size: 1.4rem !important;
		margin-left: 0px !important;

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
