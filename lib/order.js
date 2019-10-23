'use strict';

const DataMaker = require('./dataMaker');

class Order {
	constructor({
		environment,
		apiKey,
		apiToken,
		seller = '1',
		sc = 1,
		currencyCode = 'ARS'
	} = {}) {
		this.sc = sc;
		this.apiKey = apiKey;
		this.apiToken = apiToken;
		this.environment = environment;
		this.currencyCode = currencyCode;
		this.baseUrl = `https://${environment}.vtexpayments.com.br/api/pvt/transactions`;
		this.createUrl = `https://${environment}.vtexcommercestable.com.br/api/checkout/pub/orders?sc=${sc}`;

		this.currentOrder = null;
		this.initialData = null;

		this.dataMaker = new DataMaker({ seller });

		this.valitateParams();
	}


	/**
	 * Get current TransactionId in Order Created cached
	 */
	get transactionId() {
		if(this.currentOrder)
			return this.currentOrder.transactionData.merchantTransactions[0].transactionId;

		return null;
	}


	valitateParams() {
		const requireProps = ['environment', 'apiKey', 'apiToken'];

		requireProps.forEach(key => {
			if(!this[key])
				throw new Error(`${key} not defined, please pass ${key} in instance`);
		});
	}


	makeUrl(transactionId, urlModifier = '') {
		const id = transactionId || this.transactionId;

		if(!id)
			throw new Error('transactionId not exist');

		return `${this.baseUrl}/${id}${urlModifier}`;
	}


	async call(url, options) {
		const headers = {
			'Content-Type': 'application/json',
			'X-VTEX-API-AppKey': this.apiKey,
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
	 * @param {Object} initialData
	 */
	async create(data) {
		try {
			const order = this.dataMaker.makeOrder(data);

			const response = await this.call(this.createUrl, { body: JSON.stringify(order), method: 'PUT' });

			// save data passed
			this.initialData = data;

			// save order created
			this.currentOrder = response;

			return response;
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

		const dataOrder = data || this.dataMaker.makePayments(this.initialData);

		const paymenData = [
			{
				transaction: {
					id: transactionId || this.transactionId,
					merchantName: this.environment
				},
				installments: 1,
				installmentsInterestRate: 0,
				currencyCode: this.currencyCode,
				...dataOrder
			}
		];

		try {
			await this.call(url, { body: JSON.stringify(paymenData), method: 'POST' });
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
			await this.call(url, { body: JSON.stringify(data), method: 'POST' });
		} catch(error) {
			throw error;
		}
	}


	/**
	 * @method clearOrder
	 * @description Clear order created cached and data initial passed
	 */
	clearOrder() {
		this.currentOrder = null;
		this.initialData = null;
	}
}

module.exports = Order;
