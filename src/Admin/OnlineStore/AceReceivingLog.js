/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminMenu from "../AdminMenu/AdminMenu";
import DarkBG from "../AdminMenu/DarkBG";
import { getReceivingLogs } from "../apiAdmin";
import ReactExport from "react-export-excel";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AceReceivingLog = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allReceivings, setAllReceivings] = useState([]);
	const [excelDataSet, setExcelDataSet] = useState([]);

	const gettingAllReceivings = () => {
		getReceivingLogs().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllReceivings(
					data.filter((i) => i.receivingCase.toLowerCase() !== "outbound"),
				);
				setExcelDataSet(
					data.filter((i) => i.receivingCase.toLowerCase() !== "outbound"),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllReceivings();
	}, []);

	const adjustedReceivingLog =
		excelDataSet &&
		excelDataSet.map((i) => {
			return {
				...i,
				employeeName: i.receivedByEmployee.name,
			};
		});

	const DownloadExcel = () => {
		return (
			<ExcelFile
				filename={`Ace_Receiving_ ${new Date().toLocaleString("en-US", {
					timeZone: "Africa/Cairo",
				})}`}
				element={
					<Link
						className='btn btn-danger mr-5 ml-2'
						// onClick={() => exportPDF()}
						to='#'>
						Download Report (Excel)
					</Link>
				}>
				<ExcelSheet data={adjustedReceivingLog} name='Ace_Receiving_Report'>
					<ExcelColumn label='Product Name' value='productName' />
					<ExcelColumn label='SKU' value='receivedSKU' />
					<ExcelColumn label='Quantity' value='receivedQuantity' />
					<ExcelColumn label='Received By' value='employeeName' />
					<ExcelColumn label='Branch' value='storeBranch' />
					<ExcelColumn label='Receiving Date' value='createdAt' />
					<ExcelColumn label='Case' value='receivingCase' />
				</ExcelSheet>
			</ExcelFile>
		);
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, [window.location.pathname]);

	return (
		<AceReceivingLogWrapper>
			{!collapsed ? (
				<DarkBG collapsed={collapsed} setCollapsed={setCollapsed} />
			) : null}
			<div className='grid-container'>
				<div className=''>
					<AdminMenu
						fromPage='AceReceivingLog'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='mainContent'>
					<div
						className='col-6 mx-auto mt-5'
						style={{
							fontWeight: "bold",
							textTransform: "uppercase",
							fontSize: "1.2rem",
						}}>
						Ace Store Receiving Log
					</div>
					<div className='col-7 mx-auto'>
						<hr style={{ borderBottom: "1px lightgrey solid" }} />
					</div>

					<div className='col-8 mt-5 mx-auto'>
						<div className='mb-4'>{DownloadExcel()}</div>

						<table
							className='table table-bordered table-md-responsive table-hover'
							style={{ fontSize: "0.75rem", overflowX: "auto" }}>
							<thead className=''>
								<tr
									style={{
										fontSize: "0.75rem",
										textTransform: "capitalize",
										textAlign: "center",
										backgroundColor: "#009ef7",
										color: "wheat",
									}}>
									<th scope='col'>#</th>
									<th scope='col'>Product Name</th>
									<th scope='col'>Product SKU</th>
									<th scope='col'>Received Qty</th>
									<th scope='col'>Received By</th>
									<th scope='col'>Branch</th>
									<th scope='col'>Receiving Date</th>
									<th scope='col'>Case</th>
								</tr>
							</thead>
							<tbody
								className='my-auto'
								style={{
									fontSize: "0.75rem",
									textTransform: "capitalize",
									fontWeight: "bolder",
								}}>
								{allReceivings &&
									allReceivings.map((s, i) => {
										return (
											<tr key={i} className=''>
												<td className='my-auto'>{i + 1}</td>

												<td>{s.productName}</td>
												<td>{s.receivedSKU}</td>
												<td>{s.receivedQuantity}</td>
												<td>
													{s.receivedByEmployee && s.receivedByEmployee.name}
												</td>
												<td>{s.storeBranch}</td>
												<td>{new Date(s.createdAt).toDateString()}</td>
												<td>{s.receivingCase}</td>

												{/* <td>{Invoice(s)}</td> */}
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AceReceivingLogWrapper>
	);
};

export default AceReceivingLog;

const AceReceivingLogWrapper = styled.div`
	min-height: 880px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "8% 92%" : "15% 85%")};
		margin: auto;
	}

	@media (max-width: 1750px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: ${(props) => (props.show ? "7% 93%" : "18% 82%")};
			margin: auto;
		}
	}

	@media (max-width: 1400px) {
		background: white;

		.grid-container {
			display: grid;
			grid-template-columns: 12% 88%;
			margin: auto;
		}
	}

	@media (max-width: 750px) {
		.grid-container {
			display: grid;
			grid-template-columns: ${(props) => (props.show ? "0% 99%" : "0% 100%")};
			margin: auto;
		}
		h3 {
			margin-top: 60px !important;
		}

		.ant-select {
			width: 100% !important;
		}
	}
`;
