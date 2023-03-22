import { AuthService } from './auth.service';
import { TecnicoUser } from 'src/app/modelo/modelos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  tecnicoCollection: AngularFirestoreCollection;
  tecnicosDB: AngularFirestore;
  
  constructor(private database: AngularFirestore, private auth: AuthService) {
    this.tecnicoCollection = database.collection('tecnicos');
    this.tecnicosDB = database;
  }

  //  CRUD Tecnicos
//    Añadir Tecnico
  addTecnico(datos: TecnicoUser, rut: any){
    this.tecnicoCollection.doc().set(datos);
    //this.auth.registerUser(datos);
  }
//    Leer tecnicos por rut
  getTecnicoByRut(rut: any){
    return this.tecnicosDB.collection("tecnicos", ref=>ref.where("rut","==",rut)).valueChanges();
  }
//    Leer tecnicos por uid
  getTecnicoByUid<tipo>(uid: string){
      //Al añadirle tipo puedo usar mis modelos para obtener datos desde el res el la vista tab.page.ts 32
    return this.tecnicosDB.collection("tecnicos").doc<tipo>(uid).valueChanges();
  }
//    Leer todos los tecnicos
  getAllTecnicos(){
    return this.tecnicoCollection.valueChanges({idField: 'idField'});
  }
//    Actualizar tecnicos
  updateTecnico(id: any, rut: any, nombre: any, rol: any, numero: any, correo: any){
    return this.tecnicoCollection.doc(id).set({
      nombre: nombre,
      rut: rut,
      numero: numero,
      correo: correo,
      rol: rol
    });
  }
//    Actualizar activo
  setActive(rut: any, estado: any){
    this.tecnicoCollection.doc(rut).set({
      estado: estado
    });
  }
//    Eliminar Tecnico
  deleteTecnico(rut: any){
    return this.tecnicoCollection.doc(rut).delete();
  }
}
