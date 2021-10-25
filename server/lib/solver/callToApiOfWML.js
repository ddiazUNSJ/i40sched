import { Meteor } from 'meteor/meteor';
import { fetch, Headers, Request, Response } from 'meteor/fetch';
//import { URLSearchParams, URL } from 'meteor/url';
import  { URL , URLSearchParams}  from 'url';
import  { cosIBM}  from 'ibm-cos-sdk';
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

   getSolution:function(tokenStr,bucketName,itemName){
    var config = {
        endpoint: Meteor.settings.private.COS_service.endpoint,
        apiKeyId: Meteor.settings.private.apikey,
        serviceInstanceId:Meteor.settings.private.COS_service.serviceInstanceId,
        };

    var cos = new ibm.S3(config);
    return cos.getObject({
        Bucket: bucketName, 
        Key: itemName
    }).promise()
    .then((data) => {
        if (data != null) {
            console.log('File Contents: ' + Buffer.from(data.Body).toString());
            return Buffer.from(data.Body).toString();
         }    
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
   }
})

