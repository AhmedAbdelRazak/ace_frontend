/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AboutPhoto from "../imgs/traffic-3098747_1920.jpg";
// import AboutPhoto from "../Navbar/RCHDIGIMP_Logo.jpg";
import ReactGA from "react-ga4";
import Helmet from "react-helmet";
import { getAbouts } from "../../Admin/apiAdmin";

const About = () => {
	const [aboutus, setAboutUs] = useState({});

	const gettingAllAbouts = () => {
		getAbouts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAboutUs(data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingAllAbouts();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	return (
		<AboutPageWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Ace Online Shop | About Us</title>
				<meta name='description' content='Ace Online Store' />
				<link rel='icon' href='gq_frontend\src\GeneralImgs\favicon.ico' />
				<link rel='canonical' href='https://acesportive.com/about' />
			</Helmet>
			<div className='container my-5'>
				<h1 className='title text-center '>ABOUT US</h1>
				<div className='col-md-5 mx-auto mb-5'>
					<br />
					<div className='horizLine'></div>
				</div>
				<div className='row'>
					<div className='col-md-6 about-us'>
						<p className='about-title'>{aboutus && aboutus.header_1}</p>
						<ul>
							<li>{aboutus && aboutus.description_1}</li>
						</ul>
					</div>
					{aboutus ? (
						<div className='col-md-6 imgdiv  my-5'>
							<img
								src={
									aboutus &&
									aboutus.thumbnail &&
									aboutus.thumbnail[0] &&
									aboutus.thumbnail[0].url
								}
								className='img-fluid'
								alt='Infinite-Apps'
							/>
						</div>
					) : null}
				</div>
			</div>
		</AboutPageWrapper>
	);
};

export default About;

const AboutPageWrapper = styled.section`
	background: #f8f9fa;
	padding-bottom: 200px;
	padding-top: 50px;
	overflow: hidden;

	.title {
		font-weight: bolder;
		color: var(--mainBlue);
	}

	.about-title {
		font-size: 40px;
		font-weight: 600;
		margin-top: 8%;
		color: var(--orangePrimary);
		margin-left: 55px;
	}

	.about-us ul li {
		margin: 0px 0px;
		list-style: none;
		padding: 0px !important;
	}

	ul {
		list-style: none;
	}

	.about-us ul {
		margin-left: 20px;
	}

	.imgdiv {
		/* transform: rotate(8deg); */
		/* box-shadow: 3px 10px 3px 10px rgba(0, 0, 0, 0.1); */
	}

	.horizLine {
		border-bottom: var(--orangePrimary) solid 5px;
	}

	@media (max-width: 1000px) {
		text-align: center;
		padding-bottom: 0px;
		padding-top: 0px;

		.about-title {
			font-size: 40px;
			font-weight: 600;
			margin-top: 0%;
			color: var(--orangePrimary);
			margin-left: 0px;
		}

		ul li {
			margin: 0px !important;
		}
		.about-us ul {
			margin-left: 0px !important;
			margin-right: 30px;
		}
	}
`;
