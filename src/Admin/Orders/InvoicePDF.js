/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import logoImage from "../../GeneralImages/ace-logo.png";
import Barcode from "react-barcode";
import { isAuthenticated } from "../../auth";
import { getStores, readSingleOrder } from "../apiAdmin";

const InvoicePDF = (props) => {
	//
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const [updateSingleOrder, setUpdateSingleOrder] = useState({});
	// eslint-disable-next-line
	const [allStore, setAllStores] = useState([]);
	const [storeLogo, setStoreLogo] = useState("");

	const { user, token } = isAuthenticated();

	const loadSingleOrder = (orderId) => {
		setLoading(true);
		readSingleOrder(user._id, token, orderId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoading(true);
				getStores(token).then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setAllStores(data2);
						const storeIndex = data2
							.map((i) => i.storeName.toLowerCase())
							.indexOf(data.orderSource.toLowerCase());
						const chosenStore =
							data && storeIndex && storeIndex !== -1 && data2[storeIndex];

						if (data.orderSource === "g&q") {
							setStoreLogo(data2[0].thumbnail[0].url);
						} else {
							setStoreLogo(
								chosenStore &&
									chosenStore.thumbnail &&
									chosenStore.thumbnail[0] &&
									chosenStore.thumbnail[0].url,
							);
						}
					}
				});
				setUpdateSingleOrder(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		const orderId = props.match.params.orderId;
		loadSingleOrder(orderId);
		// eslint-disable-next-line
	}, []);

	const selectedDateOrdersSKUsModified = () => {
		const modifiedArray =
			updateSingleOrder &&
			updateSingleOrder.chosenProductQtyWithVariables &&
			updateSingleOrder.chosenProductQtyWithVariables.map((ii) =>
				ii.map((iii) => {
					return {
						productName: iii.productName,
						OrderedQty: iii.OrderedQty,
						productMainImage: iii.productMainImage,
						SubSKU: iii.SubSKU,
						SubSKUColor: iii.SubSKUColor,
						SubSKUSize: iii.SubSKUSize,
						productSubSKUImage: iii.productSubSKUImage,
						unitPrice: Number(iii.pickedPrice).toFixed(2),
						totalPaidAmount:
							Number(iii.pickedPrice).toFixed(2) *
							Number(iii.OrderedQty).toFixed(2),
					};
				}),
			);

		return modifiedArray;
	};

	var destructingNestedArraySKUs = [];
	selectedDateOrdersSKUsModified() &&
		selectedDateOrdersSKUsModified().map((i) =>
			destructingNestedArraySKUs.push(...i),
		);

	function sortTopOrdersProductsSKUs(a, b) {
		const TotalAppointmentsA = a.totalPaidAmount;
		const TotalAppointmentsB = b.totalPaidAmount;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	var TopSoldProductsSKUs = [];
	destructingNestedArraySKUs &&
		destructingNestedArraySKUs.reduce(function (res, value) {
			if (!res[value.productName + value.SubSKU]) {
				res[value.productName + value.SubSKU] = {
					productName: value.productName,
					productMainImage: value.productMainImage,
					productSubSKUImage: value.productSubSKUImage,
					SubSKU: value.SubSKU,
					SubSKUColor: value.SubSKUColor,
					SubSKUSize: value.SubSKUSize,
					unitPrice: value.unitPrice,
					OrderedQty: 0,
					totalPaidAmount: 0,
				};
				TopSoldProductsSKUs.push(res[value.productName + value.SubSKU]);
			}

			res[value.productName + value.SubSKU].OrderedQty += Number(
				value.OrderedQty,
			);
			res[value.productName + value.SubSKU].totalPaidAmount += Number(
				value.totalPaidAmount,
			);

			return res;
		}, {});

	TopSoldProductsSKUs.sort(sortTopOrdersProductsSKUs);

	// console.log(TopSoldProductsSKUs, "TopSoldProductsSKUs");

	//
	const exportPDF = () => {
		const input = document.getElementById("content");
		html2canvas(input, {
			logging: true,
			letterRendering: 1,
			useCORS: true,
		}).then((canvas) => {
			const imgWidth = 204;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const imgDate = canvas.toDataURL("img/png");
			const pdf = new jsPDF("p", "mm", "a4");
			pdf.addImage(imgDate, "PNG", 0, 0, imgWidth, imgHeight);
			pdf.save("invoice");
		});
	};
	return (
		<InvoicePDFWrapper>
			<div style={{ textAlign: "center" }}>
				<Link
					className='btn btn-primary text-center'
					onClick={() => exportPDF()}
					to='#'>
					Download Invoice (PDF)
				</Link>
			</div>
			<h5
				style={{
					fontWeight: "bold",
					textAlign: "center",
					marginTop: "20px",
				}}>
				<Link to={`/admin/single-order/${updateSingleOrder._id}`}>
					Back to order details...
				</Link>
			</h5>
			<div id='content' className='container'>
				<br />
				<div className='borderTop'></div>
				<div className='row mt-2'>
					<div className='col-3 mx-auto mt-5'>
						<h1 style={{ textTransform: "uppercase" }}>
							{updateSingleOrder.orderSource}
						</h1>
					</div>
					<div className='col-3 mx-auto'>
						<img
							src={storeLogo ? storeLogo : logoImage}
							alt='logo'
							style={{
								width: "50%",
								// border: "1px black solid",
								padding: "0px",
							}}
						/>
					</div>

					<div
						className='col-3 mx-auto mt-3'
						// style={{ border: "1px solid black" }}
					>
						<Barcode value={updateSingleOrder.invoiceNumber} />
					</div>
				</div>
				<br />
				<div style={{ fontSize: "1.1rem" }}>
					<h1 style={{ color: "darkblue" }}>Online Order</h1>
					<div className='row'>
						<div className='col-6'>
							Order Date: <br />
							{new Date(updateSingleOrder.orderCreationDate).toDateString()}
						</div>
						<div className='col-3'>
							Invoice: <br />
							{updateSingleOrder.invoiceNumber}
						</div>
						<div className='col-3'>
							Tracking Number: <br />
							{updateSingleOrder.trackingNumber}
						</div>
					</div>
					<br />
					<div className='row'>
						<div className='col-6'>
							Ship Date: <br />{" "}
							{new Date(updateSingleOrder.updatedAt).toDateString()}
						</div>
						<div className='col-3'>
							Ship Via: <br />{" "}
							{updateSingleOrder.chosenShippingOption &&
								updateSingleOrder.chosenShippingOption[0] &&
								updateSingleOrder.chosenShippingOption[0].carrierName}
						</div>
						<div className='col-3'>
							Terms: <br /> Cash on Delivery
						</div>
					</div>
				</div>
				<br />
				<div>
					<hr />
				</div>
				<div className='row'>
					<div className='col-8'>
						<h5 style={{ fontSize: "1.3rem", fontWeight: "bolder" }}>Vendor</h5>
						<br />
						<div style={{ textTransform: "capitalize", fontSize: "1rem" }}>
							<span style={{ textTransform: "uppercase" }}>
								{updateSingleOrder.orderSource}
							</span>
							<br />
							Egypt
							<br />
							Alexandria
							<br />
							Order Taker:{" "}
							<span style={{ fontWeight: "bold" }}>
								{" "}
								{updateSingleOrder &&
									updateSingleOrder.employeeData &&
									updateSingleOrder.employeeData.name}
							</span>
							<br />
							+(20) 120 854 3945
							<br />
							<span style={{ textTransform: "lowercase" }}>
								gqcanihelpyou@gmail.com
							</span>
						</div>
					</div>
					<div className='col-4'>
						<h5 style={{ fontSize: "1.3rem", fontWeight: "bolder" }}>
							Ship to
						</h5>
						<br />
						<div style={{ textTransform: "capitalize", fontSize: "1rem" }}>
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.fullName}
							<br />
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.state}
							<br />
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.address}
							<br />
							{updateSingleOrder.customerDetails &&
								updateSingleOrder.customerDetails.phone}
						</div>
					</div>
				</div>
				<br />
				<br />
				<table className='table table-md-responsive table-hover'>
					<thead className=''>
						<tr
							style={{
								fontSize: "0.95rem",
								textTransform: "capitalize",
								textAlign: "center",
								backgroundColor: "white",
								color: "darkblue",
							}}>
							<th scope='col'>Item #</th>
							<th scope='col'>Description</th>
							<th scope='col'>Qty</th>
							<th scope='col'>Unit Price</th>
							<th scope='col'>Total Price</th>
						</tr>
					</thead>
					<tbody
						className='my-auto'
						style={{
							fontSize: "0.85rem",
							textTransform: "capitalize",
							fontWeight: "bolder",
							textAlign: "center",
						}}>
						{TopSoldProductsSKUs &&
							TopSoldProductsSKUs.map((s, i) => {
								return (
									<tr key={i} className=''>
										<td className='my-auto'>{s.SubSKU}</td>
										<td style={{ textTransform: "capitalize" }}>
											{s.productName}
										</td>
										<td>{s.OrderedQty}</td>

										<td>{Number(s.unitPrice).toFixed(2)}</td>
										<td>{s.totalPaidAmount}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
				<div>
					<hr />
				</div>
				<div
					className='mb-5'
					style={{ fontSize: "0.95rem", textAlign: "right" }}>
					<div className='row'>
						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>Subtotal</div>
								<div className='col-5'>
									{Number(
										Number(updateSingleOrder.totalAmountAfterDiscount) -
											Number(updateSingleOrder.shippingFees),
									).toFixed(2)}{" "}
									L.E.
								</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>Delivery charge</div>
								<div className='col-5'>
									{Number(updateSingleOrder.shippingFees).toFixed(2)} L.E.
								</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>COD surcharge rate</div>
								<div className='col-5'>1.00 %</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>Cash on delivery surcharge</div>
								<div className='col-5'>
									{Number(
										(Number(updateSingleOrder.totalAmount) -
											Number(updateSingleOrder.shippingFees)) *
											0.01,
									).toFixed(2)}{" "}
									L.E.
								</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'></div>
								<div
									className='col-5 mt-4'
									style={{
										fontSize: "1.35rem",
										fontWeight: "bold",
										color: "#c6007a",
									}}>
									{Number(
										Number(updateSingleOrder.totalAmountAfterDiscount) +
											(Number(updateSingleOrder.totalAmount) -
												Number(updateSingleOrder.shippingFees)) *
												0.01,
									).toFixed(2)}{" "}
									L.E.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<hr />
				</div>
				<div className='row' style={{ marginBottom: "100px" }}>
					<div
						className='col-6'
						style={{ color: "#868686", fontSize: "1.1rem" }}>
						Thank you for shopping at{" "}
						<strong style={{ textTransform: "uppercase" }}>
							{updateSingleOrder.orderSource}
						</strong>
						<br /> To contact us, please call us on our customer service phone
						number 01208543945 <br /> we look forward to welcoming you back
						soon.
					</div>
					<div
						dir='rtl'
						className='col-6'
						style={{
							color: "#868686",
							fontSize: "1.1rem",
							textAlign: "right",
						}}>
						شكرا على تسوقك من{" "}
						<span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
							{updateSingleOrder.orderSource}
						</span>
						<br /> للتواصل معنا ، يرجى الاتصال بنا على هاتف خدمة العملاء رقم
						01208543945 <br /> نتطلع لزیارتك القادمة.
					</div>
					<div className='col-6'></div>
					<div
						dir='rtl'
						className='mt-4 col-6'
						style={{
							color: "#868686",
							fontSize: "1.1rem",
							textAlign: "right",
						}}>
						<div
							style={{
								textDecoration: "underline",
								fontWeight: "bolder",
								color: "black",
							}}
							className='mb-3'>
							سیاسات الاستبدال والاسترجاع :
						</div>
						إذا رغبت بإرجاع طلبك مقابل استرداد المبلغ المدفوع أو استبدالھ
						بمنتجات معینة فإنھ لدیك مھلھ یوم من تاریخ الفاتورة لعمل ذلك. تتطلب
						عملیة الإرجاع ھذه توافر شرطان أساسیان: <br /> 1. إرجاع المنتج بنفس
						الحالة التي تم توصیلھ بھا وبغلافھ الأصلي
						<br /> 2. إحضار الفاتورة الخاصة بالمنتج یرجى العلم بأن المھلة
						الزمنیة ھي بحسب القوانین المعمول بھا داخل بلدك وفي حالات العروض
						ستطبق الشروط الخاصة بالعروض. ولا یتم استرداد كلا من رسوم الشحن ورسوم
						خدمة الدفع عند الاستلام ان وجدت.
					</div>
				</div>
			</div>
		</InvoicePDFWrapper>
	);
};

export default InvoicePDF;

const InvoicePDFWrapper = styled.div`
	margin-top: 40px;

	.borderTop {
		border-top: 10px solid darkblue;
	}
	h1 {
		color: #006eb2;
		font-weight: bold;
	}

	svg {
		height: 120px !important;
		width: 220px !important;
	}

	hr {
		border: darkgrey solid 1px;
	}
`;
