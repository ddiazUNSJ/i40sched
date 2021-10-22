import {Schemas} from '/lib/images/image.collection.js';
import swal from 'sweetalert';

AutoForm.addHooks('afCreateUser', {


	onError: function(formType, error) {
   console.log("estoy en crear usuario");
    if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="method")){
     // swal(error.error, error.reason);
         swal(error.reason, error.message);
    }
  },

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, nombreUserCreado) {
      console.log("nombreUserCreado: ", nombreUserCreado);
      
    //   console.log ("nombre: ", data.profile.nombre);
       

	           swal({
				  title: "Usuario creado",
				  text:  nombreUserCreado +" ha sido creado con password 123456" ,
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {    
				   	Modal.hide('TmplModalCreateUser');		          	
			        }  
		         
		         });
		
	}

});





Template.TmplModalCreateUser.helpers({

	selectedUserDoc: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});

	},
	traeSchema:function(){
		return Schemas.NuevoUsuario;
	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
