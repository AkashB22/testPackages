const mongoose = require("mongoose");
const contentModel = require('./content');
const awsSdk = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const rp = require('request-promise').defaults({ simple: false });
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

async function getAllTenantVideoFilesFromDB(){
    const result = await contentModel.aggregate([
        {
          '$match': {
            'tenant': {
              '$exists': true, 
              '$ne': []
            }
          }
        }, {
          '$unwind': {
            'path': '$tenant'
          }
        }, {
          '$match': {
            'tenant.companyAdmin': {
              '$exists': true, 
              '$ne': []
            }
          }
        }, {
          '$unwind': {
            'path': '$tenant.companyAdmin'
          }
        }, {
          '$match': {
            'tenant.companyAdmin.video': {
              '$exists': true, 
              '$ne': []
            }
          }
        }, {
          '$unwind': {
            'path': '$tenant.companyAdmin.video'
          }
        }, {
          '$project': {
            'tenant.companyAdmin.video.url': 1, 
            'identifier': 1
          }
        }
      ]) 

    return result;
}

async function getAllTenantDocumentsFromDB(){
  const result = contentModel.aggregate([
    {
      '$match': {
        'tenant': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant'
      }
    }, {
      '$match': {
        'tenant.companyAdmin': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant.companyAdmin'
      }
    }, {
      '$match': {
        'tenant.companyAdmin.document': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant.companyAdmin.document'
      }
    }, {
      '$project': {
        'tenant.companyAdmin.document.url': 1, 
        'identifier': 1
      }
    }
  ])

  return result;
}

