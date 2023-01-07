/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../../GeneralImages/UploadImageImage.jpg";

const MultipleImageCard = ({
	productAttributesFinal,
	handleImageRemove,
	allColors,
	ColorsImageUpload,
	c,
	i,
	setProductAttributesFinal,
}) => {
	return (
		<MultipleImageCardWrapper>
			<div className='card card-flush py-4'>
				<div className=''>
					<div className=' p-3'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							Product Images{" "}
							<span className='text-capitalize'>
								{" "}
								(
								{allColors &&
									allColors[0] &&
									allColors[allColors.map((i) => i.hexa).indexOf(c)].color}
								)
							</span>
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'>
						<div className='image-input-wrapper w-180px h-180px'></div>

						{productAttributesFinal[i] &&
						productAttributesFinal[i].productImages &&
						productAttributesFinal[i].productImages.length > 0 ? (
							<>
								{productAttributesFinal[i].productImages.map((imag, iiii) => {
									return (
										<React.Fragment key={iiii}>
											<img alt='nothing' width='30%' src={imag.url} />
											<button
												type='button'
												onClick={() => {
													handleImageRemove(imag.public_id);

													var array = productAttributesFinal[
														i
													].productImages.filter(function (s) {
														return s !== imag;
													});

													const index = productAttributesFinal.findIndex(
														(object) => {
															return object.PK === productAttributesFinal[i].PK;
														},
													);

													if (index !== -1) {
														const newArr = productAttributesFinal.map((obj) => {
															if (obj.PK === productAttributesFinal[i].PK) {
																return {
																	...obj,
																	productImages: array,
																};
															}

															return obj;
														});

														setProductAttributesFinal(newArr);
													}
												}}
												style={{
													transform: "translate(-100%, -100%)",
													color: "white",
													background: "black",
													fontSize: "15px",
													padding: "0px",
													borderRadius: "50%",
												}}
												aria-label='Close'>
												<span aria-hidden='true'>&times;</span>
											</button>
										</React.Fragment>
									);
								})}
							</>
						) : null}
						<br />
						<br />
						{productAttributesFinal[i] &&
						productAttributesFinal[i].productImages &&
						productAttributesFinal[i].productImages.length <= 0 ? (
							<label
								className='btn btn-raised'
								style={{
									cursor: "pointer",
									fontSize: "0.95rem",
									backgroundColor: c,
									color: "white",
									boxShadow: "2px 2px 2px 3px rgba(0,0,0,0.1)",
								}}>
								<img src={imageImage} alt='imageUpload' />

								<input
									type='file'
									hidden
									multiple
									accept='images/*'
									onChange={(e) => ColorsImageUpload(e, c)}
									required
								/>
							</label>
						) : null}
					</div>
					<div className='text-muted fs-7'>
						Width: 800px, Height: 954px;
						<br />
						Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
						files are accepted
					</div>
				</div>
			</div>
		</MultipleImageCardWrapper>
	);
};

export default MultipleImageCard;

const MultipleImageCardWrapper = styled.div`
	.card {
		border: 1px white solid !important;
	}
`;
