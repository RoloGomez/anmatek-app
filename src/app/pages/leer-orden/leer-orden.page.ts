import { ServicioService } from './../../services/servicio.service';
import { AuthService } from './../../services/auth.service';
import { InteractionsService } from './../../services/interactions.service';

import { EquipoService } from './../../services/equipo.service';
import { TecnicoService } from './../../services/tecnico.service';
import { ClienteService } from './../../services/cliente.service';
import { OrdenService } from './../../services/orden.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { jsPDF } from "jspdf";
import  html2canvas  from 'html2canvas';

@Component({
  selector: 'app-leer-orden',
  templateUrl: './leer-orden.page.html',
  styleUrls: ['./leer-orden.page.scss'],
})
export class LeerOrdenPage implements OnInit {
  @ViewChild('content', {static: false}) content: ElementRef;
  id: any;
  rutCliente: any;
  idEquipo: any;
  rutTecnico: any = 'vacio';
  filtroNota: any;

  precioOrden: any = 0;

  nombreCliente: any = '';
  nombreTecnico: any = '';
  nombreEquipo: any = '';
  descripcion: any = '';

  //orden: Observable<any[]>;
  orden: any[] = [];
  cliente: Observable<any[]>;
  equipo: Observable<any[]>;
  tecnico: Observable<any[]>;
  //Servicios
  telefoniaService: any[] = [];
  computacionService: any[] = [];
  servicios: any[] = [];

  notas: any[] = [];
  stringNotas: any;
  contenidoNota: any;
  emptyNotes: boolean = true;
  notaStatus: boolean = true;

  tecnicoLog: any = "";
  fechaActual: any;

  qrString: any;

