import { TecnicoUser } from 'src/app/modelo/modelos';
import { Router, NavigationExtras } from '@angular/router';
import { TecnicoService } from './../services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  tecnicos: any[];
  progreso:boolean = true;

  //Datos tecnico
  rut: any;
  nombre: any;
  correo: any;
  numero: any;
  rol: String = 'tecnico';
  estado: String = 'disponible';

  modal = null;

  constructor(private tecnicoDB: TecnicoService, private router: Router) {}

  ngOnInit(){
    this.tecnicoDB.getAllTecnicos().subscribe(res => {
      this.tecnicos = res;
      this.progreso = false;
    })
  }

  crearTecnico(){
    const datos: TecnicoUser = {
      nombre: this.nombre,
      rut: this.rut,
      numero: this.numero,
      correo: this.correo,
      rol: 'tecnico'
    }
    this.tecnicoDB.addTecnico(datos, this.rut);
    //Quitar el modal y limpiar
    this.modal = document.querySelector('#crear_tecnico');
    this.modal.dismiss();
    this.clear();
  }
  getTecnico(item: any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        rut: item.rut
      }
    }
    console.log(item);
    this.router.navigate(['crear-tecnico'],navigationExtras);
  }
  clear(){
    this.rut="";
    this.nombre="";
    this.correo="";
    this.numero="";
  }
}
