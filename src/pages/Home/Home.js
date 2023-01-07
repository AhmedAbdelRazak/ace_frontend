/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeroComponent from "./HeroComponent";
import { getProducts } from "../../apiCore";
// eslint-disable-next-line
import CategoryWrapperComp from "./CategoryWrapperComp";
import FeaturedProducts from "./FeaturedProducts";
// eslint-disable-next-line
import OurBrandsComp from "./OurBrandsComp";
import MostViewedProducts from "./MostViewedProducts";
import GenderLinks from "./GenderLinks";
import HeroComponent2 from "./HeroComponent2";
import HeroComponent3 from "./HeroComponent3";
import GenderNav from "../../Navbar/GenderNav";

const Home = ({ chosenLanguage }) => {
	// eslint-disable-next-line
	const [allProducts, setAllProducts] = useState([]);
	// eslint-disable-next-line
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const [allSubcategories, setAllSubcategories] = useState([]);
	const [allGenders, setAllGenders] = useState([]);

	const gettingAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllProducts(
					data.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					),
				);

				//Categories Unique
				var categoriesArray = data
					.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					)
					.map((ii) => ii.category);

				let uniqueCategories = [
					...new Map(
						categoriesArray.map((item) => [item["categoryName"], item]),
					).values(),
				];
				setAllCategories(uniqueCategories);

				//Subcategories Unique
				var SubcategoriesArray = data
					.filter(
						(i) => i.activeProduct === true && i.storeName.storeName === "ace",
					)
					.map((ii) => ii.subcategory);

				var mergedSubcategories = [].concat.apply([], SubcategoriesArray);
				let uniqueSubcategories = [
					...new Map(
						mergedSubcategories.map((item) => [item["SubcategoryName"], item]),
					).values(),
				];
				setAllSubcategories(uniqueSubcategories);

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
		localStorage.removeItem("PaidNow");
		localStorage.removeItem("storedData");
		localStorage.removeItem("chosenShippingOption");
		localStorage.removeItem("orderDataStored");
		localStorage.removeItem("productColor");
		return () => {
			setAllProducts([]);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<HomeWrapper>
			<>
				<GenderNav />
			</>
			<HeroComponent />

			<GenderLinks allGenders={allGenders} />

			<div className='my-5'>
				<FeaturedProducts
					allProducts={allProducts}
					chosenLanguage={chosenLanguage}
				/>
			</div>
			<HeroComponent2 />
			{/* <CategoryWrapperComp
				chosenLanguage={chosenLanguage}
				categories={allCategories}
			/> */}

			{/* <div className='text-center my-5'>
				<OurBrandsComp
					chosenLanguage={chosenLanguage}
					allSubcategories={allSubcategories}
				/>
			</div> */}
			<MostViewedProducts chosenLanguage={chosenLanguage} />

			<HeroComponent3 />
			<br />
			<br />
			<br />
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background-color: white; */
`;
