var HTMLParser = require('node-html-parser');
const swaggerHtml = require('fs').readFileSync('D:/softwares/swagger-editor-master/swagger-editor-master/index.html')
var root = HTMLParser.parse(swaggerHtml);
console.log(root.querySelector('.ace_text-input'));
console.log(root.toString());