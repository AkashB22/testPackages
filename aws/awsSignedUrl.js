const rp = require('request-promise').defaults({ simple: false }),
    async = require('async')
    awsCloudFrontSign = require('aws-cloudfront-sign')
    moment = require('moment')
    crypto = require('crypto');

function getPrivateKey(request= null, callback){
    try {
        async.waterfall([
            (callback)=>{
                const options = {
                    uri: 'http://internal-aws-keymanage-api-157453501.ap-south-1.elb.amazonaws.com/api/v1/aws/get_cloudfront_keys',
                    method: 'POST',
                    formData: {
                        auth_token: "WU4q5DgX5JI38dkcr-9r"
                    }
                }
        
                rp(options)
                    .then(result=>{
                        result = JSON.parse(result);
                        if(result.statusCode === 200){
                            let awsPrivateKey = result.privateKey;
                            let finalString = '';
                            const loopCount = Math.ceil(awsPrivateKey.length/64);
                            async.timesSeries(loopCount, (n, next)=>{
                                finalString = awsPrivateKey.substring(0, 64) + '\n';
                                awsPrivateKey = awsPrivateKey.substring(64);
                                next(null, finalString)
                            }, (err, done)=>{
                                finalString = done.join("");
                                finalString = "-----BEGIN RSA PRIVATE KEY-----\n"+ finalString + "-----END RSA PRIVATE KEY-----\n";
                               callback(null, finalString);
                            });

                        } else{
                            return callback("error on api call", null);
                        }
                    })
            },
            (result, callback)=>{
                // let privateKeyString = "-----BEGIN RSA PRIVATE KEY-----\n"+
                // "MIIEpAIBAAKCAQEA0YvvHlrZBjd4IBuKUq/ZY7S7q7TdOxT/oplM9nawIiKdAs/p\n"+
                // "e/Ocf1fqZPwcAC9DIl0Ghpd7ksuAwT7uFG2M8do17V8kXOtR/xGKH+lwPosiEWQ5\n"+
                // "2pXK8roHLkrvq9/cRjrB/Ou4v2xiCt7TyNDKDTnOxuI8R7FoiEVI1sDdhRgGAbr3\n"+
                // "NAfwy6hk8JbhrH6fkCxoAKLkV1KXn1TlLHjR9xckIgy1L2ykV9jmJvapfqON536M\n"+
                // "k9uAm2Bmwnk5olKyU1rcZWeizFDcwGtqHyuSfmf/KRSUUMaZkgrMnhlZzBpkxw4b\n"+
                // "n1CzQTCShH6gfTO2DoWeFpDSsaH3AHMPorjtmwIDAQABAoIBAQCpFxY5lG2UCqaw\n"+
                // "ogiYeLYfMvRNtoDe8C7ocnQcXeH7aZrxbfymvQoH6FWIb7fYnkq6K/7cFNjut7CK\n"+
                // "P9G2QkB92OuzRBb/tBRSk0C2R5T/ox42kn3s2PsPqvWocWe9dcM2GKv4/+3w6fCj\n"+
                // "fPPBFFo3GfK1olGqOIp1jBMe2Dro7efRD7CUNJOhd4R1cPRbfwJ/DJKrZeyKzZiG\n"+
                // "2dGatxFWu7vIXi749Jdw9O78BZplslxy/gaxcsVWNN9K6oq1DU9wy3yDg29fa/ZF\n"+
                // "Xyt2qMRKdw1TaCzpuUn6yI+ZCulBoG9kibabQEYd2UljH0zZAGLNCtIKQVUe4QO0\n"+
                // "tboiNsLBAoGBAO7qLseWD5ff5cwI+oPmKnHthCH8j/FQ9yoVYV57sS+E2VAJj6ul\n"+
                // "+4W0nUxcVnh0zQxfw3hB1ScOsoNgU1xkt90avq/4HpK6/YzKL1cfiZ9S4bXACFp2\n"+
                // "CSTJL+F4OjBKZpUVDNlSltGkvfZ+zJK8yUl/TD4nbZxaYAk5B5Wzms85AoGBAOCI\n"+
                // "G57DEHSK0CRkYUfafSkOQ0RexKAvkia+vkGF2TdNIvWrvEzAIB8sG+dRHoY4YhqR\n"+
                // "4mrHg2IpUPoFGWLx7wCGueO+FofGrwvzutcyRB8H/xMzdnNakJfeyAIzoHQDbV0A\n"+
                // "tfDGuCHKJce+AobstmzhuPt0IGha1FIrIg6Q1Y9zAoGBALoGpBgJ0uhpkI9XKmCL\n"+
                // "Vd9RlkG0WwwGA/3DmgYsf6FFasP0PebkHb1VDemIOFggcgxBgHzhnauEuSCsXxwg\n"+
                // "3D0P9wwjQQL1EDmQsF3BE7J3oYGYHaj6IVKASIThzUUOmWNZeaC5uu9PvA3zWyyi\n"+
                // "TISq1t3Ka4GDqSVlP2+j4lWZAoGAZWn0l7vhVdJQ+u7/5XVxLLcNePcY9oUmDSwA\n"+
                // "QRYUq17C2JXOAhiRKaNBozRHhjY3UWrtCm+9Dvw8YAEnm0JNQj6X/Z6hDIiYDdzz\n"+
                // "WjmQ/TceZezLpoSUZJQyYJQy99OIdQZaJzuKdXCZqeNPvuNx7jHx3FlyPdAwsEBd\n"+
                // "LJkMbLMCgYBz5/tAp3cMaSggg7mW/8QncOHqSMOfyoxbIqChp0NdnyTLm492TybW\n"+
                // "5VtIaz0Q9izdi/ryyUWdSfPp3Sto5nNNHhOJb6KiIcSHY8ojzgytv8kdtmWNoiyX\n"+
                // "RoOUCF8uxdGagRNkJaB4FkV0eoeY9GAD+R++9xNeE4PWUaau6mlyPA==\n"+
                // "-----END RSA PRIVATE KEY-----\n";
                let time = parseInt(moment().format('x')) + 86400000;
                var options = {
                    keypairId: "APKAIJCTUBUF7KU2MRRA",
                    privateKeyString: result,
                    expireTime: time
                }
                // d38qovwttlkrba.cloudfront.net
                let url = `https://d2d4pij7wpi2c8.cloudfront.net/SHT/ZYCUS/language%20management%20tool/ 1589458107923_videoplayback(1).mp4 `
                var signedUrl  = awsCloudFrontSign.getSignedUrl(url, options);
                return callback(null, {"url": signedUrl });
            }
        ], 
            (error, result)=>{
                if(error){
                    return callback(error, null);
                } else{
                    return callback(null, result)
                }
            })
    } catch (error) {
        return callback(error, null);
    }
}

