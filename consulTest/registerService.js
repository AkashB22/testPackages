const consul = require('consul'),
    client =  consul({host : "192.168.15.220", port: "8500"}),
    options = {
        Name: "redis-local",
        ID: 'redis-local-6379',
        Address: '127.0.0.1',
        Meta: null,
        Port: 6379
      };

client.agent.service.register(options, (error)=>{
    if(error) throw error;
})

