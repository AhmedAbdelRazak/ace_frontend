/** @format */

import React from "react";
import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	// console.log(currentPage, "current");

	return (
		<PaginationNumbers>
			<div className='container '>
				<nav className='float-right'>
					<span className='pages'> You are in page #{currentPage}</span>
				</nav>
			</div>
		</PaginationNumbers>
	);
};

export default Pagination;

const PaginationNumbers = styled.div`
	a:hover {
		background-color: var(--primaryColor);
		cursor: pointer;
		transition: 0.3s;
		color: white !important;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	}
	ul {
		border: 1px solid black;
		background: #b3cde0;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
	}
	a {
		padding: 6px;
		margin: 2px;
		font-size: 0.7rem;
		font-family: Helvetica;
	}

	.pages {
		font-weight: bold;
		font-size: 0.85rem;
		border: 1px solid white;
		color: white;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
		background-color: #444444;
		border-radius: 20px;
		margin-left: 10px;
		margin-top: -1px;
		padding: 10px;
		position: relative;
	}
	@media (max-width: 1200px) {
		.pages {
			font-weight: bold;
			font-size: 0.75rem;
			border: 1px solid white;
			color: white;
			background-color: #444444;
			border-radius: 20px;
			padding: 10px;
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
			margin-left: 10px;
			margin-top: -1px;
		}
	}

	.active {
		color: white !important;
		background: #330001;
		font-weight: "bold";
	}
`;
