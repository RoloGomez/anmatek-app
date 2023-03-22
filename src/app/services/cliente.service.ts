import { ClienteData } from './../modelo/modelos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteCollection: AngularFirestoreCollection;
  clienteDB: AngularFirestore;

  constructor(private database: AngularFirestore) {
    this.clienteCollection = database.collection('clientes');
    this.clienteDB = database;
  }

  //  CRUD Clientes
//    Añadir cliente
  addCliente(cliente: ClienteData){
    this.clienteCollection.doc(cliente.rut).set(cliente);
  }
//    Leer Cliente por rut
getClienteByRut(rut: any){
  return this.clienteDB.collection("clientes", ref => ref.where("rut","==",rut)).valueChanges();
}
//    Leer todos los clientes
  getAllClientes(){
    return this.clienteCollection.valueChanges({idField:'idField'});
  }
}
