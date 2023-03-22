import { TecnicoService } from './../services/tecnico.service';
import { AuthService } from './../services/auth.service';
import { OrdenService } from './../services/orden.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TecnicoUser } from '../modelo/modelos';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, OnDestroy{
  ordenes: any[] = [];
  ordenesRespaldo: any[] = [];
  ordenFiltrada: any[] = [];
  ordenElegida: {
    idField: any,
    cliente: any,
    dispositivo: any,
    emision: any,
    estado: any
  };
  fecha: any;
  espera: number;
  trabajando: number;
  retiro: number;
  pausadas: number;
  rol: any='';

  SAColor: String;
  AColor: String;
  RColor: String;
  PColor: String;

  filtro:String = "";
  progreso: boolean = true;

  constructor(private ordenService: OrdenService, private router: Router, private auth: AuthService, private tecnicoDB: TecnicoService) {
  }

  ngOnInit() {
    this.rol= '';

    this.auth.stateUser().subscribe( res => {
      if(res){
        this.tecnicoLog(res.uid);
        this.ordenes = [];

        this.ordenService.getAllOrdenes().subscribe(res => {
          if(this.ordenes!=res){
            let temporal = [];
            if(this.rol == 'tecnico'){
              res.forEach( orden => {
                if(orden.estado != 'sin asignar'){
                  temporal.push(orden);
                }
              });
              this.ordenes = temporal;
            } else {
              this.ordenes = res;
            }
            this.ordenesRespaldo = this.ordenes;
            
            this.progreso = false;
          }
          console.log(this.rol);
          this.cargar();
        });
      } else {
        this.rol = '';
        console.log("tab 1 sin log. Esperando");
        this.progreso = true;
      }
    });
  }

  ngOnDestroy(){
    this.rol = '';
  }

  cargar(){
    this.espera = 0;
    this.trabajando = 0;
    this.retiro = 0;
    this.pausadas = 0;

    this.ordenes.forEach(orden => {
      if(orden.estado == 'sin asignar'){
        this.espera++;
      } else if(orden.estado == 'asignada'){
        this.trabajando++;
      } else if(orden.estado == 'retiro'){
        this.retiro++;
      } else if(orden.estado == 'en pausa'){
        this.pausadas++;
      }
    });
  }
  createOrden(){
    this.router.navigateByUrl('crear-orden');
  }
  limpiarFiltros(){
    this.ordenes = this.ordenesRespaldo;
    this.filtro = "";
    this.SAColor = "";
    this.AColor = "";
    this.RColor = "";
    this.PColor = "";
    this.fecha = "";
  }
  filtrar(estado: any){
    this.ordenFiltrada = [];
    this.ordenesRespaldo.forEach(orden => {
      if(orden.estado == estado){
        this.ordenFiltrada.push(orden);
      }
      this.ordenes = this.ordenFiltrada;
    });

    if(estado == "sin asignar"){
      this.SAColor = "#0a6e0f";
      this.AColor = "";
      this.RColor = "";
      this.PColor = "";
    }else if(estado == "asignada"){
      this.SAColor = "";
      this.AColor = "#0a6e0f";
      this.RColor = "";
      this.PColor = "";
    }else if(estado == "retiro"){
      this.SAColor = "";
      this.AColor = "";
      this.RColor = "#0a6e0f";
      this.PColor = "";
    }else if(estado == "en pausa"){
      this.SAColor = "";
      this.AColor = "";
      this.RColor = "";
      this.PColor = "#0a6e0f";
    }
  }
  getOrder(id:any, rut: any, equipo: any, tecnico: any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        cli: rut,
        eq: equipo,
        tec: tecnico
      }
    }
    console.log(id);
    this.router.navigate(['leer-orden'], navigationExtras);
  }
  leerQR(){
    this.router.navigateByUrl('leerqr');
  }
  cambiarFecha(){
    if(this.fecha!=''){
      const mesAno = this.fecha.split('-');
    }
  }
  tecnicoLog(uid: string){
    this.tecnicoDB.getTecnicoByUid<TecnicoUser>(uid).subscribe( res => {
      if(res){
        this.rol = res.rol
        console.log("rol tecnico: ");
      }
    })
  }
}
