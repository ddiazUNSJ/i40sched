/*********************************************
 * OPL 12.8.0.0 Model
 * Author: daniel
 * Creation Date: Jun 13, 2019 at 1:05:32 PM
 *********************************************/
// --------------------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// 5725-A06 5725-A29 5724-Y48 5724-Y49 5724-Y54 5724-Y55
// Copyright IBM Corporation 1998, 2013. All Rights Reserved.
//
// Note to U.S. Government Users Restricted Rights:
// Use, duplication or disclosure restricted by GSA ADP Schedule
// Contract with IBM Corp.
// --------------------------------------------------------------------------

tuple TWarehouse { // Tupla Warehouse
  key string name; // nombre 
  int capacity;    // capacidad
  float fixedCost; // costo fijo 
}

tuple TSupplyCost {// Tupla CostoDeAbastecimiento
   key string warehouseName; // almacen que abastece
   key int storeId;// id de la tienda
   float cost; // costo de abastecimiento 
}

tuple TPlan {
   int nbStores; 
}

TPlan plan = ...;
{TWarehouse} warehouses = ...; // almacenes
{TSupplyCost} supplyCosts = ...;// Costo de que la tienda X sea abastecida por el almacen Y

range stores = 1..plan.nbStores; // Crea tiendas

dvar boolean Open[ warehouses ]; // Crea almacenes
dvar boolean Supply[ stores ][ warehouses ]; // Crea la relacion tienda-almacen que abastece, 1 si existe, 0 sino

// expression
dexpr float totalOpeningCost = sum( w in warehouses ) w.fixedCost * Open[w];

dexpr float totalSupplyCost  = sum( w in warehouses , s in stores, k in supplyCosts : k.storeId == s && k.warehouseName == w.name ) 
    Supply[s][w] * k.cost;

minimize
  totalOpeningCost + totalSupplyCost; 

subject to {
  forall( s in stores )
    ctEachStoreHasOneWarehouse:                     // Cada tienda solo puede tener un almacen que lo aprovicione
       sum( w in  warehouses ) Supply[s][w] == 1;   // es decir tienda=<1,2,3>; almacen=<1,2,3>, no se puede dar los pares 
                                                    // tienda/almacen <1,1><1,2><1,3> porque
                                                    // Supply[1][1] +Supply[1][2] +Supply[1][3] =1 Las combinaciones posibles
                                                    //   1             0               0
                                                    //   0              1              0
                                                    //   0              0              1
      
      
  forall( w in warehouses, s in stores )
    ctUseOpenWarehouses:                            // Indica si el almacen Abastece o no a una tienda 
      Supply[s][w] <= Open[w];                      // Si Open[w]=0 NO abastece a ningun almacen
                                                    // Si tienda=<1,2,3>; almacen=<1,2,3>, Open[w]=0 
                                                    //  Supply[1][1]=0;  Supply[2][1]=0; Supply[3][1]=0
                                                    // Si Open[w]=1 Indica posibilidad de abastecer o no 
                                                    // Si tienda=<1,2,3>; almacen=<1,2,3>, Open[w]=0 
                                                    //  Supply[1][1]=1 y tambien Supply[1][1]=0 ;  Supply[2][1]=0 y Supply[2][1]=1;
                                                    //  Supply[3][1]=0 y Supply[3][1]=1
                                                     
  forall( w in warehouses )
    ctMaxUseOfWarehouse:         
      sum( s in stores) Supply[s][w] <= w.capacity;  // La cantidad de tiendas asociadas no puede superar la capacidad del 
                                                     //almacen
}


// ------------SALIDA 
{int} StoresSupplied[w in warehouses] = { s | s in stores : Supply[s][w] == 1 };
{string} OpenWarehouses = { w.name | w in warehouses : Open[w] == 1 };
tuple TSuppliedStore {
  string warehouseName;
  int storeId;
}
{TSuppliedStore} network;

execute DISPLAY_RESULTS{
  network.clear();
  writeln("* Open Warehouses=", OpenWarehouses);
  for ( var w in warehouses) {
     if ( Open[w] ==1)   {
        writeln("* stores supplied by ", w.name, ": ", StoresSupplied[w]);
	for (var s in stores) {
	  if (Supply[s][w] == 1) {
	    network.addOnly(w.name, s);
	  }
	}
     }
  }
}
 