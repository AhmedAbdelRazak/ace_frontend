/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Slider } from "antd";

const isActive = (c, sureClickedLink, filterItemClicked) => {
	if (c === sureClickedLink && filterItemClicked) {
		return {
			background: "rgb(245, 245, 245)",
			transition: "0.3s",
			padding: "3px",
			color: "black",
			fontWeight: "bold",
		};
	} else {
		return {
			margin: "0px 20px",
			textTransform: "uppercase",
			fontSize: "1rem",
			fontWeight: "bold",
			color: "#767676",
			transition: "0.3s",
			padding: "3px",
		};
	}
};

const MainFilter = ({
	clickedItem,
	setClickedItem,
	filterItemClicked,
	setFilterItemClicked,
	allCategories,
	allProductColors,
	allSizes,
	usedFilters,
	setUsedFilters,
	allColors,
	maxPrice,
	minPrice,
	selectedPriceRange,
	setSelectedPriceRange,
}) => {
	const [checked, setCheked] = useState([]);
	const [checked2, setCheked2] = useState([]);
	const [checked3, setCheked3] = useState([]);

	const handleToggleCategory = (c) => () => {
		// return the first index or -1
		const currentCategorySlug = checked.indexOf(c);
		const newCheckedCategorySlug = [...checked];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentCategorySlug === -1) {
			newCheckedCategorySlug.push(c);
		} else {
			newCheckedCategorySlug.splice(currentCategorySlug, 1);
		}

		setCheked(newCheckedCategorySlug);

		const availableCategoryFilter =
			usedFilters.filter((i) => i.filterBy === "category").length > 0;

		if (availableCategoryFilter) {
			let array2 = usedFilters.map((a) => {
				var returnValue = { ...a };

				if (a.filterBy === "category") {
					returnValue.filterByType = newCheckedCategorySlug;
				}

				return returnValue;
			});

			setUsedFilters(array2);
		} else {
			setUsedFilters([
				...usedFilters,
				{ filterBy: "category", filterByType: newCheckedCategorySlug },
			]);
		}
	};

	const handleToggleSizes = (c) => () => {
		// return the first index or -1
		const currentSizes = checked2.indexOf(c);
		const newCheckedSizes = [...checked2];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentSizes === -1) {
			newCheckedSizes.push(c);
		} else {
			newCheckedSizes.splice(currentSizes, 1);
		}

		setCheked2(newCheckedSizes);

		const availableCategoryFilter =
			usedFilters.filter((i) => i.filterBy === "sizes").length > 0;

		if (availableCategoryFilter) {
			let array2 = usedFilters.map((a) => {
				var returnValue = { ...a };

				if (a.filterBy === "sizes") {
					returnValue.filterByType = newCheckedSizes;
				}

				return returnValue;
			});

			setUsedFilters(array2);
		} else {
			setUsedFilters([
				...usedFilters,
				{ filterBy: "sizes", filterByType: newCheckedSizes },
			]);
		}
	};

	const handleToggleColors = (c) => () => {
		// return the first index or -1
		const currentColors = checked3.indexOf(c);
		const newCheckedColors = [...checked3];
		// if currently checked was not already in checked state > push
		// else pull/take off
		if (currentColors === -1) {
			newCheckedColors.push(c);
		} else {
			newCheckedColors.splice(currentColors, 1);
		}

		setCheked3(newCheckedColors);

		const availableCategoryFilter =
			usedFilters.filter((i) => i.filterBy === "colors").length > 0;

		if (availableCategoryFilter) {
			let array2 = usedFilters.map((a) => {
				var returnValue = { ...a };

				if (a.filterBy === "colors") {
					returnValue.filterByType = newCheckedColors;
				}

				return returnValue;
			});

			setUsedFilters(array2);
		} else {
			setUsedFilters([
				...usedFilters,
				{ filterBy: "colors", filterByType: newCheckedColors },
			]);
		}
	};

	return (
		<MainFilterWrapper show={filterItemClicked}>
			<div
				className='filtersWrapper'
				onMouseLeave={() => {
					setFilterItemClicked(false);
				}}>
				<strong className='filterTitle'>Filters: </strong>
				<span
					className='filtersItem'
					style={isActive("productType", clickedItem, filterItemClicked)}
					onClick={() => {
						if (filterItemClicked) {
							if (clickedItem === "productType") {
								setFilterItemClicked(!filterItemClicked);
							} else {
								setClickedItem("productType");
							}
						} else {
							setFilterItemClicked(!filterItemClicked);
							setClickedItem("productType");
						}
					}}>
					Product Type{" "}
					<span className='arrowDownIcon'>
						<ArrowDownOutlined />
					</span>{" "}
				</span>
				{/* <span
					className='filtersItem'
					style={isActive("sizes", clickedItem, filterItemClicked)}
					onClick={() => {
						if (filterItemClicked) {
							if (clickedItem === "sizes") {
								setFilterItemClicked(!filterItemClicked);
							} else {
								setClickedItem("sizes");
							}
						} else {
							setFilterItemClicked(!filterItemClicked);
							setClickedItem("sizes");
						}
					}}>
					Size{" "}
					<span className='arrowDownIcon'>
						<ArrowDownOutlined />
					</span>{" "}
				</span> */}
				<span
					className='filtersItem'
					style={isActive("color", clickedItem, filterItemClicked)}
					onClick={() => {
						if (filterItemClicked) {
							if (clickedItem === "color") {
								setFilterItemClicked(!filterItemClicked);
							} else {
								setClickedItem("color");
							}
						} else {
							setFilterItemClicked(!filterItemClicked);
							setClickedItem("color");
						}
					}}>
					Color{" "}
					<span className='arrowDownIcon'>
						<ArrowDownOutlined />
					</span>{" "}
				</span>
				<span
					className='filtersItem'
					style={isActive("prices", clickedItem, filterItemClicked)}
					onClick={() => {
						if (filterItemClicked) {
							if (clickedItem === "prices") {
								setFilterItemClicked(!filterItemClicked);
							} else {
								setClickedItem("prices");
							}
						} else {
							setFilterItemClicked(!filterItemClicked);
							setClickedItem("prices");
						}
					}}>
					Price{" "}
					<span className='arrowDownIcon'>
						<ArrowDownOutlined />
					</span>{" "}
				</span>
				{/* <span
					className='filtersItem'
					style={isActive("sortBy", clickedItem, filterItemClicked)}
					onClick={() => {
						if (filterItemClicked) {
							setClickedItem("sortBy");
							if (clickedItem === "sortBy") {
								setFilterItemClicked(!filterItemClicked);
							} else {
								setClickedItem("sortBy");
							}
						} else {
							setFilterItemClicked(!filterItemClicked);
							setClickedItem("sortBy");
						}
					}}>
					Sort By{" "}
					<span className='arrowDownIcon'>
						<ArrowDownOutlined />
					</span>{" "}
				</span> */}

				{clickedItem === "productType" && (
					<div className='filterClickedWrapper'>
						{allCategories &&
							allCategories.map((c, i) => {
								return (
									<label htmlFor={c} className='block mr-3 mt-3' key={i}>
										<input
											type='checkbox'
											id={c}
											onChange={handleToggleCategory(c.categorySlug)}
											value={checked.indexOf(c.categorySlug === -1)}
											checked={
												usedFilters
													.filter((iii) => iii.filterBy === "category")
													.map((iiii) => iiii.filterByType)[0] &&
												usedFilters
													.filter((iii) => iii.filterBy === "category")
													.map((iiii) => iiii.filterByType)[0]
													.indexOf(c.categorySlug) !== -1
											}
											className='m-2'
										/>
										{c.categoryName}
									</label>
								);
							})}
					</div>
				)}

				{clickedItem === "sizes" && (
					<div className='filterClickedWrapper'>
						{allSizes &&
							allSizes.map((s, i) => {
								return (
									<label htmlFor={s} className='block block mr-3 mt-3' key={i}>
										<input
											type='checkbox'
											id={s}
											onChange={handleToggleSizes(s)}
											value={checked2.indexOf(s === -1)}
											className='m-2'
											checked={
												usedFilters
													.filter((iii) => iii.filterBy === "sizes")
													.map((iiii) => iiii.filterByType)[0] &&
												usedFilters
													.filter((iii) => iii.filterBy === "sizes")
													.map((iiii) => iiii.filterByType)[0]
													.indexOf(s) !== -1
											}
										/>
										{s}
									</label>
								);
							})}
					</div>
				)}

				{clickedItem === "color" && (
					<div className='filterClickedWrapper'>
						{allProductColors &&
							allProductColors.map((c, i) => {
								return (
									<label htmlFor={c} className='block mr-3 mt-3' key={i}>
										<input
											type='checkbox'
											id={c}
											onChange={handleToggleColors(c)}
											value={checked.indexOf(c === -1)}
											className='m-2'
											checked={
												usedFilters
													.filter((iii) => iii.filterBy === "color")
													.map((iiii) => iiii.filterByType)[0] &&
												usedFilters
													.filter((iii) => iii.filterBy === "color")
													.map((iiii) => iiii.filterByType)[0]
													.indexOf(c) !== -1
											}
										/>
										<span
											className='squareColor mr-1'
											// style={{ background: c }}
										>
											{allColors[allColors.map((i) => i.hexa).indexOf(c)].color}
										</span>
									</label>
								);
							})}
					</div>
				)}

				{clickedItem === "prices" && (
					<div className='filterClickedWrapper'>
						<label className='block mx-auto w-50 text-center mt-3'>
							<div className='icon-wrapper'>
								<span className='anticon' style={{ color: "black" }}>
									{selectedPriceRange[0]}
								</span>
								<Slider
									max={maxPrice}
									min={minPrice}
									range
									value={selectedPriceRange}
									defaultValue={[90, 500]}
									onChange={(value) => {
										setSelectedPriceRange(value);

										const availableCategoryFilter =
											usedFilters.filter((i) => i.filterBy === "prices")
												.length > 0;

										if (availableCategoryFilter) {
											let array2 = usedFilters.map((a) => {
												var returnValue = { ...a };

												if (a.filterBy === "prices") {
													returnValue.filterByType = value;
												}

												return returnValue;
											});

											setUsedFilters(array2);
										} else {
											setUsedFilters([
												...usedFilters,
												{ filterBy: "prices", filterByType: value },
											]);
										}
									}}
								/>
								<span className='anticon' style={{ color: "black" }}>
									{selectedPriceRange[1]}
								</span>
							</div>
						</label>
					</div>
				)}
			</div>

			{usedFilters.length > 0 ? (
				<div className='appliedFilters'>
					<strong className='appliedFiltersTitle'>Applied Filters: </strong>
					<span className='filteredByItems'>
						Filter By:{" "}
						{usedFilters &&
							usedFilters.map((f, i) => {
								return (
									<span key={i}>
										{f.filterBy && f.filterBy === "colors"
											? `${f.filterBy} (${f.filterByType.map(
													(iii) =>
														allColors[allColors.map((i) => i.hexa).indexOf(iii)]
															.color,
											  )})`
											: f.filterBy
											? `${f.filterBy} (${f.filterByType})`
											: "No Filters Applied"}
									</span>
								);
							})}
					</span>
					<div
						onClick={() => {
							window.location.reload(false);
						}}>
						<strong
							className='appliedFiltersTitle'
							style={{
								color: "darkgray",
								textDecoration: "underline",
								cursor: "pointer",
							}}>
							RESET FILTERS{" "}
						</strong>
					</div>
				</div>
			) : null}
		</MainFilterWrapper>
	);
};

