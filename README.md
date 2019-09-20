# totem-app-checkout


## Installation
```sh
npm install totem-app-checkout
```

## API


## Usage
```js
const { Cart, Order } = require('totem-app-checkout');

const cartInstance = new Cart({ environment: 'tiendaqa' })

const orderInstance = new Order({ environment: 'tiendaqa', apiKey: 'API_KEY', apiToken: 'API_TOKEN' });
```

## Cart

## Methods

<a name="addItems"></a>

## addItems(items) ⇒ `Promise`
Function for add a new item or items to current order

| Param          | Type             | Description                                      |
| ---            | ---              | ---                                              |
| items          | `array`/`object` | Object or Array with Object with id and quantity |
| items.id       | `number`         | id of sku product.                               |
| items.quantity | `number`         | quantity items                                   |

**Example**
```js
const cart = await cartInstance.addItems({
	id: 45,
	quantity: 2
});

const cart = await cartInstance.addItems([{
	id: 45,
	quantity: 2
},{
	id: 45,
	quantity: 2
}]);
```

## changeItemQuantity(items) ⇒ `Promise`
Function for change the quantity to item into the current orderForm

| Param          | Type             | Description                                      |
| ---            | ---              | ---                                              |
| items          | `array`/`object` | Object or Array with Object with id and quantity |
| items.id       | `number`         | id of sku product.                               |
| items.quantity | `number`         | quantity items                                   |

**Example**
```js
const cart = await cartInstance.changeItemsQuantity({
	id: 45,
	quantity: 2
});

const cart = await cartInstance.changeItemsQuantity([{
	id: 45,
	quantity: 5
},{
	id: 45,
	quantity: 8
}]);
```

## removeItems(items) ⇒ `Promise`
Function for remove items

| Param          | Type             | Description                                      |
| ---            | ---              | ---                                              |
| items          | `array`/`object` | Object or Array with Object with id and quantity |
| items.id       | `number`         | id of sku product.                               |

**Example**
```js
const cart = await cartInstance.removeItems({
		id: 44
});

const cart = await cartInstance.removeItems([{
	id: 45
},{
	id: 46
}]);
```


## removeAllItems() ⇒ `Promise`
Function for remove all items
**Example**
```js
const cart = await CartInstance.removeAllItems();
```
<a name="simulate"></a>

## simulate(items) ⇒ `Promise`
Function for simulate cart

| Param          | Type             | Description                                      |
| ---            | ---              | ---                                              |
| items          | `array`/`object` | Object or Array with Object with id and quantity |
| items.id       | `number`         | id of sku product.                               |
| items.quantity | `number`         | quantity items                                   |
| postalCode     | `number`         | PostalCoode for get availables slas              |

**Example**
```js
const cartSimulated = await cartInstance.simulate({
    id: 17,
    quantity: 2
}, 1000);

 const cartSimulated = await cartInstance.simulate([{
    id: 17,
    quantity: 2
}], 1000);
```

<a name="clearCart"></a>

## clearCart()
Function for clear cart cached in instance then call getOrder method
**Example**
```js
await cartInstance.getCart();
// into cartInstance.cart getCart method save cart created

cartInstance.clearCart();
// cartInstance.cart is null
```


## Order

## Methods

## create(data) ⇒ `Promise`
Create new Order

| Param                | Type              | Description                                      |
| ---                  | ---               | ---                                              |
| data                 | `object`          | Object with data necesary for make order         |
| data.cart            | `object`          | Object Cart or Object Cart simulation            |
| data.slaId           | `string`/         | logistic sla id                                  |
| data.paymentSystemId | `number`/`string` | id of payment system                             |

**If order is created, the order response and passed data is cached in instance**

**Example**
```js
// Create order with payment promisory
await orderInstance.create({
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201
});

// Create order with payment card
await orderInstance.create({
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201,
	paymentFields: {
		holderName: 'Test TEST',
		cardNumber: '4700000000000000',
		validationCode: '',
		dueDate: "12/22",
		document: '',
		accountId: '',
		address: null,
		callbackUrl: ''
	}
});
```

## sendTransactionPayments(data, transactionId) ⇒ `Promise`
Send to order created the paymentData

| Param                | Type              | Description                                      |
| ---                  | ---               | ---                                              |
| data                 | `object`          | Object with data necesary for make order         |
| data.cart            | `object`          | Object Cart or Object Cart simulation            |
| data.slaId           | `string`/         | logistic sla id                                  |
| data.paymentSystemId | `number`/`string` | id of payment system                             |
| transactionId        | `string`          | id of transaction                                |

**if not pass data and transactionId, the function use data passed in method create, saved in instance**

**Example**
```js
// Send transaction custom
const data = {
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201
};

await orderInstance.sendTransactionPayments(data, 'TRANSACTION_ID');

// send transaction with data and transaction id cached
await orderInstance.sendTransactionPayments();
```

<a name="authorizeTransaction"></a>

## authorizeTransaction(data) ⇒ `Promise`
Authorize Payment Methods order

| Param                | Type              | Description                                      |
| ---                  | ---               | ---                                              |
| transactionId        | `string`          | id of transaction                                |

**if not pass transactionId, the function use transactionId in cached order, saved in instance**

**Example**
```js
// authorizeTransaction custom
await orderInstance.authorizeTransaction('TRANSACTION_ID');

// authorizeTransaction with transactionId in order cached
await orderInstance.authorizeTransaction();
```

<a name="clearOrder"></a>

## clearOrder()
Clear order created cached and data initial passed
**Example**
```js
await orderInstance.create({
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201
});
// into orderInstance.order, create method save order created
// Into orderInstace.initialdata, create method save argument data passed

orderInstance.clearOrder();
// orderInstance.order is null
// orderInstance.initialData is null
```

## Creating a Order

**Example for simulate cart, and then create cart and send and authorize payment**
```js
const { Cart, Order } = require('totem-app-checkout');

const evironment = 'testqa';
const cart = new Cart({ environment });

const order = new Order({
	environment,
	apiKey: 'API_KEY',
	apiToken: 'API_TOKEN'
});

const items = [
	{ id: 8, quantity: 1 },
	{ id: 7, quantity: 1 }
];

const cartSimulated = await cart.simulate(items, 1000)


const data = await order.create({
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201,
	paymentFields: {
		holderName: 'Test VTEX',
		cardNumber: '4704550000000005',
		validationCode: '',
		dueDate: "12/22",
		document: '',
		accountId: '',
		address: null,
		callbackUrl: ''
	}
});

const sendPaymentResponse = await order.sendTransactionPayments();

const authorizeResponse = await order.authorizeTransaction();
```