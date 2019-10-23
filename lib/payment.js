'use strict';

const { MT188CardReader } = require('@janiscommerce/mt188-card-reader');
// const sinon = require('sinon');
const Order = require('./order');

class Payment {
	constructor({ environment, apiKey, apiToken, slaId }) {
		this.environment = environment;
		this.apiKey = apiKey;
		this.apiToken = apiToken;
		this.slaId = slaId;

		/* sinon.stub(MT188CardReader, 'getPANWithRetries').resolves({
			cardNumber: '4704550000000005',
			expirationMonth: '12',
			expirationYear: '22'
		}); */
	}

	readCard() {
		return MT188CardReader.getPANWithRetries({ maxAttempts: 10 });
	}

	async collect(value, paymentSystem, cart, transactionId) {
		const paymentData = {
			cart,
			slaId: this.slaId,
			paymentSystemId: paymentSystem
		};

		let transactionData;

		const OrderInstance = new Order({
			environment: this.environment,
			apiKey: this.apiKey,
			apiToken: this.apiToken
		});

		if(!transactionId)
			await OrderInstance.create(paymentData);

		// Check if is cash payment

		const fields = await this.readCard();

		if(transactionId) {
			transactionData = {
				value,
				paymentSystem,
				installmentsValue: value,
				referenceValue: value,
				fields
			};
		}


		await OrderInstance.sendTransactionPayments(transactionData, transactionId);

		await OrderInstance.authorizeTransaction(transactionId);
	}
}

module.exports = Payment;
