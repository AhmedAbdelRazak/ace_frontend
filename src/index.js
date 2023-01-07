/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Checkout/cart_context";

ReactDOM.render(
	<React.Fragment>
		<CartProvider>
			<App />
		</CartProvider>
	</React.Fragment>,
	document.getElementById("root"),
);
