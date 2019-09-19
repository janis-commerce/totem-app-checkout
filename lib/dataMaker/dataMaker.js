'use strict';

const orderSchema = require('./orderSchema');
const {
	NotExistOrEmptyError,
	NotExistInCartError
} = require('./dataMakerError');

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


	makeAddressData(cart) {
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
			complement: null,
			neighborhood: null,
			reference: null,
			geoCoordinates: []
		};
	}


	makeLogisticsInfo(logisticsInfo, slaId) {
		if(!logisticsInfo || !logisticsInfo.length)
			throw new NotExistOrEmptyError('logisticsInfo');

		return logisticsInfo.map(lgi => {
			const { slas, itemIndex } = lgi;

			const currentSla = slas.find(sla => sla.id === slaId);

			if(!currentSla)
				throw new NotExistInCartError('slaId');

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
			throw new NotExistOrEmptyError('items');

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
			throw new NotExistOrEmptyError('paymentData');

		const total = totals.find(tt => tt.id === 'Items');

		if(!total)
			throw new NotExistInCartError('total value');

		const { value } = total;
		const currentPayment = paymentData.paymentSystems.find(py => py.id.toString() === paymentSystemId.toString());

		if(!currentPayment)
			throw new NotExistInCartError('paymentSystem');

		return [
			{
				paymentSystem: paymentSystemId,
				referenceValue: value,
				value,
				installments: 1
			}
		];
	}


	/**
	 * @method makeOrder
	 * @description Helper function for make Object Valid for create a new Order
	 * @param {Object} data
	 * @returns {Object}
	 */
	makeOrder(data) {
		const { error } = orderSchema.validate(data);

		if(error)
			throw error;

		const {
			cart,
			clientData,
			paymentSystemId,
			slaId
		} = data;

		return {
			items: this.makeItemsData(cart.items),
			clientProfileData: this.makeClientData(clientData),
			shippingData: {
				id: 'shippingData',
				address: this.makeAddressData(cart),
				logisticsInfo: this.makeLogisticsInfo(cart.logisticsInfo, slaId)
			},
			paymentData: {
				id: 'paymentData',
				payments: this.makePaymentData(cart, paymentSystemId)
			}
		};
	}


	/**
	 * @method makePayments
	 * @description Helper function for make Object Valid for SendPaymentTransaction
	 * @param {Object} data
	 * @returns {Object}
	 */
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
			throw new NotExistOrEmptyError('paymentData');

		const total = totals.find(tt => tt.id === 'Items');

		if(!total)
			throw new NotExistInCartError('total value');

		const { value } = total;
		const currentPayment = paymentData.paymentSystems.find(py => py.id.toString() === paymentSystemId.toString());

		if(!currentPayment)
			throw new NotExistInCartError('paymentSystem');

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