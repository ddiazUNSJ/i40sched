import swal from 'sweetalert';

Template.usersActionBtns.helpers({

   isUserActivo: function() {
             
         return  (this.active); 
    },

  


});

Template.usersActionBtns.events({

	'click #btnUpdate': function(){
		console.log("click btnUpdate");

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			  Modal.show('TmplModalUpdate');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #onOffUser': function(){
          console.log("click btnRemove2");
		if (Meteor.userId()) 
		{
            if (this.active)
			{Session.set("IdusuarioAEliminar", this._id);
						  Modal.show('TmplModalRemove');
			 }
			else 
			
					swal({
						  title: "Activar Usuario ",
						  text:  "Se activara de nuevo el usuario "+this.profile.nombre, 
						  icon: "success",
						  
						 
						})
						.then((confirma) =>{ 
						   if (confirma)   
						   {  
						   	Meteor.call("activarUsuario", this._id, function(error, result){
						   		if (error){
						   			  swal("error al activar usuario", error.message);
		                              
		                                }
		                         });  
						    }
						  });    
				      
		} 
		else 
		{

           swal("No se le permite activar usuario", "Por favor, inicie como usuario");
			

		}


	},
	'click #btnChangePass': function(){
		console.log("click btnChangePass");

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			console.log("usuarioId", Session.get('usuarioId'));
			console.log("this_id",this._id);
			  Modal.show('TmplModalChangePass');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},
	
	'click #btnNewRol': function(){
	

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			  Modal.show('TmplModalChangeRol');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

     'change #grupo-select': function (event, template) {
     	console.log ("this: ", this);
     	console.log ("event: ", event);
        var opcion = $(event.currentTarget).val();
        switch (opcion) {
		//-------------
          case "changeRol":
             if (Meteor.userId()) {
            	Session.set("usuarioId", this._id);
			    Modal.show('TmplModalChangeRol');
        		} 
        	 else {
        	    swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		       };
		     break; 

		//-------------
		  case "changePass":
             if (Meteor.userId()) {
            	Session.set("usuarioId", this._id);
			    Modal.show('TmplModalChangePass');
        		} 
        	 else {
        	    swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		       };
		     break;

		//-------------
		  case "changeUserName":
             if (Meteor.userId()) {
            	Session.set("usuarioId", this._id);
			    Modal.show('TmplModalChangeUserName');
        		} 
        	 else {
        	    swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		       };
		     break;   
		          
		//-------------
		  case "disableUser":
             if (Meteor.userId()) {
            	Session.set("IdusuarioAEliminar", this._id);
			    Modal.show('TmplModalRemove');
        		} 
        	 else {
        	    swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		       };
		     break;   
		//-------------
		  case "enableduser":
		     swal({
				  title: "Activar Usuario",
				  text:  this._id +"  va a activarse" ,
				  icon: "success",
				  
				 
				})
				.then((confirma) =>{ 
				   if (confirma)   
				   {    
				   	Meteor.call("activarUsuario", this._id, function(error, result){
                     if (error) swal ("Error al activar usuario", error.message)
                     else swal ("activacion exitosa")
				   	});		          	
			        }  
		         
		         });
				break;

		//-------------
		  case "changeEmail":
             if (Meteor.userId()) {
            	Session.set("usuarioId", this._id);
			    Modal.show('TmplModalChangeEmail');
        		} 
        	 else {
        	    swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		       };
		     break;   
		};

       event.currentTarget.value="elije";
        
    }

});
