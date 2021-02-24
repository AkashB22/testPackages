const consul = require('consul'),
    client =  consul({host : "10.121.0.206", port: "8500"})

client.agent.service.list((error, result)=>{
    if(error) throw error;
    else{
        let checkNode = false;
        for(let node in result){
            if(node.includes("dewdrops-common-bff-services_node")){
                checkNode = true;
            }
        }
        if(checkNode){
            client.agent.service.deregister("dewdrops-common-bff-services_node", (error)=>{
                if(error) throw error;
            })
        }
    }
})

