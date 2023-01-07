/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GenderLinks = ({ allGenders }) => {
	function sortOrdersAscendingly(a, b) {
		const TotalAppointmentsA = a.genderName;
		const TotalAppointmentsB = b.genderName;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else {
			comparison = -1;
		}
		return comparison;
	}

	return (
		<GenderLinksWrapper>
			<div className='btnGender mb-3'>
				<div className='row'>
					{allGenders &&
						allGenders.sort(sortOrdersAscendingly) &&
						allGenders.sort(sortOrdersAscendingly).map((g, i) => {
							return (
								<div
									key={i}
									className='btn col-11 mx-auto btn-block'
									style={{
										background: "#c60e0e",
										color: "white",
										fontWeight: "bolder",
									}}>
									<Link
										style={{
											color: "white",
											textTransform: "uppercase",
										}}
										to={`/our-products?filterby=gender&gendername=${g.genderName}`}
										onClick={() =>
											window.scrollTo({ top: 0, behavior: "smooth" })
										}>
										Shop {g.genderName}
									</Link>
								</div>
							);
						})}
				</div>
			</div>

			<div className='container mx-auto'>
				<div className='text-center row mx-auto'>
					{allGenders &&
						allGenders.map((g, i) => {
							return (
								<div
									key={i}
									className='col-lg-4 col-md-4 col-sm-6 col-5 p-0 imgWrapper'>
									<Link
										to={`/our-products?filterby=gender&gendername=${g.genderName}`}
										onClick={() =>
											window.scrollTo({ top: 0, behavior: "smooth" })
										}>
										<img
											src={g.thumbnail && g.thumbnail[0] && g.thumbnail[0].url}
											alt={g.genderName}
											className='mb-4 text-center'
											style={{ height: "350px", width: "350px" }}
										/>
										<br />
										{/* <span className='GenderText mb-5'>{g.genderName}</span> */}
									</Link>
								</div>
							);
						})}
				</div>
			</div>
		</GenderLinksWrapper>
	);
};

export default GenderLinks;

const GenderLinksWrapper = styled.div`
	margin-top: 20px;

	.btnGender {
		display: none;
	}

	.imgWrapper {
		margin: auto;
	}

	.title {
		text-align: center;
		font-size: 2rem;
		margin-left: 35px;
		/* letter-spacing: 7px; */
		font-weight: bold;
		/* color: #ffc4c4; */
		color: darkred;
		text-transform: uppercase;
		/* text-shadow: 3px 3px 10px; */
	}

	.titleArabic {
		/* text-align: center; */
		font-size: 2rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		color: #ffc4c4;
		font-family: "Droid Arabic Kufi";
		color: darkred;

		/* text-shadow: 3px 3px 10px; */
	}

	img {
		/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
		border: 2px white solid;
		/* border-radius: 10px 10px; */
		transition: 1s;
	}

	img:hover {
		/* border-radius: 10px 10px; */
		transition: 0.5s;
		box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.1);
	}

    .GenderText {
		font-size: 1.1rem;
		margin-bottom: 7px;
		/* font-style: italic; */
		font-weight: bold;
		/* letter-spacing: 3px; */
		/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
		color: #330000;
        text-transform: capitalize;

	}


    @media (max-width: 900px) {
		img {
			/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
			border: 2px white solid;
			/* border-radius: 10px 10px; */
			transition: 1s;
		}
		.GenderText {
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
		/* border-radius: 10px 10px; */
		transition: 0.5s;
		height: 205px !important;
		width: 205px !important;
		box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
	}
	}
	@media (max-width: 700px) {

		.btnGender {
		display: block;
	}
	
		.row {
		margin: auto !important;

	}

	.imgWrapper {
		margin-left: 10px;

	}
		
		img {
			/* box-shadow: 1px 1px 2.5px 2.5px rgba(0, 0, 0, 0.3); */
			border: 2px white solid;
			/* border-radius: 10px 10px; */
			transition: 1s;
			width: 195px !important;
			height: 195px !important;
			margin-right: 10px;
		
		}

		

		.GenderText {
			font-size: 1rem;
			text-align: center;
			margin-bottom: 7px;
			/* font-style: italic; */
			/* font-weight: bold; */
			letter-spacing: 3px;
			/* text-shadow: 1px 4px 3px rgba(0, 0, 0, 0.5); */
			color: black !important;
			display: none;
		}

		img:hover {
		/* border-radius: 10px 10px; */
		transition: 0.5s;
		height: 205px !important;
		width: 205px !important;
		box-shadow: 5px 5px 2px 2px rgba(0, 0, 0, 0.5);
	}

	.title {
		text-align: center;
		font-size: 1.4rem;
		margin-left: 0px !important;
		/* letter-spacing: 7px; */
		font-weight: bold;
		/* color: #ffc4c4; */
		color: black;
		text-transform: uppercase;
		/* text-shadow: 3px 3px 10px; */
	}

	.titleArabic {
		text-align: center;
		font-size: 1.4rem;
		/* letter-spacing: 7px; */
		font-weight: bold;
		color: #ffc4c4;
		font-family: "Droid Arabic Kufi";
		color: black;

		/* text-shadow: 3px 3px 10px; */
	}

	@media (max-width: 420px) {
		.imgWrapper > a > img {
			width: 112% !important;
			height: 112% !important;
		}
	}
`;
