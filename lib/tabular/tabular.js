import Tabular from 'meteor/aldeed:tabular';
import { FModels } from '/lib/ModelFiles/ModelFiles.js';
import {Problema} from '/lib/collections/problema.js';


TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

  TabularTables.myFiles=new Tabular.Table({
  name: "myFiles",
  collection: FModels.collection,
  pageLength: 10,
  language: {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
            },
  // allow(userId) {
  //      // Para chequear que el usuario este logeado podemos usar (userId!=null), pues si el usuario
  //     // no esta logeado deberia arrojar null, segun
  //     // https://forums.meteor.com/t/how-do-meteor-userid-this-userid-and-meteor-user-work-internally/28043/2
     
  //     //Chequea que usuario este logeado

  //     return (userId!=null);
  //   //  return false;
  //   },
  // selector:function() {
  //   return {userId:Meteor.userId()};
  // },
  columns: [

    {data: "name", title: "nombre","width": "50%"},
  //   {data: "path", title: "path", visible:true},
     {data: "_id", title: "Id"/*, visible:false*/},
  //   {data: "versions.original.meta.pipeFrom", title: "url", visible:false},
      {
        tmpl: Meteor.isClient && Template.modelsActionBtns, title:"editar / eliminar"
      }
    ]
  
  
  });
  
  TabularTables.usuarios=new Tabular.Table({
  name: "usuarios",
  collection: Meteor.users,
  // selector:function() {
  //   var usuariosTodos= Meteor.users.find({}, {fields: {_id: 1, profile: 1, rol:1, active:1}});
  //   var usuariosTodosIds=usuariosTodos.map(function(p) { return p._id });
  //   var usuariosTodosIds=usuariosTodos.map(function(p) { return p._id });
  //   var usuariosTodosName=usuariosTodos.map(function(p) { return p.profile.nombre });
  //   console.log("usuariosTodos");
  //   console.log(usuariosTodosIds);
    
  //   return { _id:{$in: usuariosTodosIds} }
  // },
  language: {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
            },
  allow(userId) {
    var usuario=Meteor.users.findOne({_id:userId});
   // console.log("usuario en allow-TabularTables.usuarios: "+usuario);
    var rol= usuario.rol;
    //console.log("rol en allow-TabularTables.usuarios: "+rol);
    var salida=false;
    if (rol==="Administrador") {salida=true};
    console.log("salida allow TabularTables.usuarios: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },
  columns: [
     {data:"_id", title:"idUser"},
    {data: "profile.nombre", title: "nombre"},
    {data: "active", title: "Activo"},
    {data: "username", title: "username"},
    {data: "rol", title: "Rol"},
    {
      tmpl: Meteor.isClient && Template.usersActionBtns, class: "col-md-2"
    }
    ]
  });

  TabularTables.problemTab = new Tabular.Table({
  name: "problemTab",
  collection: Problema,
  pageLength: 10,
  language: {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
            },
  columns: [

       {data: "nombre", title: "Nombre del problema"},
       {data: "Description", title: "Descripcion","width": "50%"},
       //{data: "_id", title: "IdProblema"},
       //{data: "ModelfileId", title: "IdModelo"},
       {
        tmpl: Meteor.isClient && Template.botoneramod, title:"Modelo"
       },
       //{data: "DatafileId", title: "IdData"},
       {
        tmpl: Meteor.isClient && Template.botoneradat, title:"Dato"
       },
       //{data: "SolfileId", title: "IdSol"},
       //{data: "path", title: "path", visible:true},
       //{data: "versions.original.meta.pipeFrom", title: "url", visible:false},
       {
        tmpl: Meteor.isClient && Template.botonerasol, title:"solucion"
       },
       {
        tmpl: Meteor.isClient && Template.botonera, title:"editar / eliminar"
       }
    ]
  });