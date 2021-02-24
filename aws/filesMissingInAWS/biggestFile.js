const mongoose = require("mongoose");
const contentModel = require('./content');
const awsSdk = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const rp = require('request-promise').defaults({ simple: false });

mongoose.connect("mongodb://INMUQC_DEW_ADMIN:gR4_Drs@inmuzv-mon-qcd028.zycus.local:2480,inmuzv-mon-qcd029.zycus.local:2480,inmuzv-mon-qcd030.zycus.local:2480/INMUQC_DEW?authSource=INMUQC_DEW&replicaSet=mongorepQC&connectTimeoutMS=300000&readPreference=primary&appname=MongoDB%20Compass&ssl=false");

const db = mongoose.connection;

db.on('error', (err)=> console.error(err));

db.once('open', ()=>{
    console.log("db connected successfully");
})

function getAWSVault(callback){
    var options = {
        method: 'POST',
        uri: "http://internal-aws-keymanage-api-157453501.ap-south-1.elb.amazonaws.com/api/v1/aws/get_access_keys",
        formData: {
            auth_token: "WU4q5DgX5JI38dkcr-9r",
            role: "dewdrops-sht-role-qc"
        }
    };                    
    rp(options)
    .then((result)=>{
        result = JSON.parse(result);
        if (result.statusCode === 200) {
            let awsCredential = {
                s3: {
                    accessKeyId: result.Credentials ? result.Credentials.AccessKeyId : null,
                    secretAccessKey: result.Credentials ? result.Credentials.SecretAccessKey : null,
                    expiration: result.Credentials ? result.Credentials.Expiration : null,
                    sessionToken: result.Credentials ? result.Credentials.SessionToken : null
                },
                assumedRoleUser: result.AssumedRoleUser ? result.AssumedRoleUser : null
            }
            cached = awsCredential;
            return callback(null, awsCredential);
        } else {
            return callback(true, null);
        }
    })
    .catch(error=>{
        return callback(error, null);
    })
  }

function getAllFilesInAWS(credential, token, callback){
    try {
        let allKeys = [];
        const s3 = new awsSdk.S3({
            "accessKeyId": credential.s3.accessKeyId,
            "secretAccessKey": credential.s3.secretAccessKey,
            "sessionToken": credential.s3.sessionToken,
            "signatureVersion": "v4",
            "region": "ap-south-1"
        });
        (function helper(token = null){
            var params = {
                Bucket: "zycus-sht-qc2", 
                MaxKeys: 1000
            };
            if(token) params.ContinuationToken  = token;
            s3.listObjectsV2(params, function(err, data) {
                if (err) return callback(err, null); // an error occurred
                else{
                    allKeys = allKeys.concat(data.Contents);
                    if(data.IsTruncated){
                        return helper(data.NextContinuationToken);
                    } else{
                        return callback(null, allKeys);;
                    }
                }        
            });
        })();

    } catch (error) {
        return callback(error, null);
    }
}

async function main(callback){
    try {
        getAWSVault((error, awsCredential)=>{
            if(error) return callback(error);
              
            getAllFilesInAWS(awsCredential, null, (err, data)=>{
                if(err) return callback(err, null);
                data = data.map(obj=>{
                    return obj.Key;
                })
                return callback(null, data);
            })
        });
    } catch (error) {
        return callback(error, null)
    }
}

main((error, data)=>{
  if(error) throw error;
  console.log(data.length);
  fs.writeFile(__dirname+ "/logs/allObjectInAWS.txt" + Date.now(), JSON.stringify(data), (error, data)=>{if(error) throw error})
});