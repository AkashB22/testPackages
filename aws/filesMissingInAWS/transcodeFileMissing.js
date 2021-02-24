const mongoose = require("mongoose");
const contentModel = require('./content');
const awsSdk = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const rp = require('request-promise').defaults({ simple: false });
const elasticTranscoder = require("./elasticTranscoder");
const path = require('path');

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

async function getAllVideoFilesFromDb(){
    const result = await contentModel.aggregate([
        {
          '$match': {
            'zycus': {
              '$exists': true, 
              '$ne': []
            }
          }
        }, {
          '$unwind': {
            'path': '$zycus'
          }
        }, {
          '$match': {
            'zycus.video': {
              '$exists': true, 
              '$ne': []
            }
          }
        }, {
          '$unwind': {
            'path': '$zycus.video'
          }
        },{
            "$project" : {
                "zycus.video.url" : 1,
                "identifier": 1
            }
        }
    ]);
    
    return result;
}

function checkFileExists(credential, url, callback){
  try {
      const s3 = new awsSdk.S3({
          "accessKeyId": credential.s3.accessKeyId,
          "secretAccessKey": credential.s3.secretAccessKey,
          "sessionToken": credential.s3.sessionToken,
          "signatureVersion": "v4",
          "region": "ap-south-1"
      });
      var params = {
          Bucket: "zycus-sht-qc2", 
          Key: url
      };
      s3.headObject(params, function(err, data) {
          if (err) return callback(err, null); // an error occurred
          else return callback(null, data);           // successful response
      });
  } catch (error) {
      return null;
  }
}

async function main(callback){
    let allObject = await getAllVideoFilesFromDb();
    const filesPresentInAWS = [];
    getAWSVault((error, awsCredential)=>{
      if(error) return callback(error);
      async.eachSeries(allObject, (eachData, callback1)=>{
        let url = eachData.zycus.video.url;
        if(url){
            checkFileExists(awsCredential, url, (error, data)=>{
                if(!error){
                    filesPresentInAWS.push(eachData);
                }
                return callback1();
            })
        }
    }, (error)=>{
        if(error) return callback(error)
        console.log(filesPresentInAWS.length);
        const transcodeFilesMissing = [];
        filesPresentInAWS.forEach((data)=>{
            const fileExtension = path.extname(data.zycus.video.url),
                basename = data.zycus.video.url.replace(fileExtension, '');
            data.zycus.video.transcodeFile = [];
            data.zycus.video.transcodeFile.push(basename + '_' + '360p' + fileExtension);
            data.zycus.video.transcodeFile.push(basename + '_' + '480p' + fileExtension);
        })
        async.eachSeries(filesPresentInAWS, (eachData, callback1)=>{
            let transcodeFiles = eachData.zycus.video.transcodeFile;
            
            async.eachSeries(transcodeFiles, (url, callback2)=>{
                checkFileExists(awsCredential, url, (error, data)=>{
                    if(error){
                        let isExists = false;
                        transcodeFilesMissing.forEach(data=>{
                            if(data.identifier === eachData.identifier){
                                isExists = true;
                            }
                        })
                        if(!isExists){
                            transcodeFilesMissing.push(eachData);
                        }
                    }
                    return callback2();
                })
            }, (error)=>{
                if(error) return callback1(error);
                return callback1()
            })
        }, (error)=>{
            if(error) return callback(error)
            console.log(transcodeFilesMissing.length);

            const newlyAddedFiles = []
            async.eachSeries(transcodeFilesMissing, (eachData, callback1)=>{
                let pathName = path.dirname(eachData.zycus.video.url) + "/"
                let fileName = eachData.zycus.video.url.replace(pathName, "")
                elasticTranscoder.transcode({
                        remoteFilePath: pathName,
                        savedFileName : fileName,
                        aws_credential: {
                            presets: {
                                "360p": "1351620000001-000040",
                                "480p": "1351620000001-000020"
                            },
                            accessKeyId: awsCredential.s3.accessKeyId,
                            secretAccessKey: awsCredential.s3.secretAccessKey,
                            sessionToken: awsCredential.s3.sessionToken,
                            bucket: "zycus-sht-qc2"
                        }
                    }, (err, result)=>{
                        if(err)return callback1(err);
                        else {
                            for(let output of result.Job.Outputs){
                                newlyAddedFiles.push(result.Job.OutputKeyPrefix+ output.Key);
                            }
                            return callback1()
                        }
                    })
            }, (error)=>{
                if(error) return callback(error);
                callback(null, newlyAddedFiles);
            })
        }) 

    }) 
  });
}

main((error, data)=>{
  if(error) throw error;
  fs.writeFile(__dirname+ "/logs/newlyAddedTranscodeFiles.txt" + Date.now(), JSON.stringify(data), (error, data)=>{if(error) throw error})
});