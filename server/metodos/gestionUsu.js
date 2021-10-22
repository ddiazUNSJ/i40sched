//import {Schemas} from '/lib/images/image.collection.js';
Meteor.methods({

getUserRol:function(){
	var rol;
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    rol=Meteor.users.findOne({_id:this.userId}).rol;
 //   console.log("getUserRol: "+ rol);
	return rol;
},

isActiveUser:function(){
	var isActive;
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    isActive=Meteor.users.findOne({_id:this.userId}).active;
    console.log("isActive: "+ isActive);
	return isActive;
},

getUserNombre:function(){
    var rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    nombre=Meteor.users.findOne({_id:this.userId}).profile.nombre;
    console.log("getUserNombre: "+ nombre);
    return nombre;
},

// Cambio forzoso de password.
/**
 * Hace el cambio forzoso del password, usado por administrador del sistema
 * para cambiar el password de un usuario ,
 * Entrada  , 2 parametros
 * @param {String} idUsuarioDestino es el userId del usuario al que le vamos a cambiar el password
 * @param {String} newPass, el nuevo password.
 
 */
setForcedNewPass:function (docSchema){
    // Es usuario del sistema 
     if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    getUserRol=Meteor.users.findOne({_id:this.userId}).rol;
    if (getUserRol != "Administrador") {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no administrado no se permite esta accion');
    };
    check(docSchema,Schemas.GimePassword);
    var idUsuarioAlQuecambiaremosElPassword= docSchema.userId;
    var newPass=docSchema.password;
    Accounts.setPassword(idUsuarioAlQuecambiaremosElPassword, newPass);
},

//DD 23/08/2017
// Procesando la inscripcion comunmente pasamos estado pendiente a aceptada o no aceptada

 setForcedNewPass_2: function (modifier, objID) {
      //Mostrando lo que trae modifier
      console.log(modifier);
      //Validando mediante contexto al contenido de modifier es decir al estadoInscripcio
       var esvalido=Schemas.GimePassword.namedContext().validate(modifier, {modifier: true});
       console.log("esvalido: ",esvalido);

      
      check(objID,String);
      check(modifier,Schemas.GimePassword);
     //  return Inscripcion.update({ _id: inscriId }, { $set: {'activa' : false }});

      return Inscripcion.update(objID, modifier);
      },

// ----------- Crea Usuario ----------------
/**
 * Crea un usuario con los datos de docSchema
 *
*/
 crearUsuario: function (docSchema) {
      console.log("creando usuario desde sistema");
      
    if (Meteor.call("getUserRol") !="Administrador") {
      throw new Meteor.Error('Acceso invalido',
        'Usted no administrador, no se permite esta accion');
    };
      
     
      
      check(docSchema,Schemas.NuevoUsuario);

      var idUsuario =Accounts.createUser({
                username: docSchema.username,
                 profile: {nombre:docSchema.nombre
                           },
                password:"123456",             
                      });

       Accounts.addEmail(idUsuario, docSchema.username+"@idetr.tk", true);
       Meteor.users.update({ _id: idUsuario }, { $set: {'rol' : "Usuario" ,'active' : true }});
      
      return idUsuario;
      },


// ----------- Existe Usuario ----------------
/**
 *Determina si existe el usuario con el id idUser
 *
*/
existeUsername:function(idUser){

    check( idUser, String);
    var cantDeVecesUsername =user.find({userId:idUser}).count();
    if (cantDeVecesUsername>0){
         return true;
    }
    else
        {return false;}
   
},

// ----------- Establece Rol del Usuario ----------------
/**
 * Cambia de rol un usuario 
 *
*/

   setRol: function (docSchema){
    // Es usuario del sistema 
     if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };

    getUserRol=Meteor.users.findOne({_id:this.userId}).rol;
    if (getUserRol !="Administrador") {
      throw new Meteor.Error('Acceso invalido',
        'Usted no es administrador, no se permite esta accion');
    };
    getUserName=Meteor.users.findOne({_id:docSchema.userId}).username
    if (getUserName==="ddiaz"){
      throw new Meteor.Error('Cambio invalido',
        'No se puede cambiar el rol del Master Administrator');
    };
    check(docSchema,Schemas.GimeRol);
    var idUsuarioAlQuecambiaremosElRol= docSchema.userId;
    var newRol=docSchema.rol;
    Meteor.users.update({ _id: idUsuarioAlQuecambiaremosElRol }, { $set: {'rol' : newRol }});
   
    },
   
})