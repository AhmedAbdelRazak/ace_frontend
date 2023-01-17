/** @format */

export const allLoyaltyPointsAndStoreStatus = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/store-management`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProducts = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/products`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getShippingOptions = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/shipping-options`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readShippingOption = (shippingId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/shipping/${shippingId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getSortedProducts = (sortBy) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=8`,
		{
			method: "GET",
		},
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readProduct = (productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

/** @format */

export const read = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const update = (userId, token, user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateFromAdmin = (userId, token, user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/admin/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getPurchaseHistory = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/orders/by/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const userlike = (userId, token, productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/like`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const userunlike = (userId, token, productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/unlike`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateUser = (user, next) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("jwt")) {
			let auth = JSON.parse(localStorage.getItem("jwt"));
			auth.user = user;
			localStorage.setItem("jwt", JSON.stringify(auth));
			next();
		}
	}
};

export const productStar = (productId, star, token, email, userId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/product/star/${productId}/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ productId, star, email, userId }),
		},
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const comment = (userId, token, productId, comment, commentsPhotos) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId, comment, commentsPhotos }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const uncomment = (userId, token, productId, comment) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId, comment }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const like = (userId, token, productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const unlike = (userId, token, productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, productId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const views = (productId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/views`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ productId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const viewsCounter = (productId, counter) => {
	return fetch(`${process.env.REACT_APP_API_URL}/viewscounter`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ productId, counter }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getColors = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/colors`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const gettingAllProducts = (
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
) => {
	getProducts().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			const requiredProductsInitial = data.filter(
				(i) => i.activeProduct === true && i.storeName.storeName === "ace",
			);

			const requiredProducts2 = data.filter(
				(i) => i.activeProduct === true && i.storeName.storeName === "ace",
			);

			var allProductsAdded =
				requiredProductsInitial &&
				requiredProductsInitial.map((ii) => {
					return {
						...ii,
						quantity: 12,
					};
				});

			const AllProductsModified =
				allProductsAdded && allProductsAdded.map((i) => i.productAttributes);

			var mergedAttributes = [].concat.apply([], AllProductsModified);

			let allAttributes = [
				...new Map(mergedAttributes.map((item) => [item, item])).values(),
			];

			const allAttributesEnhanced =
				allAttributes &&
				allAttributes.filter((i) => i.productImages.length > 0);

			const PK =
				allAttributesEnhanced && allAttributesEnhanced.map((i) => i.PK);

			const finalResultVariableDifferentImages = allProductsAdded.map((i) => {
				return {
					...i,
					productAttributes: i.productAttributes,
					clickedProductAttribute: i.productAttributes.filter(
						(ii) => PK.indexOf(ii.PK) !== -1,
					),
				};
			});

			const finalOfFinal1 =
				finalResultVariableDifferentImages &&
				finalResultVariableDifferentImages.map((i) =>
					i.clickedProductAttribute.map((ii) => {
						return {
							...i,
							DropShippingPrice: ii.DropShippingPrice,
							MSRP: ii.MSRP,
							PK: ii.PK,
							SubSKU: ii.SubSKU,
							WholeSalePrice: ii.WholeSalePrice,
							color: ii.color,
							price: ii.price,
							priceAfterDiscount: ii.priceAfterDiscount,
							productImages: ii.productImages,
							quantity: ii.quantity,
							size: ii.size,
						};
					}),
				);

			var mergedFinalOfFinal = [].concat.apply([], finalOfFinal1);

			let allAttributesFinalOfFinal = [
				...new Map(mergedFinalOfFinal.map((item) => [item, item])).values(),
			];

			const requiredProducts =
				allAttributesFinalOfFinal &&
				allAttributesFinalOfFinal.filter(
					(i) =>
						i.productImages &&
						i.productImages[0] &&
						i.productImages[0].url !== undefined,
				);

			function shuffle(array) {
				let currentIndex = array.length,
					randomIndex;

				// While there remain elements to shuffle.
				while (currentIndex !== 0) {
					// Pick a remaining element.
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;

					// And swap it with the current element.
					[array[currentIndex], array[randomIndex]] = [
						array[randomIndex],
						array[currentIndex],
					];
				}

				return array;
			}

			shuffle(requiredProducts);

			if (filterBy === "gender") {
				const genderFilter = requiredProducts.filter(
					(iii) =>
						iii.gender.genderName.toLowerCase() === urlFilters.toLowerCase(),
				);

				if (
					usedFilters &&
					usedFilters.length > 0 &&
					usedFilters[usedFilters.length - 1].filterBy === "sizes" &&
					usedFilters[usedFilters.length - 1].filterByType.length > 0
				) {
					setAllProducts(
						genderFilter &&
							genderFilter.filter(
								(i) =>
									usedFilters[usedFilters.length - 1].filterByType.indexOf(
										i.size.toLowerCase(),
									) !== -1,
							),
					);
				} else if (
					usedFilters &&
					usedFilters.length > 0 &&
					usedFilters[usedFilters.length - 1].filterBy === "colors" &&
					usedFilters[usedFilters.length - 1].filterByType.length > 0
				) {
					setAllProducts(
						genderFilter &&
							genderFilter.filter(
								(i) =>
									usedFilters[usedFilters.length - 1].filterByType.indexOf(
										i.color.toLowerCase(),
									) !== -1,
							),
					);
				} else if (
					usedFilters &&
					usedFilters.length > 0 &&
					usedFilters[usedFilters.length - 1].filterBy === "category" &&
					usedFilters[usedFilters.length - 1].filterByType.length > 0
				) {
					setAllProducts(
						genderFilter &&
							genderFilter.filter(
								(i) =>
									usedFilters[usedFilters.length - 1].filterByType.indexOf(
										i.category.categorySlug,
									) !== -1,
							),
					);
				} else {
					setAllProducts(genderFilter);
				}
			} else if (filterBy === "category") {
				setAllProducts(
					requiredProducts.filter(
						(iii) =>
							iii.category.categorySlug.toLowerCase() ===
							urlFilters.toLowerCase(),
					),
				);
			} else if (filterBy === "subcategory") {
				setAllProducts(
					requiredProducts.filter(
						(iii) =>
							iii.subcategory
								.map((iiii) => iiii.SubcategorySlug)
								.indexOf(urlFilters.toLowerCase()) !== -1,
					),
				);
			} else {
				setAllProducts(requiredProducts);
			}

			if (filterBy === "gender") {
				// eslint-disable-next-line
				var categoriesArray = requiredProducts2
					.filter(
						(iii) =>
							iii.gender.genderName.toLowerCase() === urlFilters.toLowerCase(),
					)
					.filter((i) => i.activeProduct === true)
					.map((ii) => ii.category);

				let uniqueCategories = [
					...new Map(
						categoriesArray.map((item) => [item["categoryName"], item]),
					).values(),
				];
				setAllCategories(uniqueCategories);
			} else if (filterBy === "category") {
				// eslint-disable-next-line
				var categoriesArray = requiredProducts2
					.filter(
						(iii) =>
							iii.category.categorySlug.toLowerCase() ===
							urlFilters.toLowerCase(),
					)
					.filter((i) => i.activeProduct === true)
					.map((ii) => ii.category);

				let uniqueCategories = [
					...new Map(
						categoriesArray.map((item) => [item["categoryName"], item]),
					).values(),
				];
				setAllCategories(uniqueCategories);
			} else if (filterBy === "subcategory") {
				// eslint-disable-next-line
				var categoriesArray = requiredProducts2
					.filter(
						(iii) =>
							iii.subcategory
								.map((iiii) => iiii.SubcategorySlug)
								.indexOf(urlFilters.toLowerCase()) !== -1,
					)
					.filter((i) => i.activeProduct === true)
					.map((ii) => ii.category);

				let uniqueCategories = [
					...new Map(
						categoriesArray.map((item) => [item["categoryName"], item]),
					).values(),
				];
				setAllCategories(uniqueCategories);
			} else {
				// eslint-disable-next-line
				var categoriesArray =
					requiredProducts2 && requiredProducts2.map((ii) => ii.category);

				let uniqueCategories = [
					...new Map(
						categoriesArray &&
							categoriesArray.map((item) => [item["categoryName"], item]),
					).values(),
				];
				setAllCategories(uniqueCategories);
			}

			///

			//Subcategories Unique
			var SubcategoriesArray =
				requiredProducts2 && requiredProducts2.map((ii) => ii.subcategory);

			var mergedSubcategories = [].concat.apply([], SubcategoriesArray);
			let uniqueSubcategories = [
				...new Map(
					mergedSubcategories.map((item) => [item["SubcategoryName"], item]),
				).values(),
			];
			setAllSubcategories(uniqueSubcategories);

			//Gender Unique
			var genderUnique =
				requiredProducts2 && requiredProducts2.map((ii) => ii.gender);

			let uniqueGenders = [
				...new Map(
					genderUnique &&
						genderUnique.map((item) => [item["genderName"], item]),
				).values(),
			];
			setAllGenders(uniqueGenders);

			//Unique Sizes
			const allSizes =
				requiredProducts2 &&
				requiredProducts2.map((i) => i.productAttributes.map((ii) => ii.size));

			var mergedSizes = [].concat.apply([], allSizes);

			let uniqueSizes = [
				...new Map(mergedSizes.map((item) => [item, item])).values(),
			];
			setAllSizes(uniqueSizes);

			//Unique Colors
			const allColorsCombined =
				requiredProducts2 &&
				requiredProducts2.map((i) => i.productAttributes.map((ii) => ii.color));

			var mergedColors = [].concat.apply([], allColorsCombined);

			let uniqueColors = [
				...new Map(mergedColors.map((item) => [item, item])).values(),
			];

			setAllProductColors(uniqueColors);

			//Unique Prices
			const allPricesCombined =
				requiredProducts2 &&
				requiredProducts2.map((i) =>
					i.productAttributes.map((ii) => ii.priceAfterDiscount),
				);

			var mergedPrices = [].concat.apply([], allPricesCombined);

			let uniquePrices = [
				...new Map(
					mergedPrices && mergedPrices.map((item) => [item, item]),
				).values(),
			];

			setMinPrice(Math.min(...uniquePrices));
			setMaxPrice(Math.max(...uniquePrices));

			setSelectedPriceRange([
				Math.min(...uniquePrices),
				Math.max(...uniquePrices),
			]);
		}
	});
};

