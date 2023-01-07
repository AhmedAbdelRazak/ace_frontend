/** @format */

import styled from "styled-components";

const UserHistory = ({ currentPosts }) => {
	return (
		<UserHistoryWrapper className='tableData'>
			<table
				className='table table-bordered table-md-responsive table-hover text-center'
				style={{ fontSize: "0.75rem" }}>
				<thead className='' style={{ background: "lightgrey", color: "black" }}>
					<tr>
						{/* <th scope='col'>Order #</th> */}
						<th scope='col'>Purchase Date</th>
						{/* <th scope='col'>Order #</th> */}
						<th scope='col'>INV #</th>
						<th scope='col'>Status</th>
						<th scope='col'>Name</th>
						<th scope='col'>Phone</th>
						<th scope='col'>Amount</th>

						<th scope='col'>Governorate</th>
						{/* <th scope='col'>City</th> */}
						<th scope='col'>Tracking #</th>
						<th scope='col'>Quantity</th>
					</tr>
				</thead>

				<tbody className='my-auto'>
					{currentPosts &&
						currentPosts.map((s, i) => {
							return (
								<tr key={i} className=''>
									{s.orderCreationDate ? (
										<td style={{ width: "10%" }}>
											{new Date(s.orderCreationDate).toDateString()}{" "}
										</td>
									) : (
										<td style={{ width: "10%" }}>
											{new Date(s.createdAt).toDateString()}{" "}
										</td>
									)}

									<td
										style={{
											width: "10%",
											background:
												s.invoiceNumber === "Not Added" ? "#f4e4e4" : "",
										}}>
										{s.invoiceNumber}
									</td>
									<td
										style={{
											fontWeight: "bold",
											fontSize: "0.9rem",
											width: "8.5%",
											background:
												s.status === "Cancelled"
													? "red"
													: s.status === "In Processing"
													? "#d8ffff"
													: s.status === "Exchange - In Processing"
													? "#d8ebff"
													: s.status === "Delivered" || s.status === "Shipped"
													? "darkgreen"
													: "#ffffd8",
											color:
												s.status === "Delivered" || s.status === "Shipped"
													? "white"
													: s.status === "Cancelled"
													? "white"
													: "black",
										}}>
										{s.status}
									</td>

									<td style={{ width: "11%" }}>{s.customerDetails.fullName}</td>
									<td>{s.customerDetails.phone}</td>
									<td>{Number(s.totalAmountAfterDiscount).toFixed(0)} L.E.</td>

									<td>{s.customerDetails.state}</td>
									{/* <td>{s.customerDetails.cityName}</td> */}

									<td style={{ width: "8%" }}>
										{s.trackingNumber ? s.trackingNumber : "Not Added"}
									</td>
									<td>{s.totalOrderQty}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</UserHistoryWrapper>
	);
};

export default UserHistory;

const UserHistoryWrapper = styled.div`
	margin: 20px 40px;

	.tableData {
		overflow-x: auto;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 50px;
		margin-left: 50px;
		.table > tbody > tr > td {
			vertical-align: middle !important;
		}
		@media (max-width: 1100px) {
			font-size: 0.5rem;
			/* margin-right: 5px;
		margin-left: 5px; */
		}
	}
`;
