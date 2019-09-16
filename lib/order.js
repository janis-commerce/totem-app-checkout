'use strict';

class Order {
	constructor(environment, apikey, apiToken, sc) {
		this.sc = sc;
		this.apiToken = apikey;
		this.apiToken = apiToken;
		this.environment = environment;
		this.baseUrl = `http://${environment}.vtexpayments.com.br/api/pvt/transactions`;
		this.createUrl = `http://${environment}.vtexcommercestable.com.br/api/checkout/pub/orders?sc=${sc}`;
	}

	makeUrl(transactionId, urlModifier) {
		const id = transactionId || this.transactionId;

		if(!id)
			throw new Error('transactionId not exist');

		return `${this.urlBase}/${id}${urlModifier}`;
	}


	async call(url, options) {
		const headers = {
			'Content-Type': 'application/json',
			'X-VTEX-API-AppKey': this.apikey,
			'X-VTEX-API-AppToken': this.apiToken,
			Accept: 'application/json'
		};

		const res = await fetch(url, { ...options, headers });

		if(!res.ok)
			throw await res.json();

		return res.json();
	}

	/**
	 * @method create
	 * @description Create new Order
	 * @param {Object} data
	 */
	async create(data) {
		try {
			await this.call(this.createUrl, { body: JSON.stringify(data) });
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method sendTransactionPayments
	 * @description Define in order Payment Methods
	 * @param {Object} data
	 * @param {String} transactionId
	 */
	async sendTransactionPayments(data, transactionId) {
		const url = this.makeUrl(transactionId, '/payments');

		try {
			await this.call(url, { body: JSON.stringify(data) });
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method autorizeTransaction
	 * @description Authorize Payment Methods order
	 * @param {String} transactionId
	 */
	async authorizeTransaction(transactionId) {
		const url = this.makeUrl(transactionId, '/authorization-request');

		const data = {
			transactionId: transactionId || this.transactionId,
			softDescriptor: this.environment,
			prepareForRecurrency: false
		};

		try {
			await this.call(url, { body: JSON.stringify(data) });
		} catch(error) {
			throw error;
		}
	}
}

module.exports = Order;
