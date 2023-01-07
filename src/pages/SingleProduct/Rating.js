/** @format */

import React from "react";
import StarRating from "react-star-ratings";

export const showAverageRating = (e) => {
	if (e && e.ratings) {
		let ratingsArray = e && e.ratings;
		let total = [];
		let length = ratingsArray.length;
		// console.log("length", length);

		ratingsArray.map((r) => total.push(r.star));
		let totalReduced = total.reduce((p, n) => p + n, 0);
		// console.log("totalReduced", totalReduced);

		let highest = length * 5;
		// console.log("highest", highest);

		let result = (totalReduced * 5) / highest;
		// console.log("result", result);

		return (
			<div className=''>
				<span>
					<StarRating
						starDimension='15px'
						starSpacing='2px'
						starRatedColor='black'
						rating={result}
						editing={false}
					/>{" "}
					<span style={{ fontSize: "0.68rem", color: "black" }}>
						({e.ratings.length}) Users Rated
					</span>
				</span>
			</div>
		);
	}
};

export const showAverageRating2 = (e) => {
	if (e && e.ratings) {
		let ratingsArray = e && e.ratings;
		let total = [];
		let length = ratingsArray.length;
		// console.log("length", length);

		ratingsArray.map((r) => total.push(r.star));
		let totalReduced = total.reduce((p, n) => p + n, 0);
		// console.log("totalReduced", totalReduced);

		let highest = length * 5;
		// console.log("highest", highest);

		let result = (totalReduced * 5) / highest;
		// console.log("result", result);

		return (
			<div className=''>
				<span>
					<StarRating
						starDimension='20px'
						starSpacing='2px'
						starRatedColor='red'
						rating={result}
						editing={false}
					/>{" "}
					<span style={{ fontSize: "0.68rem", color: "black" }}>
						({e.ratings.length}) Users Rated
					</span>
				</span>
			</div>
		);
	}
};
