import { EquipoData } from './../modelo/modelos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  equipoCollection: AngularFirestoreCollection;
  equiposDB: AngularFirestore;

  constructor(private database: AngularFirestore) {
    this.equipoCollection = database.collection('equipos');
    this.equiposDB = database;
  }
  //  CRUD
//    Añadir equipo
  addEquipo(equipo: EquipoData){
    this.equipoCollection.doc(equipo.nserie).set(equipo)
  }
//    Leer equipo por id
  getEquipoById(id: any){
    return this.equiposDB.collection("equipos", ref => ref.where("nserie","==",id)).valueChanges();
  }
//    Leer todos los equipos
  getAllEquipos(){
    return this.equipoCollection.valueChanges({idField: 'idField'});
  }
//    Actualizar Equipo
//    Eliminar Equipo
}
