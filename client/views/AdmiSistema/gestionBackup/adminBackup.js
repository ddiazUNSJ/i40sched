Template.adminBackup.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },

  isAnim: function() {
         
          
    var rol=Session.get('rol')

          return  (rol==="Animador"); 
    }

   
});

Template.adminBackup.onCreated(function () {
	
  
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{

              rol=result;
               console.log("rol en cliente: "+ rol)
               Session.set('rol',rol);
        //      return  (rol==="Administrador");
             }
    });
         

});