getPrivateKey("request", (error, result)=>{
    console.log(result);
    //working in https://d38qovwttlkrba.cloudfront.net/SHT/ZYCUS/dewdrops/1577788464789_sample(4).mp4?Expires=1589399679&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMzhxb3Z3dHRsa3JiYS5jbG91ZGZyb250Lm5ldC9TSFQvWllDVVMvZGV3ZHJvcHMvMTU3Nzc4ODQ2NDc4OV9zYW1wbGUoNCkubXA0IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTg5Mzk5Njc5fX19XX0_&Signature=GwTqNbmyGTKE4~8w172BcqYRwaM~PqcQ-~vfoTZsZv4dqLm5a0Lltglc1ut52zCf9eZQgujHQhSR4UebxQt0HRBgQqMv1AivNIPzjcYQEls1goYvknWgq~Z93p2vJjikEzVWF-IBOVt5ZE2J3CB2BMiP83V3jac1LRtjRa1STz2NksFGM1h9Icx0mkmqmjnz0rbpIn8-cvNdkIjo6l8PYXlkZKT3uOojgVmQD1jt~1nllQyD0Ji32HIUmGzeRplJqPD0-AiXA-5O9gB8GXBlpHy8VBxCz5ouhT420ooFlvL8Yf7EBUYkBohfVGyIaDmlU8fSfj6aRasFLfIvqRCl~g__&Key-Pair-Id=APKAIJCTUBUF7KU2MRRA
    //https://d2d4pij7wpi2c8.cloudfront.net/SHT/ZYCUS/spm/1589186012936_file_example_MP4_640_3MG.mp4?Expires=1589400397&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMmQ0cGlqN3dwaTJjOC5jbG91ZGZyb250Lm5ldC9TSFQvWllDVVMvc3BtLzE1ODkxODYwMTI5MzZfZmlsZV9leGFtcGxlX01QNF82NDBfM01HLm1wNCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTU4OTQwMDM5N319fV19&Signature=So9-UGhLTojNZVbMRDmJXN1Ixg9PvQAXUIj1orD59nrhwXUk0-P7CnL0TMg0-~UTMOTyCKwT-PtPgsMW12iJ0RRpMAy62SLRa-yfcRnn2AnETVk4lFxnlVxWH8nN~Ti06OmV3xIPyNUpwNN0Yhzd1NfW2-KcTp~RnwPpdo8hxWp7eST1qkSbEKSjqdh2zkdYubuHetANSNXUdnfSwsJFzyfuJ6CWSz0CjObrjV43M3sz-AVTP~bpPGArw92Grod-QBF46bjJpO0AzyOgqxTYaPbJrQwXVJOS~vKmR9zwfjpy7Kr5oErjquHbdmIyizrkW3nUPsqZV3Y9EwlnHLAayA__&Key-Pair-Id=APKAIJCTUBUF7KU2MRRA
})