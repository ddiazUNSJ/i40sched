
export const Schemas = {};


Schemas.profileSchema = new SimpleSchema({
  
  nombre: {
    type: String,
    max: 25,
    min: 3,
    optional: true
  }, 
  ocupacion: {
    type: String,
    max: 25,
    min: 3,
    optional: true
  }, 
   
});

//adaptado desde https://github.com/aldeed/meteor-collection2
Schemas.User = new SimpleSchema({
  username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    // username: {
    //     type: String,
    //     regEx: /^[a-z0-9A-Z_]{3,15}$/,
    //     unique: true,
    //     custom() {
    //       if (Meteor.isClient && this.isSet) {
    //         Meteor.call("existeUsername", this.value, (error, result) => {
    //           if (!result) {
    //             this.validationContext.addValidationErrors([{
    //               name: "username",
    //               type: "notUnique"
    //             }]);
    //           }
    //         });
    //       }
    //     }
    //   },
   emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    
    createdAt: {
        type: Date
    },
    profile: {
        type:Schemas.profileSchema,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
   // Ingrese rol de usuario
   rol:{
        type: String,
        optional: true
    },
    active:{
        type: Boolean,
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Schemas.GimePassword=new SimpleSchema({
  
  userId: {
        type: String,
        label: "IdUsuario"
    },
   password:{
        label: "Password",
        type: String,
        max: 50,
        min: 3},
  
   confirmPassword: {
       label: "Confirm Password",
       type: String,
       custom: function () {//Another usage of the custom function.
           if (this.value !== this.field('password').value) {
               console.log("password incorrrecto");   
               return "passwordMismatch";
           }
       }
   },
});

Schemas.GimeRol=new SimpleSchema({
  
  userId: {
        type: String,
        label: "IdUsuario"
    },
   rol:{
        type: String,
        label:"Rol",
        allowedValues: ['Usuario','Administrador'],
        
    },
});


Schemas.GimePassword.messages({

   passwordMismatch: 'Password no coinciden ingrese nuevamente',
    minString: "[label] debe contener al menos [min] caracteres",
    maxString: "[label] no puede exceder los [max] caracteres",
    regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser un dirección de email valida"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
     keyNotInSchema: "[key] no esta permitido por el esquema"
 
});

Schemas.NuevoUsuario=new SimpleSchema({
  username: {
        type: String,
        label: "Ingrese el username",
    },
  nombre: {
    type: String,
    max: 25,
    min: 3,
    label: "Ingrese el nombre",
   
  }, 

});

Meteor.users.attachSchema(Schemas.User);



//----------- Publicaciones del user  --------------------------------

// --- Publica todos los usuarios, pero solo a los administradores
if (Meteor.isServer) {
Meteor.publish('allUsers', function() {
    var usuario, nombre, rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
    else // verifica si tiene privilegios de administrador
      { 
        usuario= Meteor.users.findOne({_id: this.userId});
        nombre = usuario.profile.nombre;
        rol=usuario.rol;
        if  (rol!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }
    //console.log(Meteor.users.find({}, {fields: {_id: 1, profile: 1, rol:1}}).fetch());

    console.log(nombre+ " esta publicando todos los usuarios");
    return Meteor.users.find({}, {fields: {_id: 1, profile: 1, rol:1, active:1}});
});



Meteor.publish('datosUsuario', function() {
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
//, rol:0
    var usuario= Meteor.users.findOne({_id: this.userId});
    nombre = usuario.profile.nombre;
 console.log(nombre+ " esta publicando sus datos");
 return Meteor.users.find({'_id': this.userId}, {fields:{_id: 1, profile: 1, username:1}});
});

Meteor.users.allow({


  insert(userId, doc) {
    // Administrador Can only insert new documents.
    console.log("solicito permiso para insertar");
    var role=Meteor.users.findOne({_id:userId}).rol;
    return userId && role === "Administrador";
  },
  // Administrador puede modificar cualquier campo otros solo ciertos campos
  update(userId, doc, fields, modifier) {
    
    // Administrador Can only change your own documents.
     var role=Meteor.users.findOne({_id: userId}).rol;
     if ((role==="Administrador")) {
      console.log("Administrador solicito permiso para modificar");
      return  userId && role === "Administrador";
      }
      else{
        console.log("propietario solicita permiso para modificar");
         return doc.owner === userId;
      }
       
    
   },
 
  remove(userId, doc) {
    // Can only remove your own documents.
     console.log("solicito permiso para eliminar");
     var role=Meteor.users.findOne({_id: userId}).rol;
    return userId && role === "Administrador";
    
  },
 
  fetch: ['owner']
});

Meteor.users.deny({

  insert() { return true; },
  // update() { 
  //   console.log("permiso denegado para modificar");
  //   return true; },
  remove() { return true; },
  // Propietario solo puede modificar ciertos campos
  update: function (userId, doc, fields, modifier) {
    
  console.log("entrando a deny");
     var role=Meteor.users.findOne({_id: userId}).rol;
     if (role==="Admistrador") {
       console.log("Administrador tiene autorizacion total en deny");
       return false;}
     if (_.contains(fields, "createdAt") || _.contains(fields, "_id")|| _.contains(fields, "rol")) {
        console.log("Intentando modificar un campo no permitido en deny");
      return true;
     }
     else{
      console.log("saliendo de deny con false");
      return false;
     }


    console.log("saliendo inapropiada de deny ");
  }
});
}

