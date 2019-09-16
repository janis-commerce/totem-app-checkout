'use strict';

const cartExample = {
	orderFormId: '2f8a2a5edce741bf93a8273b0dfb4366',
	salesChannel: '1',
	loggedIn: false,
	isCheckedIn: false,
	storeId: null,
	checkedInPickupPointId: null,
	allowManualPrice: false,
	canEditData: true,
	userProfileId: null,
	userType: null,
	ignoreProfileData: false,
	value: 0,
	messages: [],
	items: [],
	selectableGifts: [],
	totalizers: [],
	shippingData: null,
	clientProfileData: {
		email: null,
		firstName: null,
		lastName: null,
		document: null,
		documentType: null,
		phone: null,
		corporateName: null,
		tradeName: null,
		corporateDocument: null,
		stateInscription: null,
		corporatePhone: null,
		isCorporate: false,
		profileCompleteOnLoading: null,
		profileErrorOnLoading: null,
		customerClass: null
	},
	paymentData: {
		installmentOptions: [],
		paymentSystems: [],
		payments: [],
		giftCards: [],
		giftCardMessages: [],
		availableAccounts: [],
		availableTokens: []
	},
	marketingData: null,
	sellers: [],
	clientPreferencesData: {
		locale: 'es-AR',
		optinNewsLetter: null
	},
	commercialConditionData: null,
	storePreferencesData: {
		countryCode: 'ARG',
		saveUserData: true,
		timeZone: 'Argentina Standard Time',
		currencyCode: 'ARS',
		currencyLocale: 11274,
		currencySymbol: '$',
		currencyFormatInfo: {
			currencyDecimalDigits: 2,
			currencyDecimalSeparator: ',',
			currencyGroupSeparator: '.',
			currencyGroupSize: 3,
			startsWithCurrencySymbol: true
		}
	},
	giftRegistryData: null,
	openTextField: null,
	invoiceData: null,
	customData: null,
	itemMetadata: null,
	hooksData: null,
	ratesAndBenefitsData: null,
	subscriptionData: null,
	itemsOrdination: null
};


