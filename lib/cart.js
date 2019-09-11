'use strict';

class Cart {

	constructor({ environment }) {
		this.environment = environment;
		this.urlBase = `https://${environment}.myvtex.com`;
		this.sc = 1;
		this.urlPath = '/api/checkout/pub/orderForm';
		this.cart = null;
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


	makeUrl(urlModifier = '') {
		const base = `${this.urlBase}${this.urlPath}`;
		return `${base}${this.cartId ? `/${this.cartId}` : ''}${urlModifier}?sc=${this.sc}`;
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

		if(typeof items !== 'object')
			throw new Error('Only accepts object or array with objects');

		if(Array.isArray(items)) {
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
	 * @method getOrder
	 * @description Get a current order or get a new order
	 * @param {number|string} cartId
	 */
	async getCart(cartId) {
		const id = cartId || this.cartId;
		const base = `${this.urlBase}${this.urlPath}`;
		const url = `${base}${id ? `/${id}` : ''}?sc=${this.sc}`;

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
}

module.exports = Cart;
