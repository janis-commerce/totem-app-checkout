'use strict';

const orderSimulated = {
	items: [
		{
			id: '8',
			requestIndex: 0,
			quantity: 1,
			seller: '1',
			sellerChain: ['1'],
			tax: 0,
			priceValidUntil: '2020-09-19T13:43:18.5310218Z',
			price: 11500,
			listPrice: 11500,
			rewardValue: 0,
			sellingPrice: 11500,
			offerings: [],
			priceTags: [],
			measurementUnit: 'un',
			unitMultiplier: 1,
			parentItemIndex: null,
			parentAssemblyBinding: null
		},
		{
			id: '7',
			requestIndex: 1,
			quantity: 1,
			seller: '1',
			sellerChain: ['1'],
			tax: 0,
			priceValidUntil: '2020-09-19T13:43:18.5310258Z',
			price: 6800,
			listPrice: 6800,
			rewardValue: 0,
			sellingPrice: 6800,
			offerings: [],
			priceTags: [],
			measurementUnit: 'un',
			unitMultiplier: 1,
			parentItemIndex: null,
			parentAssemblyBinding: null
		}
	],
	ratesAndBenefitsData: {
		rateAndBenefitsIdentifiers: [],
		teaser: []
	},
	paymentData: {
		installmentOptions: [
			{
				paymentSystem: '2',
				bin: null,
				paymentName: 'Visa',
				paymentGroupName: 'creditCardPaymentGroup',
				value: 18300,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 18300,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 18300,
								total: 18300
							}
						]
					},
					{
						count: 3,
						hasInterestRate: false,
						interestRate: 0,
						value: 6100,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 3,
								hasInterestRate: false,
								interestRate: 0,
								value: 6100,
								total: 18300
							}
						]
					},
					{
						count: 6,
						hasInterestRate: false,
						interestRate: 0,
						value: 3050,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 6,
								hasInterestRate: false,
								interestRate: 0,
								value: 3050,
								total: 18300
							}
						]
					},
					{
						count: 12,
						hasInterestRate: false,
						interestRate: 0,
						value: 1525,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 12,
								hasInterestRate: false,
								interestRate: 0,
								value: 1525,
								total: 18300
							}
						]
					}
				]
			},
			{
				paymentSystem: '4',
				bin: null,
				paymentName: 'Mastercard',
				paymentGroupName: 'creditCardPaymentGroup',
				value: 18300,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 18300,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 18300,
								total: 18300
							}
						]
					},
					{
						count: 2,
						hasInterestRate: false,
						interestRate: 0,
						value: 9150,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 2,
								hasInterestRate: false,
								interestRate: 0,
								value: 9150,
								total: 18300
							}
						]
					},
					{
						count: 3,
						hasInterestRate: false,
						interestRate: 0,
						value: 6100,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 3,
								hasInterestRate: false,
								interestRate: 0,
								value: 6100,
								total: 18300
							}
						]
					},
					{
						count: 6,
						hasInterestRate: false,
						interestRate: 0,
						value: 3050,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 6,
								hasInterestRate: false,
								interestRate: 0,
								value: 3050,
								total: 18300
							}
						]
					},
					{
						count: 12,
						hasInterestRate: false,
						interestRate: 0,
						value: 1525,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 12,
								hasInterestRate: false,
								interestRate: 0,
								value: 1525,
								total: 18300
							}
						]
					}
				]
			},
			{
				paymentSystem: '201',
				bin: null,
				paymentName: 'Pago TEST',
				paymentGroupName: 'custom201PaymentGroupPaymentGroup',
				value: 18300,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 18300,
						total: 18300,
						sellerMerchantInstallments: [
							{
								id: 'ARYPFQA',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 18300,
								total: 18300
							}
						]
					}
				]
			}
		],
		paymentSystems: [
			{
				id: 201,
				name: 'Pago TEST',
				groupName: 'custom201PaymentGroupPaymentGroup',
				validator: null,
				stringId: '201',
				template: 'custom201PaymentGroupPaymentGroup-template',
				requiresDocument: false,
				isCustom: true,
				description: '',
				requiresAuthentication: false,
				dueDate: '2019-09-29T13:34:56.4140532Z',
				availablePayments: null
			},
			{
				id: 4,
				name: 'Mastercard',
				groupName: 'creditCardPaymentGroup',
				validator: null,
				stringId: '4',
				template: 'creditCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-26T13:34:56.4140532Z',
				availablePayments: null
			},
			{
				id: 2,
				name: 'Visa',
				groupName: 'creditCardPaymentGroup',
				validator: null,
				stringId: '2',
				template: 'creditCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-26T13:34:56.4140532Z',
				availablePayments: null
			}
		],
		payments: [],
		giftCards: [],
		giftCardMessages: [],
		availableAccounts: [],
		availableTokens: []
	},
	selectableGifts: [],
	marketingData: null,
	postalCode: '1000',
	country: 'ARG',
	logisticsInfo: [
		{
			itemIndex: 0,
			addressId: null,
			selectedSla: null,
			selectedDeliveryChannel: null,
			quantity: 1,
			shipsTo: ['ARG'],
			slas: [
				{
					id: 'Normal',
					deliveryChannel: 'delivery',
					name: 'Normal',
					deliveryIds: [
						{
							courierId: '1',
							warehouseId: '1_1',
							dockId: '1',
							courierName: 'Transportadora',
							quantity: 1
						}
					],
					shippingEstimate: '0bd',
					shippingEstimateDate: null,
					lockTTL: null,
					availableDeliveryWindows: [],
					deliveryWindow: null,
					price: 0,
					listPrice: 0,
					tax: 0,
					pickupStoreInfo: {
						isPickupStore: false,
						friendlyName: null,
						address: null,
						additionalInfo: null,
						dockId: null
					},
					pickupPointId: null,
					pickupDistance: 0,
					polygonName: null
				}
			],
			deliveryChannels: [
				{
					id: 'delivery'
				}
			]
		},
		{
			itemIndex: 1,
			addressId: null,
			selectedSla: null,
			selectedDeliveryChannel: null,
			quantity: 1,
			shipsTo: ['ARG'],
			slas: [
				{
					id: 'Normal',
					deliveryChannel: 'delivery',
					name: 'Normal',
					deliveryIds: [
						{
							courierId: '1',
							warehouseId: '1_1',
							dockId: '1',
							courierName: 'Transportadora',
							quantity: 1
						}
					],
					shippingEstimate: '0bd',
					shippingEstimateDate: null,
					lockTTL: null,
					availableDeliveryWindows: [],
					deliveryWindow: null,
					price: 0,
					listPrice: 0,
					tax: 0,
					pickupStoreInfo: {
						isPickupStore: false,
						friendlyName: null,
						address: null,
						additionalInfo: null,
						dockId: null
					},
					pickupPointId: null,
					pickupDistance: 0,
					polygonName: null
				}
			],
			deliveryChannels: [
				{
					id: 'delivery'
				}
			]
		}
	],
	messages: [],
	purchaseConditions: {
		itemPurchaseConditions: [
			{
				id: '8',
				seller: '1',
				sellerChain: ['1'],
				slas: [
					{
						id: 'Normal',
						deliveryChannel: 'delivery',
						name: 'Normal',
						deliveryIds: [
							{
								courierId: '1',
								warehouseId: '1_1',
								dockId: '1',
								courierName: 'Transportadora',
								quantity: 1
							}
						],
						shippingEstimate: '0bd',
						shippingEstimateDate: null,
						lockTTL: null,
						availableDeliveryWindows: [],
						deliveryWindow: null,
						price: 0,
						listPrice: 0,
						tax: 0,
						pickupStoreInfo: {
							isPickupStore: false,
							friendlyName: null,
							address: null,
							additionalInfo: null,
							dockId: null
						},
						pickupPointId: null,
						pickupDistance: 0,
						polygonName: null
					}
				],
				price: 11500,
				listPrice: 11500
			},
			{
				id: '7',
				seller: '1',
				sellerChain: ['1'],
				slas: [
					{
						id: 'Normal',
						deliveryChannel: 'delivery',
						name: 'Normal',
						deliveryIds: [
							{
								courierId: '1',
								warehouseId: '1_1',
								dockId: '1',
								courierName: 'Transportadora',
								quantity: 1
							}
						],
						shippingEstimate: '0bd',
						shippingEstimateDate: null,
						lockTTL: null,
						availableDeliveryWindows: [],
						deliveryWindow: null,
						price: 0,
						listPrice: 0,
						tax: 0,
						pickupStoreInfo: {
							isPickupStore: false,
							friendlyName: null,
							address: null,
							additionalInfo: null,
							dockId: null
						},
						pickupPointId: null,
						pickupDistance: 0,
						polygonName: null
					}
				],
				price: 6800,
				listPrice: 6800
			}
		]
	},
	pickupPoints: [],
	subscriptionData: null,
	totals: [
		{
			id: 'Items',
			name: 'Total de los items',
			value: 18300
		}
	],
	itemMetadata: null
};

const orderCreated = {
	transactionData: {
		merchantTransactions: [
			{
				transactionId: 'TRANSACTION_ID'
			}
		]
	}
};

module.exports = {
	orderSimulated,
	orderCreated
};
