'use strict';

class Cart {

	constructor({ environment }) {
		this.environment = environment;
		this.urlBase = `https://${environment}.myvtex.com`;
		this.sc = 1;
		this.urlPath = '/api/checkout/pub/orderForm';
		this.cart = null;
	}

	get itemsTypeError() {
		return 'Only accepts object or array with objects';
	}

	get expectedOrderFormSections() {
		return {
			expectedOrderFormSections: [
				'items',
				'totalizers',
				'clientProfileData',
				'shippingData',
				'paymentData',
				'sellers',
				'messages',
				'marketingData',
				'clientPreferencesData',
				'storePreferencesData',
				'giftRegistryData',
				'ratesAndBenefitsData',
				'openTextField',
				'commercialConditionData',
				'customData'
			]
		};
	}

	// Get orderId fro current instance order
	get cartId() {
		return this.cart && this.cart.orderFormId;
	}


	makeUrl(urlModifier = '', cartId) {
		const id = cartId || this.cartId;
		const base = `${this.urlBase}${this.urlPath}`;
		return `${base}${id ? `/${id}` : ''}${urlModifier}?sc=${this.sc}`;
	}


	async call(url, options) {
		const headers = {
			'Content-Type': 'application/json'
		};

		const res = await fetch(url, { ...options, headers });

		if(!res.ok)
			throw await res.json();

		return res.json();
	}


	makeItemsArray(items) {
		const orderItems = [];

		if(!(items instanceof Object))
			throw new Error(this.itemsTypeError);

		if(Array.isArray(items)) {

			if(!items.every(item => item instanceof Object && !Array.isArray(item)))
				throw new Error(this.itemsTypeError);

			return items.map(item => {
				return {
					...item,
					seller: '1'
				};
			});
		}

		orderItems.push({ ...items, seller: '1' });

		return orderItems;
	}


	/**
	 * @method getCart
	 * @description Get an existing cart or create a new one
	 * @param {string} cartId
	 * @example
	 *
	 * const cart = await CartInstance.getCart(); // create cart
	 * const cart = await CartInstance.getCart('asd654ad654asd564asd'); // get an existing cart
	 *
	 */
	async getCart(cartId) {
		const url = this.makeUrl('', cartId);

		try {
			const response = await this.call(url, { method: 'POST' });

			this.cart = response;

			return response;
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method addItem
	 * @description Function for add a new item or items to current order
	 * @param {array|object} items Object or Array of Objects
	 * @returns {<Promise>}
	 * @example
	 *
	 * 	const cart = await CartInstance.addItems({
	 * 		id: 45,
	 * 		quantity: 2
	 * });
	 *
	 * const cart = await CartInstance.addItems([{
	 * 		id: 45,
	 * 		quantity: 2
	 * },{
	 * 		id: 45,
	 * 		quantity: 2
	 * }]);
	 *
	*/
	async addItems(items) {
		const url = this.makeUrl('/items');

		try {

			const orderItems = this.makeItemsArray(items);

			const body = JSON.stringify({
				orderItems,
				...this.expectedOrderFormSections
			});

			const response = await this.call(url, { method: 'POST', body });

			this.cart = response;

			return response;
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method updateItems
	 * @description Helper for update item in multiple forms
	 * @param {number|string} id
	 * @param {Object} itemChanges
	 * @returns {<Promise>}
	 */
	updateItems(items) {
		const orderItems = items.map(item => {
			const index = this.cart.items.findIndex(itm => parseInt(itm.id, 10) === parseInt(item.id, 10));

			return {
				index,
				hasBundleItems: false,
				...item
			};
		});

		const url = this.makeUrl('/items/update');

		const body = JSON.stringify({
			orderItems,
			noSplitItem: true,
			...this.expectedOrderFormSections
		});

		return this.call(url, { method: 'POST', body });
	}


	/**
	 * @method changeItemQuantity
	 * @description Function for change the quantity to item into the current orderForm
	 * @param {number|string} id
	 * @param {number|string} quantity
	 * @returns {<Promise>}
	 * @example
	 *
	 * 	const cart = await CartInstance.changeItemsQuantity({
	 * 		id: 45,
	 * 		quantity: 2
	 * });
	 *
	 * const cart = await CartInstance.changeItemsQuantity([{
	 * 		id: 45,
	 * 		quantity: 5
	 * },{
	 * 		id: 45,
	 * 		quantity: 8
	 * }]);
	 *
	 */
	async changeItemsQuantity(items) {
		try {
			const orderItems = this.makeItemsArray(items);

			const response = await this.updateItems(orderItems);

			this.cart = response;

			return response;
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method removeItems
	 * @description Function for remove items
	 * @param {number|string} id
	 * @param {number|string} quantity
	 * @returns {<Promise>}
	 * @example
	 *
	 * 	const cart = await CartInstance.removeItems({
	 * 		id: 44
	 * });
	 *
	 * const cart = await CartInstance.removeItems([{
	 * 		id: 45
	 * },{
	 * 		id: 46
	 * }]);
	 *
	 */
	async removeItems(items) {
		try {
			const itemsMaked = this.makeItemsArray(items);

			const orderItems = itemsMaked.map(item => {
				return {
					...item,
					quantity: 0
				};
			});

			const response = await this.updateItems(orderItems);

			this.cart = response;

			return response;
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method removeAllItems
	 * @description Function for remove all items
	 * @param {number|string} id
	 * @param {number|string} quantity
	 * @returns {<Promise>}
	 * @example
	 *
	 * 	const cart = await CartInstance.removeAllItems();
	 *
	 */
	async removeAllItems() {
		try {
			const items = this.cart.items.map(item => ({ id: item.id }));

			const response = await this.removeItems(items);

			this.cart = response;

			return response;
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method simulateCart
	 * @description Function for simulate cart
	 * @param {number|string} id
	 * @param {number|string} quantity
	 * @returns {<Promise>}
	 * @example
	 *
	 *  const cartSimulated = await CartInstance.simulateCart({
	 *     id: 17,
	 *     quantity: 2
	 * });
	 *
	 */
	simulateCart(items) {
		const orderItems = this.makeItemsArray(items);

		const data = {
			items: orderItems,
			country: 'ARG'
		};

		const url = `${this.urlBase}${this.urlPath.toLowerCase()}s/simulation`;

		this.call(url, { method: 'POST', body: JSON.stringify(data) });
	}

	// clear current cart data
	clearCart() {
		this.cart = null;
	}
}

module.exports = Cart;
