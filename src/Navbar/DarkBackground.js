/** @format */

import React from "react";
import { useCartContext } from "../Checkout/cart_context";

const DarkBackground = () => {
	const { openSidebar, closeSidebar, isSidebarOpen } = useCartContext();
	return (
		<div
			className='DarkbackgroundForSidebar'
			onClick={isSidebarOpen ? closeSidebar : openSidebar}></div>
	);
};

export default DarkBackground;
