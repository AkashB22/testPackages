const awsSdk = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const rp = require('request-promise').defaults({ simple: false });

function getAWSVault(callback) {
    var options = {
        method: 'POST',
        uri: "http://internal-aws-keymanage-api-157453501.ap-south-1.elb.amazonaws.com/api/v1/aws/get_access_keys",
        formData: {
            auth_token: "WU4q5DgX5JI38dkcr-9r",
            role: "dewdrops-sht-role-qc"
        }
    };
    rp(options)
        .then((result) => {
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
                    },
                    cached = awsCredential;
                return callback(null, awsCredential);
            } else {
                return callback(true, null);
            }
        })
        .catch(error => {
            return callback(error, null);
        })
}

function checkFileExists(credential, url, callback) {
    try {
        const s3 = new awsSdk.S3({
            "accessKeyId": credential.s3.accessKeyId,
            "secretAccessKey": credential.s3.secretAccessKey,
            "sessionToken": credential.s3.sessionToken,
            "signatureVersion": "v4",
            "region": "ap-south-1"
        });
        var params = {
            Bucket: "zycus-sht-qc",
            Key: url
        };
        s3.headObject(params, function(err, data) {
            if (err) return callback(err, null); // an error occurred
            else return callback(null, data); // successful response
        });
    } catch (error) {
        return null;
    }
}


//SHT/ZYCUS/dewdrops/1589204432967_Haproxy-postman_480p.mp4 -qc
//SHT/ZYCUS/sht/1589884313512_1589458107923_videoplayback(1)(2).mp4
//SHT/ZYCUS/language%20management%20tool/1589817129478_DDS-129122(1).mp4 - whitespace issue
getAWSVault((error, awsCredential) => {
    if (error) console.log(error);
    checkFileExists(awsCredential, "SHT/925e083c-99f3-40e7-908e-26549be45368/sht/1611740749051_1(22)-Copy.jpg", (error, data) => {
        if (error) {
            console.log(error)
        }
        console.log(data);
    })
})