'use strict';

const newOrderData = {
	items: [
		{
			id: '9',
			quantity: 1,
			seller: '1',
			price: 11500,
			rewardValue: 0,
			offerings: [],
			priceTags: [],
			isGift: false
		}
	],
	clientProfileData: {
		email: 'user@fizzmod.com',
		firstName: 'user',
		lastName: 'fizzmod',
		document: '078051120',
		documentType: 'ssn',
		phone: '1234567890',
		corporateName: null,
		tradeName: null,
		corporateDocument: null,
		stateInscription: null,
		corporatePhone: null,
		isCorporate: false
	},
	shippingData: {
		id: 'shippingData',
		address: {
			addressType: 'residential',
			receiverName: 'user VTEX',
			postalCode: '1414',
			city: 'Ciudad Autónoma Buenos Aires',
			state: 'CIUDAD AUTÓNOMA DE BUENOS AIRES',
			country: 'ARG',
			street: 'Calle Falsa',
			number: '123',
			neighborhood: null,
			complement: '1',
			reference: null,
			geoCoordinates: []
		},
		logisticsInfo: [
			{
				itemIndex: 0,
				selectedSla: 'A domicilio',
				price: 25000,
				deliveryWindow: {
					startDateUtc: '2019-09-20T10:00:00+00:00',
					endDateUtc: '2019-09-20T22:00:00+00:00',
					price: 0,
					lisPrice: 0,
					tax: 0
				}
			}
		]
	},
	paymentData: {
		id: 'paymentData',
		payments: [
			{
				paymentSystem: '203',
				referenceValue: 36500,
				value: 36500,
				installments: 1
			}
		]
	}
};

module.exports = {
	newOrderData
};
