let fs = require('fs');

fs.readFile('response.pdf', (err, data) => {
    if (err) throw err;
    console.log(data);
});
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));