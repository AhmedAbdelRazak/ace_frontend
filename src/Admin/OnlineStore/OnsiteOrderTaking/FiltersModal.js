/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// import { toast } from "react-toastify";

const FiltersModal = ({
	modalVisible,
	setModalVisible,
	allCategories,
	allGenders,
	setGenderFilter,
	setCategoryFilter,
}) => {
	const mainForm = () => {
		return (
			<div
				className='mx-auto text-center col-6 p-3 mx-auto'
				style={{ background: "#0e6ac6" }}>
				<div className='px-0 pb-5 '>
					<div className='pt-2 mb-4' style={{ background: "white" }}>
						<span className='ml-2' style={{ fontWeight: "bold" }}>
							GENDER
						</span>
						{allGenders &&
							allGenders.map((g, i) => {
								return (
									<React.Fragment key={i}>
										{" "}
										<div
											className=' w-100 mx-0'
											style={{
												padding: "15px 4px",
												textTransform: "uppercase",
												fontSize: "12px",
												fontWeight: "bold",
												cursor: "pointer",
												textDecoration: "underline",
											}}
											onClick={() => {
												setGenderFilter(g.genderName.toLowerCase());
												setModalVisible(false);
											}}>
											{g.genderName}
										</div>
									</React.Fragment>
								);
							})}
					</div>

					<div style={{ background: "#c60e0e", color: "white" }}>
						<span className='ml-2' style={{ fontWeight: "bold" }}>
							CATEGORIES
						</span>
						<div
							className=' w-100 mx-0'
							style={{
								padding: "15px 4px",
								textTransform: "uppercase",
								fontSize: "12px",
								fontWeight: "bold",
								cursor: "pointer",
								textDecoration: "underline",
							}}
							onClick={() => {
								setCategoryFilter("");
								setModalVisible(false);
							}}>
							All
						</div>

						{allCategories &&
							allCategories.map((c, i) => {
								return (
									<React.Fragment key={i}>
										{" "}
										<div
											className=' w-100 mx-0'
											style={{
												padding: "15px 4px",
												textTransform: "uppercase",
												fontSize: "12px",
												fontWeight: "bold",
												cursor: "pointer",
												textDecoration: "underline",
											}}
											onClick={() => {
												setCategoryFilter(c.categoryName.toLowerCase());
												setModalVisible(false);
											}}>
											{c.categoryName}
										</div>
									</React.Fragment>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<FiltersModalWrapper>
			<Modal
				width='60%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}>{`Product Filters`}</div>
				}
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				// okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}>
				{mainForm()}
			</Modal>
		</FiltersModalWrapper>
	);
};

export default FiltersModal;

const FiltersModalWrapper = styled.div`
	z-index: 18000 !important;
`;
