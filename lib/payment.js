'use strict';

const { MT188CardReader } = require('@janiscommerce/mt188-card-reader');
const Order = require('./order');

const MT188CardReaderInstance = new MT188CardReader();

class Payment {
	constructor({ environment, apiKey, apiToken, slaId } = {}) {
		this.environment = environment;
		this.apiKey = apiKey;
		this.apiToken = apiToken;
		this.slaId = slaId;

		this.valitateParams();
	}

	valitateParams() {
		const requireProps = ['environment', 'apiKey', 'apiToken', 'slaId'];

		requireProps.forEach(key => {
			if(!this[key])
				throw new Error(`${key} not defined, please pass ${key} in instance`);
		});
	}

	async readCard(isContactless) {
		const {
			cardNumber,
			expirationMonth,
			expirationYear
		} = await MT188CardReaderInstance.getPANWithRetries({ maxAttempts: 10, contactless: isContactless });

		return {
			holderName: `VTEX ${this.environment.toUpperCase()} Client`,
			cardNumber,
			dueDate: `${expirationMonth}/${expirationYear}`
		};
	}

	/**
	 * Collect a order with cart simulated
	 * @param {object} cart
	 * @param {number|string} paymentSystem
	 * @param {boolean} isCash
	 */
	async collectWithCart(cart, paymentSystem, isCash, isContactless) {
		const paymentData = {
			cart,
			slaId: this.slaId,
			paymentSystemId: paymentSystem
		};

		const OrderInstance = new Order({
			environment: this.environment,
			apiKey: this.apiKey,
			apiToken: this.apiToken
		});

		const fields = isCash ? null : await this.readCard(isContactless);

		paymentData.paymentFields = fields;

		await OrderInstance.create(paymentData);

		await OrderInstance.sendTransactionPayments();

		await OrderInstance.authorizeTransaction();

	}

	/**
	 * Collect a order with transactionId
	 * @param {number} value
	 * @param {number|string} paymentSystem
	 * @param {string} transactionId
	 * @param {boolean} isCash
	 */
	async collectWithTransactionId(value, paymentSystem, transactionId, isCash, isContactless) {
		const OrderInstance = new Order({
			environment: this.environment,
			apiKey: this.apiKey,
			apiToken: this.apiToken
		});

		const fields = isCash ? null : await this.readCard(isContactless);

		const transactionData = {
			value,
			paymentSystem,
			installmentsValue: value,
			referenceValue: value,
			fields
		};

		await OrderInstance.sendTransactionPayments(transactionData, transactionId);

		await OrderInstance.authorizeTransaction(transactionId);
	}

	/**
	 * Collect a order
	 * @param {number} value
	 * @param {number|string} paymentSystem
	 * @param {string} transactionId
	 * @param {object} cart
	 * @param {boolean} isCash
	 */
	collect(value, paymentSystem, transactionId, cart, isCash = false, isContactless = false) {
		if(!value)
			throw new Error('value is not defined');

		if(!paymentSystem)
			throw new Error('paymentSystem is not defined');

		if(!cart && !transactionId)
			throw new Error('cart or transactionId is not defined');

		if(transactionId)
			return this.collectWithTransactionId(value, paymentSystem, transactionId, isCash, isContactless);

		return this.collectWithCart(cart, paymentSystem, isCash, isContactless);
	}
}

module.exports = Payment;
