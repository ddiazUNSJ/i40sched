// Based from https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-node
// y https://github.com/IBM/ibm-cos-sdk-js
import { Meteor } from 'meteor/meteor';
import { fetch, Headers, Request, Response } from 'meteor/fetch';
//import { URLSearchParams, URL } from 'meteor/url';
import  { URL , URLSearchParams}  from 'url';
//import  { ibm }  from 'ibm-cos-sdk';
var ibm = require('ibm-cos-sdk');
var fs = require('fs');
// var config = {
//         endpoint: Meteor.settings.private.COS_service.endpoint,
//         apiKeyId: Meteor.settings.private.apikey,
//         serviceInstanceId:Meteor.settings.private.COS_service.serviceInstanceId,
//         };

// var cos1 = new ibm.S3(config);
//const IBM = require('ibm-cos-sdk');
//const { URL } = require('url');

// var myUrl = new URL('https://www.meteor.com');

// const myUrlString = myUrl.toString();

Meteor.methods({

  loginToken:function() {

     
     // Verifica identidad agregado 20/10/2021 DD
     if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }

     
     // var myUrl = new URL('https://www.meteor.com');
     // const myUrlString = myUrl.toString();
     // console.log("ESTOY AQUI 2...",myUrlString );

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Accept", "application/json");

// let url = new URL('http://www.test.com/t.html?a=1&b=3&c=m2-m3-m4-m5');
// let searchParams = new URLSearchParams(url.search);
// console.log(searchParams.get('c'));  

// outputs "m2-m3-m4-m5"

        const urlencoded = new URLSearchParams("");
        urlencoded.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
        urlencoded.append("apikey", Meteor.settings.private.apikey);

        const requestOptions = {   
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };   
        

     var salida1=fetch("https://iam.cloud.ibm.com/identity/token", requestOptions)
        .then(response => response.text())
        .then(result => {  return result})
        .catch(error => console.log('error', error));  

     return salida1;
  },

  getJob:function(tokenStr) {
        const myHeaders = new Headers();
        var tokenID="Bearer "+tokenStr;
        myHeaders.append("Authorization", tokenID);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        var salida = fetch("https://us-south.ml.cloud.ibm.com/ml/v4/deployment_jobs/b53e2b1d-bc9e-4edb-a4c0-ccb5943cbf5f?version=2020-08-01&space_id=9b594878-ec22-4b73-bd2d-431669079a74", requestOptions)
          .then(response => response.text())
          .then(result => { return result})
          .catch(error => console.log('error', error));
          
       return salida;   
   },

   getBucketObject:function(tokenStr,bucketName,itemName){
    var config = {
        endpoint: Meteor.settings.private.COS_service.endpoint,
        apiKeyId: Meteor.settings.private.apikey,
        serviceInstanceId:Meteor.settings.private.COS_service.serviceInstanceId,
        };

    const cos = new ibm.S3(config);
    console.log ('crendo cos object');
    return cos.getObject({
        Bucket: bucketName, 
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
            const salida=Buffer.from(data.Body).toString();
            console.log("salida: ", salida);
            console.log('File Contents: ' + salida);
            return salida;
         }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
   },

   createBucket:function(tokenStr,bucketName){
    var config = {
        endpoint: Meteor.settings.private.COS_service.endpoint,
        apiKeyId: Meteor.settings.private.apikey,
        serviceInstanceId:Meteor.settings.private.COS_service.serviceInstanceId,
        };

    const cos = new ibm.S3(config);
    console.log ('crendo bucket');
    return cos.createBucket({
        Bucket: bucketName,
        CreateBucketConfiguration: {
          LocationConstraint: 'us-south'
        },
    }).promise()
    .then(() => {
                  return "bucket creado";
         })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
   },

   uploadFile:function (bucketName, itemName, filePath) {
    var uploadID = null;

    if (!fs.existsSync(filePath)) {
        log.error(new Error(`The file \'${filePath}\' does not exist or is not accessible.`));
        return;
    }

    console.log(`Starting multi-part upload for ${itemName} to bucket: ${bucketName}`);
    return cos.createMultipartUpload({
        Bucket: bucketName,
        Key: itemName
    }).promise()
    .then((data) => {
        uploadID = data.UploadId;

        //begin the file upload        
        fs.readFile(filePath, (e, fileData) => {
            //min 5MB part
            var partSize = 1024 * 1024 * 5;
            var partCount = Math.ceil(fileData.length / partSize);
    
            async.timesSeries(partCount, (partNum, next) => {
                var start = partNum * partSize;
                var end = Math.min(start + partSize, fileData.length);
    
                partNum++;

                console.log(`Uploading to ${itemName} (part ${partNum} of ${partCount})`);  

                cos.uploadPart({
                    Body: fileData.slice(start, end),
                    Bucket: bucketName,
                    Key: itemName,
                    PartNumber: partNum,
                    UploadId: uploadID
                }).promise()
                .then((data) => {
                    next(e, {ETag: data.ETag, PartNumber: partNum});
                })
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            }, (e, dataPacks) => {
                cos.completeMultipartUpload({
                    Bucket: bucketName,
                    Key: itemName,
                    MultipartUpload: {
                        Parts: dataPacks
                    },
                    UploadId: uploadID
                }).promise()
                .then(console.log(`Upload of all ${partCount} parts of ${itemName} successful.`))
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            });
        });
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
    },

cancelMultiPartUpload:function (bucketName, itemName, uploadID) {
    return cos.abortMultipartUpload({
        Bucket: bucketName,
        Key: itemName,
        UploadId: uploadID
    }).promise()
    .then(() => {
        console.log(`Multi-part upload aborted for ${itemName}`);
    })
    .catch((e)=>{
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

})


