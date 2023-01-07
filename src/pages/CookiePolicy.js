/** @format */

import React from "react";
import styled from "styled-components";

const CookiePolicy = () => {
	return (
		<CookiePolicyWrapper>
			<div className='container'>
				<h1>Cookies Policy</h1>
				<p>
					This section refers to the cookies and web pages operated by
					ACESPORTIVE.COM. Please note that in order to insure the proper
					functioning of this Website, we sometimes place small data files
					called cookies on your device.
				</p>

				<p>
					A cookie is a small text file (letters and numbers) that a website
					places on your computer, telephone or any other device when you visit
					the website, with information about your navigation on that website.
					The cookies are installed by request issued by the web-server to a
					browser (e.g.: Internet Explorer, Chrome) and does not contain any
					software, spyware or virus programs and cannot access information from
					the hardware of the user. The function of the cookie is to enable our
					website to remember your actions and preferences (such as login,
					language, font size and other display preferences) over a period of
					time, so you don’t have to keep re-entering them whenever you come
					back to the site or browse from one page to another.
				</p>
				<br />
				<br />
				<h1>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h1>
				<p>
					In Short: We may use cookies and other tracking technologies to
					collect and store your information.
					<br />
					<br />
					We may use cookies and similar tracking technologies (like web beacons
					and pixels) to access or store information for better user experience.
				</p>
			</div>
			<br />
			<br />
		</CookiePolicyWrapper>
	);
};

export default CookiePolicy;

const CookiePolicyWrapper = styled.div`
	padding-bottom: 50px;
	min-height: 700px;

	h1 {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 30px;
	}
`;
