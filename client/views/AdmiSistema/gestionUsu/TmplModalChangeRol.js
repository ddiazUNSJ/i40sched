import {Schemas} from '/lib/images/image.collection.js';
import swal from 'sweetalert';

AutoForm.addHooks('afChangeRol', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

       var data = Meteor.users.findOne({_id: Session.get('usuarioId')}).profile.nombre;
       console.log( "data: ", data);

	           swal({
				  title: "Actualizacion Realizada",
				  text: "Se actualizaron los datos de "+ data,
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {    
				   	Modal.hide('TmplModalChangeRol');		          	
			        }  
		         
		         });
	},

	onError: function(formType, error) {
   // console.log("estoy en onerror sesion");
   //  swal( error.message);
   //  if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="insert")){
   
       swal(error.error, error.reason);
      //  swal("error capturado en addHooks", error.reason);
   //  }
  },

});





Template.TmplModalChangeRol.helpers({

// Selecciona el documento del usuario y lo pone autoform
	selectedUserDoc: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});

	},
	traeSchema:function(){
		return Schemas.GimeRol;
	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
