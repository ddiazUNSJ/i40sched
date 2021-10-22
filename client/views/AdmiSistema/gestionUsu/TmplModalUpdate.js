import swal from 'sweetalert';

AutoForm.addHooks('afUpdateAlbum', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		$('#updateModal').modal('hide')

		var data = Meteor.users.findOne({_id: Session.get('usuarioId')});

		swal("Se actualizaron los datos de", data.profile.name);
		
		Modal.hide('TmplModalUpdate');
	}

});





Template.TmplModalUpdate.helpers({

// Selecciona el documento del usuario y lo pone autoform
	selectedUserDoc: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});

	}

});