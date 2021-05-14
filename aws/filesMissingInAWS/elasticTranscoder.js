const awsSDK = require('aws-sdk');
const path = require('path');

class elasticTrancoder{
    constructor(){}

    

transcode(fileData, callback){
    try{
        
        awsSDK.config.update({region : 'ap-south-1'});
        awsSDK.config.credentials = {}
        awsSDK.config.credentials.accessKeyId = fileData.aws_credential.accessKeyId;
        awsSDK.config.credentials.secretAccessKey = fileData.aws_credential.secretAccessKey;
        awsSDK.config.credentials.sessionToken = fileData.aws_credential.sessionToken;
        awsSDK.config.credentials.signatureVersion = "v4";
        this.elastictranscoder = new awsSDK.ElasticTranscoder({apiVersion: '2012-09-25'});
        this.elastictranscoder.listPipelines({Ascending: "true"}, (error, data) => {
            if (error) {
                return callback(error, null);
            }else {
                /**
                 * If pipeline present, create job
                 */
                //Checking if the pipeline that we are searching in available in existing list of pipeline 
                const foundPipeline = data.Pipelines.find(pipeline=> (pipeline.InputBucket === fileData.aws_credential.bucket && pipeline.OutputBucket === fileData.aws_credential.bucket));
                if(foundPipeline){
                    let pipelineId = foundPipeline.Id;
                    let jobParams = this.getJobParams(fileData, pipelineId);
                    setTimeout(()=>{
                        this.createJob(jobParams, (error, result)=>{
                            if(error){
                                return callback(error, null);
                            }else{
                                return callback(null, result);
                            }
                        })
                    }, 1000)
                } else{
                    /**
                     * If pipeline not present, create Pipline & then create job
                     */
                    const tasks = [
                        /**
                         * Delete a pipeline if the list of pipeline is 4 since we can only have 4 pipeline maximum
                         */
                        (callback)=>{
                            if(data.Pipelines.length === 4){
                                this.elastictranscoder.deletePipeline({ Id: data.Pipelines[0].Id }, function(error, data) {
                                    if(error){
                                        callback(error, null); // an error occurred
                                    } else {
                                        callback(null, data);           // successful response
                                    }
                                });
                            } else{
                                callback(null, true);
                            }
                        },
                        (result, callback) => {
                            const params = {
                                InputBucket: fileData.aws_credential.bucket, // required 
                                OutputBucket: fileData.aws_credential.bucket,
                                Name: fileData.aws_credential.pipelineName || 'SelfHelpPipeline', // required 
                                Role: fileData.aws_credential.role // required
                            };
                            this.createPipeline(params, (error, result)=>{
                                if(error){
                                    return callback(error, null);
                                }else{
                                    return callback(null, result);
                                }
                            })
                        }, 
                        (result, callback) => {
                            let pipelineId = result.Pipelines[0].Id;
                            let jobParams = this.getJobParams(fileData, pipelineId);
                            this.createJob(jobParams, (error, result)=>{
                                if(error){
                                    return callback(error, null);
                                }else{
                                    return callback(null, result);
                                }
                            })
                        }
                    ];
                    rm.async.waterfall(tasks, (error, result)=>{
                        if(error){
                            return callback(error, null)
                        }else{
                            return callback(null, result);
                        }
                    })
                }
            }
        })
    } catch(err){
        callback(error, null)
    }
}

/**
     * @description: Create a JOB Pipeline
     * @param {*} callback 
     */
    createPipeline(params, callback){
        try{
            this.elastictranscoder.createPipeline(params, function(error, result) {
                if (error){ 
                    return callback(error, null); // an error occurred
                }else{
                    return callback(null, result); // successfully created pipeline
                }
            })
        }catch(error){
            return callback(error, null);
        }
    }
    /**
     * @description: Create a Pipeline Job to Transcode
     * @param {*} callback 
     */
    createJob(jobParams, callback){
        try{
            this.elastictranscoder.createJob(jobParams, function(error, result){
                if (error) {
                    return callback(error, null);    // an error occurred
                }else {
                    return callback(null, result);    // successful created job
                }
            }); 
        }catch(error){
            return callback(error, null);
        }
    }
    /**
     * get Params for transcode jon
     */
     getJobParams(fileData, pipelineId){
        const jobParams = {
            "PipelineId": pipelineId,
            "Outputs":[
                {
                    "Key": this.getKeyPrefix(fileData.savedFileName, '480p'),
                    "PresetId": fileData.aws_credential.presets['480p'],
                },
                {
                    "Key": this.getKeyPrefix(fileData.savedFileName, '360p'),
                    "PresetId": fileData.aws_credential.presets['360p'],
                }   
            ],
            "OutputKeyPrefix": fileData.remoteFilePath,
            "Input":{
                "AspectRatio":"auto",
                "FrameRate":"auto",
                "Interlaced":"auto",
                "Key": fileData.remoteFilePath + fileData.savedFileName,
                "Resolution":"auto"
            }
        };
        return jobParams;   
    }
    /**
     * @description: Get key prefix for different resolution
     * @param {*} fileName 
     * @param {*} resolution 
     */
    getKeyPrefix(fileName, resolution){
        const fileExtension = path.extname(fileName);
        const fileLabel = fileName.replace(fileExtension, '');

        return fileLabel + '_' + resolution + fileExtension;
    }

// transcode({
//     remoteFilePath: "SHT/ZYCUS/dewdrops/",
//     savedFileName : "1587989268360_iSupplierOverviewV4.mp4",
//     aws_credential: {
//         presets: {
//             "360p": "1351620000001-000040",
//             "480p": "1351620000001-000020"
//         }
//     }
// }, (err, result)=>{
//     if(err) console.log(err);
//     else {
//         for(let output of result.Job.Outputs){
//             console.log(result.Job.OutputKeyPrefix+ output.Key);
//         }
//     }
// });
}

// let transcodeFile = new elasticTrancoder();
// transcodeFile.transcode({
//         remoteFilePath: "SHT/ZYCUS/dewdrops/",
//         savedFileName : "1587989268360_iSupplierOverviewV4.mp4",
//         aws_credential: {
//             presets: {
//                 "360p": "1351620000001-000040",
//                 "480p": "1351620000001-000020"
//             }
//         }
//     }, (err, result)=>{
//         if(err) console.log(err);
//         else {
//             for(let output of result.Job.Outputs){
//                 console.log(result.Job.OutputKeyPrefix+ output.Key);
//             }
//         }
// })
module.exports = new elasticTrancoder();