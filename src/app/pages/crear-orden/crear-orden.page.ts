import { EquipoData, ClienteData } from './../../modelo/modelos';
import { ServicioService } from './../../services/servicio.service';
import { EquipoService } from './../../services/equipo.service';
import { ClienteService } from './../../services/cliente.service';
import { OrdenService } from './../../services/orden.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.page.html',
  styleUrls: ['./crear-orden.page.scss'],
})
export class CrearOrdenPage implements OnInit {

  formularioTest!: FormGroup;
  newOrden: String[];
  idOrden: any;

  clientes: any[];
  servicios: any[];
  rutFiltro: any = "";

  cliente: ClienteData = {
    nombre: '',
    rut: '',
    correo: '',
    telefono: ''
  }

  equipo: EquipoData = {
    nserie: '',
    marca: '',
    modelo: '',
    clave: '',
    patron: '',
  };

  diagnostico: any = "";

  estado: any;
  emision: any;

  modal = null;

  constructor(private ordenDB: OrdenService, private toastController: ToastController,
    private clienteDB: ClienteService, private equipoDB: EquipoService ,private router: Router, private fb: FormBuilder,
    private serviciosDB: ServicioService) { }

  ngOnInit() {
    this.clienteDB.getAllClientes().subscribe( res => {
      this.clientes = res;
    });
    this.serviciosDB.getAllServicios().subscribe( res => {
      this.servicios = res;
    });
    this.formularioTest = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    });

    this.idOrden = Date.now();
    console.log(this.idOrden);
  }

  cargarDatos(i: any){
    this.cliente.rut = this.clientes[i].rut;
    this.cliente.nombre = this.clientes[i].nombre;
    this.cliente.telefono = this.clientes[i].telefono;
    this.cliente.correo = this.clientes[i].correo;

    this.modal = document.querySelector('#crear_usuario');
    this.modal.dismiss();
  }

  createOrden(){
    const id = new String(this.idOrden);

    const fecha = new Date().toISOString();
    let array = fecha.split('T');
    console.log(array[0]);
    array = array[0].split('-');
    const fechaString = array[2] + '/' + array[1] + '/' + array[0];

    if(this.cliente.correo==''){
      this.cliente.correo='Sin Correo';
    }
    if(this.cliente.telefono==''){
      this.cliente.telefono='Sin Telefono';
    }

    //Agregar Cliente
    this.clienteDB.addCliente(this.cliente);
    console.log("cliente listo orden Activa");
    //Agregar Equipo
    this.equipoDB.addEquipo(this.equipo);
    console.log("equipo listo orden Activa");
    //Agregar Orden
    this.ordenDB.addOrden(id, this.cliente.rut, this.equipo.nserie, "sin asignar", fechaString, this.cliente.nombre, this.equipo.modelo, this.diagnostico);
    console.log("orden lista orden Activa");
    this.presentToast('bottom');
    //Limpiar variables e ir a lista de ordenes
    this.clear();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Orden agregada con exito!!!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  clear(){
    //this.alert.alertaCrearOrden();
    this.cliente.rut = ''; this.cliente.nombre = ''; this.cliente.telefono = ''; this.cliente.correo = '';
    this.equipo.clave = ''; this.equipo.marca = ''; this.equipo.modelo = ''; this.equipo.patron = '';
    this.idOrden = ""; this.emision = "";

    this.router.navigateByUrl('');
  }
}