async function getAllTenantThumbnailsFromDb(){
  const result = contentModel.aggregate([
    {
      '$match': {
        'tenant': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant'
      }
    }, {
      '$match': {
        'tenant.companyAdmin': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant.companyAdmin'
      }
    }, {
      '$match': {
        'tenant.companyAdmin.video': {
          '$exists': true, 
          '$ne': []
        }
      }
    }, {
      '$unwind': {
        'path': '$tenant.companyAdmin.video'
      }
    }, {
      '$match': {
        'tenant.companyAdmin.video.thumbnail': {
          '$exists': true
        }
      }
    }, {
      '$project': {
        'tenant.companyAdmin.video.thumbnail.url': 1, 
        'identifier': 1
      }
    }, {
      '$count': 'count'
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

function getTranscodeFiles(key){
    if(key.zycus && key.zycus.video && key.zycus.video.url){
      const fileExtension = path.extname(key.zycus.video.url),
        basename = key.zycus.video.url.replace(fileExtension, '');

      return [
          {   
              "identifier": key.identifier,
              "zycus":{"video": {"url" : key.zycus.video.url}}
          },
          {   
              "identifier": key.identifier,
              "zycus": {"video": {"url" : basename + '_' + '360p' + fileExtension}}
          },
          {   
              "identifier": key.identifier,
              "zycus": {"video": {"url" : basename + '_' + '480p' + fileExtension}}
          }
      ]
    } else if(key.tenant && key.tenant.companyAdmin && key.tenant.companyAdmin.video && key.tenant.companyAdmin.video.url){
      const fileExtension = path.extname(key.tenant.companyAdmin.video.url),
        basename = key.tenant.companyAdmin.video.url.replace(fileExtension, '');

      return [
          {   
              "identifier": key.identifier,
              "tenant":{"companyAdmin": {"video" : {"url" : key.tenant.companyAdmin.video.url}}}
          },
          {   
              "identifier": key.identifier,
              "tenant": {"companyAdmin": {"video" : {"url" : basename + '_' + '360p' + fileExtension}}}
          },
          {   
              "identifier": key.identifier,
              "tenant": {"companyAdmin": {"video" : {"url" : basename + '_' + '480p' + fileExtension}}}
          }
      ]
    } else{
      return [];
    }
}

function getURLForEachData(eachData){
  let url = "";
  if(eachData.zycus && eachData.zycus.video && eachData.zycus.video.url){
    url = eachData.zycus.video.url;
  } else if(eachData.zycus && eachData.zycus.document && eachData.zycus.document.url){
    url = eachData.zycus.document.url;
  } else if(eachData.zycus && eachData.zycus.video && eachData.zycus.video.thumbnail && eachData.zycus.video.thumbnail.url){
    url = eachData.zycus.video.thumbnail.url;
  } else if(eachData.tenant && eachData.tenant.companyAdmin && eachData.tenant.companyAdmin.video && eachData.tenant.companyAdmin.video.url){
    url = eachData.tenant.companyAdmin.video.url;
  } else if(eachData.tenant && eachData.tenant.companyAdmin && eachData.tenant.companyAdmin.document && eachData.tenant.companyAdmin.document.url){
    url = eachData.tenant.companyAdmin.document.url;
  } else if(eachData.tenant && eachData.tenant.companyAdmin && eachData.tenant.companyAdmin.video && eachData.tenant.companyAdmin.video.thumbnail && eachData.tenant.companyAdmin.video.thumbnail.url){
    url = eachData.tenant.companyAdmin.video.thumbnail.url;
  } else{
    url = "";
  }
  return url;
}

function getAllFilesInAWS(credential, callback){
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
        let allFiles = []
        const videos = await getAllVideoFilesFromDb();
        let getAllVideo = [];
        // console.log(videos.length);
        videos.forEach((video)=>{
            getAllVideo = getAllVideo.concat(getTranscodeFiles(video));
        })
        // console.log(getAllVideo.length);
        const documents = await getAllDocumentFilesFromDb();
        const thumbnails = await getAllThumbnailFilesFromDb();
        const tenantVideos = await getAllTenantVideoFilesFromDB();
        let getAllTenantVideo = [];
        tenantVideos.forEach((video)=>{
          getAllTenantVideo = getAllTenantVideo.concat(getTranscodeFiles(video));
      })
        const tenantDocuments = await getAllTenantDocumentsFromDB();
        const tenantThumbnails = await getAllTenantThumbnailsFromDb();
        allFiles = allFiles.concat(getAllVideo).concat(documents).concat(thumbnails).concat(getAllTenantVideo).concat(tenantDocuments).concat(tenantThumbnails).filter(Boolean);

        console.log(`Video files available - ${videos.length}, Videos with transcoded files - ${getAllVideo.length}, Document files available - ${documents.length}, Thumbnail files available - ${thumbnails.length},\
                      tenantVideo files available - ${tenantVideos.length}, tenantVideos with transcoded files - ${getAllTenantVideo.length}, tenantDocument files available - ${tenantDocuments.length}, tenantThumbnail files available - ${tenantThumbnails.length},\
                      So the Total files are - ${allFiles.length}`);
        
        const filesMissingInAWS = [];
        const filesAvailableInAWS = [];
        let credentialForAWS = {};

        getAWSVault((error, awsCredential)=>{
            if(error) return callback(error);
            credentialForAWS = awsCredential;
            async.eachSeries(allFiles, (eachData, callback)=>{
                let url = getURLForEachData(eachData);
                if(url){
                    checkFileExists(awsCredential, url, (error, data)=>{
                        if(error){
                            filesMissingInAWS.push(eachData);
                        } else{
                            filesAvailableInAWS.push(eachData);
                        }
                        return callback();
                    })
                } else{
                  return callback("missing url " + url, null)
                }
            }, (error)=>{
                if(error) return callback(error)
                else {
                    console.log(`Files missing in AWS - ${filesMissingInAWS.length}, Files available in AWS - ${filesAvailableInAWS.length}`)
                    let unwantedFilesInAWS = [];
                    const onlyURLs = filesAvailableInAWS.map(eachData=>{
                      return getURLForEachData(eachData);
                    }).filter(Boolean);
                    console.log(`OnlyUrls - ${onlyURLs.length}`);
                    getAllFilesInAWS(awsCredential, (error, dataObject)=>{
                        if(error) return callback(error, null);
                        let filesInAWS = dataObject.map(obj=>{
                            return obj.Key;
                        })
                        console.log(`Total files in AWS - ${filesInAWS.length}`);
                        // unwantedFilesInAWS = filesInAWS.filter(url=>{
                        //     let isFound = !onlyURLs.includes(url);
                        //     return isFound;
                        // });
                        filesInAWS.forEach((url)=>{
                          if(onlyURLs.indexOf(url) === -1){
                            unwantedFilesInAWS.push(url);
                          }
                        })
                        console.log(`unwanted files in AWS - ${unwantedFilesInAWS.length}`);
                        return callback(null, unwantedFilesInAWS, onlyURLs, filesMissingInAWS);
                    })
                }
            }) 
        });
    } catch (error) {
        return callback(error, null);
    }
}

main((error, data, mongoDbData, filesMissingInAWS)=>{
  if(error) throw error;
  console.log(data.length);
  fs.writeFile(__dirname+ "/logs/missingFiles.txt" + Date.now(), JSON.stringify(data), (error, data)=>{if(error) throw error});
  fs.writeFile(__dirname+ "/logs/mongodbData.txt" + Date.now(), JSON.stringify(mongoDbData), (error, data)=>{if(error) throw error});
  fs.writeFile(__dirname+ "/logs/filesMissingInAWS.txt" + Date.now(), JSON.stringify(filesMissingInAWS), (error, data)=>{if(error) throw error});
});