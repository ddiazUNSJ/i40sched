

import {Schemas} from '/lib/images/image.collection.js';
import swal from 'sweetalert';

AutoForm.addHooks('afChangePass', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		var data = Meteor.users.findOne({_id: Session.get('usuarioId')});

		//swal("Se actualizó el password de "+ data.profile.nombre);
		swal({
				  title: "Actualizacion Realizada",
				  text: "Se actualizó el password de  "+ data.profile.nombre,
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {    
				   	Modal.hide('TmplModalChangePass');		          	
			        }  
		         
		         });

	},


	// formToDoc: function(doc) {
	// 	console.log("doc:", doc);
 //     doc.userId=Session.get('usuarioId');
 //     return doc;
 //  },
  onError: function(formType, error) {
   console.log("estoy TmplModalChangePass");
    if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="method")){
      swal(error.reason, error.message);
    }
  },

});





Template.TmplModalChangePass.helpers({

// Selecciona el documento del usuario y lo pone autoform
	
	selectedUserDoc: function(){
		var idUsuario=Session.get('usuarioId');
		console.log("idUsuario:", idUsuario);
	//	var usuarioReg=Meteor.users.findOne({_id: Session.get('usuarioId')});
     //   console.log("usuarioReg: ",usuarioReg);
        var passDoc={userId:idUsuario, password:"",confirmPassword:"" }
		return passDoc;
	},

	traeSchema:function(){
		return Schemas.GimePassword;
	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
