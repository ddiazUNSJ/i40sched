//import { Accounts } from 'meteor/accounts-base'
// import {Meteor} from 'meteor/meteor';
// import {Session} from 'meteor/session';
// import {Router, RouteController} from 'meteor/iron:router';
// import { Mongo } from 'meteor/mongo';
// import { Email } from 'meteor/email';
// Options

AccountsTemplates.configure({

  //******************************************
    // Home default
    homeRoutePath: '/',

    // Behavior
    confirmPassword: false,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    enforceEmailVerification: true,
    lowercaseUsername: false,
    focusFirstInput: false,
    

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    //showTitle:false,
   // showDisplayName:true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
  
    //Template configuration
      // defaultTemplate: 'Auth_page',
     defaultLayout: 'blankLayout',
      // defaultContentRegion: 'main',
      // defaultLayoutRegions: {}

    // Privacy Policy and Terms of Use
     //privacyUrl: 'privacy',
     //termsUrl: 'terms-of-use',
     // displayFormLabels: false,
     // formValidationFeedback: true,

//No muestra el titulo de atForm
    texts: {
      title: {
           signUp: "",signIn: "",
      }
    }
/*
El cambio de colores de los botones u otro elemento decorativo se hace en /stylesheets/globals/landing.import.less
Por ejemplo para cambiar el boton de registrarse en atForm en el estado signUp , lo que hice fue agregar la clase at-btn
como copia de la clase  .btn-primary, la cual tiene los atributos que necesito, no solo el color, la forma, color de fondo,etc,.
La informacion sobre el nombre de la clase la saque de
- packages/useraccounts_bootstrap
- https://github.com/meteor-useraccounts/core/blob/master/Guide.md#css-rules
- packages/useraccounts_core
-https://www.youtube.com/watch?v=X6EodWQBDG8

Se agrego
   //Pinta boton account de color boton de inspinia
  .at-btn {
    .btn;
    .btn-primary;
  }

*/
});



      //Routeo a modulos de autentificacion
      // AccountsTemplates.configureRoute('signIn', {
      //   name: 'singin',
      //   path: '/sign-in',
      // });
    //funca
      AccountsTemplates.configureRoute('signIn', {
          name: 'singin',
          path: '/sign-in',
          template: 'login',
          layoutTemplate: 'blankLayout',
          redirect: '/adminUsers',
      });

      AccountsTemplates.configureRoute('signUp', {
          name: 'singup',
          path: '/sign-up',
          template: 'registrar',
          layoutTemplate: 'blankLayout',
          redirect: '/adminUsers',
      });
      

    //  AccountsTemplates.configureRoute('signIn');
      AccountsTemplates.configureRoute('changePwd');
      AccountsTemplates.configureRoute('enrollAccount');
      AccountsTemplates.configureRoute('forgotPwd');
      AccountsTemplates.configureRoute('resetPwd');
    // AccountsTemplates.configureRoute('signUp');
      AccountsTemplates.configureRoute('verifyEmail');






AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validando username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});

AccountsTemplates.addField({
    _id: 'nombre',
    type: 'text',
    placeholder: {
        signUp: "Nombre y Apellido"
    },
    required: true,
    minLength: 3,
    maxLength:50,
    errStr: 'Debe ingresar un nombre entre 3 y 50 caracteres',
});
//=======Luego de Logearse  
     var mySubmitFunc = function(error, state){
        if (!error) {
         if (state === "signIn") {
           if (Meteor.userId() )
            { 
              console.log("llamando a getUserRol");
             Meteor.call("getUserRol", function(err, salida){  
               if (salida=="Administrador")
               {
                 Session.set('rol', "Administrador")
                 Router.go('warehouse'); 
                 console.log( " usuario administrador logeado");
                }   
               console.log( " usuario logeado");
               });
           }
        }
      }
    };

      AccountsTemplates.configure({
        onSubmitHook: mySubmitFunc
      });