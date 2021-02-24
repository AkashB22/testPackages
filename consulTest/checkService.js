const consul = require('consul'),
    client =  consul({host : "10.121.0.206", port: "8500"});

client.health.service('testService', (error, result)=>{
    if(error) throw error;
    if(result.length === 0) console.log("no service found");
    else console.log(result[0].Service);
})
