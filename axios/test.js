// var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'http://192.168.1.16:8180/zsp/dewdrops/restapi/supplier-endpoint/authenticateSuppContactInTMS',
//   'headers': {
//     'Accept': 'application/json, text/plain, */*',
//     'User-Agent': 'axios/0.20.0',
//     'Host': '192.168.1.16:8180',
//     'Connection': 'close',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "businessEntity": [
//       {
//         "header": {
//           "trackingNumber": "36c2f580-d36b-11eb-93dc-eb5a2d58b05a-undefined",
//           "locale": "en-US"
//         },
//         "entityData": {
//           "email": "priyankab2@zycus.com",
//           "password": "Pass@123",
//           "userAgent": "chrome",
//           "tenantId": "-1",
//           "ipAddress": "127.0.0.1",
//           "sessionTokenId": "ftBaocy8cZZWorenkUevQrMkaBeAJHY3",
//           "domain": "local.dewdropsbff.zycus.net"
//         }
//       }
//     ]
//   })

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

var http = require('follow-redirects').http;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'localhost',
  'port': 5000,
  'path': '/',
  'headers': {
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.on("error", function (error) {
  console.error(error);
});

req.end();
