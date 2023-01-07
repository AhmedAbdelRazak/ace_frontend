/** @format */

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// eslint-disable-next-line
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
// eslint-disable-next-line
import { Link } from "react-router-dom";

const DisplayImages = ({
	Product,
	chosenImages,
	likee,
	setLikee,
	likeToggle,
	likeToggle2,
	shouldRedirect2,
	redirect2,
}) => {
	return (
		<div>
			{Product && chosenImages && chosenImages.length > 0 && (
				<Carousel
					autoPlay
					infiniteLoop
					interval={3500}
					showStatus={false}
					dynamicHeight={true}
					showThumbs={true}
					thumbWidth={50}
					preventMovementUntilSwipeScrollTolerance={true}
					swipeScrollTolerance={50}
					autoFocus={true}>
					{chosenImages &&
						chosenImages.map((i, ii) => (
							<img
								alt={Product.productName}
								src={i}
								key={ii}
								style={
									{
										// borderRadius: "15px",
										// height: "100%",
										// objectFit: "cover",
									}
								}
							/>
						))}
				</Carousel>
			)}

			<div className='row mr-3'>
				{/* <div className='col-5 mx-auto'>
					<Like>
						{likee ? (
							<>
								<ToastContainer className='toast-top-left' />

								<h5 onClick={likeToggle} className=' '>
									<h5 onClick={likeToggle2}>
										<i
											className='fa fa-heart text-danger  Like'
											style={{
												padding: "8px",
												// borderRadius: "50%",
												fontSize: "2rem",
											}}
										/>{" "}
									</h5>
								</h5>
								<strong
									className=''
									style={{
										// fontStyle: "italic",
										fontSize: "0.8rem",
										textDecoration: "underline",
									}}>
									{" "}
									<Link to='/user-dashboard/wishlist'>
										Added to your Wish List
									</Link>
								</strong>
							</>
						) : (
							<div className=''>
								<h5 onClick={likeToggle} className=' '>
									<h5 onClick={likeToggle2}>
										<i
											className='fa fa-heart  Like'
											style={{
												padding: "4px",
												// borderRadius: "50%",
												fontSize: "1.6rem",
											}}
										/>{" "}
										{shouldRedirect2(redirect2)}
										<span style={{ fontSize: "1rem", fontWeight: "bold" }}>
											Wish List
										</span>
									</h5>
								</h5>
							</div>
						)}
					</Like>
				</div> */}

				{/* <div className='col-5 mx-auto'>
					<ViewsCount>
						<div className=''>
							<i
								className='fa fa-street-view'
								style={{
									fontSize: "24px",
								}}>
								{" "}
							</i>
							<span className='viewsCountText'>{Product.viewsCount} Views</span>
						</div>
					</ViewsCount>
				</div> */}
			</div>
		</div>
	);
};

export default DisplayImages;

// eslint-disable-next-line
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

// eslint-disable-next-line
const ViewsCount = styled.div`
	span {
		font-weight: bold;
	}
	@media (max-width: 1000px) {
		div {
			padding: 0px !important;
			text-align: right !important;
		}

		span {
			font-size: 11px !important;
			font-weight: bold;
		}

		i {
			font-size: 1.1rem !important;
		}
	}
`;
