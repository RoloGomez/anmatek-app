import { TecnicoUser } from './../modelo/modelos';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public uid: any;
  public nombre: any;
  public rol: any;
  constructor(private fbAuth: AngularFireAuth) { }

  registerUser(datos: TecnicoUser){
    const rutPass = datos.rut[0]+datos.rut[1]+datos.rut[2]+datos.rut[3];
    console.log(rutPass);
    this.fbAuth.createUserWithEmailAndPassword(datos.correo, datos.rol+rutPass);
  }
  loginUser(email: string, password: string){
    return this.fbAuth.signInWithEmailAndPassword(email, password);
  }
  logoutUser(){
    this.fbAuth.signOut();
  }
  async getUid(){
    const user = await this.fbAuth.currentUser;
    this.uid = user.uid;
    return user.uid;
  }
  updateNameAndRol(nombre: any, rol: any){
    this.nombre = nombre;
    this.rol = rol;
  }
  stateUser(){
    return this.fbAuth.authState;
  }
}
