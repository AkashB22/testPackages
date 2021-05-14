let jsonData = require('./test.json');
const path = require('path');

if(require.cache[path.resolve(__dirname + '/./test.json')]){
    console.log('cache removed');
    delete require.cache[path.resolve('./test.json')];
}
console.log(jsonData);