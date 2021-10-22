import { Meteor } from 'meteor/meteor'
import { fetch, Headers, Request, Response } from 'meteor/fetch'

Meteor.methods({
  'login.token'({ username, password }) {

     // Verifica identidad agregado 20/10/2021 DD
     if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }

     var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
         myHeaders.append("Accept", "application/json");

     var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
        urlencoded.append("apikey", "xZRGAKDtV1h8kUBmh_hgmjH-tgq0NpEFMvaulTPussmD");

     var requestOptions = {   
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };   
     fetch("https://iam.cloud.ibm.com/identity/token", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));  
    
  }
})






