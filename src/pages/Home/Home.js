/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga4";
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
import { Helmet } from "react-helmet";

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

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	return (
		<HomeWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>ACE SPORTS WEAR | ONLINE SHOP</title>

				<meta name='description' content='Ace Online Shop' />
				<link rel='icon' href='gq_frontend\src\GeneralImgs\favicon.ico' />
				<link rel='canonical' href='https://acesportive.com' />
			</Helmet>
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
