
Template.adminUsers.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },

  // isAnim: function() {
         
          
  //   var rol=Session.get('rol')

  //         return  (rol==="Animador"); 
  //   }


});

Template.adminUsers.onCreated(function () {
    // Trae Usuarios
   //  handleAllUsers =  Meteor.subscribe('allUsers');
    //Obtiene rol
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Error en adminUsers","Usted no es usuario del sistema ")
             }
             else{
              rol=result;
              console.log("rol en cliente: "+ rol)
              Session.set('rol',rol);
              }
    });
});
Template.adminUsers.onDestroyed(function () {
    // Trae Usuarios
    // console.log("destruyendo suscripciones");
   //   handleAllUsers.stop(); 
});
