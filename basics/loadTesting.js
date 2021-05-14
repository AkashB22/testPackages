'use strict';

/**
 * Sample request generator usage.
 * Contributed by jjohnsonvng:
 * https://github.com/alexfernandez/loadtest/issues/86#issuecomment-211579639
 */

const loadtest = require('loadtest');

const options = {
	url: 'http://10.121.1.47:3000/u/dd/health/check',
	concurrency: 5,
	method: 'GET',
	// body:'{"data":[{"method":"GET","url":"/a/tms/approvals/getDetailsByEmail"},{"method":"GET","url":"/a/tms/themes/menus"},{"method":"GET","url":"/a/dd/headers/getColor"},{"method":"GET","url":"/a/tms/users/isCompanyAdmin"},{"method":"GET","url":"/a/tms/users/getCompany"},{"method":"GET","url":"/a/cns/notifications/getDismissPref"}],"sse":true}',
	maxSeconds:30,
    // headers : {
    //     "Cookie": "REMEMBER_ME_COOKIE=false; sessionID=s%3AmDDULxk7vcDjiJq1nqZKLEc3i7MP7aO3.jcBUXzqPJGPS2OpJTm%2FVHWxmBHSA6Y%2B2oes264P%2BMiY; SAAS_COMMON_BASE_TOKEN_ID=5548ba48-7b80-4740-b86d-11ca21a6ae09; XSRF-TOKEN=uVeD1QIK-bdPgWPuNBXNHbTKEuAsQNwqjtno",
    //     "XSRF-TOKEN": "uVeD1QIK-bdPgWPuNBXNHbTKEuAsQNwqjtno"
    // }
};

loadtest.loadTest(options, (error, results) => {
	if (error) {
		return console.error('Got an error: %s', error);
	}
	console.log(results);
	console.log('Tests run successfully');
});