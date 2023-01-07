/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { getProducts } from "../../apiAdmin";
import CountUp from "react-countup";
import AttributesModal from "../../Product/UpdatingProduct/AttributesModal";
import DarkBG from "../../AdminMenu/DarkBG";
import Navbar from "../../AdminNavMenu/Navbar";
import { isAuthenticated } from "../../../auth";

const ProductList = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [clickedProduct, setClickedProduct] = useState({});
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [q, setQ] = useState("");
	const [collapsed, setCollapsed] = useState(false);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [offset, setOffset] = useState(0);

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
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();
		// eslint-disable-next-line
	}, []);

	function sum_array(arr) {
		// store our final answer
		var sum = 0;

		// loop through entire array
		for (var i = 0; i < arr.length; i++) {
			// loop through each inner array
			for (var j = 0; j < arr[i].length; j++) {
				// add this number to the current final sum
				sum += arr[i][j];
			}
		}

		return sum;
	}

	const productsWithNoVariables =
		allProducts && allProducts.filter((i) => i.addVariables === false);

	const productsWithVariables =
		allProducts &&
		allProducts
			.filter((i) => i.addVariables === true)
			.map((iii) => iii.productAttributes);

	const overallStockLevel = () => {
		var QtyNoVariables =
			productsWithNoVariables &&
			productsWithNoVariables
				.map((iii) => (Number(iii.quantity) > 0 ? Number(iii.quantity) : 0))
				.reduce((a, b) => a + b, 0);

		var QtyWithVariables = productsWithVariables.map((iii) =>
			iii.map((iiii) =>
				Number(iiii.quantity) > 0 ? Number(iiii.quantity) : 0,
			),
		);

		return Number(QtyNoVariables) + Number(sum_array(QtyWithVariables));
	};

	// console.log(overallStockLevel(), "Qty");

	const overallStockWorth = () => {
		var QtyNoVariables =
			productsWithNoVariables &&
			productsWithNoVariables
				.map((iii) =>
					Number(iii.quantity) > 0
						? Number(iii.quantity) * Number(iii.priceAfterDiscount)
						: 0,
				)
				.reduce((a, b) => a + b, 0);

		var QtyWithVariables = productsWithVariables.map((iii) =>
			iii.map((iiii) =>
				Number(iiii.quantity) > 0
					? Number(iiii.quantity) * Number(iiii.priceAfterDiscount)
					: 0,
			),
		);

		return Number(QtyNoVariables) + Number(sum_array(QtyWithVariables));
	};

	// console.log(overallStockWorth(), "overallStockWorth");

	function search(orders) {
		return orders.filter((row) => {
			return (
				row.productName.toLowerCase().indexOf(q) > -1 ||
				row.productName_Arabic.toLowerCase().indexOf(q) > -1 ||
				row.productSKU.toLowerCase().indexOf(q) > -1
			);
		});
	}

	const modifyingInventoryTable = () => {
		let modifiedArray = allProducts.map((i) => {
			return {
				productId: i._id,
				productName: i.productName,
				productName_Arabic: i.productName_Arabic,
				productPrice: i.priceAfterDiscount,
				productQty: i.addVariables
					? i.productAttributes
							.map((iii) => iii.quantity)
							.reduce((a, b) => a + b, 0)
					: i.quantity,
				productImage: i.thumbnailImage,
				productSKU: i.productSKU,
				addedBy: i.addedByEmployee,
				createdAt: i.createdAt,
				addVariables: i.addVariables,
				productAttributes: i.productAttributes,
			};
		});

		return modifiedArray;
	};

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		// clean up code
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll, { passive: true });
		if (window.pageYOffset > 0) {
			setPageScrolled(true);
		} else {
			setPageScrolled(false);
		}
		return () => window.removeEventListener("scroll", onScroll);
	}, [offset]);

	const dataTable = () => {
		return (
			<div className='tableData'>
				<AttributesModal
					product={clickedProduct}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					setCollapsed={setCollapsed}
				/>
				<div className=' mb-3 form-group mx-3 text-center'>
					<label
						className='mt-3 mx-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "black",
							borderRadius: "20px",
						}}>
						Search
					</label>
					<input
						className='p-2 my-5 '
						type='text'
						value={q}
						onChange={(e) => setQ(e.target.value.toLowerCase())}
						placeholder='Search By Product Name Or SKU'
						style={{
							borderRadius: "20px",
							width: "50%",
							border: "1px lightgrey solid",
						}}
					/>
				</div>
				<table
					className='table table-bordered table-md-responsive table-hover'
					style={{ fontSize: "0.75rem", overflowX: "auto" }}>
					<thead className='thead-light'>
						<tr
							style={{
								fontSize: "0.8rem",
								textTransform: "capitalize",
								textAlign: "center",
							}}>
							<th scope='col'>Item #</th>
							<th scope='col'>Product Name</th>
							<th scope='col'>Product Main SKU</th>
							<th scope='col'>Product Price</th>
							<th scope='col'>Stock Onhand</th>
							<th scope='col'>Product Creation Date</th>
							<th scope='col'>Product Created By</th>
							<th scope='col'>Product Image</th>
							<th scope='col'>Update Product</th>
						</tr>
					</thead>
					<tbody
						className='my-auto'
						style={{
							fontSize: "0.75rem",
							textTransform: "capitalize",
							fontWeight: "bolder",
						}}>
						{search(modifyingInventoryTable()).map((s, i) => {
							return (
								<tr key={i} className=''>
									<td className='my-auto'>{i + 1}</td>

									<td>{s.productName}</td>
									<td>{s.productSKU}</td>
									<td>
										{s.addVariables ? (
											<span
												onClick={() => {
													setModalVisible(true);
													setClickedProduct(s);
													setCollapsed(true);
												}}
												style={{
													fontWeight: "bold",
													textDecoration: "underline",
													color: "darkblue",
													cursor: "pointer",
												}}>
												Check Product Attributes
											</span>
										) : (
											s.productPrice
										)}
									</td>
									<td
										style={{
											background: s.productQty <= 0 ? "#fdd0d0" : "",
										}}>
										{s.productQty}
									</td>
									<td>{new Date(s.createdAt).toLocaleDateString()}</td>
									<td>{s.addedBy.name}</td>
									<td style={{ width: "15%", textAlign: "center" }}>
										<img
											width='30%'
											height='30%'
											style={{ marginLeft: "20px" }}
											src={
												s.productImage[0].images[0]
													? s.productImage[0].images[0].url
													: null
											}
											alt={s.productName}
										/>
									</td>
									<Link to={`/admin/update-specs/${s.productId}`}>
										<td
											style={{
												color: "blue",
												fontWeight: "bold",
												cursor: "pointer",
											}}>
											Update Specs...
										</td>
									</Link>

									{/* <td>{Invoice(s)}</td> */}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<ProductListWrapper show={AdminMenuStatus}>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='ProductSpecs'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<Navbar fromPage='ProductSpecs' pageScrolled={pageScrolled} />

					<div className=' tableWrapper container-fluid'>
						<div className='row'>
							<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#f1416c" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Overall Products Count
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration='3'
											delay={1}
											end={allProducts.length}
											separator=','
										/>
										<span
											style={{
												color: "white",
												marginLeft: "5px",
												fontSize: "1.2rem",
											}}>
											Products
										</span>
									</div>
								</div>
							</div>

							<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#009ef7" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Overall Inventory Level
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration='3'
											delay={1}
											end={overallStockLevel()}
											separator=','
										/>
										<span
											style={{
												color: "white",
												marginLeft: "5px",
												fontSize: "1.2rem",
											}}>
											Items
										</span>
									</div>
								</div>
							</div>

							{isAuthenticated().user.userRole === "Order Taker" ||
							isAuthenticated().user.userRole === "Operations" ? null : (
								<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
									<div className='card' style={{ background: "#50cd89" }}>
										<div className='card-body'>
											<h5 style={{ fontWeight: "bolder", color: "white" }}>
												Stock Worth (L.E.)
											</h5>
											<CountUp
												style={{ color: "white" }}
												duration='3'
												delay={1}
												end={overallStockWorth()}
												separator=','
											/>
											<span
												style={{
													color: "white",
													marginLeft: "5px",
													fontSize: "1.2rem",
												}}>
												EGY Pounds
											</span>
										</div>
									</div>
								</div>
							)}
						</div>
						{dataTable()}
					</div>
				</div>
			</div>
		</ProductListWrapper>
	);
};

export default ProductList;

const ProductListWrapper = styled.div`
	min-height: 980px;
	/* overflow-x: hidden; */
	/* background: #ededed; */

	.tableData {
		background: white;
		padding: 10px;
	}
	.grid-container {
		display: grid;
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15.2% 84.8%"};
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.tableWrapper {
		overflow-x: auto;
		margin-top: 80px;
	}

	.card-body span {
		font-size: 1.5rem;
		font-weight: bold;
	}

	/* tr:nth-child(even) {
		background: #fafafa !important;
	}
	tr:nth-child(odd) {
		background: #d3d3d3 !important;
	} */

	tr:hover {
		background: #009ef7 !important;
		color: white !important;
	}

	@media (max-width: 1550px) {
		li {
			font-size: 0.85rem !important;
		}

		label {
			font-size: 0.8rem !important;
		}

		h3 {
			font-size: 1.2rem !important;
		}
	}

	@media (max-width: 1750px) {
		background: white;

		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 1400px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 10% 95%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}

	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 16% 84%; */
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "0% 100%")};
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
		h3 {
			margin-top: 60px !important;
		}

		.rightContentWrapper {
			margin-top: 20px;
			margin-left: ${(props) => (props.show ? "0px" : "20px")};
		}
	}
`;
