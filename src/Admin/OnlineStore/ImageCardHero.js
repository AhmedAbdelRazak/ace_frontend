/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../GeneralImages/UploadImageImage.jpg";

const ImageCardHero = ({
	thumbnail,
	thumbnail2,
	thumbnail3,
	setThumbnail,
	setThumbnail2,
	setThumbnail3,
	thumbnail_Phone,
	thumbnail2_Phone,
	thumbnail3_Phone,
	setThumbnail_Phone,
	setThumbnail2_Phone,
	setThumbnail3_Phone,
	handleImageRemove,
	handleImageRemove2,
	handleImageRemove3,
	handleImageRemove_Phone,
	handleImageRemove2_Phone,
	handleImageRemove3_Phone,
	fileUploadAndResizeThumbNail,
	fileUploadAndResizeThumbNail2,
	fileUploadAndResizeThumbNail3,
	fileUploadAndResizeThumbNail_Phone,
	fileUploadAndResizeThumbNail2_Phone,
	fileUploadAndResizeThumbNail3_Phone,
}) => {
	return (
		<ImageCardHeroWrapper>
			<div className='row'>
				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 1
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail &&
										thumbnail.images &&
										thumbnail.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);
															setThumbnail([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								Image Size should be Width: 1920px ; Height: 809px. Set the Home
								Page Main thumbnail image 1. Only *.png, *.jpg and *.jpeg image
								files are accepted
							</div>
						</div>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 2
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail2 &&
										thumbnail2.images &&
										thumbnail2.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);
															setThumbnail2([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail2.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail2}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								Image Size should be Width: 1920px ; Height: 809px. Set the Home
								Page Main thumbnail image 1. Only *.png, *.jpg and *.jpeg image
								files are accepted
							</div>
						</div>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 3
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail3 &&
										thumbnail3.images &&
										thumbnail3.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove3(image.public_id);
															setThumbnail3([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail3.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail3}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								Set the Home Page Main thumbnail image 3 (Width: 1920px ;
								Height: 809px). Only *.png, *.jpg and *.jpeg image files are
								accepted
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='row mt-3'>
				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 1 (PHONE)
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail_Phone &&
										thumbnail_Phone.images &&
										thumbnail_Phone.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove_Phone(image.public_id);
															setThumbnail_Phone([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail_Phone.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail_Phone}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								image 1. Only *.png, *.jpg and *.jpeg image files are accepted
							</div>
						</div>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 2 (PHONE)
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail2_Phone &&
										thumbnail2_Phone.images &&
										thumbnail2_Phone.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove2_Phone(image.public_id);
															setThumbnail2_Phone([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail2_Phone.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail2_Phone}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								image 1. Only *.png, *.jpg and *.jpeg image files are accepted
							</div>
						</div>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									Home Page Banner 3 (PHONE)
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail3_Phone &&
										thumbnail3_Phone.images &&
										thumbnail3_Phone.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove3_Phone(image.public_id);
															setThumbnail3_Phone([]);
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
															width: "130px",
															height: "130px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											);
										})}
								</div>
								{!thumbnail3_Phone.images ? (
									<label
										className=''
										style={{ cursor: "pointer", fontSize: "0.95rem" }}>
										<img src={imageImage} alt='imageUpload' />
										<input
											type='file'
											hidden
											accept='images/*'
											onChange={fileUploadAndResizeThumbNail3_Phone}
											required
										/>
									</label>
								) : null}
							</div>
							<div className='text-muted fs-7'>
								Set the Home Page Main thumbnail image 3. Only *.png, *.jpg and
								*.jpeg image files are accepted
							</div>
						</div>
					</div>
				</div>
			</div>
		</ImageCardHeroWrapper>
	);
};

export default ImageCardHero;

const ImageCardHeroWrapper = styled.div`
	.card {
		border: 1px #f6f6f6 solid !important;
	}
`;
