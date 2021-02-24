const fs = require('fs');
const rr = fs.createReadStream('test.txt');

rr.on('data', (data) => {
  console.log(`readable: ${data}`);
});
rr.on('end', () => {
  console.log('end');
});