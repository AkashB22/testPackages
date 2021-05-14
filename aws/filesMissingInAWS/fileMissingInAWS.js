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

async function getAllDocumentFilesFromDb(){
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
        'zycus.document': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$zycus.document'
      }
    }, {
      '$project': {
        'zycus.document.url': 1, 
        'identifier': 1
      }
    }
  ]);

  return result;
}

async function getAllThumbnailFilesFromDb(){
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
    }, {
      '$match': {
        'zycus.video.thumbnail': {
          '$exists': true
        }
      }
    }, {
      '$project': {
        'zycus.video.thumbnail.url': 1, 
        'identifier': 1
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
    let allFiles = []
    const videos = await getAllVideoFilesFromDb();
    const documents = await getAllDocumentFilesFromDb();
    const thumbnails = await getAllThumbnailFilesFromDb();
    allFiles = allFiles.concat(videos).concat(documents).concat(thumbnails);

    console.log(`Video files available - ${videos.length}, Document files available - ${documents.length}, Thumbnail files available - ${thumbnails.length}, So the Total files are - ${allFiles.length}`);
    
    const filesMissingInAWS = [];
    const url_with_spaces = [];

    getAWSVault((error, awsCredential)=>{
      if(error) return callback(error);
      async.eachSeries(allFiles, (eachData, callback)=>{
        let url = "";
        if(eachData.zycus.video.url){
          url = eachData.zycus.video.url;
        } else if(eachData.zycus.document && eachData.zycus.document.url){
          url = eachData.zycus.document.url
        } else{
          url = eachData.zycus.video.thumbnail.url;
        }
        if(url){
            checkFileExists(awsCredential, url, (error, data)=>{
                if(error){
                    filesMissingInAWS.push(eachData);
                }
                return callback();
            })
        }
    }, (error)=>{
        if(error) return callback(error)
        else return callback(null, filesMissingInAWS);
    }) 
  });
}

main((error, data)=>{
  if(error) throw error;
  console.log(data.length);
  fs.writeFile(__dirname+ "/logs/missingVideosAndIdentifier.txt" + Date.now(), JSON.stringify(data), (error, data)=>{if(error) throw error})
});