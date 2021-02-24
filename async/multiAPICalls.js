let rp = require('request-promise').defaults({ simple: false });
let async = require('async');
let fs = require('fs');

let errorCount = 0;
let successCount = 0;
let loopCount = 2;


function callURL(options, times, callback){
   try {
        return rp(options);
   } catch (error) {
       return Promise.reject(error, null);
   }
}

async function loopApiCall(times){
    try {
        let result;
        const resultArr = [];
        for(let i = 0; i < times; i++){
            let fileStream = fs.createReadStream('./test.jpg');
            const options = {
                method: "POST",
                uri: "http://localhost:3001/a/irequest/attachments",
                headers: {
                    'cookie': "SAAS_COMMON_BASE_TOKEN_ID=6cef7f9e-1d73-4e90-94d8-6cdaf7ebd833",
                    'modulename': "report",
                    // 'attachmentorigin': 0,
                    // 'type': 0
                },
                formData: {
                    file: {
                        value: fileStream,
                        options: {
                            filename: 'test.jpg',
                            contentType: 'image/jpg'
                        }
                    }
                }
            };
            result = await callURL(options);
            successCount++;
            console.log("successCount----------- " + successCount);
            resultArr.push(JSON.parse(result).statusCode);
        }
        return resultArr;
    } catch (error) {
        return Promise.reject(error)
    }
}


async function main(){
    try {
        const result = await loopApiCall(loopCount);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

main();