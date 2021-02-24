var srv = require('http').createServer();
var io = require('socket.io')(srv);
var run = 0;
io.use(function(socket, next){
  run++; // 0 -> 1
  console.log(run);
  next();
});
io.use(function(socket, next) {
  run++; // 1 -> 2
  console.log(run);
  next();
});
var socket = require('socket.io-client')();
socket.on('connect', function(){
  // run == 2 at this time
  console.log(run);
});