import swal from 'sweetalert';
//import '/server/metodos/gestionUsu.js';

Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});


//******************************************************************************
//====== Dashboards routes
//

// Descripcion :Todas las dashboard posibles

Router.route('/dashboard1',{name: 'dashboard1',
                            template:'dashboard1',
                            
  });
// verifica q este logeado de lo contrario no da permiso para ingresar
var requireDashboard1= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("dashboard1");
  }
  this.next();
};
Router.onBeforeAction(requireDashboard1, {only: 'dashboard1'});


//------------------------------------------------------------------------------
Router.route('/dashboard2',{name: 'dashboard2',
                            template:'dashboard2',
                            
  });
// verifica q este logeado de lo contrario no da permiso para ingresar
var requireDashboard2= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("dashboard2");
  }
  this.next();
};
Router.onBeforeAction(requireDashboard2, {only: 'dashboard2'});

//------------------------------------------------------------------------------
Router.route('/dashboard3',{name: 'dashboard3',
                            template:'dashboard3',
                            
  });
// verifica q este logeado de lo contrario no da permiso para ingresar
var requireDashboard3= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("dashboard3");
  }
  this.next();
};
Router.onBeforeAction(requireDashboard3, {only: 'dashboard3'});

//------------------------------------------------------------------------------
Router.route('/dashboard4',{name: 'dashboard4',
                            template:'dashboard4',
                            
  });
// verifica q este logeado de lo contrario no da permiso para ingresar
var requireDashboard4= function() {
  if (! Meteor.user()) 
  { 
   
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("dashboard4");
  }
  this.next();
};
Router.onBeforeAction(requireDashboard4, {only: 'dashboard4'});
//------------------------------------------------------------------------------






//******************************************************************************
//====== misSesiones
//

// Descripcion : Muestra el listado de sesiones activas para el usuario logeado
 
// DD  11/08/17 cambiado  

Router.route('/adminUsers',{name: 'adminUsers',
                            template:'adminUsers',
                            
  });
// verifica q este logeado de lo contrario no da permiso para inresar
var requireAdminUsers= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("adminUsers");
  }
  this.next();
};
Router.onBeforeAction(requireAdminUsers, {only: 'adminUsers'});
//------------------------------------------------------------------------------



Router.route('/warehouse',{name: 'warehouse',
                        template:'warehouse',
 });

// verifica q este logeado de lo contrario no da permiso para inresar
var requireWarehouse= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("warehouse");
  }
  this.next();
};
Router.onBeforeAction(requireWarehouse, {only: 'warehouse'});
//------------------------------------------------------------------------------




Router.route('/adminModels',{name: 'adminModels',
                        template:'adminModels',
 });

// verifica q este logeado de lo contrario no da permiso para inresar
var requireAdminModels= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("adminModels");
  }
  this.next();
};
Router.onBeforeAction(requireAdminModels, {only: 'adminModels'});
//------------------------------------------------------------------------------



//******************************************************************************
//====== adminConfig
// Descripcion : Gestion de los datos del problema de scheduling que se pueden configurar
//
// Subsistema:
// modulo principal: 
// Localizacion: scheduling-->adminConfig
// Datos : Hay que documentar y limpiar bien
// funcionalidades : 
//
// DD  02/06/19   


Router.route('/adminConfig',{name: 'adminConfig',
                             template:'adminConfig',
                             layoutTemplate: 'mainLayout',
                             waitOn: function ()
                                   {
                                     if ( Meteor.user()) 
                                       { 
                                        return   [Meteor.subscribe("configuracionesTodas"),
                                                  Meteor.subscribe("linkTodos"),
                                                  Meteor.subscribe("taskTodas")
                                                    ];
                                        }
                                      else return;  
                              },
 });

// verifica q este logeado de lo contrario no da permiso para inresar
var requireAdminConfig= function() {
  if (! Meteor.user()) 
  { 
    console.log( "estoy Aqui");
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
    {
      swal ("Acceso No Autorizado");
      this.redirect('landing');
    }
  } 
  else {
    this.render("adminConfig");
  }
  this.next();
};
Router.onBeforeAction(requireAdminConfig, {only: 'adminConfig'});
//------------------------------------------------------------------------------



//Salir

Router.route('/sign-out', {
    name: 'signOut',

    onBeforeAction: function () {
        
        swal("Saliendo del sistema");
        // Limpiando variables de sesion
     //   Session.clearPersistent();
        for (var key in Session.keys) {
           Session.set(key, false);
        }
        Session.clear();
        
        AccountsTemplates.logout();
        this.redirect('/');
    }
});

//------------------------------------------------------------------------------



// DD  11/08/17 - Agregado para funcionar con accountTemplate
// Pantalla inicial de la pagina web del sistema
Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landingLayout',
});


// Router.route('/sign-out', {
//     name: 'signOut',
//     onBeforeAction: function () {
//         AccountsTemplates.logout();
//         swal("Saliendo del sistema");
//         // Limpiando variables de sesion
//         Session.clearPersistent();
//         for (var key in Session.keys) {
//            Session.set(key, false);
//         }
//         Session.clear();
//         this.redirect('/');
//     }
// });

//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});

// Default route
// You can use direct this.render('template')
// We use Router.go method because dashboard1 is our nested view in menu
// Router.route('/', function () {
//     Router.go('landing');
// });

Router.route('/adminBackup', {
    name: 'adminBackup',
    template: 'adminBackup',
    layoutTemplate: 'mainLayout',
});