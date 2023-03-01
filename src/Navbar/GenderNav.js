/** @format */

import React, { useEffect, useState } from "react";
import { getProducts } from "../apiCore";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GenderNav = () => {
	const [allGenders, setAllGenders] = useState([]);

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				//Gender Unique
				var genderUnique = data
					.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					)
					.map((ii) => ii.gender);

				let uniqueGenders = [
					...new Map(
						genderUnique.map((item) => [item["genderName"], item]),
					).values(),
				];
				setAllGenders(uniqueGenders);
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();
		return () => {
			setAllGenders([]);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<GenderNavWrapper
			style={{ display: allGenders.length === 1 ? "none" : "" }}>
			<div className='row mx-auto'>
				{allGenders &&
					allGenders.map((g, i) => {
						if (
							g.genderName.toLowerCase() === "men" ||
							g.genderName.toLowerCase() === "women"
						) {
							return (
								<div
									className={
										allGenders.length === 2
											? "col-6 mx-auto genderItem"
											: allGenders.length === 2
											? "col-4 mx-auto genderItem"
											: "col-6 mx-auto genderItem"
									}
									key={i}
									style={{ textTransform: "uppercase" }}>
									<Link
										to={`/our-products?filterby=gender&gendername=${g.genderName}`}
										onClick={() =>
											window.scrollTo({ top: 0, behavior: "smooth" })
										}>
										SHOP {g.genderName}
									</Link>
								</div>
							);
						} else {
							return null;
						}
					})}
			</div>
		</GenderNavWrapper>
	);
};

export default GenderNav;

const GenderNavWrapper = styled.div`
	display: none;
	text-align: center;
	background: #f2f2f2;

	.genderItem {
		border: 1px solid #e9e9e9;
		width: 100%;
		padding: 10px 0px;
		font-weight: bold;
	}

	a {
		color: black;
	}

	@media (max-width: 600px) {
		display: block;
	}
`;
