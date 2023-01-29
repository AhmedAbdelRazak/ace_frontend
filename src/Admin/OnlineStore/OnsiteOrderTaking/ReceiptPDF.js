/** @format */

import React from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import Barcode from "react-barcode";
import QrCodeImg from "../../../GeneralImages/qrcode_acesportive.com.png";

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
		<ReceiptPDFWrapper>
			<div id='content' className='container'>
				<div
					className='col-2 mx-auto text-center'
					// style={{ border: "1px darkgrey solid" }}
				>
					<img
						src='https://res.cloudinary.com/infiniteapps/image/upload/v1670932538/GQ_B2B/1670932537573.jpg'
						alt='logo'
						style={{
							width: "150%",
							// border: "1px black solid",
							padding: "0px",
						}}
					/>
				</div>
				<div
					className='mx-auto text-center'
					style={{ fontSize: "20px", fontWeight: "bolder" }}>
					<div>ACE SPORT</div>
					<div>Phone: +201220756485</div>
					<div>Email: ACEFITMENACE@GMAIL.com</div>
					<div>www.acesportive.com</div>
				</div>

				<div className='col-8 mx-auto'>
					<hr style={{ borderBottom: "grey 1px solid" }} />
				</div>

				<div
					className='col-12 mx-auto text-center'
					style={{ fontWeight: "bolder" }}>
					SALES RECEIPT
					<div className='p-0 m-0'>
						<Barcode value={invoiceNumber} />
					</div>
				</div>
				<div
					className='row ml-5'
					style={{ fontSize: "20px", fontWeight: "bolder" }}>
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
					className='table mt-2 col-10 mx-auto'
					style={{ fontSize: "19px", border: "1px white solid" }}>
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
								Item #
							</th>
							<th scope='col' style={{ border: "1px white solid" }}>
								Description
							</th>
							<th scope='col' style={{ border: "1px white solid" }}>
								Qty
							</th>
							<th scope='col' style={{ border: "1px white solid" }}>
								Unit Price
							</th>
							<th scope='col' style={{ border: "1px white solid" }}>
								Total Price
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
											style={{ border: "1px white solid" }}
											className='my-auto'>
											{i + 1}
										</td>
										<td
											style={{
												textTransform: "capitalize",
												border: "1px white solid",
											}}>
											{s.SubSKU}
											<br />
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
													allColors.map((i) => i.hexa).indexOf(s.SubSKUColor)
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
											{s.totalPaidAmount}
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
						fontSize: "21px",
						textAlign: "right",
						fontWeight: "bolder",
					}}>
					<div className='row'>
						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>SUBTOTAL</div>
								<div className='col-6'>
									{Number(totalAmount).toFixed(2)} EGP
								</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>DISCOUNT</div>
								<div className='col-6'>
									{Number(discountAmount).toFixed(2)} EGP
								</div>
							</div>
						</div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div className='col-6'>COUPON</div>
								<div className='col-6'>0.00 EGP</div>
							</div>
						</div>

						<div className='col-7'></div>

						<div className='col-7'></div>
						<div className='col-5'>
							<div className='row'>
								<div
									className='col-5 mt-4'
									style={{
										fontSize: "1.2rem",
										fontWeight: "bold",
										color: "black",
									}}>
									TOTAL
								</div>
								<div
									className='col-7 mt-4'
									style={{
										fontSize: "1.2rem",
										fontWeight: "bold",
										color: "black",
									}}>
									{Number(totalAmountAfterDiscount).toFixed(2)} EGP
								</div>
							</div>
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
					dir='rtl'
					className='mb-3 col-12'
					style={{
						color: "black",
						fontSize: "1.1rem",
						textAlign: "right",
						fontWeight: "bolder",
					}}>
					<div
						style={{
							textDecoration: "underline",
							fontWeight: "bolder",
							color: "black",
						}}
						className=''>
						سیاسات الاستبدال والاسترجاع :
					</div>
					إذا رغبت بإرجاع طلبك مقابل استرداد المبلغ المدفوع أو استبدالھ بمنتجات
					معینة فإنھ لدیك مھلھ یوم من تاریخ الفاتورة لعمل ذلك. تتطلب عملیة
					الإرجاع ھذه توافر شرطان أساسیان: <br /> 1. إرجاع المنتج بنفس الحالة
					التي تم توصیلھ بھا وبغلافھ الأصلي
					<br /> 2. إحضار الفاتورة الخاصة بالمنتج یرجى العلم بأن المھلة الزمنیة
					ھي بحسب القوانین المعمول بھا داخل بلدك وفي حالات العروض ستطبق الشروط
					الخاصة بالعروض. ولا یتم استرداد كلا من رسوم الشحن ورسوم خدمة الدفع عند
					الاستلام ان وجدت.
				</div>
				<div style={{ fontSize: "20px", fontWeight: "bolder" }}>
					WE Appreciate Your Visit...
					<br />
					www.acesportive.com
					<br />
					<img src={QrCodeImg} alt='ACE' width={100} />
				</div>
			</div>
			<div style={{ textAlign: "center" }}>
				<Link
					className='btn btn-primary text-center'
					onClick={() => exportPDF()}
					to='#'>
					Print Receipt
				</Link>
			</div>
		</ReceiptPDFWrapper>
	);
};

export default ReceiptPDF;

const ReceiptPDFWrapper = styled.div`
	margin-top: 40px;

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
