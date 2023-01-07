/** @format */

import React, { useEffect, useContext, useReducer } from "react";
import reducer from "./cart_reducer";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	CHANGE_COLOR,
	CHANGE_SIZE,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	SHIPPING_FEES,
	SHIPPING_DETAILS,
	SIDEBAR_OPEN2,
	SIDEBAR_CLOSE2,
	SIDEFILTERS_CLOSE,
	SIDEFILTERS_OPEN,
} from "../actions";

const getLocalStorage = () => {
	let cart = localStorage.getItem("cart");
	if (cart) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return [];
	}
};

const initialState = {
	isSidebarOpen: false,
	isSidebarOpen2: false,
	isSideFilterOpen: false,
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 0,
	shipmentChosen: {},
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};
	const closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const openSidebar2 = () => {
		dispatch({ type: SIDEBAR_OPEN2 });
	};
	const closeSidebar2 = () => {
		dispatch({ type: SIDEBAR_CLOSE2 });
	};

	const openSideFilter = () => {
		dispatch({ type: SIDEFILTERS_OPEN });
	};
	const closeSideFilter = () => {
		dispatch({ type: SIDEFILTERS_CLOSE });
	};

	// add to cart
	const addToCart = (id, color, amount, product, chosenProductAttributes) => {
		dispatch({
			type: ADD_TO_CART,
			payload: { id, color, amount, product, chosenProductAttributes },
		});
		// console.log(product, "product from cart_context");
	};
	// remove item
	const removeItem = (id, size, color) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: { id, size, color } });
	};
	// toggle amount
	const toggleAmount = (id, value, chosenAttribute, newMax) => {
		// console.log(id, value);
		dispatch({
			type: TOGGLE_CART_ITEM_AMOUNT,
			payload: { id, value, chosenAttribute, newMax },
		});
	};
	// clear cart
	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	// change color
	const changeColor = (
		id,
		color,
		size,
		chosenColorImage,
		quantity,
		prevColor,
	) => {
		// console.log(id, value);
		dispatch({
			type: CHANGE_COLOR,
			payload: { id, color, size, chosenColorImage, quantity, prevColor },
		});
	};

	// change Size
	const changeSize = (id, size, color, quantity, prevSize) => {
		// console.log(id, value);
		dispatch({
			type: CHANGE_SIZE,
			payload: { id, size, color, quantity, prevSize },
		});
	};

	const addShipmentFee = (ShippingPrice) => {
		dispatch({ type: SHIPPING_FEES, payload: { ShippingPrice } });
	};

	const addShipmentDetails = (chosenShipmentDetails) => {
		dispatch({ type: SHIPPING_DETAILS, payload: { chosenShipmentDetails } });
	};

	useEffect(() => {
		dispatch({ type: COUNT_CART_TOTALS });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				removeItem,
				toggleAmount,
				clearCart,
				openSidebar,
				closeSidebar,
				openSidebar2,
				closeSidebar2,
				openSideFilter,
				closeSideFilter,
				addShipmentFee,
				addShipmentDetails,
				changeColor,
				changeSize,
			}}>
			{children}
		</CartContext.Provider>
	);
};

// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
