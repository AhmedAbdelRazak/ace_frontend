/** @format */

import React from "react";

import { Select } from "antd";
import { FaSearch } from "react-icons/fa";
import PaginationBottom from "./PaginationBottom";

const { Option } = Select;

const ProductsPrview = ({
	allProducts,
	allProductsAll,
	allSubSKUs,
	chosenProductWithVariables,
	chosenSubSKUs,
	setChosenProductWithVariables,
	setChosenSubSKUs,
	FilterFilled,
	postsPerPage,
	totalPosts,
	paginate,
	currentPage,
	currentPosts,
	setModalVisible,
}) => {
	return (
		<div
			className='col-md-6 productsOnRight'
			style={{
				borderLeft: "3px grey solid",
				// borderBottom: "3px grey solid",
			}}>
			{allProductsAll &&
				allProductsAll.length > 0 &&
				allSubSKUs &&
				allSubSKUs.length > 0 && (
					<div className='' style={{ background: "lightgrey" }}>
						<span
							onClick={() => {
								setModalVisible(true);
							}}
							style={{
								fontSize: "20px",
								color: "#6d757e",
								position: "absolute",
								left: "10px",
								top: "10px",
								cursor: "pointer",
							}}>
							Filters <FilterFilled />
						</span>
						<span
							style={{
								fontSize: "20px",
								position: "absolute",
								left: "325px",
								top: "10px",
								color: "#6d757e",
							}}>
							<FaSearch />
						</span>
						<br />
						<Select
							style={{
								color: "black",
								textTransform: "capitalize",
								width: "60%",
								left: "350px",
								top: "-10px",
							}}
							showSearch
							mode='multiple'
							placeholder='Scan Barcode to Select A SKU'
							value={chosenSubSKUs}
							allowClear
							onChange={(value) => {
								setChosenSubSKUs(value);
							}}>
							{allSubSKUs &&
								allSubSKUs.map((subsku, i) => {
									return (
										<Option
											key={i}
											value={subsku}
											style={{ textTransform: "uppercase" }}>
											{subsku}
										</Option>
									);
								})}
						</Select>
					</div>
				)}
			<div className='grid-container2'>
				{allProducts &&
					currentPosts &&
					currentPosts.map((p, i) => {
						return (
							<div
								className='pt-2'
								key={i}
								style={{ cursor: "pointer" }}
								onClick={() => {
									if (chosenSubSKUs.length === 0) {
										setChosenSubSKUs([p.SubSKU]);
									} else if (chosenSubSKUs.indexOf(p.SubSKU) !== -1) {
										const index = chosenProductWithVariables.findIndex(
											(object) => {
												return (
													object.productId === p._id &&
													object.SubSKU === p.SubSKU
												);
											},
										);

										if (index !== -1) {
											chosenProductWithVariables[index].OrderedQty += 1;

											setChosenProductWithVariables([
												...chosenProductWithVariables,
											]);
										}
									} else {
										setChosenSubSKUs([...chosenSubSKUs, p.SubSKU]);
									}
								}}>
								<img
									width='80%'
									height='75%'
									src={p.productImages[0].url}
									alt='infinite-apps'
								/>
								<div
									style={{
										fontSize: "12px",
										fontWeight: "bold",
										textTransform: "capitalize",
									}}>
									<div>
										{p.productName}
										{/* <div>{Number(p.priceAfterDiscount).toFixed(2)} EGP</div> */}
									</div>
								</div>
							</div>
						);
					})}
			</div>
			<div className=''>
				<PaginationBottom
					postsPerPage={postsPerPage}
					totalPosts={totalPosts}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
};

export default ProductsPrview;
