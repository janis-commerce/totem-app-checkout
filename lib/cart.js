'use strict';

class Cart {

	constructor({
		environment,
		seller = '1',
		sc = 1
	} = {}) {
		this.environment = environment;
		this.urlBase = `https://${environment}.myvtex.com`;
		this.sc = sc;
		this.seller = seller;
		this.urlPath = '/api/checkout/pub/orderForm';
		this.cart = null;

		this.valitateParams();
	}


	static get itemsTypeError() {
		return 'Only accepts object or array with objects';
	}


	static get expectedOrderFormSections() {
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


	valitateParams() {
		if(!this.environment)
			throw new Error('environment not defined, please pass environment in instance');
	}


	makeUrl(urlModifier, cartId) {
		const id = cartId || this.cartId;
		const base = `${this.urlBase}${this.urlPath}`;
		return `${base}${id ? `/${id}` : ''}${urlModifier}?sc=${this.sc}`;
	}


	async call(url, options) {
		const headers = { 'Content-Type': 'application/json' };

		const res = await fetch(url, { ...options, headers });

		if(!res.ok)
			throw await res.json();

		return res.json();
	}


	makeItemsArray(items) {
		const orderItems = [];

		if(!(items instanceof Object && typeof items !== 'function'))
			throw new Error(Cart.itemsTypeError);

		if(Array.isArray(items)) {

			if(!items.every(item => item instanceof Object && typeof item !== 'function' && !Array.isArray(item)))
				throw new Error(Cart.itemsTypeError);

			return items.map(item => {
				return {
					...item,
					seller: this.seller
				};
			});
		}

		orderItems.push({ ...items, seller: this.seller });

		return orderItems;
	}


	/**
	 * @method getCart
	 * @description Get an existing cart or create a new one
	 * @param {string} cartId
	 * @private
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
	 * @method addItems
	 * @description Function for add a new item or items to current order
	 * @param {array|object} items Object or Array of Objects
	 * @param {number} items.id id of sku product.
 	 * @param {number} items.quantity
	 * @returns {Promise}
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
				...Cart.expectedOrderFormSections
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
 	 * @param {array|object} items Object or Array of Objects
	 * @returns {Promise}
	 */
	updateItems(items) {
		if(!this.cart)
			throw new Error('Not exist cart data, please call getCart() for create one');

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
			...Cart.expectedOrderFormSections
		});

		return this.call(url, { method: 'POST', body });
	}


	/**
	 * @method changeItemQuantity
	 * @description Function for change the quantity to item into the current orderForm
 	 * @param {array|object} items Object or Array of Objects
	 * @param {number} items.id id of sku product.
 	 * @param {number} items.quantity
	 * @returns {Promise}
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
 	 * @param {array|object} items Object or Array of Objects
	 * @param {number} items.id id of sku product
	 * @returns {Promise}
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
	 * @returns {Promise}
	 * @example
	 *
	 * 	const cart = await CartInstance.removeAllItems();
	 *
	 */
	async removeAllItems() {
		if(!this.cart)
			throw new Error('Not exist cart data, please call getCart() for create one');

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
	 * @method simulate
	 * @description Function for simulate cart
 	 * @param {array|object} items Object or Array of Objects
	 * @param {number} items.id id of sku product.
 	 * @param {number} items.quantity
	 * @returns {Promise}
	 * @example
	 *
	 * const cartSimulated = await CartInstance.simulate({
	 *     id: 17,
	 *     quantity: 2
	 * });
	 *
	 *  const cartSimulated = await CartInstance.simulate([{
	 *     id: 17,
	 *     quantity: 2
	 * }]);
	 *
	 */
	simulate(items, postalCode) {
		const orderItems = this.makeItemsArray(items);

		const data = {
			items: orderItems,
			postalCode,
			country: 'ARG'
		};

		const url = `${this.urlBase}${this.urlPath.toLowerCase()}s/simulation`;

		return this.call(url, { method: 'POST', body: JSON.stringify(data) });
	}


	/**
	 * @method clearCart
	 * @description Clear cart cached
	 */
	clearCart() {
		this.cart = null;
	}
}

module.exports = Cart;
