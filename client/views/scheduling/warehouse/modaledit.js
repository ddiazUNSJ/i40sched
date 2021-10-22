import {Problema} from '/lib/collections/problema.js';

Template.modaledit.onCreated(function(){
	var idProb = Session.get("idproblema");
	var nombre = Problema.findOne({"_id": idProb } , { fields: { nombre: 1}}).nombre;
	Session.set("nom",nombre);

	var descripcion = Problema.findOne({"_id": idProb } , { fields: { Description: 1}}).Description;
	Session.set("des",descripcion);
	
});

Template.modaledit.helpers({

	//$("nombre").val(nombre);
	Nombre: function(){
		return Session.get("nom");
	},
	Descripcion: function(){
		return Session.get("des");
	}
});

Template.modaledit.events({

	'click #guardar':function(){

		var nombre= $("input#nombre").val();
		var descripcion= $("input#descripcion").val();

		Meteor.call('actualizarNomDesProbl', Session.get('idproblema'), nombre, descripcion,function (error, result){ 
                 if (error){
                  swal("Error");
                  console.log(error);
                 }
                 else{
                 console.log("Update realizado");
                 swal("Operacion realizada con exito!", "actualizacion completa!", "success")
                }
        });
	}

});