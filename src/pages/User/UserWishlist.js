/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	getColors,
	getProducts,
	readSingleUserHistory,
	readUser,
} from "../../apiCore";
import { isAuthenticated } from "../../auth";
import CardInHomePage from "../Home/CardInHomePage";

const UserWishlist = () => {
	// eslint-disable-next-line
	const [userDetails, setUserDetails] = useState({});
	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);
	// eslint-disable-next-line
	const [useHistOrders, setUsersHistOrders] = useState([]);
	const [allProducts, setAllProducts] = useState([]);

	const { user, token } = isAuthenticated();

	const readingUser = () => {
		readUser(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				getProducts().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var productsLiked = data2.filter(
							(i) => i.likes.indexOf(data._id) > -1,
						);
						setAllProducts(productsLiked);
					}
				});
				setUserDetails(data);
				readSingleUserHistory(data.email, user._id, token).then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setUsersHistOrders(data2);
					}
				});
			}
		});
	};

	const gettingAllColors = () => {
		getColors(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
			}
		});
	};

	useEffect(() => {
		readingUser();
		gettingAllColors();
		// eslint-disable-next-line
	}, []);

	return (
		<UserWishlistWrapper>
			<h3>PRODUCTS YOU LIKED!</h3>
			{allProducts && allProducts.length === 0 ? (
				<h4>
					Sorry, No products in your wishlist,{" "}
					<Link to='/our-products'>Continue Shopping</Link> and we gurantee you
					will find something you will love!
				</h4>
			) : (
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
									<CardInHomePage
										i={i}
										product={product}
										key={i}
										chosenLanguage={"English"}
									/>
								))}
						</div>

						<hr />
					</div>
				</div>
			)}
		</UserWishlistWrapper>
	);
};

export default UserWishlist;

const UserWishlistWrapper = styled.div`
	min-height: 700px;
	background: white;

	h3 {
		text-align: center;
		padding-top: 20px;
		font-weight: bold;
	}

	h4 {
		/* text-align: center; */
		padding: 10px;
		font-weight: bold;
		font-size: 1.2rem;
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

	@media (max-width: 1200px) {
		.cardWrapper {
			margin: 30px auto !important;
			padding: 0px !important;
		}

		.grid-container {
			display: grid;
			grid-template-columns: 50% 49%;
			margin: auto 20px;
		}
	}
`;
