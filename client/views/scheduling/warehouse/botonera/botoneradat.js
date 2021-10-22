import { Session } from 'meteor/session'
import {Problema} from '/lib/collections/problema.js';
import {FData} from '/lib/DataFiles/DataFiles.js';
import {FSol} from '/lib/SolFiles/SolFiles.js';

Template.botoneradat.events({
	'click #botondat':function(){
		Session.set('idproblema', this._id);
		Modal.show('modaldat');
	},
	'click #eliminaDat':function(){
		swal({
		  title: "¿Estas seguro que deseas eliminar el dato?",
		  text: "Una vez eliminado, no podrás recuperarlo!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    Meteor.call('eliminaDato', this._id , function (error, result){ 
		             if (error){	         	
		              console.log(error);

		             }
		             else{
		             console.log("Operacion realizada con exito");
		             }
		    });
		  	//FModels.remove(this._id);
		      swal("Operacion realizada con exito!", "Dato eliminado!", "success");
		  } else {
		    //swal("Your imaginary file is safe!");
		  }
		});
	},
	 'click #pimg':function(){

	 	Meteor.call('lerrArchivoDat', this._id , function (error, result){ 
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

Template.botoneradat.helpers({
	isOk:function(){
       //Esta definida el dato del problema
		var dataId = Problema.findOne({"_id": this._id });
		if (dataId != undefined){
			return (dataId.DatafileId!=undefined);
		}
	},

	nombre:function(){
		var dataId = Problema.findOne({"_id": this._id });
		if(dataId.DatafileId != undefined){
			if(FData.findOne({"_id": dataId.DatafileId}) != undefined){
				return FData.findOne({"_id": dataId.DatafileId}).name;
			}
	     
		 };

   },

});