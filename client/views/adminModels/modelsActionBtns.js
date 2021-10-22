//import {Tasks} from '/lib/collections/task.js';
import { FModels } from '/lib/ModelFiles/ModelFiles.js';

Template.modelsActionBtns.events({

'click #modelBtnUpdate': function(){
  swal ("Elemento modificado");

},
'click #modelBtnRemove': function(){
 // swal ("Elemento eliminado");
  
  swal({
    title: "¿Estas seguro que deseas eliminar el elemento?",
    text: "Una vez eliminado, no podrás recuperarlo!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    	FModels.collection.remove(this._id);
    	//FModels.remove(this._id);
        swal("Operacion realizada con exito!", "Elemento eliminado!", "success");
    } else {
      //swal("Your imaginary file is safe!");
    }
  });
},

});