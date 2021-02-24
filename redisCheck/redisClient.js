console.log("test");
const Redis = require("ioredis");
/*const client = new Redis.Cluster(
  [
    {
      host: "master.redis-qcaws-1.vxxutg.aps1.cache.amazonaws.com",
      port: 6379
    },
  ],
  {
    dnsLookup: (address, callback) => callback(null, address),
    redisOptions: {
      tls: {
        checkServerIdentity: (host, cert) => {
        // skip certificate hostname validation
                 return undefined
         }
      },
      password: "REDIS#qcaws#1234"
    },
  }
);*/
/*const client = new Redis.Cluster(
  {
      host: "master.redis-qcaws-1.vxxutg.aps1.cache.amazonaws.com",
      port: 6379,
    password: "REDIS#qcaws#1234"
  }
);*/
const client = new Redis({"sentinels":[{"host":"10.121.0.46","port":26379},{"host":"10.121.1.47","port":26379},{"host":"10.121.1.48","port":26379}],"name":"session01","password":"bacardi@123","db":0});
client.on('error', (error)=>{
  console.log("error in connection");
  console.log(error);
});
for(let i=0; i<10010; i++){
  const key = `dewdropsBFF__925e083c-99f3-40e7-908e-26549be45368${i}__productDomain_check`
  client.set(key, "bar222");
  console.log(key);
}
// client.get("foo", function (err, result) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Promise resolves to "bar"
//   }
// });
client.quit();
