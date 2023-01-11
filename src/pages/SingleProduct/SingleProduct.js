/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPixel from "react-facebook-pixel";
import {
	userlike,
	userunlike,
	productStar,
	readProduct,
	comment,
	uncomment,
	like,
	unlike,
	getColors,
	getProducts,
} from "../../apiCore";
// eslint-disable-next-line
import { addItem } from "../../cartHelpers";
// eslint-disable-next-line
import StarRating from "react-star-ratings";
// eslint-disable-next-line
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { isAuthenticated } from "../../auth";
// eslint-disable-next-line
import { useHistory, useParams, Link, Redirect } from "react-router-dom";
// eslint-disable-next-line
import Slider from "react-slick";
import { showAverageRating } from "./Rating";
import { useCartContext } from "../../Checkout/cart_context";
// import Resizer from "react-image-file-resizer";
import { Helmet } from "react-helmet";
import DisplayImages from "./DisplayImages";
import HistoricalComments from "./HistoricalComments";
import ColorsAndSizes from "./ColorsAndSizes";
import CardForRelatedProducts from "./CardForRelatedProducts";
import "antd/dist/antd.css";
import { Collapse } from "antd";
import SizeChartModal from "./SizeChartModal";
import SigninModal from "./SigninModal/SigninModal";
import {
	AntDesignOutlined,
	BugOutlined,
	CloseCircleOutlined,
	DeleteOutlined,
	HeatMapOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;

const isActive = (selectedLink, path) => {
	if (selectedLink === path) {
		return {
			color: "black",
			fontWeight: "bold",
			textDecoration: "underline",
			fontSize: "1rem",
			textTransform: "uppercase",
		};
	} else {
		return {
			textAlign: "center",
			fontSize: "1rem",
			fontWeight: "bold",
			color: "darkgrey",
			textTransform: "uppercase",
		};
	}
};

const SingleProduct = (props) => {
	const [Product, setProduct] = useState({});
	const [star, setStar] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);
	const [comments, setComments] = useState([]);
	const [text, setText] = useState("");
	const [clickedLink, setClickedLink] = useState("");
	const [selectedLink, setSelectedLink] = useState("WEAR IT WITH");
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [commentsPhotos, setCommentsPhotos] = useState([]);
	const [likee, setLikee] = useState(false);
	// eslint-disable-next-line
	const [likes, setLikes] = useState(0);
	const [userlikee, setuserLikee] = useState(false);
	const [redirect2, setRedirect2] = useState(false);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [allSizes, setAllSizes] = useState([]);
	const [allAddedColors, setAllAddedColors] = useState([]);
	const [allColors, setAllColors] = useState([]);
	const [colorSelected, setColorSelected] = useState(false);
	const [chosenProductAttributes, setChosenProductAttributes] = useState({
		SubSKU: "",
		OrderedQty: 1,
		productId: "",
		productName: "",
		productMainImage: "",
		productSubSKUImage: "",
		SubSKUPriceAfterDiscount: "",
		SubSKURetailerPrice: "",
		SubSKUWholeSalePrice: "",
		SubSKUDropshippingPrice: "",
		pickedPrice: "",
		quantity: "",
		SubSKUColor: "",
		SubSKUSize: "",
		SubSKUMSRP: "",
	});
	const [chosenImages, setChosenImages] = useState({});

	const token = isAuthenticated() && isAuthenticated().token;
	const user = isAuthenticated() && isAuthenticated().user;
	const { addToCart, openSidebar } = useCartContext();

	useEffect(() => {
		const productId = props.match.params && props.match.params.productId;
		loadSingleProduct(productId);

		// eslint-disable-next-line
	}, [props, star, modalVisible, localStorage.getItem("productColor")]);

	const checkLike = (likes) => {
		const userId = isAuthenticated() && isAuthenticated().user._id;
		let match = likes.indexOf(userId) !== -1;
		return match;
	};

	const gettingAllColors = () => {
		setLoading(true);
		getColors(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllColors(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		// eslint-disable-next-line
	}, []);

	const loadSingleProduct = (productId) => {
		setLoading(true);
		readProduct(productId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				getProducts().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var allAceProducts = data2.filter(
							(i) =>
								i.activeProduct === true && i.storeName.storeName === "ace",
						);
						setCategoryProducts(
							allAceProducts.filter(
								(iiii) =>
									iiii.category.categoryName.toLowerCase() ===
									data.category.categoryName,
							),
						);
					}
				});

				setProduct(data);
				setComments(data.comments);
				setLikes(data.likes.length);
				setLikee(checkLike(data.likes));
				setuserLikee(checkLike(data.likes));
				setRelatedProducts(data.relatedProducts);

				//populating the attributes

				setChosenProductAttributes({
					SubSKU: "",
					OrderedQty: 1,
					productId: data._id,
					productName: data.productName,
					productMainImage: data.thumbnailImage[0].images[0].url,
					productSubSKUImage: "",
					SubSKUPriceAfterDiscount: "",
					SubSKURetailerPrice: "",
					SubSKUWholeSalePrice: "",
					SubSKUDropshippingPrice: "",
					pickedPrice: "",
					quantity: "",
					SubSKUColor: "",
					SubSKUSize: "",
					SubSKUMSRP: "",
				});

				//AllSizes
				var sizesArray = data.productAttributes.map((i) => i.size);

				let uniqueSizesArray = [
					...new Map(sizesArray.map((item) => [item, item])).values(),
				];
				setAllSizes(uniqueSizesArray);

				//AllColors
				var colorsArray = data.productAttributes.map((i) => i.color);

				let uniqueColorArray = [
					...new Map(colorsArray.map((item) => [item, item])).values(),
				];

				var colorsAndImages = data.productAttributes.map((i) => {
					return {
						color: i.color,
						productImages:
							data.productAttributes[uniqueColorArray.indexOf(i.color)]
								.productImages,
					};
				});

				let uniqueColorArrayFinal = [
					...new Map(
						colorsAndImages.map((item) => [item["color"], item]),
					).values(),
				];

				// console.log(uniqueColorArrayFinal, "uniqueColorArrayFinal");
				setAllAddedColors(uniqueColorArrayFinal);

				//consolidating All Images
				var imagesArray = data.productAttributes.map((i) =>
					i.productImages.map((ii) => ii.url),
				);

				var mergedimagesArray = [].concat.apply([], imagesArray);

				let uniqueImagesArray = [
					...new Map(mergedimagesArray.map((item) => [item, item])).values(),
				];
				setChosenImages(uniqueImagesArray);

				if (localStorage.getItem("productColor")) {
					var images =
						data &&
						data.productAttributes &&
						data.productAttributes.filter(
							(im) => im.color === localStorage.getItem("productColor"),
						) &&
						data.productAttributes.filter(
							(im) => im.color === localStorage.getItem("productColor"),
						)[0];

					setChosenProductAttributes({
						...chosenProductAttributes,
						SubSKUColor: localStorage.getItem("productColor"),
					});

					setChosenImages(images.productImages.map((ii) => ii.url));
					setClickedLink(localStorage.getItem("productColor"));
					setColorSelected(true);
				}
			}
		});
		setLoading(false);
	};

	const shouldRedirect2 = (redirect) => {
		if (redirect) {
			return <Redirect to='/signin' />;
		}
	};

	useEffect(() => {
		if (Product && Product.ratings && user) {
			let existingRatingObject = Product.ratings.filter(
				(ele) => ele.ratedBy._id === user._id,
			);
			setStar(
				existingRatingObject &&
					existingRatingObject[existingRatingObject.length - 1] &&
					existingRatingObject[existingRatingObject.length - 1].star,
			);
		}
		// eslint-disable-next-line
	}, [modalVisible]);

	// eslint-disable-next-line
	const shopIsWorkingTodayLogic = () => {
		var today = new Date().getDay();
		if (today === 0) {
			today = "Sunday";
		} else if (today === 1) {
			today = "Monday";
		} else if (today === 2) {
			today = "Tuesday";
		} else if (today === 3) {
			today = "Wednesday";
		} else if (today === 4) {
			today = "Thursday";
		} else if (today === 5) {
			today = "Friday";
		} else if (today === 6) {
			today = "Saturday";
		}
		var WorkingOrNot =
			Product && Product.workingDays && Product.workingDays.indexOf(today) > -1;
		return WorkingOrNot;
	};

	// eslint-disable-next-line
	const onStarClick = (newRating, name) => {
		setStar(newRating);
		// console.table(newRating, name);
		productStar(name, newRating, token, user.email, user._id).then(() => {
			// loadSingleProduct(); // if you want to show updated rating in real time
		});
	};
	let history = useHistory();
	let { productId, productName } = useParams();

	// eslint-disable-next-line
	const handleModal = () => {
		if (user && token) {
			setModalVisible(true);
		} else {
			history.push({
				pathname: "/signin",
				state: {
					from: `/product/${productName}/${productId}`,
				},
			});
		}
	};

	//comments
	const updateComments = (comments) => {
		if (user && token) {
			setComments(comments);
		} else {
			history.push({
				pathname: "/signin",
				state: {
					from: `/employee/${productName}/${productId}`,
				},
			});
		}
	};

	const handleChange = (event) => {
		setError("");
		setText(event.target.value);
	};

	const isValid = () => {
		if (!text.length > 0 || text.length > 150) {
			setError({
				error: "Comment should not be empty and less than 150 characters long",
			});
			return false;
		}
		return true;
	};

	const addComment = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!isAuthenticated()) {
			setError({ error: "Please signin to leave a comment" });
			return false;
		}

		if (isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;
			const productId = Product && Product._id;

			comment(userId, token, productId, {
				text: text,
				commentsPhotos: commentsPhotos && commentsPhotos.images,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setText("");
					// dispatch fresh list of coments to parent (SinglePost)
					updateComments(data.comments);
					setLoading(false);
					setModalVisible(false);
					setCommentsPhotos([]);
					toast.success(`Thank you for your review ${user.name}`);
				}
			});
		}
	};

	const deleteComment = (comment) => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const productId = Product && Product._id;

		uncomment(userId, token, productId, comment).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				updateComments(data.comments);
			}
		});
	};

	// eslint-disable-next-line
	const commentForm = () => {
		return (
			<>
				{Product && Product.comments && !loading ? (
					<>
						<h5 className='mt-5 mb-3' style={{ fontWeight: "bold" }}>
							Your Feedback Is Important To Us!!
						</h5>
						<form onSubmit={addComment}>
							<div className='form-group'>
								<input
									type='text'
									onChange={handleChange}
									value={text}
									className='form-control'
									placeholder='Leave a comment...'
									required
								/>
								<button className='btn btn-raised btn-success mt-3'>
									Post
								</button>
							</div>
						</form>
					</>
				) : (
					<div className='p-5 text-center'> Loading...</div>
				)}
			</>
		);
	};
	const WishList = "Product was added to your wish list!";

	const likeToggle = () => {
		if (!isAuthenticated()) {
			setRedirect2({
				redirectToSignin: true,
			});
			return false;
		}
		if (!likee) {
			toast.success(WishList);
		}

		let callApi = likee ? unlike : like;
		const userId = isAuthenticated().user._id;
		const productId = Product._id;
		const token = isAuthenticated().token;

		callApi(userId, token, productId).then((data) => {
			setLikee(!likee);
			setLikes(data.likes.length);
		});
	};

	const likeToggle2 = () => {
		if (!isAuthenticated()) {
			setRedirect2({
				redirectToSignin: true,
			});
			return false;
		}

		let callApi2 = userlikee ? userunlike : userlike;
		const userId = isAuthenticated().user._id;
		const productId = Product._id;
		const token = isAuthenticated().token;

		callApi2(userId, token, productId).then((data) => {
			setuserLikee(!likee);
		});
	};

	const deleteConfirmed = (comment) => {
		let answer = window.confirm(
			"Are you sure you want to delete your comment?",
		);
		if (answer) {
			deleteComment(comment);
		}
	};

	const selectedFeedbackComments = (description) => {
		description = description && description.split(/\n/g);
		return description;
	};

	// eslint-disable-next-line
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: relatedProducts && relatedProducts.length >= 4 ? 4 : 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: relatedProducts && relatedProducts.length >= 2 ? 2 : 1,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	// console.log(categoryProducts, "categoryProducts");

	const settings2 = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: categoryProducts && categoryProducts.length >= 4 ? 4 : 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow:
						categoryProducts && categoryProducts.length >= 2 ? 2 : 1,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	var titleName =
		Product && Product.productName && Product.productName.toUpperCase();

	//Margin top of the thumbnails in single product page.
	//Make user after choosing size or color, to only offer the available stock
	//Make our products page based on colors

	// console.log(window.location.search.split("=")[1], "window.location.search");

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	return (
		<SingleEmp className='mx-auto'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{titleName}</title>

				<meta name='description' content={Product.description} />
				<link
					rel='stylesheet'
					href='http://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			{loading && !Product ? (
				<>
					<div
						style={{
							marginTop: "20%",
							fontSize: "2.5rem",
							color: "gold",
							fontWeight: "bold",
						}}>
						Loading...
					</div>
				</>
			) : (
				<>
					<SizeChartModal
						modalVisible2={modalVisible2}
						setModalVisible2={setModalVisible2}
						Product={Product}
					/>
					<SigninModal
						modalVisible3={modalVisible3}
						setModalVisible3={setModalVisible3}
					/>
					<div className='row'>
						<div className='col-md-7 text-center imageWrapper  mt-3'>
							<DisplayImages
								Product={Product}
								chosenImages={chosenImages}
								likee={likee}
								setLikee={setLikee}
								likeToggle={likeToggle}
								likeToggle2={likeToggle2}
								shouldRedirect2={shouldRedirect2}
								redirect2={redirect2}
							/>
						</div>

						<div
							className='col-md-5 mx-auto wrapperRight'
							// style={{ border: "1px solid white" }}
						>
							<h3
								className='text-title mb-4'
								style={{
									// backgroundColor: "black",
									// textAlign: "center",
									padding: "0px 8px",
									color: "black",
									// fontStyle: "italic",
									textTransform: "uppercase",
									fontWeight: "bold",
									fontSize: "1.2rem",
								}}>
								{Product && Product.ratings && Product.ratings.length > 0 ? (
									<div className='mb-2'>{showAverageRating(Product)}</div>
								) : (
									<div
										className='mt-2 starRating'
										style={{
											fontSize: "0.75rem",
											// fontStyle: "italic",
											fontWeight: "bold",
											color: "black",
										}}>
										<strong>No Ratings</strong>
									</div>
								)}
								<span className='productNamePrice'>{Product.productName}</span>
								<div
									className='mt-2'
									style={{ color: "darkgrey", fontSize: "0.8rem" }}>
									{Product && Product.category && Product.category.categoryName}
								</div>

								<div
									className='mt-2 productNamePrice'
									style={{ color: "black", fontSize: "1.2rem" }}>
									{Product &&
										Product.productAttributes &&
										Product.productAttributes
											.map((i) => i.priceAfterDiscount)[0]
											.toFixed(2)}{" "}
									L.E.
								</div>
							</h3>
							<ColorsAndSizes
								Product={Product}
								allColors={allColors}
								allSizes={allSizes}
								allAddedColors={allAddedColors}
								setChosenImages={setChosenImages}
								setChosenProductAttributes={setChosenProductAttributes}
								chosenProductAttributes={chosenProductAttributes}
								setColorSelected={setColorSelected}
								colorSelected={colorSelected}
								loading={loading}
								setModalVisible2={setModalVisible2}
								clickedLink={clickedLink}
								setClickedLink={setClickedLink}
							/>
							<div className='mx-auto text-center'>
								<Like>
									{likee ? (
										<>
											<ToastContainer className='toast-top-left' />
											<button
												id='wishlist_heart_pdp'
												aria-label='Add to wishlist'
												className='sc-Axmtr fpbHys sc-qYsuA jDsubJ'
												fdprocessedid='zq33c7'
												style={{ background: "lightgreen" }}
												onClick={likeToggle}>
												<div class='sc-pCPXO dbhMVG' onClick={likeToggle2}>
													<i
														className='sc-AxirZ bJCmFu wishlist'
														style={{ background: "lightgreen" }}>
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															role='img'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M4.43785 5.44294C6.35498 3.51902 9.46346 3.51902 11.3806 5.44294C11.6162 5.67942 11.8224 5.93562 12 6.20413C12.1776 5.93562 12.3829 5.68025 12.6194 5.44294C14.5365 3.51902 17.645 3.51902 19.5622 5.44294C21.4212 7.30855 21.4775 10.2984 19.7312 12.2321L19.5622 12.4103L11.9992 20L4.43785 12.4103C2.52072 10.4863 2.52072 7.36685 4.43785 5.44294ZM18.4996 6.50172C17.1687 5.16609 15.0129 5.16609 13.6819 6.50172C13.5751 6.60898 13.4758 6.72321 13.3838 6.84443L13.2512 7.0315L12 8.9236L10.7488 7.0315C10.6219 6.83962 10.4779 6.66212 10.3181 6.50172C8.98714 5.16609 6.8313 5.16609 5.50038 6.50172C4.21418 7.79248 4.16824 9.85879 5.36268 11.205L5.50049 11.3516L11.999 17.875L18.4996 11.3515C19.7858 10.0607 19.8318 7.99441 18.6374 6.64826L18.4996 6.50172Z'
																fill='black'></path>
														</svg>
													</i>
												</div>

												<span className='sc-pKMan fdsIjn'>Add to wishlist</span>
											</button>
										</>
									) : (
										<div
											className=''
											onClick={() => {
												if (!isAuthenticated() && !isAuthenticated().token) {
													setModalVisible3(true);
												}
											}}>
											<button
												id='wishlist_heart_pdp'
												aria-label='Add to wishlist'
												className='sc-Axmtr fpbHys sc-qYsuA jDsubJ'
												fdprocessedid='zq33c7'
												onClick={likeToggle}>
												<div className='sc-pCPXO dbhMVG' onClick={likeToggle2}>
													<i className='sc-AxirZ bJCmFu wishlist'>
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															role='img'>
															<path
																fill-rule='evenodd'
																clip-rule='evenodd'
																d='M4.43785 5.44294C6.35498 3.51902 9.46346 3.51902 11.3806 5.44294C11.6162 5.67942 11.8224 5.93562 12 6.20413C12.1776 5.93562 12.3829 5.68025 12.6194 5.44294C14.5365 3.51902 17.645 3.51902 19.5622 5.44294C21.4212 7.30855 21.4775 10.2984 19.7312 12.2321L19.5622 12.4103L11.9992 20L4.43785 12.4103C2.52072 10.4863 2.52072 7.36685 4.43785 5.44294ZM18.4996 6.50172C17.1687 5.16609 15.0129 5.16609 13.6819 6.50172C13.5751 6.60898 13.4758 6.72321 13.3838 6.84443L13.2512 7.0315L12 8.9236L10.7488 7.0315C10.6219 6.83962 10.4779 6.66212 10.3181 6.50172C8.98714 5.16609 6.8313 5.16609 5.50038 6.50172C4.21418 7.79248 4.16824 9.85879 5.36268 11.205L5.50049 11.3516L11.999 17.875L18.4996 11.3515C19.7858 10.0607 19.8318 7.99441 18.6374 6.64826L18.4996 6.50172Z'
																fill='black'></path>
														</svg>
													</i>
												</div>

												<span className='sc-pKMan fdsIjn'>Add to wishlist</span>
											</button>
										</div>
									)}
								</Like>
								<div className='my-3 AddToCartStyling'>
									{!chosenProductAttributes.SubSKUColor ||
									!chosenProductAttributes.SubSKUSize ? (
										<button
											id='wishlist_heart_pdp'
											aria-label='Add to wishlist'
											className='sc-Axmtr fpbHys sc-qYsuA jDsubJ'
											fdprocessedid='zq33c7'
											style={{
												background: "rgb(0, 125, 181)",
												color: "white",
											}}>
											<div className='sc-pCPXO dbhMVG'>
												<svg
													className='Styles__CartIcon-sc-1swafzl-1 duVsMV'
													width='18'
													height='18'
													color='white'
													style={{ color: "white" }}
													viewBox='0 0 50 50'
													version='1.1'
													xmlns='http://www.w3.org/2000/svg'
													role='img'
													aria-labelledby='2902a1c1-d115-467c-a707-404d02345872'>
													<title id='2902a1c1-d115-467c-a707-404d02345872'>
														Cart
													</title>
													<g
														stroke='none'
														stroke-width='1'
														fill='none'
														fill-rule='evenodd'>
														<path
															d='M45,14.8732257 L36.081895,14.8732257 L36.081895,11.4774544 C36.081895,5.14878873 31.3357722, 0 25.5019853,0 C19.668463,0 14.9228697,5.14878873 14.9228697,11.4774544 L14.9228697,14.8732257 L6, 14.8732257 L6,50 L45,50 L45,14.8732257 Z M21,12.254649 C21,7.89394064 23.4326972,6 26.4655326, 6 C29.498368,6 32,7.89394064 32,12.254649 L32,16 L21,16 L21,12.254649 Z'
															fill='#FFF'></path>
													</g>
												</svg>
											</div>
											<span className='sc-pKMan fdsIjn ml-1'>
												{localStorage.getItem("productColor")
													? "CHOOSE A SIZE"
													: "CHOOSE A COLOR & A SIZE"}
											</span>
										</button>
									) : (
										<>
											{chosenProductAttributes.quantity > 0 ? (
												<>
													<button
														id='wishlist_heart_pdp'
														aria-label='Add to wishlist'
														className='sc-Axmtr fpbHys sc-qYsuA jDsubJ'
														fdprocessedid='zq33c7'
														style={{
															background: "rgb(0, 125, 181)",
															color: "white",
														}}
														onClick={() => {
															openSidebar();
															addToCart(
																Product._id,
																null,
																1,
																Product,
																chosenProductAttributes,
															);
															ReactPixel.track("Cart", {
																content_name: "Cart",
																content_category: "Cart",
																content_type: Product.productName,
																value: "Cart",
																currency: "",
															});
														}}>
														<div className='sc-pCPXO dbhMVG'>
															<svg
																className='Styles__CartIcon-sc-1swafzl-1 duVsMV'
																width='18'
																height='18'
																color='white'
																style={{ color: "white" }}
																viewBox='0 0 50 50'
																version='1.1'
																xmlns='http://www.w3.org/2000/svg'
																role='img'
																aria-labelledby='2902a1c1-d115-467c-a707-404d02345872'>
																<title id='2902a1c1-d115-467c-a707-404d02345872'>
																	Cart
																</title>
																<g
																	stroke='none'
																	stroke-width='1'
																	fill='none'
																	fill-rule='evenodd'>
																	<path
																		d='M45,14.8732257 L36.081895,14.8732257 L36.081895,11.4774544 C36.081895,5.14878873 31.3357722, 0 25.5019853,0 C19.668463,0 14.9228697,5.14878873 14.9228697,11.4774544 L14.9228697,14.8732257 L6, 14.8732257 L6,50 L45,50 L45,14.8732257 Z M21,12.254649 C21,7.89394064 23.4326972,6 26.4655326, 6 C29.498368,6 32,7.89394064 32,12.254649 L32,16 L21,16 L21,12.254649 Z'
																		fill='#FFF'></path>
																</g>
															</svg>
														</div>
														<span className='sc-pKMan fdsIjn ml-1'>
															ADD TO BAG
														</span>
													</button>
												</>
											) : null}
										</>
									)}
								</div>
							</div>

							{Product && Product.policy ? (
								<div
									className='single-Product-Description-Style'
									style={{
										fontSize: "0.85rem",
										padding: "20px",
										background: "rgb(245, 245, 245)",
										borderRadius: "5px",
										margin: "10px 5px",
									}}>
									<span className=''>
										{Product &&
											Product.policy &&
											selectedFeedbackComments(Product && Product.policy).map(
												(cc, ii) => {
													return (
														<div key={ii} className='ml-3 my-2'>
															<strong>{cc}</strong>
														</div>
													);
												},
											)}
									</span>
								</div>
							) : null}

							<hr />
							<Collapse
								style={{ background: "white", margin: "0px 10px 0px 0px" }}
								accordion>
								<Panel
									collapsible
									style={{ marginBottom: "5px" }}
									header={
										<span style={{ fontWeight: "bold", color: "black" }}>
											Product Description
										</span>
									}>
									<div className='productDescriptionWrapper'>
										<p
											className='single-Product-Description-Style'
											style={{ fontSize: "0.85rem" }}>
											<span className=''>
												{Product &&
													Product.description &&
													selectedFeedbackComments(
														Product && Product.description,
													).map((cc, ii) => {
														return (
															<div key={ii} className='ml-3 my-2'>
																<>{cc}</>
															</div>
														);
													})}
											</span>
										</p>
									</div>
								</Panel>

								{Product && Product.DNA ? (
									<Panel
										collapsible
										showArrow={true}
										style={{ marginBottom: "5px" }}
										header={
											<span style={{ fontWeight: "bold", color: "black" }}>
												Product DNA
											</span>
										}>
										<div className='productDescriptionWrapper'>
											<p
												className='single-Product-Description-Style'
												style={{ fontSize: "0.85rem" }}>
												<span className=''>
													{Product &&
														Product.DNA &&
														selectedFeedbackComments(
															Product && Product.DNA,
														).map((cc, ii) => {
															return (
																<div key={ii} className='ml-3 my-2'>
																	<>{cc}</>
																</div>
															);
														})}
												</span>
											</p>
										</div>
									</Panel>
								) : null}

								{Product && Product.Specs ? (
									<Panel
										collapsible
										showArrow={true}
										style={{ marginBottom: "5px" }}
										header={
											<span style={{ fontWeight: "bold", color: "black" }}>
												Delivery & Return
											</span>
										}>
										<div className='productDescriptionWrapper'>
											<p
												className='single-Product-Description-Style'
												style={{ fontSize: "0.85rem" }}>
												<span className=''>
													{Product &&
														Product.Specs &&
														selectedFeedbackComments(
															Product && Product.Specs,
														).map((cc, ii) => {
															return (
																<div key={ii} className='ml-3 my-2'>
																	<>{cc}</>
																</div>
															);
														})}
												</span>
											</p>
										</div>
									</Panel>
								) : null}

								{Product && Product.fitCare ? (
									<Panel
										collapsible
										showArrow={true}
										style={{ marginBottom: "5px" }}
										header={
											<span style={{ fontWeight: "bold", color: "black" }}>
												Fit & Care
											</span>
										}>
										<div className='productDescriptionWrapper'>
											<p
												className='single-Product-Description-Style'
												style={{ fontSize: "0.85rem" }}>
												<span className=''>
													{Product &&
														Product.fitCare &&
														selectedFeedbackComments(
															Product && Product.fitCare,
														).map((cc, ii) => {
															return (
																<div key={ii} className='ml-3 my-2'>
																	{cc
																		.toLowerCase()
																		.includes("washing instructions") ||
																	cc.toLowerCase().includes("extra care") ||
																	cc === "" ? (
																		<h5 style={{ fontWeight: "bold" }}>{cc}</h5>
																	) : (
																		<ul
																			style={{
																				listStyle: ii > 7 ? "" : "none",
																				marginLeft: ii > 7 ? "20px" : "0px",
																			}}>
																			<li>
																				<span
																					style={{
																						fontSize: "15px",
																						fontWeight: "bold",
																					}}>
																					{" "}
																					{ii === 2 ? (
																						<HeatMapOutlined />
																					) : ii === 3 ? (
																						<AntDesignOutlined />
																					) : ii === 4 ? (
																						<CloseCircleOutlined />
																					) : ii === 5 ? (
																						<BugOutlined />
																					) : ii === 6 ? (
																						<DeleteOutlined />
																					) : null}
																				</span>

																				{cc}
																			</li>
																		</ul>
																	)}
																</div>
															);
														})}
												</span>
											</p>
										</div>
									</Panel>
								) : null}
							</Collapse>
						</div>
					</div>
					{relatedProducts &&
					relatedProducts.length === 0 &&
					categoryProducts &&
					categoryProducts.length > 0 ? (
						<ProductWrapperRelated>
							<h5 className='title'>YOU MAY ALSO LIKE!</h5>
							<div className='container-fluid my-1 ProductSlider'>
								<Slider {...settings2} className='mb-5'>
									{categoryProducts &&
										categoryProducts.map((product, i) => (
											<div className='img-fluid images ' key={i}>
												<CardForRelatedProducts
													i={i}
													product={product}
													key={i}
													// chosenLanguage={chosenLanguage}
												/>
											</div>
										))}
								</Slider>
							</div>
						</ProductWrapperRelated>
					) : null}

					{relatedProducts && relatedProducts.length > 0 ? (
						<ProductWrapperRelated>
							<React.Fragment>
								<div className='col-md-3 mx-auto'>
									<div className='row mx-auto'>
										<div className='col-6'>
											<h4
												className='theLinks'
												style={isActive(selectedLink, "WEAR IT WITH")}
												onClick={() => {
													setSelectedLink("WEAR IT WITH");
												}}>
												WEAR IT WITH
											</h4>
										</div>
										<div className='col-6'>
											<h4
												className='theLinks'
												style={isActive(selectedLink, "YOU MAY ALSO LIKE")}
												onClick={() => {
													setSelectedLink("YOU MAY ALSO LIKE");
												}}>
												YOU MIGHT LIKE
											</h4>
										</div>
									</div>
								</div>
							</React.Fragment>
							{selectedLink === "WEAR IT WITH" ? (
								<div className='container-fluid my-1 ProductSlider'>
									<Slider {...settings} className='mb-5'>
										{relatedProducts &&
											relatedProducts.map((product, i) => (
												<div className='img-fluid images ' key={i}>
													<CardForRelatedProducts
														i={i}
														product={product}
														key={i}
														// chosenLanguage={chosenLanguage}
													/>
												</div>
											))}
									</Slider>
								</div>
							) : selectedLink === "YOU MAY ALSO LIKE" ? (
								<div className='container-fluid my-1 ProductSlider'>
									<Slider {...settings2} className='mb-5'>
										{categoryProducts &&
											categoryProducts.map((product, i) => (
												<div className='img-fluid images ' key={i}>
													<CardForRelatedProducts
														i={i}
														product={product}
														key={i}
														// chosenLanguage={chosenLanguage}
													/>
												</div>
											))}
									</Slider>
								</div>
							) : null}
						</ProductWrapperRelated>
					) : null}

					<div className='p-5'>
						<HistoricalComments
							loading={loading}
							Product={Product}
							comments={comments}
							deleteConfirmed={deleteConfirmed}
							isAuthenticated={isAuthenticated}
						/>
					</div>
				</>
			)}
		</SingleEmp>
	);
};

