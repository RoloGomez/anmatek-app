import { InventarioService } from './../services/inventario.service';
import { Router } from '@angular/router';
import { OrdenService } from './../services/orden.service';
import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-gastos',
  templateUrl: './informe-gastos.page.html',
  styleUrls: ['./informe-gastos.page.scss'],
})
export class InformeGastosPage implements OnInit {
  ordenes: any[] = [];
  productos: any[] = [];
  fechaString: any;
  total: number;
  totalPro: number;
  difPro: number;
  gasto: number;

  constructor(private ordenDB: OrdenService, private inventarioDB: InventarioService,private router: Router) { }

  ngOnInit() {
    this.ordenDB.getAllOrdenes().subscribe( res => {
      this.ordenes = res;
      this.cargarValor();
    });
    this.inventarioDB.readAllItems().subscribe( res => {
      this.productos = res;
      this.cargarValorPro();
    })
    const fecha = new Date().toISOString();
    let array = fecha.split('T');
    console.log(array[0]);
    array = array[0].split('-');
    this.fechaString = array[2] + '/' + array[1] + '/' + array[0];
  }

  cargarValor(){
    this.total = 0;
    this.difPro = 0;
    this.gasto = 0;

    this.ordenes.forEach( orden => {
      this.total = (this.total+orden.valor);
    });
  }
  cargarValorPro(){
    this.totalPro = 0;
    this.productos.forEach( pro => {
      this.totalPro = this.totalPro + (Number(pro.precioVenta)*Number(pro.cantidad));
      this.difPro = this.difPro + ((Number(pro.precioVenta)-Number(pro.precioCompra))*Number(pro.cantidad));
      this.gasto = this.gasto + (Number(pro.precioCompra)*Number(pro.cantidad));
    })
  }

  cargarPDF(){
    var docDefinition = {
      content: [
        { text: 'Informe de Cuentas', style: 'header', alignment:'center', margin: [0,0,0,10] },
        //{ image: '../../../assets/icon/Anmatek-logo.png', width:40},
        { text: 'Gastos y cobros realizados en el local a la fecha de '+this.fechaString, alignment:'center' },
        { table: {
            body: [
              ["Total en Atenciones",{ text:'$'+(this.total)  , style: 'subheader', alignment:'right'}],
              ["Avalúo de inventario",{ text:'$'+this.totalPro , style: 'subheader', alignment:'right'}],
              ["Gasto en inventario",{ text:'-$'+this.gasto , style: 'subheader', alignment:'right', color: 'red'}],
              ["Diferencia (Avalúo - Gasto)",{ text:'$'+this.difPro , style: 'subheader', alignment:'right', color: 'green'}],
            ]
          },
          layout: 'lightHorizontalLines'
        },
        { text: 'Lista detallada de ordenes', style: 'story', margin: [0, 20, 0, 10] },
        { table: {
            widths: [200,200,'auto'],
            body: [[
              { text: 'Fecha y Equipo', style: 'subheader'},{ text: 'Servicio(s)', style: 'subheader'},{ text: 'Total', style: 'subheader'}
            ],
              ...this.ordenes.map( e => 
                [[{ text: e.emision+"", style: 'subheader' }, { text: e.equipo, style: 'subheader' }],
                ['', e.servicios],
                ['',{ text: '$'+e.valor, style: 'subheader', alignment:'right'}],
              ]
                ),
            ]
          },
          layout: 'lightHorizontalLines'
        },
        { text: 'Productos en Inventario', style: 'story', margin: [0, 20, 0, 10] },
        { table: {
            widths: [200,200,'auto'],
            body: [[
              { text: 'Nombre de producto', style: 'subheader'},{ text: 'Cantidad', style: 'subheader'},{ text: 'Precio p/u', style: 'subheader'}
            ],
              ...this.productos.map( e => 
                [[{ text: e.nombre+"", style: 'subheader' }],
                [{ text:e.cantidad }],
                [{ text:'$'+e.precioVenta , alignment: 'right'}]
              ]
                ),
            ]
          },
          layout: 'lightHorizontalLines'
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
          margin: [0, 0, 0, 10]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
          fontSize: 16,
          bold: true
        }
      }
    }

    const pdfObj = pdfMake.createPdf(docDefinition);
    pdfObj.open();
    //pdfObj.download('informe-cuentas_'+this.fechaString+'.pdf');
  }
  clear(){
    this.router.navigateByUrl('');
  }
}
