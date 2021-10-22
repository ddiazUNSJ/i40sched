import { Configuracion } from '/lib/collections/configuracion.js';
import { TasksCollection } from '/lib/collections/tasksCollection.js';
import { LinksCollection } from '/lib/collections/linksCollection.js';

/* **********Configuraciones Todas************** */
Meteor.publish('configuracionesTodas', function() {
   // Verifica identidad agregado 02/06/2019 DD
  if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
  return  Configuracion.find();      //publico todas las configuracion , siempre deberia haber un solo registro o documento

});

/* **********Configuraciones Todas************** */
Meteor.publish('linkTodos', function() {
   // Verifica identidad agregado 02/06/2019 DD
  if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
  return  LinksCollection.find();      //publico todas las configuracion , siempre deberia haber un solo registro o documento

});

/* **********Configuraciones Todas************** */
Meteor.publish('taskTodas', function() {
   // Verifica identidad agregado 02/06/2019 DD
  if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
  return  TasksCollection.find();      //publico todas las configuracion , siempre deberia haber un solo registro o documento

});