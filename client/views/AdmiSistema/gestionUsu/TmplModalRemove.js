import swal from 'sweetalert';

Template.TmplModalRemove.helpers({

	data: function(){
	var userId=Session.get('IdusuarioAEliminar');
	console.log("userId: ", userId);
     var usuarioReg=Meteor.users.findOne({_id: userId});
     console.log("usuarioReg: ",usuarioReg);
		return usuarioReg;
	},

});





Template.TmplModalRemove.events({

	"click  #confirmTrue": function(){

		if (Meteor.userId()) {
            var data = Meteor.users.findOne({_id: Session.get('IdusuarioAEliminar')});
            swal({
				  title: "Desactivar Usuario ",
				  text:  "Se desactivara el usuario "+data.profile.nombre, 
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {  
				   	Meteor.call("removeUsuario", Session.get('IdusuarioAEliminar'), function(error, result){
				   		if (error){
				   			  swal(error.reason, error.message);
                              
                                }
                         else{
                         		Modal.hide('TmplModalCreateUser');
             
                             }
				   	  });  
				    }
				  });    
		    }
		else swal("no esta autorizado para eliminar usuarios");
	},

});