export default SingleProduct;

const SingleEmp = styled.div`
	background: white !important;
	width: 95%;
	overflow-x: hidden;
	/* margin-top: 5px; */
	font-family: font-family: Roboto, Helvetica, Arial, sans-serif !important;
	/* .carousel-slider {
		width: 75%;
	} */

	.wrapperRight {
		margin: 0px !important;
	}
	.carousel-root {
		/* border: 1px solid lightgrey; */
		/* border-radius: 15px; */
		object-fit: cover;
		/* max-height: 60%; */
		/* box-shadow: 3px 2px 3px 2px rgba(0, 0, 0, 0.5); */
	}
	/* .control-dots li {
		background-color: black !important;
	} */

	.slider-wrapper {
		width: 55%;
		height: 55%;
	}
	.slider img {
		width: 100%;
		height: 100%;
		object-fit: cover !important;
	}
	

	.carousel-root .thumb {
		/* margin-top: 20px !important; */
		padding: 0px !important;
		margin: 0px  !important;
		width: 10% !important;
	}

	 .selected  {
		border: 2px lightgrey solid !important;
		margin: 0px !important;
		padding: 0px !important;
	}

	.slide {
		border: 1px white solid !important;
		margin: 0px !important;
		padding: 0px !important;

	}

	.buttons:hover {
		cursor: pointer;
	}

	.jDsubJ.jDsubJ {
		background-color: rgb(231, 231, 231);
		-webkit-box-align: center;
		align-items: center;
		width: 90%;
		-webkit-box-pack: center;
		justify-content: center;
		margin: auto 10px;
}

.fpbHys {
    display: inline-flex;
    position: relative;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    border-radius: 5rem;
    cursor: pointer;
    font-weight: 700;
    outline: none;
    border: 0px;
    text-align: center;
    text-decoration: none;
    color: rgb(0, 0, 0);
    background-color: rgb(210, 210, 210);
    font-size: 1rem;
    padding: 0.85rem 0.85rem;
}

.carousel .thumbs-wrapper {
    margin: 5px !important;
}

	@media (max-width: 850px) {
		padding: 0px !important;
		width: 100%;

		.wrapperRight {
		margin: 0px !important;
		top: -21px;
	}

	.imageWrapper {
		margin: 0px !important;
		padding-bottom: 0px !important;
		
	}

		.slider img {
			width: 100%;
			height: 100% !important;
			object-fit: cover !important;
			padding: 0px !important;

		}
		.carousel-root .thumb {
		margin-top: 0px !important;
		padding: 0px !important;
		padding: 0px !important;
		margin: 0px  !important;
		width: 23% !important;
	}



	.carousel-root {
		padding: 0px !important;
	}

		.thumbs  {
			right: 50px !important;
			top: 0px !important;
		}
		
		h3 {
			font-size: 15px;
		}
		.productDescriptionWrapper {
			margin-left: 10px;
		}
		.control-dots {
			display: none !important;
		}

		.slider-wrapper {
		width: 100%;
		height: 100%;
	}
	
	.AddToCartStyling > button {
		font-size: 12px !important;
		position: sticky !important;
	}

	.productNamePrice {
		font-size: 1rem !important;
	}


		
	}
`;

// eslint-disable-next-line
const ProductWrapperRelated = styled.div`
	margin-top: 50px;
	background-color: rgb(245, 245, 245);
	padding: 20px;

	.theLinks:hover {
		cursor: pointer;
	}

	.title {
		text-align: center;
		font-size: 1.2rem;
		/* letter-spacing: 7px; */
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

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	.slider-wrapper {
		width: 100% !important;
		height: 100% !important;
	}
	.slider img {
		width: 100%;
		height: 100%;
		object-fit: cover !important;
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
		.theLinks {
			font-size: 0.9rem !important;
		}
	}
`;

const Like = styled.div`
	cursor: pointer;
	font-family: Roboto, Helvetica, Arial, sans-serif !important;

	.Like {
		background: #ededed;
		text-decoration: none;
		color: var(--darkGrey);
		outline-color: var(--darkGrey);
	}

	@media (max-width: 1000px) {
		span {
			font-size: 11px !important;
		}

		i {
			font-size: 1.1rem !important;
		}
	}
`;