const cartWithItemsExample = {
	orderFormId: '378364e5f33c42409b995f73064dbf17',
	salesChannel: '1',
	loggedIn: false,
	isCheckedIn: false,
	storeId: null,
	checkedInPickupPointId: null,
	allowManualPrice: false,
	canEditData: true,
	userProfileId: null,
	userType: null,
	ignoreProfileData: false,
	value: 206400,
	messages: [],
	items: [
		{
			id: '17'
		},
		{
			id: '14'
		}
	],
	selectableGifts: [],
	totalizers: [
		{
			id: 'Items',
			name: 'Total de los items',
			value: 206400
		}
	],
	shippingData: {
		address: null,
		logisticsInfo: [
			{
				itemIndex: 0,
				selectedSla: null,
				selectedDeliveryChannel: null,
				addressId: null,
				slas: [],
				shipsTo: [
					'ARG'
				],
				itemId: '17',
				deliveryChannels: [
					{
						id: 'delivery'
					}
				]
			},
			{
				itemIndex: 1,
				selectedSla: null,
				selectedDeliveryChannel: null,
				addressId: null,
				slas: [],
				shipsTo: [
					'ARG'
				],
				itemId: '14',
				deliveryChannels: [
					{
						id: 'delivery'
					}
				]
			}
		],
		selectedAddresses: [],
		availableAddresses: [],
		pickupPoints: []
	},
	clientProfileData: null,
	paymentData: {
		installmentOptions: [
			{
				paymentSystem: '2',
				bin: null,
				paymentName: null,
				paymentGroupName: null,
				value: 206400,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 206400,
						total: 206400,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 206400,
								total: 206400
							}
						]
					}
				]
			},
			{
				paymentSystem: '4',
				bin: null,
				paymentName: null,
				paymentGroupName: null,
				value: 206400,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 206400,
						total: 206400,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 206400,
								total: 206400
							}
						]
					}
				]
			},
			{
				paymentSystem: '10',
				bin: null,
				paymentName: null,
				paymentGroupName: null,
				value: 206400,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 206400,
						total: 206400,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 206400,
								total: 206400
							}
						]
					}
				]
			},
			{
				paymentSystem: '203',
				bin: null,
				paymentName: null,
				paymentGroupName: null,
				value: 206400,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 206400,
						total: 206400,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 206400,
								total: 206400
							}
						]
					}
				]
			}
		],
		paymentSystems: [
			{
				id: 203,
				name: 'Pago en Tienda',
				groupName: 'custom203PaymentGroupPaymentGroup',
				validator: {
					regex: null,
					mask: null,
					cardCodeRegex: null,
					cardCodeMask: null,
					weights: null,
					useCvv: false,
					useExpirationDate: false,
					useCardHolderName: false,
					useBillingAddress: false
				},
				stringId: '203',
				template: 'custom203PaymentGroupPaymentGroup-template',
				requiresDocument: false,
				isCustom: true,
				description: 'Pago en Tienda',
				requiresAuthentication: false,
				dueDate: '2019-09-23T22:24:54.1355662Z',
				availablePayments: null
			},
			{
				id: 2,
				name: 'Visa',
				groupName: 'creditCardPaymentGroup',
				validator: {
					regex: '^4[0-9]{15}$',
					mask: '9999 9999 9999 9999',
					cardCodeRegex: '^[0-9]{3}$',
					cardCodeMask: '999',
					weights: [
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2
					],
					useCvv: true,
					useExpirationDate: true,
					useCardHolderName: true,
					useBillingAddress: true
				},
				stringId: '2',
				template: 'creditCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-20T22:24:54.1355662Z',
				availablePayments: null
			},
			{
				id: 4,
				name: 'Mastercard',
				groupName: 'creditCardPaymentGroup',
				validator: {
					regex: '',
					mask: '9999 9999 9999 9999',
					cardCodeRegex: '^[0-9]{3}$',
					cardCodeMask: '999',
					weights: [
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2
					],
					useCvv: true,
					useExpirationDate: true,
					useCardHolderName: true,
					useBillingAddress: true
				},
				stringId: '4',
				template: 'creditCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-20T22:24:54.1355662Z',
				availablePayments: null
			},
			{
				id: 10,
				name: 'Visa Electron',
				groupName: 'debitCardPaymentGroup',
				validator: {
					regex: '^4[0-9]{15}$',
					mask: '9999 9999 9999 9999',
					cardCodeRegex: '^[0-9]{3}$',
					cardCodeMask: '999',
					weights: [
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2,
						1,
						2
					],
					useCvv: true,
					useExpirationDate: true,
					useCardHolderName: true,
					useBillingAddress: true
				},
				stringId: '10',
				template: 'debitCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-20T22:24:54.1355662Z',
				availablePayments: null
			}
		],
		payments: [],
		giftCards: [],
		giftCardMessages: [],
		availableAccounts: [],
		availableTokens: []
	},
	marketingData: null,
	sellers: [
		{
			id: '1',
			name: 'FizzmodArg',
			logo: ''
		}
	],
	clientPreferencesData: null,
	commercialConditionData: null,
	storePreferencesData: {
		countryCode: 'ARG',
		saveUserData: true,
		timeZone: 'Argentina Standard Time',
		currencyCode: 'ARS',
		currencyLocale: 11274,
		currencySymbol: '$',
		currencyFormatInfo: {
			currencyDecimalDigits: 2,
			currencyDecimalSeparator: ',',
			currencyGroupSeparator: '.',
			currencyGroupSize: 3,
			startsWithCurrencySymbol: true
		}
	},
	giftRegistryData: null,
	openTextField: null,
	invoiceData: null,
	customData: null,
	itemMetadata: {
		items: [
			{
				id: '17',
				seller: '1',
				name: 'Skip Soap Low Liquid Clothing Foam Bottle 800ml',
				skuName: 'Skip Soap Low Liquid Clothing Foam Bottle 800ml',
				productId: '17',
				refId: 'ENG-54322',
				ean: '1238976546782',
				imageUrl: 'http://fizzmodarg.vteximg.com.br/arquivos/ids/200396-55-55/skip.jpg?v=636722620392330000',
				detailUrl: '/skip-soap-low-liquid-clothing-foam-bottle-800ml/p',
				assemblyOptions: []
			},
			{
				id: '14',
				seller: '1',
				name: 'Papas Pringles Original 137g',
				skuName: 'Papas Pringles Original 137g',
				productId: '14',
				refId: '546',
				ean: '6579211243567',
				imageUrl: 'http://fizzmodarg.vteximg.com.br/arquivos/ids/200380-55-55/papas-pringles.jpg?v=636613012627500000',
				detailUrl: '/papas-pringles-original-137g/p',
				assemblyOptions: []
			}
		]
	},
	hooksData: null,
	ratesAndBenefitsData: {
		rateAndBenefitsIdentifiers: [],
		teaser: []
	},
	subscriptionData: null,
	itemsOrdination: null
};

