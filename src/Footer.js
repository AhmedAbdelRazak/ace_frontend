/** @format */

import React from "react";
import styled from "styled-components";
import EgyptianFlag from "./GeneralImages/Egypt.png";
import { BsFacebook, BsPinterest } from "react-icons/bs";
import { AiOutlineYoutube, AiFillTwitterCircle } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<Wrapper>
			<div className='mx-auto text-center'>
				<div className='mb-2'>
					<span
						style={{
							color: "#3b5998",
							fontSize: "1.7rem",
							marginRight: "10px",
						}}>
						<BsFacebook />
					</span>{" "}
					<span
						style={{
							color: "red",
							fontSize: "1.7rem",
							marginRight: "10px",
						}}>
						<AiOutlineYoutube />
					</span>{" "}
					<span
						style={{
							color: "#00ACEE",
							fontSize: "1.7rem",
							marginRight: "10px",
						}}>
						<AiFillTwitterCircle />
					</span>{" "}
					<span
						style={{
							color: "darkred",
							fontSize: "1.7rem",
							marginRight: "10px",
						}}>
						<BsPinterest />
					</span>{" "}
					<span
						style={{
							color: "#00f2ea",
							fontSize: "1.7rem",
							marginRight: "10px",
						}}>
						<FaTiktok />
					</span>{" "}
				</div>

				<img className='flags' src={EgyptianFlag} alt='Egypt' />
				<span style={{ fontWeight: "bold" }}>EGYPT</span>
				<div className='mt-4 footerLinks'>
					{" "}
					<Link
						to='/privacy-policy'
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						Terms & Conditions
					</Link>
				</div>
				<div className='footerLinks'>
					<Link
						to='/privacy-policy'
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						Privacy Policy
					</Link>
				</div>
				<div className='footerLinks'>
					{" "}
					<Link
						to='/return-exchange-policy'
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						Returns & Exchange Policy
					</Link>
				</div>
				<div className='footerLinks'>
					<Link
						to='cookie-policy'
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						Cookie Policy
					</Link>{" "}
				</div>
				<div className='footerLinks'>Modern Slavery</div>
			</div>
			<div className='mb-2 paymentImages mx-auto'>
				<img
					src='//images.ctfassets.net/wl6q2in9o7k3/5PrfyA9tb7E5sX4VJOvUXU/5c7d1da15bcb3ea9bc846698b14da4c0/visa-card.svg'
					alt='Visa'
				/>
				<img
					src='//images.ctfassets.net/wl6q2in9o7k3/LwfpWwq8TXIansB91xPmD/d20403df94193ad356b8ea0a2df4e9f1/mastercard-card.svg'
					alt='Mastercard'
				/>
				<img
					src='//images.ctfassets.net/wl6q2in9o7k3/30jtAlNtcunM6pu0L8Xar/f528a13df611d9585b73a36fe35b8797/paypal-card.svg'
					alt='Paypal'
				/>
				<img
					src='//images.ctfassets.net/wl6q2in9o7k3/5AUy4FwF2qwCL5Xog760Xf/1839c30ce2dbe6b7119f4dab3f15920b/applepay-card.svg'
					alt='Apple Pay'
				/>
				<img
					src='//images.ctfassets.net/wl6q2in9o7k3/5Qb99pCcvWecgyOyOkzQO5/4e5ce86d601edd0205fa451e7e339562/klarna-pay-now-2516bae6e2a318cb44e4d29b920d93544d06e2a4b5ebcb985ab39202a68885c4.svg'
					alt='Klarna'
				/>
			</div>
			<div className='col-md-6 mx-auto'>
				<hr />
			</div>
			<div className='bottomWrapper'>
				<h5>
					&copy; {new Date().getFullYear()}
					<span> ACE Online Shop </span>
					{"    "}
				</h5>
				<h5 className='ml-2'> All rights reserved</h5>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.footer`
	background: white;
	padding-top: 50px;

	.flags {
		width: 1.2%;
	}

	.footerLinks {
		font-size: 1rem;
		font-weight: bold;
		color: #5d5d5d;
	}

	.footerLinks > a {
		font-size: 1rem;
		font-weight: bold;
		color: #5d5d5d;
	}

	.paymentImages {
		margin-top: 10px;
		text-align: center;
	}

	.paymentImages > img {
		margin-right: 10px;
		width: 4%;
		text-align: center;
	}

	.bottomWrapper {
		height: 5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: white;
		text-align: center;
		/* margin-top: 100px; */

		span {
			color: #c60e0e;
			font-weight: bold;
		}
		h5 {
			color: black;
			font-weight: 400;
			text-transform: none;
			line-height: 1.25;
		}
		@media (min-width: 776px) {
			flex-direction: row;
		}
	}

	@media (max-width: 1000px) {
		.paymentImages > img {
			width: 10%;
			text-align: center;
		}
		.flags {
			width: 3%;
		}
		h5 {
			font-size: 1rem;
		}
	}
`;

export default Footer;
