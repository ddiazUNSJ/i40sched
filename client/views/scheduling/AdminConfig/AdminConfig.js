import swal from 'sweetalert';
import { Configuracion } from '/lib/collections/configuracion.js';
import { TasksCollection } from '/lib/collections/tasksCollection.js';
import { LinksCollection } from '/lib/collections/linksCollection.js';
//import gantt from 'meteor/dhtmlx:gantt-data'; 
//import { gantt} from 'dhtmlx-gantt';

//var gantt = require("dhtmlx-gantt");

AutoForm.addHooks('updateConfig', {

onError: function(formType, error) {
   console.log("estoy en onerror adminConfig");
  //  if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="update")){
      swal(error.message);
   // }
  },
// LLamado despues que autoform ingresa una tematica
  onSuccess: function(formType, result) {
    swal("El sistema ha actualizado una la configuracion");
  },

  // formToDoc: function(doc) {
  //   var doc1= Configuracion.findOne({}),
  //   doc1.nroCasas= doc.nroCasas,
  //   console.log("entrando a formToDoc"),
  //   console.log("doc: ", doc),
  //   console.log("doc1: ", doc1),

  //  return doc1,
  // },

  // formToModifier: function(modifier) {
  //   console.log("entrando a formToModifier"),
  //   console.log( modifier),
  //   // if (doc.nroCasas==1) doc.nroCasas=4,
  //   // return doc,
  //   // alter modifier
  //   return {"$set":{nroCasas:1}},
  // },


});

Template.adminConfig.helpers({

// Selecciona el documento de configuracion 
	selectedConfigDoc: function(){
		return Configuracion.findOne({});
	},
	traeSchema:function(){
    return ConfiguracionSchemaConMethod;
    },
  
	
   
});


Template.adminConfig.onCreated(function () {


//--Init dhtmlxGantt.
// gantt.skin="contrast_black";
//        gantt.init("gantt1");

//       //Init dhtmlxGantt data adapter.
//     //  gantt.meteor({tasks: TasksCollection, links: LinksCollection});
//       //or
//       gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
// gantt.config.task_height = 40;
// gantt.config.row_height = 40;
//      console.log("gantt:", gantt);
    var tasks=TasksCollection.find({});
    var nroAct=0;
    //------- Definiendo arreglo de dos dimensiones
    var filas=new Array(12)
    
      for (var i = 0; i < filas.length; i++) {
        filas[i] = new Array(8);
      }
   
    //------- llenando arreglo actividades
    tasks.forEach( function(act) {
       filas[nroAct][0]=act.taskID;
       filas[nroAct][1]=act.taskName;
       filas[nroAct][2]=act.resource;
       filas[nroAct][3]=act.startDate;
       filas[nroAct][4]=act.endDate;
       filas[nroAct][5]=act.duration;
       filas[nroAct][6]=act.percentComplete;
       filas[nroAct][7]=act.dependencies;
       nroAct++;
      });
      
 
      chart={
        target:'chart',
         type: 'Gantt',
        columns:[
          ['string', 'Task ID'],
          ['string', 'Task Name'],
          ['string', 'Resource'],
          ['date', 'Start Date'],
          ['date', 'End Date'],
          ['number', 'Duration'],
          ['number', 'Percent Complete'],
          ['string', 'Dependencies'],
        ],
        rows:filas,
        // rows: [
        //     ['2014Spring', 'Spring 2014', 'spring',
        //      new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
        //     ['2014Summer', 'Summer 2014', 'summer',
        //      new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
        //     ['2014Autumn', 'Autumn 2014', 'autumn',
        //      new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
        //     ['2014Winter', 'Winter 2014', 'winter',
        //      new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
        //     ['2015Spring', 'Spring 2015', 'spring',
        //      new Date(2015, 2, 22), new Date(2015, 5, 20), null, 50, null],
        //     ['2015Summer', 'Summer 2015', 'summer',
        //      new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
        //     ['2015Autumn', 'Autumn 2015', 'autumn',
        //      new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
        //     ['2015Winter', 'Winter 2015', 'winter',
        //      new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
        //     ['Football', 'Football Season', 'sports',
        //      new Date(2014, 8, 4), new Date(2015, 1, 1), null, 100, null],
        //     ['Baseball', 'Baseball Season', 'sports',
        //      new Date(2015, 2, 31), new Date(2015, 9, 20), null, 14, null],
        //     ['Basketball', 'Basketball Season', 'sports',
        //      new Date(2014, 9, 28), new Date(2015, 5, 20), null, 86, null],
        //     ['Hockey', 'Hockey Season', 'sports',
        //      new Date(2014, 9, 8), new Date(2015, 5, 21), null, 89, null]
        //  ],
        options: {
            'title':'Gantt mio',
            //'width':400,
            'height':400,
            'gantt': {
                      'trackHeight': 30
                     }
            }
       };
      

     drawChart(chart);

    chart2 = {
      target: 'chart2',
      type: 'BarChart',
      columns: [
        ['string', 'Topping'],
        ['number', 'Slices']
      ],
      rows: [
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ],
      options: {
        'title':'How Much Pizza I Ate Last Night',
        'width':400,
        'height':300
      }
    };

    drawChart(chart2);
  });