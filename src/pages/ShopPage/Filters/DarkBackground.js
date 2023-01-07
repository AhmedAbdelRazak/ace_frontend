/** @format */

import React from "react";
import { useCartContext } from "../../../Checkout/cart_context";

const DarkBackground = () => {
	const { openSideFilter, closeSideFilter, isSideFilterOpen } =
		useCartContext();
	return (
		<div
			className='DarkbackgroundForSidebar'
			onClick={isSideFilterOpen ? closeSideFilter : openSideFilter}></div>
	);
};

export default DarkBackground;
