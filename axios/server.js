// Node.js program to demonstrate the 
// response.write() Method

// Importing http module
var http = require('http');

// Setting up PORT
const PORT = process.env.PORT || 5000;

// Creating http Server
var httpServer = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // Writing string data
    response.write("Heyy geeksforgeeks");
    response.write("Heyy geeksforgeeks2");
    response.write("Heyy geeksforgeeks3");

    // Prints Output on the browser in response
      response.end(' ok');
});

// Listening to http Server
httpServer.listen(PORT, () => {
    console.log("Server is running at port 5000...");
});