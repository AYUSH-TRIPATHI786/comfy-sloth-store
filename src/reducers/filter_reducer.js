import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS
} from '../actions';

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = Math.max(...action.payload.map((p) => p.price));

		return {
			...state,
			all_products: [...action.payload],
			filtered_products: [...action.payload],
			filters: { ...state.filters, maxPrice, price: maxPrice }
		};
	}
	if (action.type === SET_GRIDVIEW) {
		return {
			...state,
			grid_view: true
		};
	}
	if (action.type === SET_LISTVIEW) {
		return {
			...state,
			grid_view: false
		};
	}
	if (action.type === UPDATE_SORT) {
		return {
			...state,
			sortBy: action.payload
		};
	}
	if (action.type === SORT_PRODUCTS) {
		const { sortBy, filtered_products } = state;
		let tempProducts = [...filtered_products];
		if (sortBy === 'price-lowest') {
			tempProducts = tempProducts.sort((p1, p2) => p1.price - p2.price);
		}
		if (sortBy === 'price-highest') {
			tempProducts = tempProducts.sort((p1, p2) => p2.price - p1.price);
		}
		if (sortBy === 'name-a') {
			tempProducts = tempProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
		}
		if (sortBy === 'name-z') {
			tempProducts = tempProducts.sort((p1, p2) => p2.name.localeCompare(p1.name));
		}
		return {
			...state,
			filtered_products: tempProducts
		};
	}
	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload;
		return {
			...state,
			filters: { ...state.filters, [name]: value }
		};
	}
	if (action.type === FILTER_PRODUCTS) {
		const {
			filters: { text, category, company, color, price, shipping },
			all_products
		} = state;
		let tempProducts = [...all_products];
		// filtering
		// search
		if (text) {
			tempProducts = tempProducts.filter((product) =>
				product.name.toLowerCase().startsWith(text)
			);
		}
		// category
		if (category !== 'all') {
			tempProducts = tempProducts.filter(
				(product) => product.category === category
			);
		}
		// company
		if (company !== 'all') {
			tempProducts = tempProducts.filter((product) => product.company === company);
		}
		// color
		if (color !== 'all') {
			tempProducts = tempProducts.filter((product) =>
				product.colors.includes(color)
			);
		}
		// price
		tempProducts = tempProducts.filter((product) => product.price <= price);
		// shipping
		if (shipping) {
			tempProducts = tempProducts.filter((product) => product.shipping === true);
		}
		return {
			...state,
			filtered_products: tempProducts
		};
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.maxPrice,
				shipping: false
			}
		};
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