export default MainFilter;

const MainFilterWrapper = styled.div`
	.filtersWrapper {
		margin: 0px 0px 0px 50px;
		/* border: 2px red solid; */
	}

	.filterTitle {
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 1rem;
		color: black;
	}

	.filtersItem {
		margin: 0px 20px;
		text-transform: uppercase;
		font-size: 1rem;
		font-weight: bold;
		color: #767676;
		transition: 0.3s;
		padding: 3px;
	}

	.filtersItem:hover {
		cursor: pointer;
		background: rgb(245, 245, 245);
		transition: 0.3s;
		padding: 3px;
	}

	.arrowDownIcon {
		font-size: 1.2rem;
		font-weight: bolder;
	}

	.filterClickedWrapper {
		background: ${(props) => (props.show ? "rgb(245, 245, 245)" : "")};
		min-height: ${(props) => (props.show ? "70px" : "")};
		animation: ${(props) => (props.show ? "fadeIn 0.5s linear forwards" : "")};
		transition: 0.3s;
		text-transform: uppercase;
	}

	.filterClickedWrapper > label {
		display: ${(props) => (props.show ? "" : "none")};
	}

	.squareColor {
		padding: 12px;
		border-radius: 2px;
		transition: 0.3s;
		font-size: 12px;
		color: #545454;
	}
	.block {
		transition: 0.3s;
	}

	.block:hover {
		background: ${(props) => (props.show ? "rgb(245, 245, 245)" : "")};
		cursor: pointer;
		transition: 0.3s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		} // CSS properties at start
		100% {
			opacity: 1;
		} // CSS properties at end
	}

	.appliedFilters {
		margin: 10px 0px 0px 50px;
	}
	.appliedFiltersTitle {
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 0.9rem;
		color: black;
	}

	.filteredByItems {
		text-transform: capitalize;
	}

	.icon-wrapper {
		position: relative;
		padding: 0px 30px;
		width: 50%;
		margin: 0px auto;
	}

	.icon-wrapper .anticon {
		position: absolute;
		top: -2px;
		width: 16px;
		height: 16px;
		color: rgba(0, 0, 0, 0.25);
		font-size: 16px;
		line-height: 1;
	}

	.icon-wrapper .icon-wrapper-active {
		color: rgba(0, 0, 0, 0.45);
	}

	.icon-wrapper .anticon:first-child {
		left: 0;
	}

	.icon-wrapper .anticon:last-child {
		right: 0;
	}
	[data-theme="dark"] .icon-wrapper .anticon {
		color: rgba(255, 255, 255, 0.25);
	}
	[data-theme="dark"] .icon-wrapper .icon-wrapper-active {
		color: rgba(255, 255, 255, 0.45);
	}
`;
