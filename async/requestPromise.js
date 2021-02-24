let rp = require('request-promise');

function validateUrl(url, callback){
    let options = {
        method: 'GET',
        uri: url
    }

    rp(options)
        .then(result=>{
            console.log("result");
            return callback(url);
        })
        .catch(error=>{
            console.log("error");
            callback(null);
        })    
}

const url = "https://zycus-sht-qc.s3.ap-south-1.amazonaws.com/SHT/054508f8-2757-4e33-8df6-ac2f4e1fbc09/sht/1588060513106_858309.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAY5ENDKJ5QBLHN4W3%2F20200428%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20200428T075513Z&X-Amz-Expires=60&X-Amz-Security-Token=FwoGZXIvYXdzELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDLFU5MQbzYF1WujBUSK5AX46Em6n%2BBI2uLHLqohtypWNj93643T%2Baag6S9%2BXe34eb6tvAD6TPbqBYdfJYxBqdCM8xvpn0lKfHabNEM1ySPiNPox0A3cB8wrPFlcpMjV8y0q4C50CQr5SMPl61upxykVgb33siHKruZxY6DTjmIoXEiMA7ohTMoSDQmJNEg4nHJ%2FugauIgXQsX6YvSGB3UN08ur7ZqYzg1dLTfsHsyUUkqOMbclRxvlB06zU8x%2BLigKxgTyrMzf%2FLKP69n%2FUFMi2NlOZyt9irIUn3I6%2BOb2QlHsnELKaH6KSBPgsb3WglA%2BK9l0i0Q67E9xOB0Fs%3D&X-Amz-Signature=bc3adb12dfd91db628e272d69c358026b48c9c3c79a8898418ff0db014eed4a6&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20charset%3Dutf-8%3B%20filename%3D858309.jpg";
validateUrl(url, (validUrl)=>{
    if(validUrl) return console.log(validUrl);
    return console.log(null);
});

console.log("done calling");