'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object({
	cart: Joi.object().required(),
	addressData: Joi.object().optional(),
	clientData: Joi.object().optional(),
	paymentSystemId: Joi.alternatives()
		.try(Joi.number(), Joi.string())
		.required(),
	slaId: Joi.string().required(),
	paymentFields: Joi.object()
});

module.exports = schema;
