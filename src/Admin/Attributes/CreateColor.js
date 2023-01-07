/** @format */

// eslint-disable-next-line
import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import "react-toastify/dist/ReactToastify.min.css";
import { createColor, getColors } from "../apiAdmin";
import { isAuthenticated } from "../../auth";
import Navbar from "../AdminNavMenu/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import DarkBG from "../AdminMenu/DarkBG";
import { Redirect } from "react-router-dom";

const CreateColor = () => {
	const [color, setColor] = useState("");
	const [hexa, setHexa] = useState("");
	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [allColors, setAllColors] = useState([]);
	const [allColorsDetails, setAllColorsDetails] = useState([]);
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
		setColor(e.target.value);
	};

	const handleChange3 = (e) => {
		setHexa(e.target.value);
	};

	const gettingAllColors = () => {
		getColors(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllColors(
					data.map((color) => color.color.toLowerCase().replace(/\s/g, "")),
				);
				setAllColorsDetails(data);
			}
		});
	};

	useEffect(() => {
		gettingAllColors();
		// eslint-disable-next-line
	}, [color]);

	let matchingColor =
		allColors.indexOf(color.toLowerCase().replace(/\s/g, "")) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingColor) {
			return toast.error("This Color was added before.");
		}

		if (!color) {
			return toast.error("Please add a color name before creating.");
		}

		if (!hexa) {
			return toast.error(`Please add a hexa code for ${color}.`);
		}

		setError("");
		setSuccess(false);
		// make request to api to create Color
		createColor(user._id, token, {
			color,
			hexa,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Color was successfully Added.");
				setError("");
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const newColorForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "20px" }}>
					Color Name
				</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange1}
					value={color}
					required
				/>
			</div>

			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "20px" }}>
					Hexa Code
				</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange3}
					value={hexa}
					required
				/>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add Color</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{color} is created</h3>;
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
		<CreateColorWrapper show={AdminMenuStatus}>
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
						fromPage='AddColor'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className=''>
					<Navbar fromPage='AddColor' pageScrolled={pageScrolled} />

					<div className='container' data-aos='fade-down'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'>
							Add A New Color
						</h3>

						{newColorForm()}
						<h5 className='mt-5 text-center' style={{ fontWeight: "bold" }}>
							Already Added Colors
						</h5>

						<table
							className='table table-bordered table-md-responsive table-hover table-striped col-md-8 mx-auto text-center'
							style={{ fontSize: "0.75rem", overflowX: "auto" }}>
							<thead className='thead-light'>
								<tr
									style={{
										fontSize: "1rem",
										textTransform: "capitalize",
										textAlign: "center",
									}}>
									<th scope='col'>#</th>
									<th scope='col'>Color</th>
									<th scope='col'>Hexa Code</th>
									<th scope='col'>CreatedAt</th>
								</tr>
							</thead>
							<tbody
								className='my-auto'
								style={{
									fontSize: "0.9rem",
									textTransform: "capitalize",
									fontWeight: "bolder",
								}}>
								{allColorsDetails &&
									allColorsDetails.map((s, i) => {
										return (
											<tr key={i} className=''>
												<td className='my-auto'>{i + 1}</td>

												<td>{s.color}</td>
												<td>{s.hexa}</td>
												<td>{new Date(s.createdAt).toLocaleDateString()}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</CreateColorWrapper>
	);
};

export default CreateColor;

const CreateColorWrapper = styled.div`
	min-height: 880px;
	overflow-x: hidden;
	/* background: #ededed; */

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "16% 84%")};
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
