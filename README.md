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

## Classes

<dl>
<dt><a href="#Cart">Cart</a></dt>
<dt><a href="#Order">Order</a></dt>
<dd></dd>
</dl>

<a name="Cart"></a>

## Cart

## Functions

<dl>
<dt><a href="#addItems">addItems(items)</a> ⇒ <code>Promise</code></dt>
<dd><p>Function for add a new item or items to current order</p>
</dd>
<dt><a href="#changeItemQuantity">changeItemQuantity(items)</a> ⇒ <code>Promise</code></dt>
<dd><p>Function for change the quantity to item into the current orderForm</p>
</dd>
<dt><a href="#removeItems">removeItems(items)</a> ⇒ <code>Promise</code></dt>
<dd><p>Function for remove items</p>
</dd>
<dt><a href="#removeAllItems">removeAllItems()</a> ⇒ <code>Promise</code></dt>
<dd><p>Function for remove all items</p>
</dd>
<dt><a href="#simulate">simulate(items)</a> ⇒ <code>Promise</code></dt>
<dd><p>Function for simulate cart</p>
</dd>
<dt><a href="#clearCart">clearCart()</a></dt>
<dd><p>Function for clear cart cached in instance then call getOrder method</p>
</dd>
</dl>


<a name="addItems"></a>

## addItems(items) ⇒ <code>Promise</code>
Function for add a new item or items to current order

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> \| <code>object</code> | Object or Array of Objects |
| items.id | <code>number</code> | id of sku product. |
| items.quantity | <code>number</code> |  |

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

<a name="changeItemQuantity"></a>

## changeItemQuantity(items) ⇒ <code>Promise</code>
Function for change the quantity to item into the current orderForm

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> \| <code>object</code> | Object or Array of Objects |
| items.id | <code>number</code> | id of sku product. |
| items.quantity | <code>number</code> |  |

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
<a name="removeItems"></a>

## removeItems(items) ⇒ <code>Promise</code>
Function for remove items

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> \| <code>object</code> | Object or Array of Objects |
| items.id | <code>number</code> | id of sku product |

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
<a name="removeAllItems"></a>

## removeAllItems() ⇒ <code>Promise</code>
Function for remove all items
**Example**
```js
const cart = await CartInstance.removeAllItems();
```
<a name="simulate"></a>

## simulate(items) ⇒ <code>Promise</code>
Function for simulate cart

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> \| <code>object</code> | Object or Array of Objects |
| items.id | <code>number</code> | id of sku product. |
| items.quantity | <code>number</code> |  |
| postalCode | <code>number</code> | PostalCoode for get availables slas |

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
Function for remove all items
**Example**
```js
await cartInstance.getCart();
// into cartInstance.cart getCart method save cart created

cartInstance.clearCart();
// cartInstance.cart is null
```

<a name="Order"></a>

## Order

## Functions

<dl>
<dt><a href="#create">create(data)</a> ⇒ <code>Promise</code></dt>
<dd><p>Create new Order</p>
</dd>
<dt><a href="#sendTransactionPayments">sendTransactionPayments(data, transactionId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Define in order Payment Methods</p>
</dd>
<dt><a href="#authorizeTransaction">authorizeTransaction(transactionId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Authorize Payment Methods order</p>
</dd>
<dt><a href="#clearOrder">clearOrder()</a></dt>
<dd><p>Clear order created cached and data initial passed</p></dd>
</dl>


<a name="create"></a>

## create(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object |
| data.cart  | <code>object</code> | Object Cart or Object Cart simulation
| data.slaId | <code>number</code> \| <code>string</code> | logistic sla id. |
| data.paymentSystemId | <code>number</code> \| <code>string</code>  | id of payment system

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

<a name="sendTransactionPayments"></a>

## sendTransactionPayments(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object |
| data.cart  | <code>object</code> | Object Cart or Object Cart simulation
| data.slaId | <code>number</code> \| <code>string</code> | logistic sla id. |
| data.paymentSystemId | <code>number</code> \| <code>string</code>  | id of payment system
| transactionId | <code>string</code> | id of transaction |

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

## authorizeTransaction(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| transactionId | <code>string</code> | id of transaction |

**if not pass transactionId, the function use transactionId into cached order crated, saved in instance**

**Example**
```js
// authorizeTransaction custom
await orderInstance.authorizeTransaction('TRANSACTION_ID');

// authorizeTransaction with transactionId in order cached
await orderInstance.authorizeTransaction();
```

<a name="clearOrder"></a>

## clearOrder()
Function for remove all items
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
	apiKey: 'apiKey',
	apiToken: 'apiToken'
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