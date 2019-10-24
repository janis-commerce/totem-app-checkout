'use strict';

const Joi = require('@hapi/joi');

const schema = Joi.object({
	cart: Joi.object().required(),
	clientData: Joi.object().optional(),
	paymentSystemId: Joi.alternatives()
		.try(Joi.number(), Joi.string())
		.required(),
	slaId: Joi.string().required(),
	paymentFields: Joi.object().allow(null)
});

module.exports = schema;
