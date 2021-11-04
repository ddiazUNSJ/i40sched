var docloud = require("docplexcloud-nodejs-api");
var fs = require('fs');
var client;
var jobidxd = null;

// initialize the client SDKdsad
function iniciaSolver(){
client = new docloud({
    url: Meteor.settings.private.credentials.url,
    clientId: Meteor.settings.private.credentials.client_id
});
console.log("server starting on " );
return  client;
}

Meteor.methods({

  solve: function(files, req, res , idProblema , idSolJson , idSolLog){
    var attachments = [];
    // Extrae del arreglo files los nombres de los archivos,con estos nombres construye 
    // el arreglo de ficheros  "attachement" que contiene el contenido de archivos nombrados
    files.map(function (file) {
        attachments.push({
            name: file,
            stream: fs.createReadStream(`${Meteor.absolutePath}/modelsStore/` + file)
        });
    });
    
    client.execute({
          logstream: process.stdout,
          parameters: {"oaas.TIME_LIMIT": 3 * 60 * 1000},
          attachments: attachments
      })
      .on('created', function (jobid) {
        jobidxd = jobid;
        console.log(jobid+" created----------------------------")
          // res.writeHead("200");
          // res.write(JSON.stringify({ id: jobid }));
          // res.end();
      })
      .on('processed', Meteor.bindEnvironment((jobid)=> { 

        //Meteor.bindEnvironment((jobid)=> { 
        console.log(jobid + " processed----------------------------");

        client.downloadAttachment(jobid, 'solution.json', fs.createWriteStream(`${Meteor.absolutePath}/modelsStore/`+idSolJson+'.json'))
          .then(Meteor.bindEnvironment((jobid)=> { 
              client.downloadLog(jobid, fs.createWriteStream(`${Meteor.absolutePath}/modelsStore/`+idSolLog+'.log')).then(Meteor.bindEnvironment((jobid)=> { 
                Meteor.call('insertarIdSol', idProblema , idSolJson , idSolLog);
                console.log("Update realizado");
                console.log("Comprobando limite de trabajos cargados en la nube");//maximo 5
                Meteor.call('getList');
              }));
          }));
      }))//aqui otro parentesis
      .on('interrupted', function (jobid) {
          console.log("job was interrupted :"+jobid);
      })
      .on('failed', function (jobid) {
          console.log("job has failed :"+jobid);
      })
      .on('error', function (error) {
          console.log(error);
      });
    console.log('works-----------------------');
  }

});



Meteor.methods({
      getSol:function(nameData, nameModel , idProblema , idSolJson , idSolLog){
        check(nameData,String);
        check(nameModel,String);
        check(idProblema,String);
        check(idSolJson,String);
        check(idSolLog,String);

        console.log("entra al metodo getSol");

        if (client===undefined){
          console.log("entrando por null");
            client= iniciaSolver();
     //       console.log (client);
            
        }
        else{ console.log ("cliente ya instanciado");
         
        }
        var req, res;
        var path = process.cwd();
        console.log("camino",path);
//        const text = fs.readFileSync(`/home/daniel/csched/resources/warehouse_cloud.mod`, 'utf8');
  //      console.log(text);
        Meteor.call('solve',[''+nameModel, ''+nameData], req, res , idProblema , idSolJson, idSolLog,function (error, result){ 
                 if (error){
                  console.log(error);
                 }
                 else{
                 console.log("todo ok");
                }
        });
        //solve([''+nameModel, ''+nameData], req, res , idSolJson, idSolLog);
        
      }
});

