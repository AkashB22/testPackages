var http = require('http'),
		httpProxy = require('http-proxy');
let express = require('./express');
var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 8000
  }
});
//
// Setup our server to proxy standard HTTP requests
//


var server = http.createServer(express);
//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
server.on('upgrade', function (req, socket, head) {
	console.log("ws connection");
  proxy.ws(req, socket, head);
});
 
server.listen(8001, (err)=>{
	if(err) console.log(err)
	else console.log("node server running in 8001")
});

process.on('uncaughtException', error=>{
	console.log(error);
})