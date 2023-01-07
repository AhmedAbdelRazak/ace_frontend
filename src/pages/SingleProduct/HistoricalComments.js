/** @format */

import React from "react";

const HistoricalComments = ({
	loading,
	Product,
	comments,
	deleteConfirmed,
	isAuthenticated,
}) => {
	return (
		<>
			{!loading && Product && Product.comments && comments ? (
				<div className='col-md-12'>
					<h3 className='text-primary'>
						{comments && comments.length} Comments
					</h3>
					<hr />
					{comments &&
						comments.map((comment, i) => (
							<div key={i}>
								<div>
									<div>
										<p className='font-italic mark'>
											<span className='lead m-3'>{comment.text}</span>
											<br />
											<br />
											{comment.commentsPhotos &&
												comment.commentsPhotos.length > 0 && (
													<img
														src={
															comment.commentsPhotos &&
															comment.commentsPhotos[0] &&
															comment.commentsPhotos[0].url
														}
														alt='CommentPhoto'
														style={{
															width: "180px",
															height: "180px",
															// boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
															borderRadius: "50px",
															marginLeft: "5%",
														}}
													/>
												)}

											<span
												style={{
													padding: "0px",
													margin: "0px",
													fontSize: "0.8rem",
												}}>
												Posted by {comment.postedBy.name.slice(0, 6)} on{" "}
												{new Date(comment.created).toDateString()}
												<span style={{ cursor: "pointer" }}>
													{isAuthenticated().user &&
														isAuthenticated().user._id ===
															comment.postedBy._id && (
															<span
																onClick={() => deleteConfirmed(comment)}
																className='text-danger float-right mr-1'>
																Remove
															</span>
														)}
												</span>
											</span>
										</p>
									</div>
								</div>
								<hr />
							</div>
						))}
				</div>
			) : (
				<div className='text-center'>Loading...</div>
			)}
		</>
	);
};

export default HistoricalComments;
