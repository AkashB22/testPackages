let rp = require('request-promise');
// let toughtCookie = require('tough-cookie');

function validateUrl(url, method, payload, callback){
    let options = {
        method: method,
        uri: url,
        headers: {
            'Cookie' : "SAAS_COMMON_BASE_TOKEN_ID=c1e911a4-41de-4dd6-94fc-27e05990e65c",
            "Content-Type": "application/json; charset=utf-8"
        },
        body: payload,
        json: true
    }

    rp(options)
        .then(result=>{
            return callback(null, result);
        })
        .catch(error=>{
            return callback(error, null);
        })    
}


setInterval(()=>{
    const url = "http://localhost:3000/a/dd/batch",
        payload = {
            "data": [
            {
                "method": "GET",
                "url": "/a/tms/approvals/getDetailsByEmail"
            },
            {
                "method": "GET",
                "url": "/a/tms/themes/menus"
            },
            {
                "method": "GET",
                "url": "/a/dd/headers/getColor"
            },
            {
                "method": "GET",
                "url": "/a/tms/users/isCompanyAdmin"
            },
            {
                "method": "GET",
                "url": "/a/tms/users/getCompany"
            },
            {
                "method": "GET",
                "url": "/a/cns/notifications/getDismissPref"
            }
            ],
            "sse": true
        },
    method = "POST";
    validateUrl(url, method, payload, (error, result)=>{
        if(error){
            console.log(error.message);
        } else{
            console.log(result.requestID);
            const url = "http://localhost:3000/a/dd/batch/" + result.requestID,
            method = "GET",
            payload = undefined;
            validateUrl(url, method, payload, (error, result)=>{
                if(error){
                    console.log(error.message);
                } else{
                    console.log(result);
                    
                }
            })
        }
    });
}, 1000);