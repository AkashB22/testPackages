const consul = require('consul'),
    client =  consul({host : "10.121.0.206", port: "8500"})

client.agent.service.list((error, result)=>{
    if(error) throw error;
    else{
        let checkNode = false;
        for(let node in result){
            if(node.includes("dewdrops-common-bff-services")){
                if(result[node]["Service"] === "dewdrops-common-bff-services") checkNode = true;
            }
        }
        if(!checkNode){
            const options = {
                Name: "redis-local",
                ID: 'redis-local-6379',
                Address: '127.0.0.1',
                Meta: null,
                Port: 6379
            };
            client.agent.service.register(options, (error)=>{
                if(error) throw error;
            })
        }
    }
})
 