'use strict';

const orderSchema = require('./orderSchema');

class DataMaker {
	constructor({ seller = '1' } = {}) {
		this.seller = seller;
	}

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

	makeAddressData(cart, addressData) {
		const requiredProps = {
			complement: null,
			neighborhood: null,
			reference: null,
			geoCoordinates: []
		};

		if(addressData && Object.keys(addressData).length) {

			if(addressData.addressId)
				return addressData;

			return {
				...addressData,
				...requiredProps
			};
		}

		return {
			addressType: 'residential',
			receiverName: 'client ypf',
			postalCode: cart.postalCode,
			city: 'Ciudad Autónoma Buenos Aires',
			state: 'CIUDAD AUTÓNOMA DE BUENOS AIRES',
			country: 'ARG',
			street: 'street',
			number: '123',
			addressId: 'totemYpfAddress',
			...requiredProps
		};
	}

	makeLogisticsInfo(logisticsInfo, slaId) {
		if(!logisticsInfo || !logisticsInfo.length)
			throw new Error('logisticsInfo not exist or is empty');

		return logisticsInfo.map(lgi => {
			const { slas, itemIndex } = lgi;

			const currentSla = slas.find(sla => sla.id === slaId);

			if(!currentSla)
				throw new Error('Current sla not exist in cart');

			const { id: selectedSla, price } = currentSla;

			return {
				selectedSla,
				price,
				itemIndex
			};
		});
	}


	makeItemsData(items) {
		const requiredProps = {
			seller: this.seller,
			rewardValue: 0,
			offerings: [],
			priceTags: [],
			isGift: false
		};

		if(!items || !items.length)
			throw new Error('Items not exist or is empty');

		return items.map(item => {
			const { id, quantity, price } = item;

			return {
				id,
				quantity,
				price,
				...requiredProps
			};
		});
	}

	makePaymentData(cart, paymentSystemId) {
		const { paymentData, totals } = cart;

		if(!paymentData || !Object.keys(paymentData).length)
			throw new Error('paymentData not exist or is empty');

		const total = totals.find(tt => tt.id === 'Items');

		if(!total)
			throw new Error('Not exist total value in cart');

		const { value } = total;
		const currentPayment = paymentData.paymentSystems.find(py => py.id.toString() === paymentSystemId.toString());

		if(!currentPayment)
			throw new Error('Not exists paymentSystem in cart');

		return [
			{
				paymentSystem: paymentSystemId,
				referenceValue: value,
				value,
				installments: 1
			}
		];
	}

	makeOrder(data) {
		const { error } = orderSchema.validate(data);

		if(error)
			throw error;

		const {
			cart,
			clientData,
			addressData,
			paymentSystemId,
			slaId
		} = data;

		return {
			items: this.makeItemsData(cart.items),
			clientProfileData: this.makeClientData(clientData),
			shippingData: {
				id: 'shippingData',
				address: this.makeAddressData(cart, addressData),
				logisticsInfo: this.makeLogisticsInfo(cart.logisticsInfo, slaId)
			},
			paymentData: {
				id: 'paymentData',
				payments: this.makePaymentData(cart, paymentSystemId)
			}
		};
	}

	makePayments(data) {
		const { error } = orderSchema.validate(data);

		if(error)
			throw error;

		const {
			cart,
			paymentSystemId,
			paymentFields
		} = data;

		const { paymentData, totals } = cart;

		if(!paymentData || !Object.keys(paymentData).length)
			throw new Error('paymentData not exist or is empty');

		const total = totals.find(tt => tt.id === 'Items');

		if(!total)
			throw new Error('Not exist total value in cart');

		const { value } = total;
		const currentPayment = paymentData.paymentSystems.find(py => py.id.toString() === paymentSystemId.toString());

		if(!currentPayment)
			throw new Error('Not exists paymentSystem in cart');

		const {
			id: paymentSystem,
			name: paymentSystemName,
			groupName: group
		} = currentPayment;

		return {
			paymentSystem,
			paymentSystemName,
			group,
			value,
			installmentsValue: value,
			referenceValue: value,
			fields: paymentFields || null
		};

	}
}

module.exports = DataMaker;
