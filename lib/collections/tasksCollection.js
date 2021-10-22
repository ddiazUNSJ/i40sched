import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasksCollection');

TasksSchema = new SimpleSchema({
	taskID:{
		type: String,
    	label: "id actividad",
    	},
	taskName:{
		type: String,
    	label: "Nombre",
    	},
    resource:{
        type: String,
        label: "recurso",
        },
    startDate:{
		type: Date,
    	label: "comienzo",
    	},
    endDate:{
		type: Date,
    	label: "fin",
    	},	
	duration:{
		type: Number,
    	label: "duracion",
        optional: true,
    	},
    percentComplete:{
		type: Number,
    	label: "porcentaje",
    	},
	dependencies:{
		type: String,
    	label: "dependencias",
        optional: true,
    	},	
	});

TasksCollection.attachSchema(TasksSchema);

if (Meteor.isServer)
{
  
 Meteor.methods({

///////////////////////////////////////////////////////////
// agrega una actividad a la coleccion de tareas del gantt
//////////////////////////////////////////////////////////
insertTaskCollection:function(doc){
    // Checking datos de entrada
    console.log("entrando a updateConfigConMethod");
    console.log("doc: " , doc);
    check(doc, TasksSchema);  
 
     // Verifica Identidad 
      if (!this.userId) {
         throw new Meteor.Error('Acceso invalido',
           'Ustede no esta logeado');
       }
     
     return TasksCollection.insert(doc); 
      
     },
 }); 
//-------------------------------------



 };