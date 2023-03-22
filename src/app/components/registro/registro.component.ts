import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  rut: any;
  nombre: any;
  correo: any;
  numero: any;
  contraseña: any;
  rol: String = 'tecnico';
  estado: String = 'disponible';

  constructor(private tecnicoDB: TecnicoService, private router: Router) { }

  ngOnInit() {}

  crearTecnico(){
    this.contraseña = Math.random().toString(36).slice(-8);
    //this.tecnicoDB.addTecnico(this.rut, this.nombre, this.numero,this.correo, this.contraseña, this.rol, this.estado);
    this.clear()
  }
  clear(){
    this.rut="";
    this.nombre="";
    this.correo="";
    this.numero="";
    this.contraseña="";
    this.router.navigateByUrl('');
  }
}
