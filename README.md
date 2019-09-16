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
<dd></dd>
</dl>

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

<a name="Cart"></a>

## Cart
**Kind**: global class
<a name="addItems"></a>

## addItems(items) ⇒ <code>Promise</code>
Function for add a new item or items to current order

**Kind**: global function

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

**Kind**: global function

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

**Kind**: global function

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

**Kind**: global function
**Example**
```js
const cart = await CartInstance.removeAllItems();
```
<a name="simulate"></a>

## simulate(items) ⇒ <code>Promise</code>
Function for simulate cart

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> \| <code>object</code> | Object or Array of Objects |
| items.id | <code>number</code> | id of sku product. |
| items.quantity | <code>number</code> |  |

**Example**
```js
const cartSimulated = await CartInstance.simulate({
    id: 17,
    quantity: 2
});

 const cartSimulated = await CartInstance.simulate([{
    id: 17,
    quantity: 2
}]);
```
