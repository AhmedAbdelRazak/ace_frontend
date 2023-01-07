/** @format */

import React from "react";
import styled from "styled-components";

const PaginationBottom = ({
	postsPerPage,
	totalPosts,
	paginate,
	currentPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<PaginationNumbers>
			<div className='container '>
				<nav className='float-right mx-auto mb-3'>
					<span className='pages'> Pages</span>
					<ul className='pagination  '>
						{pageNumbers.map((number) => {
							const active = currentPage === number ? "active" : "";

							return (
								<li key={number} className='page-item'>
									<a
										href='##'
										onClick={() => {
											paginate(number);
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className={`page-link ${active}`}>
										{number}
									</a>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</PaginationNumbers>
	);
};

export default PaginationBottom;

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
		padding: 8px;
		margin: 2px;
		font-size: 0.7rem;
		font-family: Helvetica;
	}
	.pages {
		font-size: 0.7rem;
		font-weight: bold;
		font-family: Helvetica;
	}

	.active {
		color: white !important;
		background: #330001;
		font-weight: "bold";
	}
`;
