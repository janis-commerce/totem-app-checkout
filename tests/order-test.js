'use strict';

const assert = require('assert');
const fetchMock = require('fetch-mock');
const { Order } = require('./../index');
const {
	orderSimulated,
	orderCreated
} = require('./mocks/order');


const dataOrderMock = {
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201
};

const createOrder = data => {
	return new Order(data);
};

const createValidOrder = () => {
	return new Order({ environment: 'fizzmodarg', apiKey: 'apiKey', apiToken: 'apiToken' });
};

const SERVER_ERROR_MESSAGE = 'MOCK SERVER ERROR';

const mockfetchTransactions = (mockError = false) => {
	const options = {
		status: mockError ? 500 : 200,
		body: mockError ? { message: SERVER_ERROR_MESSAGE } : JSON.stringify({ data: 'response data' })
	};

	fetchMock.mock('begin:https://fizzmodarg.vtexpayments.com.br/api/pvt/transactions', options);
};

const mockfetchCreate = (mockError = false) => {
	const options = {
		status: mockError ? 500 : 200,
		body: mockError ? { message: SERVER_ERROR_MESSAGE } : JSON.stringify(orderCreated)
	};

	fetchMock.mock('begin:https://fizzmodarg.vtexcommercestable.com.br/api/checkout/pub/orders', options);
};

describe('Order test', () => {
	beforeEach(() => {
		fetchMock.restore();
	});

	it('should error if not pass required props in constructor', () => {
		assert.throws(() => {
			createOrder();
		}, {
			message: 'environment not defined, please pass environment in instance'
		});

		assert.throws(() => {
			createOrder({});
		}, {
			message: 'environment not defined, please pass environment in instance'
		});

		assert.throws(() => {
			createOrder({ environment: 'environment' });
		}, {
			message: 'apiKey not defined, please pass apiKey in instance'
		});

		assert.throws(() => {
			createOrder({ environment: 'environment', apiKey: 'apiKey' });
		}, {
			message: 'apiToken not defined, please pass apiToken in instance'
		});
	});

	it('should error if not pass transaction id when makeUrl', () => {
		const order = createValidOrder();

		assert.throws(() => {
			order.makeUrl();
		}, {
			message: 'transactionId not exist'
		});

		assert.throws(() => {
			order.makeUrl(null, '/test');
		}, {
			message: 'transactionId not exist'
		});
	});

	it('should pass validation when create a new order', async () => {
		mockfetchCreate();

		const order = createValidOrder();

		await order.create(dataOrderMock);

		assert(order.currentOrder);
	});

	it('should error when create a new order', async () => {
		mockfetchCreate(true);

		const order = createValidOrder();

		await assert.rejects(async () => {
			await order.create(dataOrderMock);
		}, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	it('should pass validation when send payment with params custom', async () => {
		mockfetchTransactions();

		const order = createValidOrder();

		await order.sendTransactionPayments(dataOrderMock, 'TRANSACTION_ID');

	});

	it('should pass validation when create a new order and send payment with order and initial data cached only', async () => {
		mockfetchCreate();
		mockfetchTransactions();

		const order = createValidOrder();

		await order.create(dataOrderMock);

		assert(order.currentOrder);

		await order.sendTransactionPayments();

	});

	it('should error validation when fail send payment', async () => {
		mockfetchCreate();
		mockfetchTransactions(true);

		const order = createValidOrder();

		await order.create(dataOrderMock);

		assert(order.currentOrder);

		await assert.rejects(async () => {
			await order.sendTransactionPayments();
		}, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	it('should pass validation when athorize transaction with order created', async () => {
		mockfetchTransactions();

		const order = createValidOrder();

		order.currentOrder = orderCreated;

		await order.authorizeTransaction();
	});

	it('should pass validation when athorize transaction with custom params', async () => {
		mockfetchTransactions();

		const order = createValidOrder();

		await order.authorizeTransaction('TRANSACTION_ID');
	});

	it('should error when athorize transaction fail', async () => {
		mockfetchTransactions(true);

		const order = createValidOrder();

		order.currentOrder = orderCreated;

		await assert.rejects(async () => {
			await order.authorizeTransaction();
		}, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	it('should pass validation when clear data cached', async () => {
		mockfetchTransactions();
		mockfetchCreate();

		const order = createValidOrder();

		await order.create(dataOrderMock);

		assert(order.currentOrder);
		assert(order.initialData);

		order.clearOrder();

		assert(order.currentOrder === null);
		assert(order.initialData === null);

	});

});
