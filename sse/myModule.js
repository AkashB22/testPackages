let accept = require('./server');
let http = require('http');


http.createServer(accept.accept).listen(5000, ()=>{
    console.log('server running in 5000 http://localhost:5000');
})