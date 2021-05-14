let rp = require('request-promise');
let toughtCookie = require('tough-cookie');

function validateUrl(url, callback){
    let options = {
        method: 'GET',
        uri: url,
        headers: {
            'Cookie' : "SAAS_COMMON_BASE_TOKEN_ID=8b6e766a-83ed-4b54-ab90-cc324bab1344",
            "Content-Type": "application/json; charset=utf-8"
        }
    }

    rp(options)
        .then(result=>{
            return callback(null, result);
        })
        .catch(error=>{
            callback(error, null);
        })    
}


setInterval(()=>{
    const url = "http://localhost:3000/a/sht/migrate/publish";
    validateUrl(url, (error, result)=>{
        if(error){
            let errorObj = JSON.parse(error.error);
            const messages = errorObj.error.message;
            messages.forEach(element => {
                if(element.message && element.message.toString().toLowerCase().includes("failed")){
                    console.log(`${element.message}   -    ${Date.now()}`);
                }
            });
        } else{
            console.log("result");
        }
    });
}, 1000 * 60);