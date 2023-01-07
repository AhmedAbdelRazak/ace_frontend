/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import Navbar from "../AdminNavMenu/Navbar";
import DarkBG from "../AdminMenu/DarkBG";
import { cloudinaryUpload1, createHero, getAllHeros } from "../apiAdmin";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import ImageCardHero from "./ImageCardHero";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../auth";

const AddHeroComp = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// eslint-disable-next-line
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);

	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [thumbnail, setThumbnail] = useState([]);
	const [thumbnail2, setThumbnail2] = useState([]);
	const [thumbnail3, setThumbnail3] = useState([]);
	const [thumbnail_Phone, setThumbnail_Phone] = useState([]);
	const [thumbnail2_Phone, setThumbnail2_Phone] = useState([]);
	const [thumbnail3_Phone, setThumbnail3_Phone] = useState([]);
	// eslint-disable-next-line
	const [allHeroes, setAllHeroes] = useState([]);
	const [hyper_link, setHyperLink] = useState("");
	const [hyper_link2, setHyperLink2] = useState("");
	const [hyper_link3, setHyperLink3] = useState("");

	const { user, token } = isAuthenticated();

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

	const gettingAllHeroes = () => {
		getAllHeros(token).then((data) => {
			if (data.error) {
			} else {
				setAllHeroes(data[data.length - 1]);
				setThumbnail(
					data[data.length - 1].thumbnail[0]
						? data[data.length - 1].thumbnail[0]
						: [],
				);
				setThumbnail2(
					data[data.length - 1].thumbnail2[0]
						? data[data.length - 1].thumbnail2[0]
						: [],
				);
				setThumbnail3(
					data[data.length - 1].thumbnail3[0]
						? data[data.length - 1].thumbnail3[0]
						: [],
				);

				setThumbnail_Phone(
					data[data.length - 1].thumbnail_Phone[0]
						? data[data.length - 1].thumbnail_Phone[0]
						: [],
				);
				setThumbnail2_Phone(
					data[data.length - 1].thumbnail2_Phone[0]
						? data[data.length - 1].thumbnail2_Phone[0]
						: [],
				);
				setThumbnail3_Phone(
					data[data.length - 1].thumbnail3_Phone[0]
						? data[data.length - 1].thumbnail3_Phone[0]
						: [],
				);

				setHyperLink(data[data.length - 1].hyper_link);
				setHyperLink2(data[data.length - 1].hyper_link2);
				setHyperLink3(data[data.length - 1].hyper_link3);
			}
		});
	};

	useEffect(() => {
		gettingAllHeroes();
		// eslint-disable-next-line
	}, []);

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1920,
					809,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail({ ...thumbnail, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const fileUploadAndResizeThumbNail2 = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail2;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1920,
					809,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail2({ ...thumbnail2, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const fileUploadAndResizeThumbNail3 = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail3;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1920,
					809,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail3({ ...thumbnail3, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const fileUploadAndResizeThumbNail_Phone = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail_Phone;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1024,
					1024,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail_Phone({
									...thumbnail_Phone,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const fileUploadAndResizeThumbNail2_Phone = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail2_Phone;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1024,
					1024,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail2_Phone({
									...thumbnail2_Phone,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const fileUploadAndResizeThumbNail3_Phone = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = thumbnail3_Phone;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					1024,
					1024,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail3_Phone({
									...thumbnail3_Phone,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const FileUploadThumbnail = () => {
		return (
			<>
				<ImageCardHero
					thumbnail={thumbnail}
					thumbnail2={thumbnail2}
					thumbnail3={thumbnail3}
					setThumbnail={setThumbnail}
					setThumbnail2={setThumbnail2}
					setThumbnail3={setThumbnail3}
					thumbnail_Phone={thumbnail_Phone}
					thumbnail2_Phone={thumbnail2_Phone}
					thumbnail3_Phone={thumbnail3_Phone}
					setThumbnail_Phone={setThumbnail_Phone}
					setThumbnail2_Phone={setThumbnail2_Phone}
					setThumbnail3_Phone={setThumbnail3_Phone}
					handleImageRemove={handleImageRemove}
					handleImageRemove2={handleImageRemove2}
					handleImageRemove3={handleImageRemove3}
					handleImageRemove_Phone={handleImageRemove_Phone}
					handleImageRemove2_Phone={handleImageRemove2_Phone}
					handleImageRemove3_Phone={handleImageRemove3_Phone}
					fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail}
					fileUploadAndResizeThumbNail2={fileUploadAndResizeThumbNail2}
					fileUploadAndResizeThumbNail3={fileUploadAndResizeThumbNail3}
					fileUploadAndResizeThumbNail_Phone={
						fileUploadAndResizeThumbNail_Phone
					}
					fileUploadAndResizeThumbNail2_Phone={
						fileUploadAndResizeThumbNail2_Phone
					}
					fileUploadAndResizeThumbNail3_Phone={
						fileUploadAndResizeThumbNail3_Phone
					}
				/>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {}, 1000);
			});
	};

	const handleImageRemove2 = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail2;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail2([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const handleImageRemove3 = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail3;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail3([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const handleImageRemove_Phone = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail_Phone;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail_Phone([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {}, 1000);
			});
	};

	const handleImageRemove2_Phone = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail2_Phone;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail2_Phone([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const handleImageRemove3_Phone = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				setLoading(false);
				// eslint-disable-next-line
				const { images } = thumbnail3_Phone;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail3_Phone([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const clickSubmit = (e) => {
		e.preventDefault();

		// make request to api to create Hero Comp
		createHero(user._id, token, {
			thumbnail,
			thumbnail2,
			thumbnail3,
			thumbnail_Phone,
			thumbnail2_Phone,
			thumbnail3_Phone,
			hyper_link,
			hyper_link2,
			hyper_link3,
			heroComponentStatus: true,
		}).then((data) => {
			if (data.error) {
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Home Page Hero Images were successfully Added.");

				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const HeroForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "15px" }}>
							Hyper Link Connected To Image 1
						</label>
						<input
							type='text'
							className='form-control'
							onChange={(e) => setHyperLink(e.target.value)}
							value={hyper_link}
						/>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "15px" }}>
							Hyper Link Connected To Image 2
						</label>
						<input
							type='text'
							className='form-control'
							onChange={(e) => setHyperLink2(e.target.value)}
							value={hyper_link2}
						/>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					<div className='form-group'>
						<label
							className='text-muted'
							style={{ fontWeight: "bold", fontSize: "15px" }}>
							Hyper Link Connected To Image 3
						</label>
						<input
							type='text'
							className='form-control'
							onChange={(e) => setHyperLink3(e.target.value)}
							value={hyper_link3}
						/>
					</div>
				</div>
			</div>

			<button className='btn btn-outline-primary mb-3'>
				Update Home Page Banners
			</button>
		</form>
	);

	return (
		<AddHeroCompWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div>
					<AdminMenu
						fromPage='AddHero'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='navbarcontent'>
					<Navbar
						fromPage='AddHero'
						pageScrolled={pageScrolled}
						collapsed={collapsed}
					/>
					<div className='mx-5 mt-5'>{FileUploadThumbnail()}</div>
					<div className='mx-5 mt-4'>{HeroForm()}</div>
				</div>
			</div>
		</AddHeroCompWrapper>
	);
};

export default AddHeroComp;

const AddHeroCompWrapper = styled.div`
	min-height: 880px;
	margin-bottom: 10px;
	/* background: #fafafa; */
	overflow-x: hidden;

	.grid-container {
		display: grid;
		/* grid-template-columns: 16% 84%; */
		grid-template-columns: ${(props) =>
			props.show ? "4.5% 95.5%" : "15% 85%"};

		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.navbarcontent > nav > ul {
		list-style-type: none;
		background: white;
	}

	.navbarcontent > div > ul > li {
		background: white;
		font-size: 0.8rem;
		font-weight: bolder !important;
		color: #545454;
	}

	@media (max-width: 1750px) {
		/* background: white; */

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
		/* background: white; */

		.grid-container {
			display: grid;
			grid-template-columns: 8% 92%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}

		.storeSummaryFilters {
			position: "";
			width: "";
		}
	}
`;
