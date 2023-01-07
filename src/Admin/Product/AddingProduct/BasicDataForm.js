/** @format */

import React from "react";

const BasicDataForm = ({
	setProductName,
	productName,
	setProductName_Arabic,
	productName_Arabic,
	description,
	setDescription,
	setDescription_Arabic,
	description_Arabic,
	setSlug,
	setSlug_Arabic,
	productSKU,
	setProductSKU,
	setAddVariables,
	addVariables,
	setClickedLink,
	chosenSeason,
	setChosenSeason,
	parentPrice1,
	setParentPrice1,
	parentPrice2,
	setParentPrice2,
	parentPrice3,
	setParentPrice3,
	parentPrice4,
	setParentPrice4,
	parentPrice5,
	setParentPrice5,
	inheritPrice,
	setInheritPrice,
	inheritParentSKU,
	setInheritParentSKU,
}) => {
	const handleChange1 = (e) => {
		setProductName(e.target.value);
		setSlug(e.target.value.split(" ").join("-"));
	};

	const handleChange2 = (e) => {
		setProductName_Arabic(e.target.value);
		setSlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const handleChange6 = (e) => {
		setProductSKU(e.target.value);
	};

	const handleChange7 = (e) => {
		setChosenSeason(e.target.value);
	};

	const handleChange8 = (e) => {
		setParentPrice1(e.target.value);
	};
	const handleChange9 = (e) => {
		setParentPrice2(e.target.value);
	};
	const handleChange10 = (e) => {
		setParentPrice3(e.target.value);
	};

	const handleChange11 = (e) => {
		setParentPrice4(e.target.value);
	};

	const handleChange12 = (e) => {
		setParentPrice5(e.target.value);
	};

	return (
		<form className='formwrapper'>
			<div className='row'>
				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Product Name
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange1}
							value={productName}
							required
						/>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							اسم المنتج{" "}
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange2}
							value={productName_Arabic}
							required
						/>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Product Main SKU
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange6}
							value={productSKU}
							required
						/>
					</div>
				</div>

				<div className='col-md-2 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Manufacturing Price
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange8}
							value={parentPrice1}
							required
						/>
					</div>
				</div>

				<div className='col-md-2 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Retailer Price
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange9}
							value={parentPrice2}
							required
						/>
					</div>
				</div>

				<div className='col-md-2 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							WholeSale Price
						</label>

						<input
							type='text'
							className='form-control'
							onChange={handleChange11}
							value={parentPrice4}
							required
						/>
					</div>
				</div>

				<div className='col-md-2 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Drop Shipping Price
						</label>

						<input
							type='text'
							className='form-control'
							onChange={handleChange12}
							value={parentPrice5}
							required
						/>
					</div>
				</div>

				<div className='col-md-2 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Price After Discount
						</label>

						<input
							type='text'
							className='form-control'
							onChange={handleChange10}
							value={parentPrice3}
							required
						/>
					</div>
				</div>

				<div className='col-md-3 mx-auto my-4'>
					<div className='form-group'>
						<label
							className='text-muted mx-2'
							style={{ fontWeight: "bold", fontSize: "15px" }}>
							Inherit All Prices
						</label>

						<input
							type='checkbox'
							// className='form-control'
							onChange={(e) => setInheritPrice(!inheritPrice)}
							checked={inheritPrice}
							value={inheritPrice}
							required
						/>
					</div>
				</div>
				<div className='col-md-3 mx-auto my-4'>
					<label
						className='text-muted'
						style={{ fontWeight: "bold", fontSize: "13px" }}>
						Inherit From Parent SKU
					</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => {
							setInheritParentSKU(!inheritParentSKU);
						}}
						checked={inheritParentSKU === true ? true : false}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Add Description (Required)
						</label>
						<textarea
							rows='11'
							onChange={(e) => setDescription(e.target.value)}
							className='form-control'
							value={description}
							placeholder='Required*  write a little bit about the product'
							required
						/>
					</div>
				</div>

				<div className='col-md-6 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "13px" }}>
							Add Description (Arabic)
						</label>
						<textarea
							rows='11'
							onChange={(e) => setDescription_Arabic(e.target.value)}
							className='form-control'
							value={description_Arabic}
							placeholder='Required*  write a little bit about the product in Arabic'
							required
						/>
					</div>
				</div>
			</div>

			<div>
				<select
					onChange={handleChange7}
					placeholder='Select a Ticket'
					className=' mb-3 col-md-10 mx-auto my-1'
					style={{
						paddingTop: "12px",
						paddingBottom: "12px",
						// paddingRight: "50px",
						// textAlign: "center",
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						fontSize: "0.9rem",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						textTransform: "capitalize",
					}}>
					{chosenSeason ? (
						<option value={chosenSeason} style={{ color: "darkgrey" }}>
							{chosenSeason}
						</option>
					) : (
						<option value='Season'>Select A Season</option>
					)}
					<option key='1' value='Summer'>
						Summer
					</option>
					<option key='2' value='Fall'>
						Fall
					</option>
					<option key='3' value='Winter'>
						Winter
					</option>
					<option key='4' value='Spring'>
						Spring
					</option>
				</select>
			</div>

			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "13px" }}>
					Add Variables
				</label>
				<input
					type='checkbox'
					className='ml-2 mt-2'
					onChange={() => setAddVariables(!addVariables)}
					checked={addVariables === true ? true : false}
				/>
			</div>

			<button
				className='btn btn-outline-primary mb-3'
				onClick={() => {
					setClickedLink("AddVariables");
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}>
				Next: Add Product Attributes
			</button>
		</form>
	);
};

export default BasicDataForm;
