import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  inventarioCollection: AngularFirestoreCollection;
  inventarioDB: AngularFirestore;
  
  constructor(private database: AngularFirestore) {
    this.inventarioCollection = database.collection('productos');
    this.inventarioDB = database;
  }

  //  CRUD Inventario
//    Añadir item
  addItem(id: any, nombre: any, compra: any, venta: any, cantidad: any){
    this.inventarioCollection.doc(id).set({
      id: id,
      nombre: nombre,
      precioCompra: compra,
      precioVenta: venta,
      cantidad: cantidad
    });
  }
//    Leer todos los items
  readAllItems(){
    return this.inventarioCollection.valueChanges({idField: 'idField'});
  }
//    Leer item por id
  readItemById(id: any){
    return this.inventarioDB.collection("productos", ref=> ref.where("id","==", id)).valueChanges();
  }
//    Actualizar item
  updateItem(id: any, nombre: any, cantidad: any, compra: any, venta: any){
    this.inventarioCollection.doc(id).set({
      cantidad: cantidad,
      id: id,
      nombre: nombre,
      precioCompra: compra,
      precioVenta: venta
    });
  }
//    Actualizar cantidad de item
  setCantidad(id: any, cant: any){
    this.inventarioCollection.doc(id).update({
      cantidad: cant
    });
  }
//    Actualizar precio de venta
  setPrecioVenta(id: any, venta: any){
    this.inventarioCollection.doc(id).update({
      venta: venta
    });
  }
//    Eliminar item
  deleteItem(id: any){
    this.inventarioCollection.doc(id).delete();
  }
} 
