import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT
} from '../actions';

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		const tempItem = state.cart.find((item) => item.id === id + color);
		if (tempItem) {
			const newCart = state.cart.map((cartItem) => {
				if (cartItem.id === id + color) {
					let newAmount = cartItem.amount + amount;
					if (newAmount > cartItem.max) newAmount = cartItem.max;
					return { ...cartItem, amount: newAmount };
				}
				return cartItem;
			});
			return { ...state, cart: newCart };
		} else {
			const newItem = {
				id: id + color,
				name: product.name,
				image: product.images[0].url,
				price: product.price,
				max: product.stock,
				color,
				amount
			};
			return {
				...state,
				cart: [...state.cart, newItem]
			};
		}
	}
	if (action.type === REMOVE_CART_ITEM) {
		return {
			...state,
			cart: state.cart.filter((item) => item.id !== action.payload)
		};
	}
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				let newAmount = item.amount;
				if (value === 'inc') {
					newAmount = item.amount + 1;
					if (newAmount > item.max) {
						newAmount = item.max;
					}
				} else if (value === 'dec') {
					newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
				}
				return { ...item, amount: newAmount };
			}
			return item;
		});

		return { ...state, cart: tempCart };
	}
	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, item) => {
				return {
					total_items: total.total_items + item.amount,
					total_amount: total.total_amount + item.amount * item.price
				};
			},
			{ total_items: 0, total_amount: 0 }
		);
		return { ...state, total_amount, total_items };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
