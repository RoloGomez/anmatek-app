import { InteractionsService } from './../../services/interactions.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TecnicoService } from './../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-tecnico',
  templateUrl: './crear-tecnico.page.html',
  styleUrls: ['./crear-tecnico.page.scss'],
})
export class CrearTecnicoPage implements OnInit {
  rut: any;
  modificar: boolean = true;
  tecnico: Observable<any[]>;

  constructor(private tecnicoDB: TecnicoService, private router: Router, private route: ActivatedRoute, private interaction: InteractionsService) { 
    this.route.queryParams.subscribe( params => {
      if (params && params.rut) {
        this.rut = params.rut;
      }
    })
  }

  ngOnInit() {
    this.tecnico = this.tecnicoDB.getTecnicoByRut(this.rut);
    console.log(this.tecnico);
  }
  clear(){
    this.rut="";
    this.router.navigateByUrl('');
  }
  modificarTecnico(){
    this.modificar = !this.modificar;
  }
  guardarTecnico(id: any,rut: any, nombre: any, rol: any, numero: any, correo: any){
    this.interaction.modificarTecnico(id, rut, nombre, rol, numero, correo);
    this.modificarTecnico();
  }
  eliminarTecnico(rut: any, nombre: any){
    this.interaction.eliminarTecnico(rut, nombre);
    this.clear();
  }
}