export const createOrder = (token, createOrderData, userId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/create-by-customer/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: createOrderData }),
		},
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const ordersLength = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/length-by-customer`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readUser = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readSingleCoupon = (coupon) => {
	return fetch(`${process.env.REACT_APP_API_URL}/coupon/byname/${coupon}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readSingleUserHistory = (userPhone, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/user/hist/${userPhone}/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const generatingTokenPaymob = (
	setPaymobtoken,
	setPayMobPaymentData,
	customerDetails,
	totalAmountAfterDiscounting2,
	total_amount,
	cart,
	firstName,
	lastName,
) => {
	const totalAmountFinal =
		Number(totalAmountAfterDiscounting2()) + Number(total_amount) * 0.01;

	// console.log(totalAmountFinal, "totalamountFROM API Core");
	//generate token
	const options = {
		method: "POST",
		headers: { accept: "application/json", "content-type": "application/json" },
		body: JSON.stringify({
			api_key: process.env.REACT_APP_API_KEY,
		}),
	};

	fetch(process.env.REACT_APP_GENERATE_TOKEN_POINT, options)
		.then((response) => response.json())
		.then((response) => {
			// console.log(response, "response");
			//create order
			const options2 = {
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json",
				},
				body: JSON.stringify({
					auth_token: response.token,
					delivery_needed: true,
					amount_cents: totalAmountFinal * 100,
					currency: "EGP",
					api_key: process.env.REACT_APP_API_KEY,
					items: cart.map((i) => {
						return {
							name: i.name,
							amount_cents: i.priceAfterDiscount,
							description:
								i.chosenProductAttributes.size +
								" " +
								i.chosenProductAttributes.SubSKU,
							quantity: i.amount,
						};
					}),
					shipping_data: {
						apartment: "NA",
						email: customerDetails.email ? customerDetails.email : "NA",
						floor: "12",
						first_name: firstName,
						street: customerDetails.address,
						building: "NA",
						phone_number: customerDetails.phone,
						postal_code: "NA",
						extra_description: "NA",
						city: customerDetails.cityName,
						country: "EG",
						last_name: lastName,
						state: customerDetails.state,
					},
					shipping_details: {
						notes: " Aramex",
						number_of_packages: 1,
						weight: 1,
						weight_unit: "Kilogram",
						length: 1,
						width: 1,
						height: 1,
						contents: "product of some sorts",
					},
				}),
			};

			fetch(`${process.env.REACT_APP_CREATE_PAYMENT_POINT}`, options2)
				.then((response2) => response2.json())
				.then((response2) => {
					// console.log(response2, "response 2");
					setPayMobPaymentData(response2);
					//get payment token
					const options3 = {
						method: "POST",
						headers: {
							accept: "application/json",
							"content-type": "application/json",
						},

						body: JSON.stringify({
							auth_token: response.token,
							amount_cents: totalAmountFinal * 100,
							expiration: 3600,
							order_id: response2.id,
							currency: "EGP",
							integration_id: process.env.REACT_APP_INTEGRATION_ID,
							billing_data: {
								apartment: "NA",
								email: customerDetails.email ? customerDetails.email : "NA",
								floor: "12",
								first_name: firstName,
								street: customerDetails.address,
								building: "NA",
								phone_number: customerDetails.phone,
								postal_code: "NA",
								extra_description: "8 Ram , 128 Giga",
								city: customerDetails.cityName,
								country: "EG",
								last_name: lastName,
								state: customerDetails.state,
							},
							lock_order_when_paid: false,
						}),
					};

					fetch(`${process.env.REACT_APP_CREATE_PAYMENT_KEYS}`, options3)
						.then((response3) => response3.json())
						.then((response3) => {
							// console.log(response3, "response 3");
							setPaymobtoken(response3.token);
							console.log(response3.token, "the required token");
						})
						.catch((err) => console.error(err));

					//end of get payment token
				})
				.catch((err) => console.error(err));

			//end of create order
		})
		.catch((err) => console.error(err));

	//end of generate token
};
