/** @format */

import React from "react";

const UpdateBasicDataForm = ({
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

	return (
		<form>
			<div className='row'>
				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "17px" }}>
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
							style={{ fontWeight: "bold", fontSize: "17px" }}>
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
							style={{ fontWeight: "bold", fontSize: "17px" }}>
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
			</div>

			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "17px" }}>
					Add Description (Required)
				</label>
				<textarea
					rows='7'
					onChange={(e) => setDescription(e.target.value)}
					className='form-control'
					value={description}
					placeholder='Required*  write a little bit about the product'
					required
				/>
			</div>
			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "17px" }}>
					Add Description (Arabic)
				</label>
				<textarea
					rows='7'
					onChange={(e) => setDescription_Arabic(e.target.value)}
					className='form-control'
					value={description_Arabic}
					placeholder='Required*  write a little bit about the product in Arabic'
					required
				/>
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

			{/* <div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "17px" }}>
					Add Variables
				</label>
				<input
					type='checkbox'
					className='ml-2 mt-2'
					onChange={() => setAddVariables(!addVariables)}
					checked={addVariables === true ? true : false}
				/>
			</div> */}

			<button
				className='btn btn-outline-primary mb-3'
				onClick={() => {
					setClickedLink("AddVariables");
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}>
				Next: Update Product Attributes
			</button>
		</form>
	);
};

export default UpdateBasicDataForm;
