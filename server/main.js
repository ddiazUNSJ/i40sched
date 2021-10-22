import { Meteor } from 'meteor/meteor';
import { Configuracion } from '/lib/collections/configuracion.js';
import { TasksCollection } from '/lib/collections/tasksCollection.js';

//"" dhtmlx:gantt
Meteor.startup(() => {
  // code to run on server at startupdasd
  if ( Meteor.users.find().count() === 0 ) {
    var idUsuario =Accounts.createUser({
                username: "ddiaz",
                profile: {nombre:"Daniel Diaz"},
                password:"123456",             
                      });

       Accounts.addEmail(idUsuario, "yddiaz@gmail.com", true);
       Meteor.users.update({ _id: idUsuario }, { $set: {'rol' : "Administrador" ,'active' : true }});
   console.log("Creando Administrador");
   };

// inicializar base de datos configuraciones
if ( Configuracion.find().count() === 0 ) {
	
	 var newConfig =
                        {
                          nroCasas: 1,
                           };

            check(newConfig,ConfiguracionSchema);
            
	Configuracion.insert(newConfig);
	console.log("Creando Configuracion");
	};
    
// llenar TaskCollection
if ( TasksCollection.find().count() === 0 ) {
  var rows= [
            ['2014Spring', 'Spring 2014', 'spring',
             new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
            ['2014Summer', 'Summer 2014', 'summer',
             new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
            ['2014Autumn', 'Autumn 2014', 'autumn',
             new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
            ['2014Winter', 'Winter 2014', 'winter',
             new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
            ['2015Spring', 'Spring 2015', 'spring',
             new Date(2015, 2, 22), new Date(2015, 5, 20), null, 50, null],
            ['2015Summer', 'Summer 2015', 'summer',
             new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
            ['2015Autumn', 'Autumn 2015', 'autumn',
             new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
            ['2015Winter', 'Winter 2015', 'winter',
             new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
            ['Football', 'Football Season', 'sports',
             new Date(2014, 8, 4), new Date(2015, 1, 1), null, 100, null],
            ['Baseball', 'Baseball Season', 'sports',
             new Date(2015, 2, 31), new Date(2015, 9, 20), null, 14, null],
            ['Basketball', 'Basketball Season', 'sports',
             new Date(2014, 9, 28), new Date(2015, 5, 20), null, 86, null],
            ['Hockey', 'Hockey Season', 'sports',
             new Date(2014, 9, 8), new Date(2015, 5, 21), null, 89, null]
         ];

         var datos;
         var cantDatos=0;
         for (var index in rows)
           {
        
            datos={
                  taskID:rows[index][0],
                  taskName:rows[index][1],
                  resource:rows[index][2],
                  startDate:rows[index][3],
                  endDate:rows[index][4],
                  duration:rows[index][5],
                  percentComplete:rows[index][6],
                  dependencies:rows[index][7],
                  }; 
           console.log("datos: ", datos);     
           check(datos,TasksSchema);
           console.log("ok Datos");
           cantDatos++;
           TasksCollection.insert(datos);          
            };
            console.log("cantDatos: ", cantDatos);
};
});

