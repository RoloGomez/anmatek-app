import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicioCollection: AngularFirestoreCollection;
  servicioDB: AngularFirestore;

  telefonia: any [] = [];
  computacion: any [] = [];

  constructor(private database: AngularFirestore) {
    this.servicioCollection = database.collection('servicio');
    this.servicioDB = database;
  }

//  CRUD servicios
//    Añadir servicio
  addServicio(id: any, nombre: any, precio: any){
    this.servicioCollection.doc(id).set({
      id: id,
      nombre: nombre,
      precio: precio
    });
  }
//    Leer servicio por id
  getServicioById(id: any){
    return this.servicioDB.collection("servicio", ref => ref.where("id","==",id)).valueChanges();
  }
//    Leer todos los servicios
  getAllServicios(){
    return this.servicioCollection.valueChanges({idField: "idField"});
  }
//    Actualizar Servicio
  updateServicio(id: any, precio: any){
    this.servicioCollection.doc(id).update({
      precio: precio
    });
  }
//    Eliminar Servicio
  deleteServicio(id: any){
    this.servicioCollection.doc(id).delete();
  }
//OTROS
  async loadServices(){
    console.log(this.telefonia.length+" "+this.computacion.length);
    if(this.telefonia.length == 0 && this.computacion.length == 0){
      this.getAllServicios().subscribe( res => {
        res.forEach(servicio => {
          if(servicio.tipo == 'telefonia'){
            this.telefonia.push(servicio);
          } else {
            this.computacion.push(servicio);
          }
        });
      })
    }
  }
  getPrecio(id: any){
    let valor = 0;
    this.telefonia.forEach( i => {
      if(i.idField == id){
        valor = i.valor;
      }
    });
    this.computacion.forEach( i => {
      if(i.idField == id){
        valor = i.valor;
      }
    });
    return valor;
  }
  getTelefonia(){
    return this.telefonia;
  }
  getComputacion(){
    return this.computacion;
  }
}
