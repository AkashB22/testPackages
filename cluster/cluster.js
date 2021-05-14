const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    console.log("master ", process.pid);
  // Keep track of http requests
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
      console.log("called ------", process.pid);
    //   console.log(cluster.workers);
      for (const id in cluster.workers) {
        cluster.workers[id].send({'cmd': "noNotification"});
      }
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    // console.log("Worker Process", cluster.workers[id].process.pid);
    cluster.workers[id].on('message', messageHandler);
  }

} else {
    console.log("Worker Process", process.pid);
  // Worker processes have a http server.
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // Notify master about the request
    console.log("called a worker process", process.pid);
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}

process.on('message', (msg)=>{
    console.log(msg);
    console.log(process.pid);
})