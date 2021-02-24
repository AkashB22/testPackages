let rp = require('request-promise').defaults({ simple: false });

let fs = require('fs');
let fileStream = fs.createReadStream('./test.jpg');

var ps = [];
for (var i = 0; i < 40; i++) {
    var read_match_details = {
        method: "POST",
        uri: "http://localhost:3001/a/einvoice/attachments",
        headers: {
            'cookie': "SAAS_COMMON_BASE_TOKEN_ID=9d73c49a-1a15-4e59-8101-7c374668304f",
            'modulename': "einvoice",
            'attachmentorigin': 0,
            'type': 0
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
    ps.push(rp(read_match_details));
}

Promise.all(ps)
    .then((results) => {
        console.log(results.length); // Result of all resolve as an array
    }).catch(err => console.log(err));  // First rejected promise