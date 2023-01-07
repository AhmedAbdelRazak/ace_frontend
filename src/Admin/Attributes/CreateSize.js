/** @format */

// eslint-disable-next-line
import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import "react-toastify/dist/ReactToastify.min.css";
import { createSize, getSizes } from "../apiAdmin";
import { isAuthenticated } from "../../auth";
import Navbar from "../AdminNavMenu/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const CreateSize = () => {
	const [size, setSize] = useState("");
	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [allSizes, setAllSizes] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [offset, setOffset] = useState(0);
	const [pageScrolled, setPageScrolled] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setSize(e.target.value);
	};

	const gettingAllSizes = () => {
		getSizes(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllSizes(
					data.map((size) => size.size.toLowerCase().replace(/\s/g, "")),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllSizes();
		// eslint-disable-next-line
	}, [size]);

	let matchingSize =
		allSizes.indexOf(size.toLowerCase().replace(/\s/g, "")) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingSize) {
			return toast.error("This size was added before.");
		}

		if (!size) {
			return toast.error("Please add a size name before creating.");
		}

		setError("");
		setSuccess(false);
		// make request to api to create Size
		createSize(user._id, token, {
			size,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Size was successfully Added.");
				setError("");
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const newSizeForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "20px" }}>
					Size Name
				</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange1}
					value={size}
					required
					// placeholder="XL, XXL, etc..."
				/>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add Size</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{size} is created</h3>;
		}
	};

	useEffect(() => {
		Aos.init({ duration: 1500 });
	}, []);

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

	return (
		<CreateSizeWrapper show={AdminMenuStatus}>
			{user.userRole === "Order Taker" ? (
				<Redirect to='/admin/create-new-order' />
			) : null}
			<ToastContainer />
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AddSize'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className=''>
					<Navbar fromPage='AddSize' pageScrolled={pageScrolled} />

					<div className='container' data-aos='fade-down'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'>
							Add A New Size
						</h3>

						{newSizeForm()}
						<h5 className='mt-5 text-center' style={{ fontWeight: "bold" }}>
							Already Added Sizes
						</h5>
						<table
							className='table table-bordered table-md-responsive table-hover table-striped col-md-8 mx-auto text-center '
							style={{ fontSize: "0.75rem", overflowX: "auto" }}>
							<thead className='thead-light'>
								<tr
									style={{
										fontSize: "1rem",
										textTransform: "capitalize",
										textAlign: "center",
									}}>
									<th scope='col'>#</th>
									<th scope='col'>Size</th>
								</tr>
							</thead>
							<tbody
								className='my-auto'
								style={{
									fontSize: "0.9rem",
									textTransform: "capitalize",
									fontWeight: "bolder",
								}}>
								{allSizes &&
									allSizes.map((s, i) => {
										return (
											<tr key={i} className=''>
												<td className='my-auto'>{i + 1}</td>

												<td>{s}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</CreateSizeWrapper>
	);
};

export default CreateSize;

const CreateSizeWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		/* grid-template-columns: 15.2% 84.8%; */
		grid-template-columns: ${(props) =>
			props.show ? "8% 92%" : "15.2% 84.8%"};
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.container {
		margin-top: 100px;
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
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
			grid-template-columns: 12% 88%;
			margin: auto;
			/* border: 1px solid red; */
			/* grid-auto-rows: minmax(60px, auto); */
		}
	}
`;
