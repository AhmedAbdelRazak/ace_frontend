/** @format */

import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	SIDEBAR_OPEN2,
	SIDEBAR_CLOSE2,
	SHIPPING_FEES,
	SHIPPING_DETAILS,
	CHANGE_COLOR,
	CHANGE_SIZE,
	SIDEFILTERS_OPEN,
	SIDEFILTERS_CLOSE,
} from "../actions";

const cart_reducer = (state, action) => {
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen: true };
	}
	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen: false };
	}

	if (action.type === SIDEBAR_OPEN2) {
		return { ...state, isSidebarOpen2: true };
	}
	if (action.type === SIDEBAR_CLOSE2) {
		return { ...state, isSidebarOpen2: false };
	}

	if (action.type === SIDEFILTERS_OPEN) {
		return { ...state, isSideFilterOpen: true };
	}
	if (action.type === SIDEFILTERS_CLOSE) {
		return { ...state, isSideFilterOpen: false };
	}

	if (action.type === ADD_TO_CART) {
		const {
			id,
			// eslint-disable-next-line
			color,
			amount,
			product,
			chosenProductAttributes,
		} = action.payload;

		const tempItem = state.cart.find(
			(i) =>
				i.id === id &&
				chosenProductAttributes.SubSKU === i.chosenProductAttributes.SubSKU,
		);
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				if (
					cartItem.id === id &&
					chosenProductAttributes.SubSKU ===
						cartItem.chosenProductAttributes.SubSKU
				) {
					let newAmount = cartItem.amount + amount;
					if (newAmount > cartItem.max) {
						newAmount = cartItem.max;
					}
					return { ...cartItem, amount: newAmount };
				} else {
					return cartItem;
				}
			});

			return { ...state, cart: tempCart };
		} else {
			const newItem = {
				id: id,
				_id: product._id,
				name: product.productName,
				nameArabic: product.productName_Arabic,
				color:
					chosenProductAttributes && chosenProductAttributes.SubSKUColor
						? chosenProductAttributes.SubSKUColor
						: product.productAttributes.map((i) => i.color)[0],
				size:
					chosenProductAttributes && chosenProductAttributes.SubSKUSize
						? chosenProductAttributes.SubSKUSize
						: product.productAttributes.map((i) => i.size)[0],
				amount,
				image: chosenProductAttributes.productSubSKUImage
					? chosenProductAttributes.productSubSKUImage
					: product.thumbnailImage[0].images[0].url,
				price: product.productAttributes.map((i) => i.price)[0],
				priceAfterDiscount: product.productAttributes.map(
					(i) => i.priceAfterDiscount,
				)[0],
				max: chosenProductAttributes.quantity,
				loyaltyPoints: product.loyaltyPoints,
				slug: product.slug,
				categorySlug: product.category.categorySlug,
				categoryName: product.category.categoryName,
				categoryNameArabic: product.category.categoryName_Arabic,
				relatedProducts: product.relatedProducts,
				allProductDetailsIncluded: product,
				chosenProductAttributes: chosenProductAttributes,
			};
			return { ...state, cart: [...state.cart, newItem] };
		}
	}
	if (action.type === REMOVE_CART_ITEM) {
		const tempCart = state.cart.filter(
			(item) =>
				// item.id !== action.payload.id &&
				item.size.toLowerCase() + " " + item.color.toLowerCase() !==
				action.payload.size.toLowerCase() +
					" " +
					action.payload.color.toLowerCase(),
		);
		return { ...state, cart: tempCart };
	}
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value, chosenAttribute, newMax } = action.payload;

		const tempCart = state.cart.map((item) => {
			if (
				item.id === id &&
				chosenAttribute.SubSKU === item.chosenProductAttributes.SubSKU
			) {
				if (value === "inc") {
					let newAmount = item.amount + 1;
					if (newAmount > newMax) {
						newAmount = newMax;
					}
					return { ...item, amount: newAmount };
				}
				if (value === "dec") {
					let newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return {
						...item,
						amount: newAmount,
						chosenProductAttributes: chosenAttribute,
					};
				}
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}

	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value, chosenAttribute, newMax } = action.payload;

		const tempCart = state.cart.map((item) => {
			if (
				item.id === id &&
				chosenAttribute.SubSKU === item.chosenProductAttributes.SubSKU
			) {
				if (value === "inc") {
					let newAmount = item.amount + 1;
					if (newAmount > newMax) {
						newAmount = newMax;
					}
					return { ...item, amount: newAmount };
				}
				if (value === "dec") {
					let newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return {
						...item,
						amount: newAmount,
						chosenProductAttributes: chosenAttribute,
						max: newMax,
					};
				}
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}

	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { amount, priceAfterDiscount } = cartItem;

				total.total_items += amount;
				total.total_amount += priceAfterDiscount * amount;
				return total;
			},
			{
				total_items: 0,
				total_amount: 0,
			},
		);
		return { ...state, total_items, total_amount };
	}

	if (action.type === SHIPPING_FEES) {
		const { ShippingPrice } = action.payload;
		return { ...state, shipping_fee: ShippingPrice };
	}

	if (action.type === SHIPPING_DETAILS) {
		const { chosenShipmentDetails } = action.payload;
		return { ...state, shipmentChosen: chosenShipmentDetails };
	}

	if (action.type === CHANGE_COLOR) {
		const { id, color, size, chosenColorImage, quantity, prevColor } =
			action.payload;
		const tempCart = state.cart.map((item) => {
			const chosenAttribute =
				item.allProductDetailsIncluded.productAttributes.filter(
					(i) => i.color === color && i.size === size,
				)[0];

			if (item.id === id && item.size === size && item.color === prevColor) {
				let newColor = color;
				return {
					...item,
					image: chosenColorImage ? chosenColorImage : item.image,
					max: quantity,
					color: newColor,
					chosenProductAttributes: chosenAttribute,
				};
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}

	if (action.type === CHANGE_SIZE) {
		const { id, size, color, quantity, prevSize } = action.payload;
		const tempCart = state.cart.map((item) => {
			const chosenAttribute =
				item.allProductDetailsIncluded.productAttributes.filter(
					(i) => i.color === color && i.size === size,
				)[0];

			if (item.id === id && item.color === color && item.size === prevSize) {
				let newSize = size;
				return {
					...item,
					size: newSize,
					max: quantity,
					chosenProductAttributes: chosenAttribute,
				};
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
