// Metodos relacionados a la rutina presentacion de botones de la interface Inscripcion a sesion de creatividad
Meteor.methods({
estaInscripto:function(idSes){
	check( idSes, String);
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    var cantDeVecesInscripto =Inscripcion.find({userId:this.userId,sesion:idSes}).count();
    console.log("esta inscripto "+ cantDeVecesInscripto+" veces");
    if (cantDeVecesInscripto>0){return true}
    else {return false}	
},
contarInscriptos:function(idSes){

	check( idSes, String);
    var cantDeVecesInscripto =Inscripcion.find({userId:this.userId,sesion:idSes}).count();
    return cantDeVecesInscripto;
}

});