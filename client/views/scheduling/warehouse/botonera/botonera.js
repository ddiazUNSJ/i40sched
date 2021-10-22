import { FModels } from '/lib/ModelFiles/ModelFiles.js';
import { FData } from '/lib/DataFiles/DataFiles.js';
import { FSol } from '/lib/SolFiles/SolFiles.js';
import { Problema } from '/lib/collections/problema.js';


Template.botonera.events({

'click #modelBtnUpdate': function(){
  //swal ("Elemento modificado");
  Session.set('idproblema', this._id);
  Modal.show('modaledit');

},
'click #modelBtnRemove': function(){
 // swal ("Elemento eliminado");
  
  swal({
    title: "¿Estas seguro que deseas eliminar el problema?",
    text: "Una vez eliminado, no podrás recuperarlo!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      var modelId = Problema.findOne({"_id": this._id } , { fields: { ModelfileId: 1}}).ModelfileId;
      var dataId = Problema.findOne({"_id": this._id } , { fields: { DatafileId: 1}}).DatafileId;
      var JsonId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}}).SolJsonfileId;
      var LogId = Problema.findOne({"_id": this._id } , { fields: { SolLogfileId: 1}}).SolLogfileId;
      Problema.remove( this._id );
      FModels.collection.remove( modelId );
      FData.collection.remove( dataId );
      FSol.collection.remove( JsonId );
      FSol.collection.remove( LogId );
    	console.log("Problema eliminado satisfactoriamente");
    	//FModels.remove(this._id);
        swal("Operacion realizada con exito!", "Problema eliminado!", "success");
    } else {
      //swal("Your imaginary file is safe!");
    }
  });
},

});