Meteor.methods({
  getList:function(){
       if (client===undefined){
        console.log("entrando por null");
           client= iniciaSolver();
           //console.log (client);
       }
       else{ console.log ("cliente ya instanciado");
          //console.log (client);
       }
      var jobList = {};
      //the job list from docplexcloud client api
      var jobs = client.listJobs();
      //process the promise output, to get the job ids
      jobs.then(function (results) {
          if (results.length === 0) {
              console.log('Actualmente no se encuentran trabajos cargados');
          }
          else {
              /*console.log('Lista de trabajos: ');
              for (job = 0; job < results.length; job++) {
                  console.log(results[job]._id);
                  jobList[job] = results[job]._id;
              }*/
              if(results.length === 5){
                 client.deleteJobs();
              }else{
                console.log("Espacio disponible en la nube para trabajar ("+ (5-results.length)+" lugar/es)");
              }
          }
          //in case the response fails
      }, function (err) {
          console.log('job list ko' + err);
    });
  },
});
/*// Metodo que retorna el cliente SDK actual o crea uno sino existe y lo retorna
Meteor.methods({

  
      getSchedWH:function(){
        if (client===undefined){
          console.log("entrando por null");
            client= iniciaSolver();
     //       console.log (client);
            
        }
        else{ console.log ("cliente ya instanciado");
       //console.log (client);
         
        }
        var req, res;
        var path = process.cwd();
        console.log("camino",path);
//        const text = fs.readFileSync(`/home/daniel/csched/resources/warehouse_cloud.mod`, 'utf8');
  //      console.log(text);
        solve(['warehouse_cloud.mod', 'warehouse_cloud.dat'], req, res);
        
      },
});

// Metodo que retorna el cliente SDK actual o crea uno sino existe y lo retorna
Meteor.methods({
      getSchedSM:function(){
        if (client===undefined){
          console.log("entrando por null");
            client= iniciaSolver();
     //       console.log (client);
            
        }
        else{ console.log ("cliente ya instanciado");
       //console.log (client);
         
        }
        var req, res;
        var path = process.cwd();
        console.log("camino",path);
//        const text = fs.readFileSync(`/home/daniel/csched/resources/warehouse_cloud.mod`, 'utf8');
  //      console.log(text);
        solve(['steelmill.mod', 'steelmill.dat'], req, res);
        
      },
});

Meteor.methods({
  getResult:function(result){
       if (client===undefined){
         console.log("entrando por null");
           client= iniciaSolver();
    //       console.log (client);
       }
       else{ console.log ("cliente ya instanciado");
      //console.log (client);
       }
       if(jobidxd != null){
        result = waitresultjob(jobidxd);
      }else console.log("/////////////////jobid aun no creado");
  },
});

Meteor.methods({
      getEliminajob:function(){
      //console.log(jobidxd);
       client.deleteJob(jobidxd)
         .then(function (results) {
             console.log("Trabajo eliminado");
             res.send("200");
             res.end();

         }, function (err) {
           res.send("500",err);
           res.end();
       });
    },
});

function waitresultjob(jobid){
  client.getJob(jobid).then(function (job) {
      //console.log(JSON.stringify(job));
      //console.log(job);
      if (['PROCESSED', 'FAILED', 'INTERRUPTED'].indexOf(job.executionStatus) < 0) {
          // Job is not started or running: ask for the job status again in 500 millis
          console.log("################sigue esperando");
          setTimeout(waitresultjob(jobidxd), 500);
      }
      else { // Job is done
          console.log("-----------------------------------------trabajo ejecutado");
          //document.getElementById("spinerld").setAttribute("hidden","");
          //document.getElementById("textito").value += 'alohaaaaaaaaaaaaaaaaaaa???'
          return "trabajo ejecutado";
      }
      res.writeHead(200);
      res.write(JSON.stringify(job));
      res.end();
  }, function (err) {
      res.send("500",err);
      console.log(err);
  });
}

Meteor.methods({
      getElimina:function(){
        if (client===undefined){
          console.log("entrando por null");
            client= iniciaSolver();
     //       console.log (client);
        }
        else{ console.log ("cliente ya instanciado");
       //console.log (client);
        }
        //var req, res;
        //var path = process.cwd();
        //console.log("camino",path);
        client.deleteJobs()
        console.log("Trabajos eliminados en la nube");
//        const text = fs.readFileSync(`/home/daniel/csched/resources/warehouse_cloud.mod`, 'utf8');
  //      console.log(text);
          //res.setHeader('Content-Type', 'text/html');

      },
});
*/

