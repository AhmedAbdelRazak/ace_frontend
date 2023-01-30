/** @format */

import React from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import Barcode from "react-barcode";
import QrCodeImg from "../../../GeneralImages/qrcode_acesportive.com.png";
import LogoImageReceipt from "../../../GeneralImages/ReceiptLogo.png";

const ReceiptPDF = ({
	chosenProductWithVariables,
	invoiceNumber,
	orderCreationDate,
	discountAmount,
	totalAmountAfterDiscount,
	totalAmount,
	paymentStatus,
	employeeData,
	allColors,
}) => {
	const selectedDateOrdersSKUsModified = () => {
		const modifiedArray =
			chosenProductWithVariables &&
			chosenProductWithVariables.map((iii) => {
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
			});

		return modifiedArray;
	};

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
	selectedDateOrdersSKUsModified() &&
		selectedDateOrdersSKUsModified().reduce(function (res, value) {
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
	// const exportPDF = () => {
	// 	const input = document.getElementById("content");
	// 	html2canvas(input, {
	// 		logging: true,
	// 		letterRendering: 1,
	// 		useCORS: true,
	// 	}).then((canvas) => {
	// 		const imgWidth = 945;
	// 		const imgHeight = 2008;
	// 		const imgDate = canvas.toDataURL("img/png");
	// 		const pdf = new jsPDF("p", "px", [945, 2008]);
	// 		pdf.addImage(imgDate, "PNG", 0, 0, imgWidth, imgHeight);
	// 		pdf.save("invoice");
	// 	});
	// };

	const exportPDF = () => {
		var pdf = new jsPDF("p", "px", [945, 3100]);
		const input = document.getElementById("content");

		pdf.canvas.height = 3100;
		pdf.canvas.width = 945;

		pdf.html(input, {
			callback: function (doc) {
				// const canvas = document.getElementById("barcode");
				// const jpegUrl = doc.toDataURL("image/jpeg");

				doc.save("output.pdf");
			},
			// x: 10,
			// y: 10,
		});
	};

	return (
		<>
			<div style={{ textAlign: "center", margin: "15px 0px" }}>
				<Link
					className='btn btn-primary text-center'
					// onClick={() => exportPDF()}
					onClick={exportPDF}
					to='#'>
					Print Receipt
				</Link>
			</div>
			<ReceiptPDFWrapper id='content'>
				<div className='container'>
					<div className='receiptWrapper'>
						<div
							className='col-2 mx-auto text-center'
							// style={{ border: "1px darkgrey solid" }}
						>
							<img
								src={LogoImageReceipt}
								alt='logo'
								style={{
									width: "200%",
									// border: "1px black solid",
									padding: "0px",
								}}
							/>
						</div>
						<div
							className='my-5'
							style={{
								fontSize: "34px",
								fontWeight: "bolder",
								textAlign: "center",
							}}>
							<div>ACE SPORT</div>
							<div>Phone: +201220756485</div>
							<div>Email: acefitmenace@gmail.com</div>
							<div>www.acesportive.com</div>
						</div>

						<div className='col-8 mx-auto my-3'>
							<hr style={{ borderBottom: "grey 1px solid" }} />
						</div>

						<div
							className='col-12 my-5'
							style={{ fontWeight: "bolder", fontSize: "34px" }}>
							SALES RECEIPT
							<div className='p-0 m-0 text-center' id='barcode'>
								<Barcode value={invoiceNumber} renderer={"img"} width={3.5} />
							</div>
						</div>
						<div
							className='row mx-auto text-center my-5'
							style={{ fontSize: "26px", fontWeight: "bolder" }}>
							<div className='col-6'>Invoice No.: {invoiceNumber}</div>
							<div className='col-6'>
								Order Taker: {employeeData && employeeData.name}{" "}
							</div>
							<div className='col-6'>
								Order Date: {new Date(orderCreationDate).toDateString()}{" "}
							</div>
							<div className='col-6'>Store: ACE San Stefano</div>
							<div className='col-6'>
								Payment: {paymentStatus && paymentStatus.toUpperCase()}{" "}
							</div>
						</div>
						<div className='col-6 mx-auto'>
							<hr style={{ borderBottom: "grey 1px solid" }} />
						</div>

						<table
							className='table my-4 m-0'
							style={{ fontSize: "34px", border: "1px white solid" }}>
							<thead className='' style={{ border: "1px white solid" }}>
								<tr
									style={{
										textTransform: "capitalize",
										textAlign: "center",
										// backgroundColor: "white",
										color: "black",
										border: "1px white solid",
									}}>
									<th scope='col' style={{ border: "1px white solid" }}>
										Description
									</th>
									<th scope='col' style={{ border: "1px white solid" }}>
										Qty
									</th>
									<th scope='col' style={{ border: "1px white solid" }}>
										Price
									</th>
									<th scope='col' style={{ border: "1px white solid" }}>
										Total
									</th>
								</tr>
							</thead>
							<tbody
								className=' m-0'
								style={{
									textTransform: "capitalize",
									fontWeight: "bolder",
									textAlign: "center",
								}}>
								{TopSoldProductsSKUs &&
									TopSoldProductsSKUs.map((s, i) => {
										return (
											<tr key={i} className=''>
												<td
													style={{
														textTransform: "capitalize",
														border: "1px white solid",
													}}>
													{s.productName}
													<br />
													<span
														className=''
														style={{
															textTransform: "capitalize",
														}}>
														Color:{" "}
														{allColors &&
														allColors[
															allColors
																.map((i) => i.hexa)
																.indexOf(s.SubSKUColor)
														]
															? allColors[
																	allColors
																		.map((i) => i.hexa)
																		.indexOf(s.SubSKUColor)
															  ].color
															: s.SubSKUColor}
													</span>{" "}
													<span
														style={{
															textTransform: "capitalize",
														}}>
														Size: {s.SubSKUSize}
													</span>
												</td>
												<td
													className='my-auto'
													style={{ border: "1px white solid" }}>
													{s.OrderedQty}
												</td>

												<td
													className='my-auto'
													style={{ border: "1px white solid" }}>
													{Number(s.unitPrice).toFixed(2)}
												</td>
												<td
													className='my-auto'
													style={{ border: "1px white solid" }}>
													{Number(s.totalPaidAmount).toFixed(2)}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<div>
							<hr />
						</div>
						<div
							className='mb-2'
							style={{
								fontSize: "34px",
								textAlign: "center",
								fontWeight: "bolder",
							}}>
							<div className='row'>
								<div className='col-6'>SUBTOTAL</div>
								<div className='col-6'>
									{Number(totalAmount).toFixed(2)}{" "}
									<span style={{ fontSize: "20px" }}>EGP</span>
								</div>
							</div>

							<div className='row'>
								<div className='col-6'>DISCOUNT</div>
								<div className='col-6'>
									{Number(discountAmount).toFixed(2)}{" "}
									<span style={{ fontSize: "20px" }}>EGP</span>
								</div>
							</div>

							<div className='row'>
								<div className='col-6'>COUPON</div>
								<div className='col-6'>
									0.00 <span style={{ fontSize: "20px" }}>EGP</span>
								</div>
							</div>

							<div className='row'>
								<div
									className='col-5 mt-4'
									style={{
										fontSize: "34px",
										fontWeight: "bold",
										color: "black",
									}}>
									TOTAL
								</div>
								<div
									className='col-7 mt-4'
									style={{
										fontSize: "34px",
										fontWeight: "bold",
										color: "black",
									}}>
									{Number(totalAmountAfterDiscount).toFixed(2)}{" "}
									<span style={{ fontSize: "20px" }}>EGP</span>
								</div>
							</div>
						</div>
						<div>
							<hr />
						</div>
						{/* <div className='row' style={{ marginBottom: "100px" }}>
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
				</div> */}

						<div
							style={{
								fontSize: "34px",
								fontWeight: "bolder",
								textAlign: "center",
								marginTop: "50px",
							}}>
							WE Appreciate Your Visit...
							<br />
							www.acesportive.com
							<br />
							<br />
							<img src={QrCodeImg} alt='ACE' width='60%' />
						</div>
					</div>
				</div>
			</ReceiptPDFWrapper>
		</>
	);
};

export default ReceiptPDF;

const ReceiptPDFWrapper = styled.div`
	width: 925px !important;
	height: 3100px !important;

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
