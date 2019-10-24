'use strict';

const assert = require('assert');
const sandbox = require('sinon').createSandbox();
const fetchMock = require('fetch-mock');
const { Payment: PaymentObj, Order } = require('./../index');
const { orderSimulated, orderCreated } = require('./mocks/order');

const { Payment, MT188CardReader } = PaymentObj;

const createPayment = data => {
	return new Payment(data);
};

const createValidPayment = () => {
	return new Payment({ environment: 'fizzmodarg', apiKey: 'apiKey', apiToken: 'apiToken', slaId: 'Normal' });
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


const mockCardReader = (mockError = false) => {
	if(mockError)
		return sandbox.stub(MT188CardReader, 'getPANWithRetries').rejects(new Error('MT188CardReaderError'));

	sandbox.stub(MT188CardReader, 'getPANWithRetries').resolves({
		cardNumber: '4704550000000005',
		expirationMonth: '12',
		expirationYear: '22'
	});
};

describe('Order test', () => {
	beforeEach(() => {
		fetchMock.restore();
		sandbox.restore();
	});

	it('should error if not pass required props in constructor', () => {
		assert.throws(() => {
			createPayment();
		}, {
			message: 'environment not defined, please pass environment in instance'
		});

		assert.throws(() => {
			createPayment({});
		}, {
			message: 'environment not defined, please pass environment in instance'
		});

		assert.throws(() => {
			createPayment({ environment: 'environment' });
		}, {
			message: 'apiKey not defined, please pass apiKey in instance'
		});

		assert.throws(() => {
			createPayment({ environment: 'environment', apiKey: 'apiKey' });
		}, {
			message: 'apiToken not defined, please pass apiToken in instance'
		});

		assert.throws(() => {
			createPayment({ environment: 'environment', apiKey: 'apiKey', apiToken: 'apiToken' });
		}, {
			message: 'slaId not defined, please pass slaId in instance'
		});
	});

	it('should error if not pass required', async () => {
		const order = createValidPayment();

		await assert.rejects(async () => {
			await order.collect();
		}, {
			message: 'value is not defined'
		});

		await assert.rejects(async () => {
			await order.collect(1000);
		}, {
			message: 'paymentSystem is not defined'
		});

		await assert.rejects(async () => {
			await order.collect(1000, 2);
		}, {
			message: 'cart or transactionId is not defined'
		});

	});

	it('should pass validation when collect only with transaction id', async () => {
		mockfetchTransactions();
		mockCardReader();

		const sendsendTransactionPaymentsSpy = sandbox.spy(Order.prototype, 'sendTransactionPayments');
		const authorizeTransactionSpy = sandbox.spy(Order.prototype, 'authorizeTransaction');

		const payment = createValidPayment();

		await payment.collect(1000, 1, 'TRANSACTION_ID');

		assert(authorizeTransactionSpy.calledOnce);
		assert(sendsendTransactionPaymentsSpy.calledOnce);
	});

	it('should pass validation when collect only with transaction id cash', async () => {
		mockfetchTransactions();
		mockCardReader();

		const sendsendTransactionPaymentsSpy = sandbox.spy(Order.prototype, 'sendTransactionPayments');
		const authorizeTransactionSpy = sandbox.spy(Order.prototype, 'authorizeTransaction');

		const payment = createValidPayment();

		await payment.collect(1000, 1, 'TRANSACTION_ID', null, true);

		assert(authorizeTransactionSpy.calledOnce);
		assert(sendsendTransactionPaymentsSpy.calledOnce);
	});

	it('should pass validation when collect only with cart', async () => {
		mockfetchCreate();
		mockfetchTransactions();
		mockCardReader();

		const createSpy = sandbox.spy(Order.prototype, 'create');
		const sendsendTransactionPaymentsSpy = sandbox.spy(Order.prototype, 'sendTransactionPayments');
		const authorizeTransactionSpy = sandbox.spy(Order.prototype, 'authorizeTransaction');

		const payment = createValidPayment();

		await payment.collect(1000, 2, null, orderSimulated);

		assert(createSpy.calledOnce);
		assert(authorizeTransactionSpy.calledOnce);
		assert(sendsendTransactionPaymentsSpy.calledOnce);

	});

	it('should pass validation when collect only with cart cash', async () => {
		mockfetchCreate();
		mockfetchTransactions();
		mockCardReader();

		const createSpy = sandbox.spy(Order.prototype, 'create');
		const sendsendTransactionPaymentsSpy = sandbox.spy(Order.prototype, 'sendTransactionPayments');
		const authorizeTransactionSpy = sandbox.spy(Order.prototype, 'authorizeTransaction');

		const payment = createValidPayment();

		await payment.collect(1000, 2, null, orderSimulated, true);

		assert(createSpy.calledOnce);
		assert(authorizeTransactionSpy.calledOnce);
		assert(sendsendTransactionPaymentsSpy.calledOnce);
	});

});
