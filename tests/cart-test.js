'use strict';

const assert = require('assert');
const sandbox = require('sinon').createSandbox();
const fetchMock = require('fetch-mock');
const { Cart } = require('./../index');
const {
	cartExample,
	cartWithItemsExample
} = require('./mocks/cart');


const createCart = env => {
	return new Cart(env);
};

const SERVER_ERROR_MESSAGE = 'MOCK SERVER ERROR';

const mockfetch = (mockError = false, withItems = false) => {
	const options = {
		status: mockError ? 500 : 200,
		body: mockError ? { message: SERVER_ERROR_MESSAGE } : JSON.stringify(withItems ? cartWithItemsExample : cartExample)
	};

	fetchMock.mock('begin:https://fizzmodarg.myvtex.com/api/checkout/pub', options);
};

describe('Cart test', () => {
	beforeEach(() => {
		sandbox.restore();
		fetchMock.restore();
	});


	it('should error if not pass environment', () => {
		assert.throws(() => {
			createCart();
		}, {
			message: 'environment not defined, please pass environment in instance'
		});
	});


	it('should error if pass arguments incorrects', () => {
		const cartInstance = createCart('fizzmodarg');
		const data = ['17', 24, null, 'string', () => {}, [1], [() => {}]];

		data.forEach(item => {
			assert.throws(() => cartInstance.makeItemsArray(item), { message: Cart.itemsTypeError });
		});
	});


	it('should pass validation if pass arguments corrects', () => {
		const cartInstance = createCart('fizzmodarg');
		const data = [{}, [], { id: 12 }, [{ id: 12, quantity: 2 }, { id: 13, quantity: 1 }]];

		data.forEach(item => {
			assert(cartInstance.makeItemsArray(item));
		});
	});


	it('should get a new cart with function getCart', async () => {
		mockfetch();

		const cartInstance = createCart('fizzmodarg');
		await cartInstance.getCart();
	});


	it('should get a new cart with function getCart and call again with id cached', async () => {
		mockfetch();

		const spyMakeUrl = sandbox.spy(Cart.prototype, 'makeUrl');

		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		await cartInstance.getCart();

		const call0 = spyMakeUrl.getCall(0);
		const call1 = spyMakeUrl.getCall(1);

		assert(!call0.returnValue.includes(cartInstance.cartId));
		assert(call1.returnValue.includes(cartInstance.cartId));
		assert(call0.returnValue !== call1.returnValue);
	});


	it('should error server in function getCart', async () => {
		mockfetch(true);
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.getCart(); }, {
			message: SERVER_ERROR_MESSAGE
		});
	});


	// TEST METHOD addItems()


	it('should pass validation if call addItems with valid params', async () => {
		mockfetch();
		const cartInstance = createCart('fizzmodarg');
		await cartInstance.addItems([{ id: 1, quantity: 1 }]);
		await cartInstance.addItems({ id: 2, quantity: 1 });
	});


	it('should error if call addItems with invalid params', async () => {
		mockfetch();
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.addItems(1); }, {
			message: Cart.itemsTypeError
		});
	});


	it('should error if call addItems and ocurred error in response', async () => {
		mockfetch(true);
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.addItems({ id: 1, quantity: 1 }); }, {
			message: SERVER_ERROR_MESSAGE
		});
	});


	// TEST METHOD changeQuantity()

	it('should pass validation if call changeItemsQuantity with valid params', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		await cartInstance.changeItemsQuantity([{ id: 1, quantity: 1 }]);
		await cartInstance.changeItemsQuantity({ id: 2, quantity: 1 });
	});


	it('should error if call changeItemsQuantity with invalid params', async () => {
		mockfetch();
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.changeItemsQuantity(1); }, {
			message: Cart.itemsTypeError
		});
	});


	it('should error if call changeItemsQuantity and not get cart before', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');


		await assert.rejects(async () => { await cartInstance.changeItemsQuantity({ id: 1, quantity: 1 }); }, {
			message: 'Not exist cart data, please call getCart() for create one'
		});
	});


	it('should error if call changeItemsQuantity and ocurred error in response', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		fetchMock.restore();

		mockfetch(true, true);

		await assert.rejects(async () => { await cartInstance.changeItemsQuantity({ id: 1, quantity: 1 }); }, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	// TEST METHOD removeItems()

	it('should pass validation if call removeItems with valid params', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		await cartInstance.removeItems([{ id: 1 }]);
		await cartInstance.removeItems({ id: 2 });
	});


	it('should error if call removeItems with invalid params', async () => {
		mockfetch();
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.removeItems(1); }, {
			message: Cart.itemsTypeError
		});
	});


	it('should error if call removeItems and not get cart before', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');


		await assert.rejects(async () => { await cartInstance.removeItems({ id: 1 }); }, {
			message: 'Not exist cart data, please call getCart() for create one'
		});
	});


	it('should error if call removeItems and ocurred error in response', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		fetchMock.restore();

		mockfetch(true, true);

		await assert.rejects(async () => { await cartInstance.removeItems({ id: 1 }); }, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	// TEST METHOD removeAllItems()

	it('should pass validation if call removeAllItems', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		await cartInstance.removeAllItems();
	});


	it('should error if call removeAllItems and not get cart before', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');


		await assert.rejects(async () => { await cartInstance.removeAllItems(); }, {
			message: 'Not exist cart data, please call getCart() for create one'
		});
	});


	it('should error if call removeAllItems and ocurred error in response', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		fetchMock.restore();

		mockfetch(true, true);

		await assert.rejects(async () => { await cartInstance.removeAllItems(); }, {
			message: SERVER_ERROR_MESSAGE
		});
	});


	// TEST METHOD simulate


	it('should pass validation if call simulate with valid params', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await cartInstance.simulate({ id: 17, quantity: 1 });
	});


	it('should error if call simulate with invalid params', async () => {
		mockfetch(false, true);
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => { await cartInstance.simulate(1); }, {
			message: Cart.itemsTypeError
		});
	});


	it('should error if call simulate and ocurred error in response', async () => {
		mockfetch(true);
		const cartInstance = createCart('fizzmodarg');

		await assert.rejects(async () => {
			await cartInstance.simulate({ id: 1, quantity: 1 });
		}, {
			message: SERVER_ERROR_MESSAGE
		});
	});

	it('should clean cached cart in instance', async () => {
		mockfetch();

		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		assert.deepEqual(cartInstance.cart, cartExample);

		cartInstance.clearCart();

		// Check if cart chaced is cleared
		assert.deepEqual(cartInstance.cart, null);
	});

	it('should get a new cart and clean cached cart in instance for get another new cart', async () => {
		mockfetch();

		const spyMakeUrl = sandbox.spy(Cart.prototype, 'makeUrl');

		const cartInstance = createCart('fizzmodarg');

		await cartInstance.getCart();

		assert.deepEqual(cartInstance.cart, cartExample);

		cartInstance.clearCart();

		// Check if cart chaced is cleared
		assert.deepEqual(cartInstance.cart, null);

		await cartInstance.getCart();

		const call0 = spyMakeUrl.getCall(0);
		const call1 = spyMakeUrl.getCall(1);

		assert(call0.returnValue === call1.returnValue);
	});
});
