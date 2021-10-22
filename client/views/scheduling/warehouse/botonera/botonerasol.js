import { FModels } from '/lib/ModelFiles/ModelFiles.js';
import {FData} from '/lib/DataFiles/DataFiles.js';
import {Problema} from '/lib/collections/problema.js';
import {FSol} from '/lib/SolFiles/SolFiles.js';

var fs = require('fs');

Template.botonerasol.onCreated(function () {
  Session.set("loading",undefined);
});

Template.botonerasol.events({
	'click #obtenersol':function(){
		//la variable de sesion loading nos sirve para poder determinar el momento en que se dio click
		//al boton con id obtenersol para mostrar el spiner que indica que se esta procesando el trabajo
		Session.set("loading",this._id);
		// Extraer del documento del problema actual los id del modelo y los datos
		var modelId = Problema.findOne({"_id": this._id } , { fields: { ModelfileId: 1}}).ModelfileId;
		var dataId = Problema.findOne({"_id": this._id } , { fields: { DatafileId: 1}}).DatafileId;

        // Guardar datos de los ficheros solution.json y solution.log en la coleccon FSol
		solJson = FSol.insert({
          file: 'solution.json',
          isBase64: true, // <— Mandatory
          fileName: 'solution.json', // <— Mandatory
          type: 'text/json' // <— Mandatory
        });

		solLog = FSol.insert({
          file: 'solution.log',
          isBase64: true, // <— Mandatory
          fileName: 'solution.log', // <— Mandatory
          type: 'text/log' // <— Mandatory
        });

		idSolJson = solJson.config.fileId;
		idSolLog = solLog.config.fileId;

//		console.log(idSolJson);
//		console.log(idSolLog);

		Meteor.call('getSol',modelId+'.mod',dataId+'.dat', this._id , idSolJson , idSolLog , function (error, result){ 
		         if (error){	         	
		          console.log(error);
		         }
		         else{
		         console.log("Ejecutando solucion...");
		         }
		});
	},
	'click #verSol': function(){
		//var jsonId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}}).SolJsonfileId;
        console.log( "problemaId: ", this._id);
		Meteor.call('leerArchivoJson', this._id , function (error, result){ 
			if (error){
				console.log(error);
			}
			else{
				Session.set("fileAMostrar",result);
				console.log(result);
				Modal.show('modalreg'); 
			}
		});
	},
	'click #verLog': function(){
	//	var logId = Problema.findOne({"_id": this._id } , { fields: { SolLogfileId: 1}}).SolLogfileId;
        console.log( "problemaId: ", this._id);
		Meteor.call('leerArchivoLog', this._id , function (error, result){ 
			if (error){
				console.log(error);
				alert("error");
			}
			else{
				Session.set("fileAMostrar",result);
				//Session.set("idP",this._id);
				//console.log(result);
				Modal.show('modalreg'); 
			}
		});
	}
});

Template.botonerasol.helpers({
	isOk:function(){

		var modelId = Problema.findOne({"_id": this._id } , { fields: { ModelfileId: 1}});
		var dataId = Problema.findOne({"_id": this._id } , { fields: { DatafileId: 1}});
		//console.log(modelId);
		//console.log(dataId);
		if((modelId != undefined) && (dataId != undefined)){
			return ((modelId.ModelfileId!=undefined)&&(dataId.DatafileId!=undefined));
		}

	},
	loading:function(){

		var problId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}});
		if((Session.get("loading") == this._id)&&((problId.SolJsonfileId == undefined)||(problId.SolJsonfileId == "")))
		{
			return true;
		}else return false;
   },
   solIsOk:function(){
   		Session.set("loading",undefined);
		var problId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}});
		try{
			if(problId.SolJsonfileId != undefined)
			return true;
		}catch(err){
			return false;
		}
   },
});