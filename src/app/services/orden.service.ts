import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  ordenCollection: AngularFirestoreCollection;
  ordenDB: AngularFirestore;

  constructor(private database: AngularFirestore) {
    this.ordenCollection = database.collection('ordenes');
    this.ordenDB = database;
  }

  //  CRUD ordenes
//    Añadir Orden
addOrden(id: any, cli: any, equipo:any, est: any, emision: any, nomCli:any, nomEqui: any, diag: any) {
  const idOrden = id+'';
  this.ordenCollection.doc(id).set({
    rutCliente: cli,
    idEquipo: equipo,
    notas:[],
    valor: 5990,
    servicios: ["$5990 Revisión"],
    rutTecnico: 'vacio',
    estado: est,
    id: idOrden,
    emision: emision,
    cliente: nomCli,
    equipo: nomEqui,
    diagnostico: diag
  });
}
//    Leer Orden por ID
  getOrdenById(id: any){
    return this.ordenDB.collection("ordenes", ref=>ref.where("id","==",id)).valueChanges();
  }
//    Leer ordenes en espera
  getOrdenEspera(){
    return this.ordenDB.collection("ordenes", ref=>ref.where("estado","==","en espera")).valueChanges();
  }
//    Lista de Ordenes
  getAllOrdenes(){
    return this.ordenCollection.valueChanges({idField: 'idField'});
  }
//    Actualizar Orden (estado)
  updateEstadoOrden(id: any, estado: any){
    return this.ordenCollection.doc(id).update({
      estado: estado
    });
  }
//    Actualizar Orden (tecnico)
  updateTecnicoOrden(id: any, rut: any, nombre: any){
    this.ordenCollection.doc(id).update({
      rutTecnico: rut,
      tecnico: nombre
    })
  }
//    Actualizar Orden (notas)
  updateNotasOrden(id: any, nota: any){
    this.ordenCollection.doc(id).update({
      notas: nota
    });
  }
//    Actualizar precio de orden
  updateValorOrden(id: any, precio: any){
    this.ordenCollection.doc(id).update({
      valor: precio
    });
  }
  updateServicesOrden(id: any, servicios: any){
    this.ordenCollection.doc(id).update({
      servicios: servicios
    });
  }
//    Eliminar Orden
  deleteOrden(rut: any){
    this.ordenCollection.doc(rut).delete();
  }

}
