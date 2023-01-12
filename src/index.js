/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Checkout/cart_context";
import { MessengerChat } from "react-messenger-chat-plugin";

ReactDOM.render(
	<React.Fragment>
		<CartProvider>
			<MessengerChat
				pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID}
				language='sv_SE'
				// themeColor={"#000000"}
				bottomSpacing={50}
				zIndex={10000}
				// loggedInGreeting='loggedInGreeting'
				// loggedOutGreeting='loggedOutGreeting'
				// greetingDialogDisplay={"show"}
				debugMode={true}
				// onMessengerShow={() => {
				// 	console.log("onMessengerShow");
				// }}
				// onMessengerHide={() => {
				// 	console.log("onMessengerHide");
				// }}
				// onMessengerDialogShow={() => {
				// 	console.log("onMessengerDialogShow");
				// }}
				// onMessengerDialogHide={() => {
				// 	console.log("onMessengerDialogHide");
				// }}
				// onMessengerMounted={() => {
				// 	console.log("onMessengerMounted");
				// }}
				// onMessengerLoad={() => {
				// 	console.log("onMessengerLoad");
				// }}
			/>
			<App />
		</CartProvider>
	</React.Fragment>,
	document.getElementById("root"),
);
