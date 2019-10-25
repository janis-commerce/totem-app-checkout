
'use strict';

const mock = require('mock-require');

mock('@janiscommerce/mt188-card-reader', {
	MT188CardReader: class MT188CardReader {
		getPANWithRetries() { return Promise.resolve({}); }
	}
});
