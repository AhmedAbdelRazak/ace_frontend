/** @format */

import React from "react";

const DarkBG = ({ collapsed, setCollapsed }) => {
	return (
		<div
			className='DarkbackgroundForSidebar2'
			onClick={() => {
				setCollapsed(!collapsed);
			}}></div>
	);
};

export default DarkBG;
