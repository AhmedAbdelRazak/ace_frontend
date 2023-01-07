/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColors, gettingAllProducts } from "../../apiCore";
import MainFilter from "./Filters/MainFilter";
import CardForShop from "./CardForShop";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import { useCartContext } from "../../Checkout/cart_context";
import SidebarFilters from "./Filters/SidebarFilters";
import DarkBackground from "./Filters/DarkBackground";
// import { FilterTwoTone } from "@ant-design/icons";

const ShopPageMain = ({ chosenLanguage }) => {
	const [allProducts, setAllProducts] = useState([]);
	const [allCategories, setAllCategories] = useState([]);

	// eslint-disable-next-line
	const [allSubcategories, setAllSubcategories] = useState([]);
	// eslint-disable-next-line
	const [allGenders, setAllGenders] = useState([]);
	const [allSizes, setAllSizes] = useState([]);
	const [allProductColors, setAllProductColors] = useState([]);
	const [filterItemClicked, setFilterItemClicked] = useState(false);
	const [clickedItem, setClickedItem] = useState("");
	const [usedFilters, setUsedFilters] = useState([]);
	const [allColors, setAllColors] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	const { openSideFilter, closeSideFilter, isSideFilterOpen } =
		useCartContext();

	//getting filters from URL
	const filterPath = window.location.search;
	const urlFiltersHelper = filterPath
		.substring(filterPath.indexOf("=") + 1)
		.trim()
		.toLowerCase();

	const urlFilters = urlFiltersHelper.substring(
		urlFiltersHelper.indexOf("=") + 1,
	);

	const filterBy = filterPath.substring(
		filterPath.indexOf("=") + 1,
		filterPath.indexOf("&"),
	);

	const gettingAllColors = () => {
		getColors().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	useEffect(() => {
		gettingAllProducts(
			filterBy,
			urlFilters,
			setAllProducts,
			setAllCategories,
			setAllSubcategories,
			setAllSizes,
			setAllProductColors,
			setAllGenders,
			setSelectedPriceRange,
			setMinPrice,
			setMaxPrice,
			usedFilters,
		);
		gettingAllColors();

		return () => {
			setAllProducts([]);
			// setAllCategories([])
			// setAllSubcategories([])
			// setAllSizes([])
			// setAllProductColors([])
			// setAllGenders([])
			// setSelectedPriceRange("")
			// setMinPrice("")
			// setMaxPrice("")
		};

		// eslint-disable-next-line
	}, [usedFilters]);

	return (
		<ShopPageMainWrapper>
			{isSideFilterOpen ? (
				<DarkBackground isSideFilterOpen={isSideFilterOpen} />
			) : null}

			<div className='heroFilter'>
				<div className='titleWrapper'>
					<h5>{urlFilters ? urlFilters : ""}</h5>
					<h2> All products </h2>
				</div>
			</div>
			<span className='filters_desktop'>
				<MainFilter
					clickedItem={clickedItem}
					setClickedItem={setClickedItem}
					filterItemClicked={filterItemClicked}
					setFilterItemClicked={setFilterItemClicked}
					allCategories={allCategories}
					allProductColors={allProductColors}
					allSizes={allSizes}
					usedFilters={usedFilters}
					setUsedFilters={setUsedFilters}
					allColors={allColors}
					selectedPriceRange={selectedPriceRange}
					setSelectedPriceRange={setSelectedPriceRange}
					minPrice={minPrice}
					maxPrice={maxPrice}
				/>
			</span>
			<div className='filtersPhone'>
				<SidebarFilters
					allCategories={allCategories}
					allProductColors={allProductColors}
					allSizes={allSizes}
					usedFilters={usedFilters}
					setUsedFilters={setUsedFilters}
					allColors={allColors}
				/>
				<div style={{ display: allGenders.length === 1 ? "none" : "" }}>
					<div className='row mx-auto'>
						<div
							onClick={isSideFilterOpen ? closeSideFilter : openSideFilter}
							className={"col-6 mx-auto filterSort"}
							style={{ textTransform: "uppercase" }}>
							<span>FILTER</span>
						</div>
						<div
							className={"col-6 mx-auto filterSort"}
							style={{ textTransform: "uppercase" }}>
							<span
								onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
								SORT
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* <h1 className='my-5'>
				All Products: {allProducts && allProducts.length}
			</h1> */}

			<div className='cardWrapper'>
				<div className='row '>
					<div
						className={
							allProducts && allProducts.length === 1
								? "col-md-3"
								: "grid-container"
						}>
						{allProducts &&
							allProducts.map((product, i) => (
								<CardForShop
									i={i}
									product={product}
									key={i}
									chosenLanguage={chosenLanguage}
								/>
							))}
					</div>

					<hr />
				</div>
			</div>
		</ShopPageMainWrapper>
	);
};

export default ShopPageMain;

const ShopPageMainWrapper = styled.div`
	min-height: 700px;
	/* background: white; */
	transition: 0.3s;
	overflow: hidden;

	.filters_desktop {
		display: block;
	}

	.filtersPhone {
		display: none;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		margin: auto 20px;
	}

	.cardWrapper {
		margin-right: 20px;
		margin-left: 20px;
		padding: 0px !important;
	}

	.heroFilter {
		background: rgb(245, 245, 245);
		min-height: 200px;
	}
	h2 {
		color: rgb(0, 0, 0);
		margin: 0px;
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: 700;
	}

	h5 {
		color: rgb(0, 0, 0);
		margin: 0px;
		text-transform: uppercase;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.titleWrapper {
		position: absolute;
		margin-left: 50px;
		margin-top: 60px;
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
			font-size: 1rem;
			font-weight: bold;
			/* text-shadow: 3px 3px 10px; */
		}

		.titleArabic {
			text-align: center;
			font-size: 1.2rem;
			/* letter-spacing: 7px; */
			font-weight: bold;
			/* text-shadow: 3px 3px 10px; */
		}

		.titleWrapper {
			position: relative;
			margin-left: 0px;
			margin-top: 0px;
		}

		.titleWrapper > h5 {
			padding-top: 40px !important;
		}

		.cardWrapper {
			margin: 30px auto !important;
			padding: 0px !important;
		}

		.grid-container {
			display: grid;
			grid-template-columns: 50% 49%;
			margin: auto 20px;
		}

		.heroFilter {
			min-height: 165px;
			text-align: center;
		}

		.filters_desktop {
			display: none;
		}

		.filtersPhone {
			display: block;
			/* font-weight: bolder; */
			text-align: center;
			/* background: #f2f2f2; */

			.filterSort {
				border: 1px solid #e9e9e9;
				width: 100%;
				padding: 8px 0px;
				/* font-weight: bold; */
				font-size: 1.1rem;
			}
		}
	}
`;
