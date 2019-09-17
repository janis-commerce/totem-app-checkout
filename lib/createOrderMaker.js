'use strict';

class CreateOrderMaker {

	makeClientData(clientData) {
		const requiredProps = {
			corporateName: null,
			tradeName: null,
			corporateDocument: null,
			stateInscription: null,
			corporatePhone: null,
			isCorporate: false
		};

		if(clientData && Object.keys(clientData).length) {
			return {
				...clientData,
				...requiredProps
			};
		}

		return {
			email: 'client@totemypf.com',
			firstName: 'client',
			lastName: 'totem',
			document: '99999999',
			documentType: 'dni',
			phone: '1111111111',
			...requiredProps
		};
	}

	makeAddressData(addresData) {
		const requiredProps = {
			complement: null,
			neighborhood: null,
			reference: null,
			geoCoordinates: []
		};

		if(addresData && Object.keys(addresData).length) {
			return {
				...addresData,
				...requiredProps
			};
		}

		return {
			addressType: 'residential',
			receiverName: 'client ypf',
			postalCode: '1111',
			city: 'Ciudad Autónoma Buenos Aires',
			state: 'CIUDAD AUTÓNOMA DE BUENOS AIRES',
			country: 'ARG',
			street: 'street',
			number: '123',
			...requiredProps
		};
	}

	makeLogisticsData(items, logisticsData) {
		if(!logisticsData || !Object.keys(logisticsData).length)
			throw new Error('logisticsData not exist or is empty');

		return items.map((item, itemIndex) => ({
			...logisticsData,
			itemIndex
		}));
	}


	makeItemsData(items) {
		const requiredProps = {
			seller: '1',
			rewardValue: 0,
			offerings: [],
			priceTags: [],
			isGift: false
		};

		if(!items || !items.length)
			throw new Error('Items not exist or is empty');

		return items.map(item => ({
			...item,
			...requiredProps
		}));
	}

	makePaymentData(paymentData) {
		if(!paymentData || !Object.keys(paymentData).length)
			throw new Error('paymentData not exist or is empty');

		return [paymentData];
	}

	make(data) {
		return {
			items: this.makeItemsData(data.items),
			clientProfileData: this.makeClientData(data.clientData),
			shippingData: {
				id: 'shippingData',
				address: this.makeAddressData(data.addresData),
				logisticsInfo: this.makeLogisticsData(data.items, data.logisticsData)
			},
			paymentData: {
				id: 'paymentData',
				payments: this.makePaymentData(data.paymentData)
			}
		};
	}
}

module.exports = CreateOrderMaker;
