let rp = require('request-promise').defaults({ simple: false });

var ps = [];
for (var i = 0; i < 100; i++) {
    var read_match_details = {
        method: "GET",
        uri: "https://dewdrops-qcvw.zycus.net/eproc/api/a/eproc/attachments/5eFfPvnFnd4QbjS7gICX5HpMQvKewbppyOWkBCskwb7bmXpPhjhk9ltSiopsS7fGO5D8z1mbj+AGjeVuFYhTAuItHm8Y2+jo+3b1ua6LTu2HBRCCViXr@QMoqOPYeG@fp0ZHQeVU2vx3DdM@AABw0w==/download",
        headers: {
            'cookie': "SAAS_COMMON_BASE_TOKEN_ID=5df55f30-8c91-4a61-9747-10a832c89be6",
            'modulename': "einvoice",
            'attachmentorigin': 0,
            'type': 0
        },
        // formData: {
        //     file: {
        //         value: fileStream,
        //         options: {
        //             filename: 'test.jpg',
        //             contentType: 'image/jpg'
        //         }
        //     }
        // }
    };
    ps.push(rp(read_match_details));
}

Promise.all(ps)
    .then((results) => {
        console.log(results.length); // Result of all resolve as an array
    }).catch(err => console.log(err));  // First rejected promise