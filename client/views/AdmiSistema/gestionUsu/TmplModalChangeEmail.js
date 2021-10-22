
import {Schemas} from '/lib/images/image.collection.js';
import swal from 'sweetalert';

AutoForm.addHooks('afChangeEmail', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		var data = Meteor.users.findOne({_id: Session.get('usuarioId')});

		//swal("Se actualizó el password de "+ data.profile.nombre);
		swal({
				  title: "Actualizacion Realizada",
				  text: "Se actualizó el email de  "+ data.profile.nombre,
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {    
				   	Modal.hide('TmplModalChangeEmail');		          	
			        }  
		         
		         });

	},


	// formToDoc: function(doc) {
	// 	console.log("doc:", doc);
 //     doc.userId=Session.get('usuarioId');
 //     return doc;
 //  },
  onError: function(formType, error) {
   console.log("estoy TmplModalChangeEmail");
    if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="method")){
      swal(error.reason, error.message);
    }
  },

});





Template.TmplModalChangeEmail.helpers({

// Selecciona el documento del usuario y lo pone autoform
	
	selectedUserDoc: function(){
		var idUsuario=Session.get('usuarioId');
	    var userNameDoc={userId:idUsuario, email:"" }
		return userNameDoc;
	},

	traeSchema:function(){
		return Schemas.GimeEmail;

	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
