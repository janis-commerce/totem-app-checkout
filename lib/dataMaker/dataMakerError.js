'use strict';

class NotExistOrEmptyError extends Error {
	constructor(messageKey) {
		super();
		this.message = `${messageKey} not exists or is empty`;
	}
}

class NotExistInCartError extends Error {
	constructor(messageKey) {
		super();
		this.message = `${messageKey} not exists in cart`;
	}
}

module.exports = {
	NotExistOrEmptyError,
	NotExistInCartError
};
