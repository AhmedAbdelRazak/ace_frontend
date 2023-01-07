/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../../GeneralImages/UploadImageImage.jpg";

const ImageCard = ({
	setAddThumbnail,
	handleImageRemove,
	addThumbnail,
	fileUploadAndResizeThumbNail,
	uploadFrom,
}) => {
	return (
		<ImageCardWrapper>
			<div className='card card-flush py-4'>
				<div className=''>
					<div className=' p-2'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							Thumbnail (Product Main Image)
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'>
						<div className='image-input-wrapper'></div>
						<div className='col-10'>
							{addThumbnail &&
								addThumbnail.images &&
								addThumbnail.images.map((image) => {
									return (
										<div className='m-3 col-6 '>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove(image.public_id);
													setAddThumbnail([]);
												}}
												style={{
													color: "white",
													background: "black",
													fontSize: "20px",
												}}
												aria-label='Close'>
												<span aria-hidden='true'>&times;</span>
											</button>
											<img
												src={image.url}
												alt='Img Not Found'
												style={{
													width: "150px",
													height: "150px",
													boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
												}}
												key={image.public_id}
											/>
										</div>
									);
								})}
						</div>
						{!addThumbnail.images || addThumbnail.images.length <= 0 ? (
							<label
								className=''
								style={{ cursor: "pointer", fontSize: "0.95rem" }}>
								<img
									src={imageImage}
									alt='imageUpload'
									style={{
										width: "200px",
										height: "200px",
									}}
								/>
								{uploadFrom === "BasicProduct" ? (
									<input
										type='file'
										multiple
										hidden
										accept='images/*'
										onChange={fileUploadAndResizeThumbNail}
										required
									/>
								) : (
									<input
										type='file'
										hidden
										accept='images/*'
										onChange={fileUploadAndResizeThumbNail}
										required
									/>
								)}
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
		</ImageCardWrapper>
	);
};

export default ImageCard;

const ImageCardWrapper = styled.div`
	.card {
		border: 1px white solid !important;
		max-width: 90%;
	}
`;
