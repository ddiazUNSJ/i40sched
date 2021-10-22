import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { FSol } from '/lib/SolFiles/SolFiles.js';
import {FData} from '/lib/DataFiles/DataFiles.js';
import { FModels } from '/lib/ModelFiles/ModelFiles.js';
import fs from 'fs';

export const Problema = new Mongo.Collection('problema');

ProblemaSchema = new SimpleSchema({
	nombre:{
		type: String,
    label: "Nombre"
	},
	Description:{
		type: String,
		label: "Descripcion",
		optional: true
	},
	userId:{
    type: String,
    label: "IdUsuario",
    optional: true
    },
  ModelfileId:{
    type: String,
    label: "IdModelo",
    optional: true
    },
  DatafileId:{
    type: String,
    label: "IdData",
    optional: true
    },
  SolJsonfileId:{
    type: String,
    label: "IdSol",
    optional: true
    },
  SolLogfileId:{
    type: String,
    label: "IdSol",
    optional: true
    }
});

Problema.attachSchema(ProblemaSchema);

if (Meteor.isServer) {
  Meteor.publish('problema', function problemaPublication() {
      return Problema.find();
  });
  Problema.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },
    'remove': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },
    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('problema');
}

if (Meteor.isServer)
{
  
 Meteor.methods({

  insertarIdModelo:function(idProblema, idModelo){
    check(idProblema,String);
    check(idModelo,String);

      //Verifica Identidad 
      //if (!this.userId) {
      //    throw new Meteor.Error('Acceso invalido',
      //      'Ustede no esta logeado');
      //  }
     
       //Verifica que exista problema
       problema=Problema.findOne({_id:idProblema});
       if (problema==undefined) {
          throw new Meteor.Error('No existe problema',
            'El problema que se intenta acceder  no existe en la coleccion Problema ');
        }
       Problema.update({ _id: idProblema }, { $set: {'ModelfileId' : idModelo }});
     },
  insertarIdDato:function(idProblema, idDato){
    check(idProblema,String);
    check(idDato,String);

      //Verifica Identidad 
      //if (!this.userId) {
      //    throw new Meteor.Error('Acceso invalido',
      //      'Ustede no esta logeado');
      //  }
     
       //Verifica que exista problema
       problema=Problema.findOne({_id:idProblema});
       if (problema==undefined) {
          throw new Meteor.Error('No existe problema',
            'El problema que se intenta acceder  no existe en la coleccion Problema ');
        }
       Problema.update({ _id: idProblema }, { $set: {'DatafileId' : idDato }});
     },
  insertarIdSol:function(idProblema, idSolJson, idSolLog){
    check(idProblema,String);
    check(idSolJson,String);
    check(idSolLog,String);
      //Verifica Identidad 
      //if (!this.userId) {
      //    throw new Meteor.Error('Acceso invalido',
      //      'Ustede no esta logeado');
      //  }
     
       //Verifica que exista problema
       problema=Problema.findOne({_id:idProblema});
       if (problema==undefined) {
          throw new Meteor.Error('No existe problema',
            'El problema que se intenta acceder  no existe en la coleccion Problema ');
        }
       Problema.update({ _id: idProblema }, { $set: {'SolJsonfileId' : idSolJson }});
       Problema.update({ _id: idProblema }, { $set: {'SolLogfileId' : idSolLog }});
  },
  actualizarNomDesProbl: function(idProblema, nomProb, descProb){
    check(idProblema,String);
    check(nomProb,String);
    check(descProb,String);

    problema=Problema.findOne({_id:idProblema});
    if (problema==undefined) {
       throw new Meteor.Error('No existe problema',
         'El problema que se intenta acceder  no existe en la coleccion Problema ');
     }
    Problema.update({ _id: idProblema }, { $set: {'nombre' : nomProb }});
    Problema.update({ _id: idProblema }, { $set: {'Description' : descProb }});

  },
  eliminaModelo: function(idProblema){
    check(idProblema, String);

    problema=Problema.findOne({_id:idProblema});
    if (problema==undefined) {
       throw new Meteor.Error('No existe problema',
         'El problema que se intenta acceder  no existe en la coleccion Problema ');
     }else{
        //console.log(problema.DatafileId);
        FModels.collection.remove(problema.ModelfileId);
        Problema.update({_id: idProblema},{$unset:{"ModelfileId":""}});
        
        if((problema.SolJsonfileId != undefined)||(problema.SolJsonfileId != "")){
          FSol.collection.remove(problema.SolJsonfileId);
          FSol.collection.remove(problema.SolLogfileId);
          Problema.update({_id: idProblema},{$unset:{"SolJsonfileId":""}});
          Problema.update({_id: idProblema},{$unset:{"SolLogfileId":""}});
        }
     }
  },
  eliminaDato: function(idProblema){
    check(idProblema, String);

    problema=Problema.findOne({_id:idProblema});
    if (problema==undefined) {
       throw new Meteor.Error('No existe problema',
         'El problema que se intenta acceder  no existe en la coleccion Problema ');
     }else{
        //console.log(problema.DatafileId);
        FData.collection.remove(problema.DatafileId);
        Problema.update({_id: idProblema},{$unset:{"DatafileId":""}});
        
        if((problema.SolJsonfileId != undefined)||(problema.SolJsonfileId != "")){
          FSol.collection.remove(problema.SolJsonfileId);
          FSol.collection.remove(problema.SolLogfileId);
          Problema.update({_id: idProblema},{$unset:{"SolJsonfileId":""}});
          Problema.update({_id: idProblema},{$unset:{"SolLogfileId":""}});
        }
     }
  },
  lerrArchivoDat:function(idProblema){
    check(idProblema, String);
   // const rd = process.env.PWD;
    var fileDatId=Problema.findOne({_id:idProblema}).DatafileId;
    var camino= FData.findOne({"_id":fileDatId}).path;
    console.log("path: ", camino);
       
   // const fileDat = fs.readFileSync(`${rd}/modelsStore/`+fileDatId+'.dat', "utf8");
    const fileDat = fs.readFileSync(camino, "utf8");
    return fileDat;
  },

  lerrArchivoMod:function(idProblema){
    check(idProblema, String);
   // const rd = process.env.PWD;
    var fileModId=Problema.findOne({_id:idProblema}).ModelfileId;
    var camino= FModels.findOne({"_id":fileModId}).path;
    console.log("path: ", camino);
    //const fileMod = fs.readFileSync(`${rd}/modelsStore/`+fileModId+'.mod', "utf8");
    const fileMod = fs.readFileSync(camino, "utf8");

    return fileMod;
 //   '/home/daniel/sched2019Fer/modelsStore/vhvDExGACLJ47HaHf.dat'
  },

  leerArchivoJson: function(idProblema){
    check(idProblema,String);
    const rd = process.env.PWD;
    var fileSolId=Problema.findOne({_id:idProblema}).SolJsonfileId;
    var camino= FSol.findOne({"_id":fileSolId}).path;

    try {
     // const obj = JSON.parse(fs.readFileSync(`${rd}/modelsStore/`+jsonId+'.json'));
     // const fileOutput = fs.readFileSync(`${rd}/modelsStore/`+jsonId+'.json', "utf8");
      const obj = JSON.parse(fs.readFileSync(camino));
      const fileOutput = fs.readFileSync(camino, "utf8");
      return fileOutput;
    } catch (err) {
      return "Error: archivo no encontrado";
    }    
  },

  //DD 13JUNIO2019 OJO Aqui se deberia respectar la misma estructura , es decir generar un FLog no colocar la solucion y los logs en el mismo
  // filecollection

  leerArchivoLog: function(idProblema){
    check(idProblema,String);
   // const rd = process.env.PWD;
    
    var fileLogId=Problema.findOne({_id:idProblema}).SolLogfileId;
    var camino= FSol.findOne({"_id":fileLogId}).path;
    console.log("path: ", camino);
    try {
    //  const obj = fs.readFileSync(`${rd}/modelsStore/`+logId+'.log', "utf8");
      const fileOutput = fs.readFileSync(camino, "utf8");
      return fileOutput;
    } catch (err) {
      return "Error: archivo no encontrado";
    }    
  }
  
 });
}