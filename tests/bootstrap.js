
'use strict';

const mock = require('mock-require');

mock('@janiscommerce/mt188-card-reader', {
	MT188CardReader: {
		getPANWithRetries: () => Promise.resolve({})
	}
});
