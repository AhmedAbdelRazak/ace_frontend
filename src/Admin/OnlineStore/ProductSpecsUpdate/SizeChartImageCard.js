/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../../GeneralImages/UploadImageImage.jpg";

const SizeChartImageCard = ({
	sizeChart,
	handleImageRemove,
	setSizeChart,
	fileUploadAndResizeThumbNail,
}) => {
	return (
		<SizeChartImageCardWrapper className='col-md-10'>
			<div className='card card-flush py-2'>
				<div className=''>
					<div className=' p-3'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							Add Size Chart Image
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'>
						<div className='image-input-wrapper w-180px h-180px'></div>
						<div className='col-12'>
							{sizeChart &&
								sizeChart.chartImage &&
								sizeChart.chartImage.map((image) => {
									return (
										<div className='m-3 col-6 '>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove(image.public_id);
													setSizeChart({ ...sizeChart, chartImage: [] });
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
						{!sizeChart.chartImage || sizeChart.chartImage.length === 0 ? (
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
						Set the size chart image. Only *.png files are accepted
					</div>
				</div>
			</div>
		</SizeChartImageCardWrapper>
	);
};

export default SizeChartImageCard;

const SizeChartImageCardWrapper = styled.div`
	.card {
		border: 1px #f6f6f6 solid !important;
	}
`;
