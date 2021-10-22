import { Session } from 'meteor/session'
import {Problema} from '/lib/collections/problema.js';
import { FModels } from '/lib/ModelFiles/ModelFiles.js';

Template.botoneramod.events({
	'click #botonmod':function(){
		Session.set('idproblema', this._id);
		Modal.show('modalmod');
	},
	'click #eliminaMod':function(){
		swal({
		  title: "¿Estas seguro que deseas eliminar el modelo?",
		  text: "Una vez eliminado, no podrás recuperarlo!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    Meteor.call('eliminaModelo', this._id , function (error, result){ 
		             if (error){	         	
		              console.log(error);
		             }
		             else{
		             console.log("Operacion realizada con exito");
		             }
		    });
		  	//FModels.remove(this._id);
		      swal("Operacion realizada con exito!", "Modelo eliminado!", "success");
		  } else {
		    //swal("Your imaginary file is safe!");
		  }
		});
	},
	'click #pimg':function(){

	 	Meteor.call('lerrArchivoMod', this._id , function (error, result){ 
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
});

Template.botoneramod.helpers({
	isOk:function(){
		var modelId = Problema.findOne({"_id": this._id });
		if(modelId != undefined){
			return (modelId.ModelfileId!=undefined);
		}
	},

	nombre:function(){
		var modelId = Problema.findOne({"_id": this._id });
		if(modelId.ModelfileId != undefined){
			if(FModels.findOne({"_id": modelId.ModelfileId}) != undefined){
				return FModels.findOne({"_id": modelId.ModelfileId}).name;
			}
		 };
   },
});