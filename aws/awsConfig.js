let _ = require('lodash');

function configAwsSetting(request){
    const infrastructure = {
        "BFF": [
            {
                "GFSDir": "/GFS/QC-DDCS"
            },
            {
                "Mongoose": "mongodb://INMUQC_DEW_ADMIN:gR4_Drs@INMUZV-MON-QCD028.zycus.local:2480,INMUZV-MON-QCD029.zycus.local:2480,INMUZV-MON-QCD030.zycus.local:2480/INMUQC_DEW?connectTimeoutMS=300000&replicaSet=mongorepQC&authSource=INMUQC_DEW"
            },
            {
                "AWS_Config": {
                    "s3": {
                        "accessKeyId": "AKIAY5ENDKJ5ZCBUJ4GS",
                        "secretAccessKey": "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",
                        "signatureVersion": "v4",
                        "region": "ap-south-1"
                    },
                    "mediaConvert": {
                        "AWS_MEDIACONVERT_ENDPOINT": "https://idej2gpma.mediaconvert.ap-south-1.amazonaws.com"
                    },
                    "bucket": "zycus-sht-qc",
                    "role": "arn:aws:iam::612328755835:role/DewDropsETSS3Role",
                    "pipelineName": "SelfHelpPipeline",
                    "presets": {
                        "360p": "1351620000001-000040",
                        "480p": "1351620000001-000020"
                    },
                    "vault": {
                        "url": "http://internal-aws-keymanage-api-157453501.ap-south-1.elb.amazonaws.com/api/v1/aws/get_access_keys",
                        "authToken": "WU4q5DgX5JI38dkcr-9r",
                        "role": "dewdrops-sht-role-qc"
                    },
                    "isMigrationEnabled": false
                }
            }
        ]
    }
    
    const content_admin = request.content_admin;
    let awsConfig = {};

    if(content_admin){
        awsConfig = infrastructure.BFF.find(entry => entry["content-admin"]);
    }
    
    if(_.isEmpty(awsConfig)){
        awsConfig = infrastructure.BFF.find(entry => entry["AWS_Config"]);
    } else{
        awsConfig = awsConfig["content-admin"]["AWS_Config"];
    }

    return awsConfig;
}

console.log(configAwsSetting({content_admin: true}));

