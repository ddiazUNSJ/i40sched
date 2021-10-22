import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Configuracion = new Mongo.Collection('configuracion');

ConfiguracionSchema = new SimpleSchema({
	nroCasas:{
		type: Number,
    	label: "Nro Casas",
    	min:1,
    	max:4,
	},
	});

ConfiguracionSchemaConMethod = new SimpleSchema({
  _id:{
    type:String,
    label:"idConfig"
  },
  nroCasas:{
    type: Number,
      label: "Nro Casas",
      min:1,
      max:4,
  },
  });
Configuracion.attachSchema(ConfiguracionSchema);

if (Meteor.isServer)
{
  
 Meteor.methods({

  updateConfig:function(modifier,idConfig){
    // Checking datos de entrada
    console.log("entrando a updateConfig");
    console.log( "modifier: ", modifier);
    check(idConfig,String);
    check(modifier, ConfiguracionSchema);  
 
     // Verifica Identidad 
      if (!this.userId) {
         throw new Meteor.Error('Acceso invalido',
           'Ustede no esta logeado');
       }
     
     // modifica configuracion
        Configuracion.update({ _id: idConfig }, modifier); 
      
     },

updateConfigConMethod:function(doc){
    // Checking datos de entrada
    console.log("entrando a updateConfigConMethod");
    console.log("doc: " , doc);
    check(doc, ConfiguracionSchemaConMethod);  
 
     // Verifica Identidad 
      if (!this.userId) {
         throw new Meteor.Error('Acceso invalido',
           'Ustede no esta logeado');
       }
     
     // modifica configuracion
       var modifier = {"$set":{nroCasas:doc.nroCasas}};
        Configuracion.update({ _id: doc._id }, modifier); 
      
     },
 }); 
 
 };   
