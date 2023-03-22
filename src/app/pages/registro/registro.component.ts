import { TecnicoService } from 'src/app/services/tecnico.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TecnicoUser } from 'src/app/modelo/modelos';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  datos: TecnicoUser = {
    nombre: null,
    uid: null,
    rut: null,
    telefono: null,
    correo: null,
    contrasena: null,
    estado: 'disponible',
    rol: 'tecnico'
  };
  constructor(private auth: AuthService, private tecnicoDB: TecnicoService) { }

  ngOnInit() {}

  async registrar(){
    const res = await this.auth.registerUser(this.datos).catch( error => {
      console.log('error');
    });
    if(res){
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.contrasena = null;
      await this.tecnicoDB.addTecnico(this.datos, id);
    }
  }
}
