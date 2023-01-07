/** @format */

import React from "react";
import { useCartContext } from "../Checkout/cart_context";

const DarkBackground2 = () => {
	const { openSidebar2, closeSidebar2, isSidebarOpen2 } = useCartContext();
	return (
		<div
			className='DarkbackgroundForSidebar2'
			onClick={isSidebarOpen2 ? closeSidebar2 : openSidebar2}></div>
	);
};

export default DarkBackground2;
