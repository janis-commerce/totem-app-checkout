# totem-app-checkout


## Installation
```sh
npm install totem-app-checkout
```

## API


## Usage
```js
const { Cart } = require('totem-app-checkout');

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
const cart = await CartInstance.addItems({
		id: 45,
		quantity: 2
});

const cart = await CartInstance.addItems([{
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
const cart = await CartInstance.changeItemsQuantity({
		id: 45,
		quantity: 2
});

const cart = await CartInstance.changeItemsQuantity([{
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
const cart = await CartInstance.removeItems({
		id: 44
});

const cart = await CartInstance.removeItems([{
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
| 	items.id | <code>number</code> | id of sku product. |
| 	items.quantity | <code>number</code> |  |
| postalCode | <code>number</code> | PostalCoode for get availables slas |

**Example**
```js
const cartSimulated = await CartInstance.simulate({
    id: 17,
    quantity: 2
}, 1000);

 const cartSimulated = await CartInstance.simulate([{
    id: 17,
    quantity: 2
}], 1000);
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
<dt><a href="#clearorder">clearOrder()</a></dt>
<dd><p>Clear order created cached and data initial passed</p></dd>
</dl>


<a name="create"></a>

## create(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object |
| data.cart  | <code>object</code> | Object Cart or Object Cart simulation
| data.slaId | <code>number</code> \| <code>string</code> | id of sku product. |
| data.paymentSystemId | <code>number</code> \| <code>string</code>  | id of payment system

<a name="sendTransactionPayments"></a>

## sendTransactionPayments(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Object |
|	data.cart  | <code>object</code> | Object Cart or Object Cart simulation
| 	data.slaId | <code>number</code> \| <code>string</code> | id of sku product. |
| 	data.paymentSystemId | <code>number</code> \| <code>string</code>  | id of payment system
| transactionId | <code>string</code> | id of transaction |

**if not pass data or transactionId, the function use data used in create and transactionId into order created cached**

<a name="authorizeTransaction"></a>

## authorizeTransaction(data) ⇒ <code>Promise</code>
Create new Order

| Param | Type | Description |
| --- | --- | --- |
| transactionId | <code>string</code> | id of transaction |

**if not pass transactionId, the function use transactionId into order created cached**


**Example**
```js
const order = new Order({
	environment: 'testqa',
	apiKey: 'apiKey',
	apiToken: 'apiToken'
});

const data = await order.create({
	cart: orderSimulated,
	slaId: 'Normal',
	paymentSystemId: 201,
	paymentFields: {
		"holderName": "Test VTEX",
		"cardNumber": "4704550000000005",
		"validationCode": "",
		"dueDate": "12/22",
		"document": "",
		"accountId": "",
		"address": null,
		"callbackUrl": ""
	}
});

const sendPaymentResponse = await order.sendTransactionPayments();

const authorizeResponse = await order.authorizeTransaction();


```