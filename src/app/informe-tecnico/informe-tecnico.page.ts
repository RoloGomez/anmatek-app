import { OrdenService } from './../services/orden.service';
import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-tecnico',
  templateUrl: './informe-tecnico.page.html',
  styleUrls: ['./informe-tecnico.page.scss'],
})
export class InformeTecnicoPage implements OnInit {
  tecnicos: any[];
  ordenAsignada: any[] = [];
  ordenCompletada: any[] = [];
  ordenes: any[];
  fechaString: any;

  constructor(private tecnicoDB: TecnicoService, private ordenDB: OrdenService, private router: Router) { }

  ngOnInit() {
    this.tecnicoDB.getAllTecnicos().subscribe( res => {
      this.tecnicos = res;
    });
    this.ordenDB.getAllOrdenes().subscribe( res => {
      this.ordenes = res;
      this.cargarOrdenes();
    });
    //Cargar fecha actual
    const fecha = new Date().toISOString();
    let array = fecha.split('T');
    console.log(array[0]);
    array = array[0].split('-');
    this.fechaString = array[2] + '/' + array[1] + '/' + array[0];
  }
  cargarOrdenes(){
    this.tecnicos.forEach ( tecnico => {
      let contAsignada = 0;
      let contCompletada = 0;

      this.ordenes.forEach ( orden => {
        //comparar nombre de orden y de tecnico
        if(orden.tecnico == tecnico.nombre){
          //Revisar estado de la orden. Si esta completada o si esta asignada
          //para completada solo sirve el estado completada
          if(orden.estado == 'completada'){
            contCompletada++;
          }
          //para asignada el estado  asignada, retiro y en pausa
          else if(orden.estado != 'sin asignar'){
            contAsignada++;
          }
        }
      });
      //agregar los valores a un arreglo
      this.ordenAsignada.push(contAsignada);
      this.ordenCompletada.push(contCompletada);
      if(tecnico.numero == ''){
        tecnico.numero = 'Sin número';
      } else {
        tecnico.numero = '+569 '+tecnico.numero;
      }
    });
    console.log(this.ordenAsignada);
    console.log(this.ordenCompletada);
  }
  cargarPDF(){
    const completadas = this.ordenCompletada.reverse();
    const asignadas = this.ordenAsignada.reverse();
    var docDefinition = {
      content: [
        { text: 'Técnicos activos', style: 'header', alignment:'center' },
        { text: 'Información de los técnicos activos en el local a la fecha de '+this.fechaString, alignment:'center' },
        { table: {
            //widths: [],
            body:[
              ...this.tecnicos.map( e =>
                [
                  [{ text: e.nombre, style: 'subheader' },'ORDENES ASIGNADAS: '+asignadas.pop(), 'ORDENES COMPLETADAS:'+completadas.pop()], 
                  [{ text: 'Datos de contacto', style: 'subheader' }, 'Correo: '+e.correo, 'Telefono: '+e.numero]
                ]
              )
            ]
          },
          layout: 'noBorders'
        }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    };

    const doc = pdfMake.createPdf(docDefinition);
    doc.open();
    //doc.download('informe-tecnico-activos_'+this.fechaString+'.pdf');
    this.ngOnInit();
  }
  clear(){
    this.router.navigateByUrl('');
  }
}