  constructor(private route: ActivatedRoute, private router: Router, private ordenDB: OrdenService, private servicioDB: ServicioService,
              private clienteDB: ClienteService, private tecnicosDB: TecnicoService, private equipoDB: EquipoService,
              private interaction: InteractionsService, private auth: AuthService) {

    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = params.id;
        this.rutCliente = params.cli;
        this.idEquipo = params.eq;
        this.rutTecnico = params.tec;
        //Obteniendo nombre del técnico logeado
        this.tecnicoLog = this.auth.nombre;
        //QR de orden
        this.qrString= this.id+"/"+this.rutCliente+"/"+this.idEquipo+"/"+this.rutTecnico;
      }
    });
  }

  ngOnInit() {
    this.telefoniaService = this.servicioDB.getTelefonia();
    this.computacionService = this.servicioDB.getComputacion();
    
    this.ordenDB.getOrdenById(this.id).subscribe( res => {
      this.orden = res;
      this.cargarNotasPrecioServicios();
    });

    this.cliente = this.clienteDB.getClienteByRut(this.rutCliente);
    this.equipo = this.equipoDB.getEquipoById(this.idEquipo);
    //fecha de revisión
    const fecha = new Date().toISOString();
    let array = fecha.split('T');
    array = array[0].split('-');
    this.fechaActual = array[2] + '/' + array[1] + '/' + array[0];
    //fin de fecha
    if(this.rutTecnico!='vacio'){
      this.tecnico = this.tecnicosDB.getTecnicoByRut(this.rutTecnico);
    } else{
      this.tecnico = this.tecnicosDB.getAllTecnicos();
    }
  }
  agregarTecnico(e){
    let arr = e.detail.value.split(',');
    console.log(arr[0]+" "+arr[1]);
    this.ordenDB.updateTecnicoOrden(this.id, arr[0], arr[1]);
    this.ordenDB.updateEstadoOrden(this.id, 'asignada');
    this.interaction.msgestadoOrden('asignada');
    this.router.navigateByUrl('');
  }
  async completarOrden(estado: any){
    await this.interaction.estadorOrden(this.id, estado).then(() => {
      this.ngOnInit();
    });
  }
  cargarPDF(){
    const doc = new jsPDF();
    const qr: any = document.getElementById('codigo-qr');

    this.orden.forEach(element => {
      this.nombreCliente = element.cliente;
      this.nombreEquipo = element.equipo;
      this.nombreTecnico = element.tecnico;
      if(this.nombreTecnico==''){
        this.nombreTecnico = 'Tecnico no asignado';
      }
      this.descripcion = element.diagnostico;
    });

    const options = {
      background: 'white',
      scale: 1
    }
    html2canvas(qr, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      const bufferX =130;
      const bufferY = 5;
      const imgProp = (doc).getImageProperties(img);
      const pdfW = 75;
      //const pdfW = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfH = (imgProp.height * pdfW) / imgProp.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfW, pdfH, undefined, 'FAST');
      return doc;
    })
    .then((docResult) => {
      doc.addImage('../../../assets/icon/Anmatek-logo.png', 'PNG', 10, 10, 25, 21, undefined, 'FAST');

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text('Orden '+this.id, 36, 27);

      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.text('Cliente: '+this.nombreCliente, 15, 36);
      doc.text('Equipo: '+this.nombreEquipo, 15, 44);
      if(this.nombreTecnico == undefined){
        doc.text('Tecnico: Sin asignar', 15, 52);
      } else {
        doc.text('Tecnico: '+this.nombreTecnico, 15, 52);
      }
      

      doc.setFont("helvetica", "bold");
      
      doc.text('Descripción del problema:', 10, 60);
      doc.line(14, 62, 190, 62);
      doc.line(14, 90, 190, 90);
      doc.line(14, 62, 14, 90);
      doc.line(190, 62, 190, 90);

      doc.setFont("helvetica", "normal");
      doc.text(' '+this.descripcion , 15, 68);

      const fecha = new Date().toISOString();
      let array = fecha.split('T');
      console.log(array[0]);
      array = array[0].split('-');
      const fechaString = array[2] + '/' + array[1] + '/' + array[0];

      doc.text(''+fechaString, 90, 100);
      doc.output('dataurlnewwindow', {filename:'orden '+this.id+'.pdf'})
    });
  }
  agregarServicio(id: any, nombre: any, valor: any){
    let auxServices = [];
    if(this.servicios.length>0){
      this.servicios.forEach( servicio => {
        auxServices.push(servicio);
      });
    }

    let auxNota = [];
    if(this.notas.length>0){
      this.notas.forEach( nota => {
        auxNota.push(nota[0]+"*"+nota[1]+"*"+nota[2]);
      });
    }

    auxNota.push(this.tecnicoLog+"*"+this.fechaActual+"*Ha añadido el servicio '"+ nombre+"' a la orden");

    this.interaction.agregarServicioOrden(id, this.id, this.precioOrden, auxServices, auxNota, nombre);
    
    //this.agregarNota(contenido);
  }
  cambiarNota(modo: any){
    if(this.notaStatus){
      this.notaStatus = false;
    }else{
      this.notaStatus = true;
    }
    //Modo agregar nota
    if(modo == 1){
      this.agregarNota('');
    }
  }
  agregarNota(contenido: any){
    //Nombre de tecnio
    this.tecnicoLog = this.auth.nombre;
    //Auxiliar de notas
    let auxNota = [];
    //Llenar el auxiliar con las notas nuevamente
    this.notas.forEach( nota => {
      auxNota.push(nota[0]+"*"+nota[1]+"*"+nota[2]);
    });
    //ver si funciona sacar la ultima nota
    console.log(auxNota[auxNota.length-1]);

    let string = this.tecnicoLog+"*"+this.fechaActual+"*"+this.contenidoNota;
    //pasar el nuevo valor a el auxiliar
    auxNota.push(string);
    //actualizar las notas de la orden
    this.ordenDB.updateNotasOrden(this.id, auxNota);
      //vaciar el contenido nuevamente
    this.contenidoNota='';
  }
  cargarNotasPrecioServicios(){
    this.notas = [];
    this.servicios = [];
    this.stringNotas = '';

    this.orden.forEach( orden => {
      //Aprovechar metodo para cargar el precio en una variable
      this.precioOrden = orden.valor;
      //Continuar con la busqueda de notas
      if(orden.notas != ''){
        console.log("tiene notas");

        orden.notas.forEach( nota => {
          let splitNota = (nota+"").split('*');
          this.notas.push(splitNota);
        })
        
        //Cambiar estado de notas
        this.emptyNotes = false;
      } else {
        this.emptyNotes = true;
        console.log('no tiene notas');
      }
      //Cargar servicios
      if(orden.servicios != ''){
        console.log("tiene servicios");

        orden.servicios.forEach( servicio => {
          this.servicios.push(servicio);
        });
      } else {
        console.log('no tiene servicios');
      }
    });
  }
  pausar(estado: any){
    if(estado == 'en pausa'){
      this.interaction.pausarOrden(this.id, estado);
    } else {
      this.ordenDB.updateEstadoOrden(this.id, estado);
      this.interaction.msgestadoOrden(estado);
    }
    
  }
  eliminar(){
    this.interaction.eliminarOrden(this.id);
  }
  clear(){
    this.id = "";
    this.rutCliente = "";
    this.idEquipo = "";
    this.rutTecnico = "vacio";
    this.qrString = "";
    this.notas = [];
    this.stringNotas = "";
    this.contenidoNota = "";

    this.emptyNotes = true;
    this.notaStatus = true;

    this.router.navigateByUrl('');
  }
  //Seleccionar tecnico custom
  customOptions = {
    header: 'Seleccionar técnico',
    subHeader: '-Pulse sobre el técnico para asignar la orden.',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Cerrar',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ]
  };
}
