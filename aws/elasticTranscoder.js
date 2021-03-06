const awsSDK = require('aws-sdk');
const path = require('path');

class elasticTrancoder{
    constructor(){
        awsSDK.config.update({region : 'ap-south-1'});
        awsSDK.config.credentials = {}
        awsSDK.config.credentials.accessKeyId = "AKIAY5ENDKJ5ZCBUJ4GS";
        awsSDK.config.credentials.secretAccessKey = "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";
        awsSDK.config.credentials.signatureVersion = "v4";
        elastictranscoder = new awsSDK.this.elastictranscoder({apiVersion: '2012-09-25'});
    }

    

transcode(fileData, callback){
    try{
        this.elastictranscoder.listPipelines({Ascending: "false"}, (error, data) => {
            if (error) {
                return callback(error, null);
            }else if(data.Pipelines && data.Pipelines[0] && data.Pipelines[0].Id){
                /**
                 * If pipeline present, create job
                 */
                // this.elastictranscoder.deletePipeline({Id: data.Pipelines[0].Id}, function(err, data) {
                //     if (err) console.log(err, err.stack); // an error occurred
                //     else     console.log(data);           // successful response
                //   });
                let pipelineId = data.Pipelines[0].Id;
                let jobParams = getJobParams(fileData, pipelineId);
                this.createJob(jobParams, (error, result)=>{
                    if(error){
                        return callback(error, null);
                    }else{
                        return callback(null, result);
                    }
                })
            }else{
                const tasks = [
                    (callback) => {
                        const params = {
                            InputBucket: "zycus-sht-qc", // required 
                            OutputBucket: "zycus-sht-qc",
                            Name: fileData.aws_credential.pipelineName || 'SelfHelpPipeline', // required 
                            Role: "arn:aws:iam::612328755835:role/DewDropsETSS3Role" // required
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
                        // let pipelineId = result.Pipelines[0].Id;
                        let pipelineId = result.Pipeline.Id;
                        let jobParams = getJobParams(fileData, pipelineId);
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

module.exports = new elasticTrancoder();