const cartSimulationExample = {
	items: [
		{
			id: '17',
			requestIndex: 0,
			quantity: 1,
			seller: '1',
			sellerChain: [
				'1'
			],
			tax: 0,
			priceValidUntil: '2020-09-13T23:17:21.576919Z',
			price: 29800,
			listPrice: 29800,
			rewardValue: 0,
			sellingPrice: 29800,
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
				value: 29800,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 29800,
						total: 29800,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 29800,
								total: 29800
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
				value: 29800,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 29800,
						total: 29800,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 29800,
								total: 29800
							}
						]
					}
				]
			},
			{
				paymentSystem: '10',
				bin: null,
				paymentName: 'Visa Electron',
				paymentGroupName: 'debitCardPaymentGroup',
				value: 29800,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 29800,
						total: 29800,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 29800,
								total: 29800
							}
						]
					}
				]
			},
			{
				paymentSystem: '203',
				bin: null,
				paymentName: 'Pago en Tienda',
				paymentGroupName: 'custom203PaymentGroupPaymentGroup',
				value: 29800,
				installments: [
					{
						count: 1,
						hasInterestRate: false,
						interestRate: 0,
						value: 29800,
						total: 29800,
						sellerMerchantInstallments: [
							{
								id: 'FIZZMODARG',
								count: 1,
								hasInterestRate: false,
								interestRate: 0,
								value: 29800,
								total: 29800
							}
						]
					}
				]
			}
		],
		paymentSystems: [
			{
				id: 203,
				name: 'Pago en Tienda',
				groupName: 'custom203PaymentGroupPaymentGroup',
				validator: null,
				stringId: '203',
				template: 'custom203PaymentGroupPaymentGroup-template',
				requiresDocument: false,
				isCustom: true,
				description: 'Pago en Tienda',
				requiresAuthentication: false,
				dueDate: '2019-09-23T23:17:19.2873462Z',
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
				dueDate: '2019-09-20T23:17:19.2873462Z',
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
				dueDate: '2019-09-20T23:17:19.2873462Z',
				availablePayments: null
			},
			{
				id: 10,
				name: 'Visa Electron',
				groupName: 'debitCardPaymentGroup',
				validator: null,
				stringId: '10',
				template: 'debitCardPaymentGroup-template',
				requiresDocument: false,
				isCustom: false,
				description: null,
				requiresAuthentication: false,
				dueDate: '2019-09-20T23:17:19.2873462Z',
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
	postalCode: null,
	country: 'ARG',
	logisticsInfo: [
		{
			itemIndex: 0,
			addressId: null,
			selectedSla: null,
			selectedDeliveryChannel: null,
			quantity: 1,
			shipsTo: [
				'ARG'
			],
			slas: [],
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
				id: '17',
				seller: '1',
				sellerChain: [
					'1'
				],
				slas: [],
				price: 29800,
				listPrice: 29800
			}
		]
	},
	pickupPoints: [],
	subscriptionData: null,
	totals: [
		{
			id: 'Items',
			name: 'Total de los items',
			value: 29800
		}
	],
	itemMetadata: null
};


module.exports = {
	cartExample,
	cartWithItemsExample,
	cartSimulationExample
};
