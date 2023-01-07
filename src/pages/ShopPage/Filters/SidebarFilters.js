/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Collapse } from "antd";
import { useCartContext } from "../../../Checkout/cart_context";
const { Panel } = Collapse;

const SidebarFilters = ({
	allCategories,
	allProductColors,
	allColors,
	allSizes,
	usedFilters,
	setUsedFilters,
}) => {
	const [checked, setCheked] = useState([]);
	const [checked3, setCheked3] = useState([]);
	const { isSideFilterOpen } = useCartContext();

	const handleToggleCategory = (c) => () => {
		// return the first index or -1
		const currentCategorySlug = checked.indexOf(c);
		const newCheckedCategorySlug = [...checked];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentCategorySlug === -1) {
			newCheckedCategorySlug.push(c);
		} else {
			newCheckedCategorySlug.splice(currentCategorySlug, 1);
		}

		setCheked(newCheckedCategorySlug);

		const availableCategoryFilter =
			usedFilters.filter((i) => i.filterBy === "category").length > 0;

		if (availableCategoryFilter) {
			let array2 = usedFilters.map((a) => {
				var returnValue = { ...a };

				if (a.filterBy === "category") {
					returnValue.filterByType = newCheckedCategorySlug;
				}

				return returnValue;
			});

			setUsedFilters(array2);
		} else {
			setUsedFilters([
				...usedFilters,
				{ filterBy: "category", filterByType: newCheckedCategorySlug },
			]);
		}
	};

	const handleToggleColors = (c) => () => {
		// return the first index or -1
		const currentColors = checked3.indexOf(c);
		const newCheckedColors = [...checked3];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentColors === -1) {
			newCheckedColors.push(c);
		} else {
			newCheckedColors.splice(currentColors, 1);
		}

		setCheked3(newCheckedColors);

		const availableCategoryFilter =
			usedFilters.filter((i) => i.filterBy === "colors").length > 0;

		if (availableCategoryFilter) {
			let array2 = usedFilters.map((a) => {
				var returnValue = { ...a };

				if (a.filterBy === "colors") {
					returnValue.filterByType = newCheckedColors;
				}

				return returnValue;
			});

			setUsedFilters(array2);
		} else {
			setUsedFilters([
				...usedFilters,
				{ filterBy: "colors", filterByType: newCheckedColors },
			]);
		}
	};

	return (
		<>
			<SidebarFiltersWrapper show={isSideFilterOpen}>
				<Collapse
					style={{ background: "white", textAlign: "left" }}
					accordion
					defaultActiveKey={["0"]}>
					<Panel
						collapsible
						style={{ marginBottom: "5px" }}
						header={
							<span style={{ fontWeight: "bold", color: "black" }}>
								Product Type
							</span>
						}>
						<div className=''>
							{allCategories &&
								allCategories.map((c, i) => {
									return (
										<div
											htmlFor={c}
											className='block ml-3 mb-2'
											key={i}
											style={{ textTransform: "uppercase" }}>
											<input
												type='checkbox'
												id={c}
												onChange={handleToggleCategory(c.categorySlug)}
												value={checked.indexOf(c.categorySlug === -1)}
												checked={
													usedFilters
														.filter((iii) => iii.filterBy === "category")
														.map((iiii) => iiii.filterByType)[0] &&
													usedFilters
														.filter((iii) => iii.filterBy === "category")
														.map((iiii) => iiii.filterByType)[0]
														.indexOf(c.categorySlug) !== -1
												}
												className='m-2'
											/>
											{c.categoryName}
										</div>
									);
								})}
						</div>
					</Panel>

					<Panel
						collapsible
						showArrow={true}
						style={{ marginBottom: "5px" }}
						header={
							<span style={{ fontWeight: "bold", color: "black" }}>
								Product Color
							</span>
						}>
						<div className=''>
							{allProductColors &&
								allProductColors.map((c, i) => {
									return (
										<div
											htmlFor={c}
											className='block ml-3 mb-2'
											key={i}
											style={{ textTransform: "capitalize" }}>
											<input
												type='checkbox'
												id={c}
												onChange={handleToggleColors(c)}
												value={checked.indexOf(c === -1)}
												className='m-2'
												checked={
													usedFilters
														.filter((iii) => iii.filterBy === "color")
														.map((iiii) => iiii.filterByType)[0] &&
													usedFilters
														.filter((iii) => iii.filterBy === "color")
														.map((iiii) => iiii.filterByType)[0]
														.indexOf(c) !== -1
												}
											/>
											<span
												className='squareColor mr-1'
												// style={{ background: c }}
											>
												{
													allColors[allColors.map((i) => i.hexa).indexOf(c)]
														.color
												}
											</span>
										</div>
									);
								})}
						</div>
					</Panel>
				</Collapse>
			</SidebarFiltersWrapper>
		</>
	);
};

export default SidebarFilters;

const SidebarFiltersWrapper = styled.nav`
	overflow: auto;
	position: fixed;
	/* top: 101px; */
	left: 0;
	top: 106px;
	width: 70%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 300;
	border-right: 1px solid lightgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};

	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}

	hr {
		border-bottom: 1px solid darkgrey;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}
	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	.fontawesome-icons {
		color: darkred;
		margin-right: 10px;
		/* font-weight: bold; */
	}

	.sidebarArabic {
		font-family: "Droid Arabic Kufi";
		letter-spacing: 0px;
	}
	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (min-width: 680px) {
		display: none;
	}

	@media (max-width: 700px) {
		.sidebar-link {
			font-size: 0.8rem;
		}

		.myAccount {
			font-size: 0.8rem;
		}
	}
`;
