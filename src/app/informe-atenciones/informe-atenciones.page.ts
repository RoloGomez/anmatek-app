import { InteractionsService } from './../services/interactions.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OrdenService } from './../services/orden.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Filesystem , FilesystemDirectory} = Plugins;

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Platform } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-atenciones',
  templateUrl: './informe-atenciones.page.html',
  styleUrls: ['./informe-atenciones.page.scss'],
})
export class InformeAtencionesPage implements OnInit {
  pausa: any;
  asignada: any;
  retiro: any;
  completada: any;

  ordenes: any[] = [];
  fechaString: any;
  pdfObj = null;

  constructor(private router: Router, private ordenesDB: OrdenService, private plt: Platform, private interaction: InteractionsService, private FileOpener: FileOpener) { }

  ngOnInit() {
    this.ordenesDB.getAllOrdenes().subscribe( res => {
      this.ordenes = res;
      this.cargarDatos();
    });
    //Cargar fecha actual
    const fecha = new Date().toISOString();
    let array = fecha.split('T');
    console.log(array[0]);
    array = array[0].split('-');
    this.fechaString = array[2] + '/' + array[1] + '/' + array[0];
  }
  cargarDatos(){
    this.pausa = 0;
    this.asignada = 0;
    this.retiro = 0;
    this.completada = 0;

    this.ordenes.forEach(orden => {
      if(orden.estado == 'completada'){
        this.completada++;
      } else if(orden.estado == 'asignada'){
        this.asignada++;
      } else if(orden.estado == 'retiro'){
        this.retiro++;
      } else if(orden.estado == 'en pausa'){
        this.pausa++;
      }
      if(orden.tecnico == undefined){
        orden.tecnico="sin asignar";
      }
    });
  }
  cargarPDF(){
    var docDefinition = {
      content: [
        { text: 'Atenciones realizadas', style: 'header', alignment:'center' },
        //{ image: '../../../assets/icon/Anmatek-logo.png', width:40},
        { text: 'Atenciones realizadas en el local a la fecha de '+this.fechaString, alignment:'center' },
        { table: {
          widths: [120,120,120,120],
          body: [[
              { text: "Pausadas", style: 'subheader', alignment:'center' },
              { text: "Asignadas", style: 'subheader', alignment:'center' },
              { text: "Retiro", style: 'subheader', alignment:'center' },
              { text: "Completadas", style: 'subheader', alignment:'center' }
            ],
            [
              { text: this.pausa, alignment:'center' },
              { text: this.asignada, alignment:'center' },
              { text: this.retiro, alignment:'center' },
              { text: this.completada, alignment:'center' }
            ]],
          },
          layout: 'noBorders'
        },
        { text: 'Lista detallada de ordenes', alignment:'center', margin: [0, 20, 0, 10] },
        { table: {
            widths: ['auto','auto','auto'],
            body: [
              ...this.ordenes.map( e => 
                [[{ text: e.emision+"", style: 'subheader' }, ''],
                [{ text: 'Técnico '+e.tecnico, style: 'subheader' }, 'Estado: '+e.estado],
                [{ text: 'Cliente: '+e.cliente, style: 'subheader' }, 'Total: $'+e.valor]
              ]
                ),
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
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

    if(this.plt.is('cordova')){
      this.pdfObj.getBase64(async (data) => {
        try{
          this.interaction.msgExito();
          let path = `download/informe-atencion_${this.fechaString}.pdf`;
          const result = await Filesystem.writeFile({
            path,
            data: data,
            directory: FilesystemDirectory.Documents,
            recursive: true
          });
          this.FileOpener.open(`${result.uri}`, 'application/pdf');
        } catch (e) {
          this.interaction.msgError();
        }
      });
    }else{
      this.pdfObj.open();
      //this.pdfObj.download('informe-atencion_'+this.fechaString+'.pdf');
    }
  }
  
  clear(){
    this.router.navigateByUrl('');
  }
}
