import { FModels } from '/lib/ModelFiles/ModelFiles.js';
//import { Models } from '/lib/images/udropboxV2.js';
var uploadInstance;

Template.modalAgregarModelo.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});


Template.modalAgregarModelo.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.modalAgregarModelo.events({

  // 'change.bs.fileinput' :function(){
  //   console.log("event: ", event);
  //   var file = event.currentTarget.files[0];
  //   console.log("file: ", file);
  // },


  'change.bs.fileinput': function ( e, template) {
    console.log("e: ", e);
    console.log("template: ", template);
    
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = event.currentTarget.files[0];
      if (file) {
        uploadInstance = FModels.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });
      }
    }
  },
  'click #guardar':function(){

    uploadInstance.on('end', function(error, fileObj) {
      if (error) {
        alert('Error during upload: ' + error.reason);
      } else {
        alert('File "' + fileObj.name + '" successfully uploaded');
      }
      template.currentUpload.set(false);
    });
      uploadInstance.start();
  }
  
});

// $('.custom-file-input').on('change', function() {
//    let fileName = $(this).val().split('\\').pop();
//    $(this).next('.custom-file-label').addClass("selected").html(fileName);
// }); 
