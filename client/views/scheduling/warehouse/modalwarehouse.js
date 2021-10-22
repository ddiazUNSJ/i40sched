import {Problema} from '/lib/collections/problema.js';
import { Session } from 'meteor/session'

Template.modalwarehouse.events({
  'click #btnAgregarnuevo': function(){

    var nombre= $("input#nombre").val();
    var descripcion= $("input#descripcion").val();
    //console.log(nombre);
    Problema.insert({nombre:nombre, Description:descripcion});
    
  }
});
