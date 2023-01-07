/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Login from "./Login";
import Register from "./Register";

// import { toast } from "react-toastify";

const SigninModal = ({ modalVisible3, setModalVisible3 }) => {
	const [signinRegister, setSignRegister] = useState("Login");
	const mainForm = () => {
		return (
			<div className='mx-auto text-center mx-auto'>
				{signinRegister === "Login" ? (
					<Login setSignRegister={setSignRegister} />
				) : (
					<Register setSignRegister={setSignRegister} />
				)}
			</div>
		);
	};

	return (
		<SigninModalWrapper>
			<Modal
				width='90%'
				title={
					signinRegister === "Login" ? (
						<div
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: "1.3rem",
							}}>{`LOGIN FORM`}</div>
					) : (
						<div
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: "1.3rem",
							}}>{`ACCOUNT REGISTER FORM`}</div>
					)
				}
				open={modalVisible3}
				onOk={() => {
					setModalVisible3(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible3(false);
				}}>
				{mainForm()}
			</Modal>
		</SigninModalWrapper>
	);
};

export default SigninModal;

const SigninModalWrapper = styled.div`
	z-index: 18000 !important;
`;
