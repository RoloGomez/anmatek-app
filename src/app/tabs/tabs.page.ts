import { ServicioService } from './../services/servicio.service';
import { TecnicoUser } from 'src/app/modelo/modelos';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  login: boolean = false;
  nombre: any;
  rol: any = '';

  constructor(private auth: AuthService, private router: Router, private tecnicoDB: TecnicoService, private servicioDB: ServicioService) {
    this.auth.stateUser().subscribe( res => {
      if(res){
        console.log('está logeado');
        this.tecnicoLog(res.uid);
        console.log(res.uid);
        this.login = true;
      } else {
        console.log('no esta logeado');
        auth.updateNameAndRol('','');
        this.login = false;
        router.navigateByUrl('login');
      }
    });

    this.servicioDB.loadServices();
  }
  logOut(){
    this.nombre='';
    this.rol='';
    this.auth.updateNameAndRol(this.nombre, this.rol);
    this.auth.logoutUser();
  }
  tecnicoLog(uid: string){
    this.tecnicoDB.getTecnicoByUid<TecnicoUser>(uid).subscribe( res => {
      if(res){
        this.rol = res.rol
        this.nombre = res.nombre.split(' ')[0];
        this.auth.updateNameAndRol(this.nombre, this.rol);
      } 
    })
  }
}
