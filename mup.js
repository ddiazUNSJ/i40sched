module.exports = {
  servers: {
    one: {
       host: '162.243.219.52',
      username: 'root',
     
      
       pem: '/home/daniel/.ssh/id_rsa',
      // password: 'server-password'
      // or neither for authenticate from ssh-agent

      // If I'm not using a default SSH port, declare which here:
      //   opts: {
      //     port: 2222,
      //   },
    },
  },


  app: {
    // TODO: change app name and path
    name: 'sched',
    path: '.',

    servers: {
      one: {},
    },

   // All options are optional.
    buildOptions: {
      // Set to true to skip building mobile apps
      // but still build the web.cordova architecture. (recommended)
      serverOnly: true,

      executable: 'meteor',
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://sched.ml',
      MONGO_URL: 'mongodb://localhost/schedDB',

    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'zodern/meteor:root',
      buildInstructions: [
        'RUN apt-get update && apt-get install -y imagemagick'
      ]
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
  

  proxy: {
    // comma-separated list of domains your website
    // will be accessed at.
    // You will need to configure your DNS for each one.
    domains: 'www.sched.ml,sched.ml,sistema.sched.ml',
   // clientUploadLimit: '20M',
    shared: {
       // disable upload limit
     // nginxConfig: 'nginxConfig_V2',
 
    },
    ssl: {
      // TODO: disable if not using SSL
      forceSSL: true,
      // Enable let's encrypt to create free certificates
      letsEncryptEmail: 'yddiaz@gmail.com',
    },
  },
};

 