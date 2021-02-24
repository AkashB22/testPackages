var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
    servers: [
        { 'host': '127.0.0.1', port: 12201 },
        { 'host': '127.0.0.2', port: 12201 }
    ],
    hostname: 'server.name', // the name of this host
                             // (optional, default: os.hostname())
    facility: 'Node.js',     // the facility for these log messages
                             // (optional, default: "Node.js")
    bufferSize: 1350         // max UDP packet size, should never exceed the
                             // MTU of your system (optional, default: 1400)
});
console.log(logger);
logger.log("What we've got here is...failure to communicate");
logger.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});
setTimeout(()=>{
    console.log("10 seconds done");
}, 100000)