/** @format */

import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const OrderedItems = ({
	chosenProductWithVariables,
	chosenSubSKUs,
	chosenProducts,
	setChosenProductWithVariables,
	setChosenProducts,
	allProductsAll,
	allColors,
	allSubSKUs,
	setChosenSubSKUs,
	productsTotalAmount,
}) => {
	return (
		<div
			className='col-md-6'
			style={{ background: "white", padding: "20px 0px" }}>
			<div>
				<div className='row text-center'>
					<div className='col-1'>#</div>
					<div className='col-4'>Name</div>
					<div className='col-4'>Quantity</div>
					<div className='col-3'>Unit Price</div>
				</div>
				{chosenSubSKUs &&
					chosenSubSKUs.length > 0 &&
					chosenProducts &&
					chosenProducts.length > 0 &&
					allSubSKUs.length > 0 &&
					chosenProductWithVariables.length > 0 &&
					allProductsAll.length > 0 && (
						<>
							{chosenProductWithVariables &&
								chosenProductWithVariables.map((p, i) => {
									const allSizes =
										allProductsAll &&
										allProductsAll
											.filter((product) => product._id === p.productId)[0]
											.productAttributes.map((iiii) => iiii.size);

									const allProductColors =
										allProductsAll &&
										allProductsAll
											.filter((product) => product._id === p.productId)[0]
											.productAttributes.map((iiii) => iiii.color);

									var mergedSizes = [].concat.apply([], allSizes);
									var mergedColors = [].concat.apply([], allProductColors);

									let uniqueSizes = [
										...new Map(
											mergedSizes.map((item) => [item, item]),
										).values(),
									];

									let uniqueColors = [
										...new Map(
											mergedColors.map((item) => [item, item]),
										).values(),
									];

									return (
										<div
											className='row text-center my-3'
											key={i}
											style={{
												borderBottom: "2px solid lightgrey",
											}}>
											<div className='col-1 mt-1'>{i + 1}</div>
											<div
												className='col-4 my-auto'
												style={{
													textTransform: "uppercase",
													fontSize: "12px",
												}}>
												<div>
													{chosenProducts[i] && chosenProducts[i].productName}
												</div>
												<div>{p.SubSKU}</div>

												<select
													className='py-1 mb-3 mr-2'
													style={{
														textTransform: "uppercase",
														minWidth: "40%",
														border: "lightgrey solid 1px",
													}}
													onChange={(e) => {
														var updatedProduct1 =
															allProductsAll &&
															allProductsAll.filter(
																(product) => product._id === p.productId,
															)[0];
														var updatedProduct2 =
															updatedProduct1.productAttributes.filter(
																(att) =>
																	att.size === p.SubSKUSize &&
																	att.color === e.target.value,
															)[0];

														const index = chosenProductWithVariables.findIndex(
															(object) => {
																return (
																	object.productId === p.productId &&
																	object.SubSKU === p.SubSKU
																);
															},
														);

														if (index !== -1) {
															chosenProductWithVariables[index].SubSKUColor =
																e.target.value;

															chosenProducts[index].color = e.target.value;

															chosenProductWithVariables[index].quantity =
																updatedProduct2.quantity;

															chosenProducts[index].quantity =
																updatedProduct2.quantity;

															chosenProductWithVariables[
																index
															].receivedQuantity =
																updatedProduct2.receivedQuantity
																	? updatedProduct2.receivedQuantity
																	: 0;

															chosenProducts[index].receivedQuantity =
																updatedProduct2.receivedQuantity
																	? updatedProduct2.receivedQuantity
																	: 0;

															chosenProductWithVariables[index].SubSKU =
																updatedProduct2.SubSKU;

															chosenProducts[index].SubSKU =
																updatedProduct2.SubSKU;

															// chosenSubSKUs[index] = updatedProduct2.SubSKU;

															setChosenProductWithVariables([
																...chosenProductWithVariables,
															]);
															setChosenProducts([...chosenProducts]);
															// setChosenSubSKUs([...chosenSubSKUs]);
														}
													}}>
													<option style={{ textTransform: "capitalize" }}>
														{allColors[
															allColors
																.map((i) => i.hexa)
																.indexOf(p.SubSKUColor)
														]
															? allColors[
																	allColors
																		.map((i) => i.hexa)
																		.indexOf(p.SubSKUColor)
															  ].color
															: p.SubSKUColor}
													</option>

													{uniqueColors &&
														uniqueColors.map((cc, iii) => {
															return (
																<option key={iii} value={cc}>
																	{allColors[
																		allColors.map((i) => i.hexa).indexOf(cc)
																	]
																		? allColors[
																				allColors.map((i) => i.hexa).indexOf(cc)
																		  ].color
																		: cc}
																</option>
															);
														})}
												</select>
												<select
													className='py-1 mb-3'
													style={{
														textTransform: "uppercase",
														minWidth: "40%",
														border: "lightgrey solid 1px",
													}}
													onChange={(e) => {
														var updatedProduct1 =
															allProductsAll &&
															allProductsAll.filter(
																(product) => product._id === p.productId,
															)[0];
														var updatedProduct2 =
															updatedProduct1.productAttributes.filter(
																(att) =>
																	att.color.toLowerCase() ===
																		p.SubSKUColor.toLowerCase() &&
																	att.size.toLowerCase() ===
																		e.target.value.toLowerCase(),
															)[0];

														const index = chosenProductWithVariables.findIndex(
															(object) => {
																return (
																	object.productId === p.productId &&
																	object.SubSKU.toLowerCase() ===
																		p.SubSKU.toLowerCase()
																);
															},
														);

														if (index !== -1) {
															chosenProductWithVariables[index].SubSKUSize =
																e.target.value;

															chosenProducts[index].size = e.target.value;

															chosenProductWithVariables[index].quantity =
																updatedProduct2.quantity;

															chosenProducts[index].quantity =
																updatedProduct2.quantity;

															chosenProductWithVariables[
																index
															].receivedQuantity =
																updatedProduct2.receivedQuantity;

															chosenProducts[index].receivedQuantity =
																updatedProduct2.receivedQuantity;

															chosenProductWithVariables[index].SubSKU =
																updatedProduct2.SubSKU;

															chosenProducts[index].SubSKU =
																updatedProduct2.SubSKU;

															// chosenSubSKUs[index] = updatedProduct2.SubSKU;

															setChosenProductWithVariables([
																...chosenProductWithVariables,
															]);
															setChosenProducts([...chosenProducts]);
															// setChosenSubSKUs([...chosenSubSKUs]);
														}
													}}>
													<option style={{ textTransform: "capitalize" }}>
														{p.SubSKUSize}
													</option>

													{uniqueSizes &&
														uniqueSizes.map((ss, iii) => {
															return (
																<option key={iii} value={ss}>
																	{ss}
																</option>
															);
														})}
												</select>
											</div>
											<div className='col-4 mt-1'>
												<button
													style={{
														border: "lightgrey solid 1px",
														backgroundColor: "white",
														color: "darkgrey",
														padding: "4px",
													}}
													type='button'
													className='amount-btn'
													onClick={() => {
														const index = chosenProductWithVariables.findIndex(
															(object) => {
																return (
																	object.productId === p.productId &&
																	object.SubSKU === p.SubSKU
																);
															},
														);

														if (index !== -1) {
															chosenProductWithVariables[index].OrderedQty -= 1;

															setChosenProductWithVariables([
																...chosenProductWithVariables,
															]);
														}
													}}>
													<FaMinus />
												</button>
												<span
													className='amount'
													style={{
														border: "lightgrey solid 1px",
														backgroundColor: "white",
														color: "black",
														padding: "6px 5px",
													}}>
													{p.OrderedQty}
												</span>
												<button
													style={{
														border: "lightgrey solid 1px",
														backgroundColor: "white",
														color: "darkgrey",
														padding: "4px",
													}}
													type='button'
													className='amount-btn'
													onClick={() => {
														const index = chosenProductWithVariables.findIndex(
															(object) => {
																return (
																	object.productId === p.productId &&
																	object.SubSKU === p.SubSKU
																);
															},
														);

														if (index !== -1) {
															chosenProductWithVariables[index].OrderedQty += 1;

															setChosenProductWithVariables([
																...chosenProductWithVariables,
															]);
														}
													}}>
													<FaPlus />
												</button>
												<div style={{ fontSize: "12px" }}>
													<strong>Current Active Stock In Ace Store:</strong>{" "}
													{chosenProducts &&
													chosenProducts[i] &&
													chosenProducts[i].receivedQuantity
														? chosenProducts[i].receivedQuantity
														: 0}{" "}
													Items{" "}
													{chosenProducts &&
													chosenProducts[i] &&
													chosenProducts[i].receivedQuantity < p.OrderedQty ? (
														<strong
															style={{
																color: "red",
																fontSize: "12px",
															}}>
															(No Enough Stock)
														</strong>
													) : null}
													<div
														style={{
															fontSize: "12px",
														}}>
														<strong>Quantity Onhand (G&Q Hub):</strong>{" "}
														{chosenProducts[i] && chosenProducts[i].quantity
															? chosenProducts[i].quantity
															: 0}{" "}
														Items
													</div>
												</div>
											</div>
											<div className='col-3 mt-1'>
												{Number(p.pickedPrice).toFixed(2)} EGP
												<br />
												{Number(
													Number(p.pickedPrice) * Number(p.OrderedQty),
												).toFixed(2)}{" "}
												EGP
											</div>
										</div>
									);
								})}
						</>
					)}
			</div>
		</div>
	);
};

export default OrderedItems;
