import { FData } from '/lib/DataFiles/DataFiles.js';

var uploadInstance;
var temp;
var idArchivo;

Template.modaldat.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  Session.set("file",undefined);
});


Template.modaldat.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  
    isGuardarOn:function(){
    return (Session.get("file")!=undefined);
  }
});

Template.modaldat.events({

  'change.bs.fileinput': function ( e, template) {
    console.log("e: ", e);
    console.log("template: ", template);

    if (event.currentTarget.files && event.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      Session.set("file",event.currentTarget.files[0]);
      var file = event.currentTarget.files[0];
      if (file) {
        uploadInstance = FData.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
        idArchivo = uploadInstance.config.fileId;
        temp = template;
        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });
      }
    }
  },
  'click #guardar12':function(){
    
    uploadInstance.on('end', function(error, fileObj) {
      if (error) {
        //FData.remove({"_id" : idArchivo});
        alert('Error during upload: ' + error.reason);
      } else {
          Meteor.call('insertarIdDato',Session.get('idproblema'),idArchivo,function (error, result){ 
                 if (error){
                  swal("Error");
                  console.log(error);
                 }
                 else{
                 console.log("Update realizado");
                }
        });
        $("#modal_agregar_dato").modal('hide');
      }
      temp.currentUpload.set(false);
    });
      uploadInstance.start();
  }
});

// modificaciones daniel 
//  import { FModels } from '/lib/ModelFiles/ModelFiles.js';
// import { Problema } from '/lib/collections/problema.js';
// //import { Models } from '/lib/images/udropboxV2.js';
// var uploadInstance;

// Template.modalmod.onCreated(function () {
//   this.currentUpload = new ReactiveVar(false);
// });


// Template.modalmod.helpers({
//   currentUpload: function () {
//     return Template.instance().currentUpload.get();
//   },

//   isGuardarOn:function(){
//     return (Session.get("file")!=undefined);
//   }

// });

// Template.modalmod.events({

//   // 'change.bs.fileinput' :function(){
//   //   console.log("event: ", event);
//   //   var file = event.currentTarget.files[0];
//   //   console.log("file: ", file);
//   // },


//   'change.bs.fileinput': function ( e, template) {
//     console.log("e: ", e);
//     console.log("template: ", template);

//     var idpr = Session.get('idproblema');
//     //console.log('id del problema: '+idpr);
//     if (event.currentTarget.files && event.currentTarget.files[0]) {
//       // We upload only one file, in case 
//       // there was multiple files selected
//       //var file = event.currentTarget.files[0];
//       Session.set("file",event.currentTarget.files[0]);

//     }
//   },
//   'click #guardar':function(){
//     var file= Session.get("file");

//     if (file) {
//         uploadInstance = FModels.insert({
//           file: file,
//           streams: 'dynamic',
//           chunkSize: 'dynamic'
//           //_idproblem: idpr
//         }, false); // Crear objeto de la clase FileUpload

//         uploadInstance.on('start', function() {
//           template.currentUpload.set(this); // variable reactiva
//         });
//       }

//     uploadInstance.on('end', function(error, fileObj) {
//       if (error) {
//         alert('Error during upload: ' + error.reason);
//       } else {
//         alert('File "' + fileObj.name + '" successfully uploaded');
//       }
//       template.currentUpload.set(false);
//     });
//       uploadInstance.start();
//       console.log("idFIle: ", uploadInstance.config.fileId);
//       Meteor.call("insertarIdModelo",Session.get('idproblema'), uploadInstance.config.fileId, function (error, result)
//       {
//         if (error){
//            swal(error.error, error.reason);
//          }
//         else swal("OK", "Sesion Eliminada");
//       }

//      );
//     //  console.log(uploadInstance);
//   }
// });

// // $('.custom-file-input').on('change', function() {
// //    let fileName = $(this).val().split('\\').pop();
// //    $(this).next('.custom-file-label').addClass("selected").html(fileName);
// // }); 
