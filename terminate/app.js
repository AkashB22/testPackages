const http = require('http')
const terminate = require('./terminate')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.ends('okay');
});

server.listen(5000, ()=>{
    console.log('server running in port 5000')
});

const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))