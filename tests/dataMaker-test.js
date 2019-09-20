'use strict';

const assert = require('assert');
const DataMaker = require('../lib/dataMaker');
const { orderSimulated } = require('./mocks/order');

const copyObj = obj => {
	const strObj = JSON.stringify(obj);
	return JSON.parse(strObj);
};

const dataOrderMock = {
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201
};

const newDataMaker = () => {
	return new DataMaker({ seller: 1 });
};

describe('DataMaker test', () => {

	it('should pass validation if pass correct data validation order', () => {
		const maker = newDataMaker();

		maker.makeOrder(dataOrderMock);
	});

	it('should pass validation if pass correct data validation order', () => {
		const maker = newDataMaker();

		maker.makePayments(dataOrderMock);
	});

	it('should pass validation if pass correct data validation order with default constructor', () => {
		const maker = new DataMaker();

		maker.makePayments(dataOrderMock);
	});


	it('should error validation if pass data with out required properties', () => {
		const maker = newDataMaker();
		const mock = copyObj(dataOrderMock);

		delete mock.cart;

		assert.throws(() => {
			maker.makePayments(mock);
		}, {
			message: '"cart" is required'
		});

		assert.throws(() => {
			maker.makeOrder(mock);
		}, {
			message: '"cart" is required'
		});

	});

	it('should error in makePaymentData', () => {
		const maker = newDataMaker();
		const mock1 = copyObj(dataOrderMock);

		delete mock1.cart.paymentData;

		assert.throws(() => {
			maker.makeOrder(mock1);
		}, {
			message: 'paymentData not exists or is empty'
		});

		const mock2 = copyObj(dataOrderMock);

		mock2.cart.paymentData.paymentSystems = [];

		assert.throws(() => {
			maker.makeOrder(mock2);
		}, {
			message: 'paymentSystem not exists in cart'
		});

		const mock3 = copyObj(dataOrderMock);

		mock3.cart.totals = [];

		assert.throws(() => {
			maker.makeOrder(mock3);
		}, {
			message: 'total value not exists in cart'
		});
	});

	it('should error in makeItemsData', () => {
		const maker = newDataMaker();
		const mock = copyObj(dataOrderMock);

		delete mock.cart.items;

		assert.throws(() => {
			maker.makeOrder(mock);
		}, {
			message: 'items not exists or is empty'
		});
	});

	it('should error in makeLogisticInfo', () => {
		const maker = newDataMaker();
		const mock1 = copyObj(dataOrderMock);

		delete mock1.cart.logisticsInfo;

		assert.throws(() => {
			maker.makeOrder(mock1);
		}, {
			message: 'logisticsInfo not exists or is empty'
		});

		const mock2 = copyObj(dataOrderMock);

		mock2.slaId = 'Domicilio';

		assert.throws(() => {
			maker.makeOrder(mock2);
		}, {
			message: 'slaId not exists in cart'
		});

	});


	it('should error in makePayments', () => {
		const maker = newDataMaker();
		const mock1 = copyObj(dataOrderMock);

		delete mock1.cart.paymentData;

		assert.throws(() => {
			maker.makePayments(mock1);
		}, {
			message: 'paymentData not exists or is empty'
		});

		const mock2 = copyObj(dataOrderMock);

		mock2.cart.paymentData.paymentSystems = [];

		assert.throws(() => {
			maker.makePayments(mock2);
		}, {
			message: 'paymentSystem not exists in cart'
		});

		const mock3 = copyObj(dataOrderMock);

		mock3.cart.totals = [];

		assert.throws(() => {
			maker.makePayments(mock3);
		}, {
			message: 'total value not exists in cart'
		});
	});


	it('should pass validation with custom clientData', () => {
		const maker = newDataMaker();
		const mock = copyObj(dataOrderMock);

		mock.clientData = {
			email: 'pepe@test.com',
			firstName: 'client',
			lastName: 'totem',
			document: '99999999',
			documentType: 'dni',
			phone: '1111111111'
		};

		maker.makeOrder(mock);
	});

});
