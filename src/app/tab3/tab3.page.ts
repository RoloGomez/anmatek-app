import { AuthService } from './../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { ProductoData } from './../modelo/modelos';
import { InventarioService } from './../services/inventario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  inventario: any[];
  progreso:boolean = true;

  id: any;
  nombre: any;
  compra: any;
  venta: any;
  cantidad: any;

  producto: ProductoData;

  modal = null;
  rolTecnico: any;

  constructor(private inventarioDB: InventarioService, private router: Router, private auth: AuthService) {}

  ngOnInit(){
      this.inventarioDB.readAllItems().subscribe(res => {
        this.inventario = res;
        this.progreso = false;
      });
      this.rolTecnico = this.auth.rol;
  }

  createProducto(){
    this.inventarioDB.addItem(this.id, this.nombre, this.compra, this.venta, this.cantidad);
    this.modal = document.querySelector('#crear_producto');
    this.modal.dismiss();
    this.clear();
  }
  clear(){
    this.id = '';
    this.nombre = '';
    this.venta = '';
    this.compra = '';
    this.cantidad = '';
  }
  cargarItem(item: any) {
    this.producto = {
      id: item.id,
      nombre: item.nombre,
      precioVenta: item.precioVenta,
      precioCompra: item.precioCompra,
      cantidad: item.cantidad
    }
  }
  verProducto(idProducto: any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: idProducto
      }
    };
    this.router.navigate(['leer-producto'], navigationExtras);
  }
}
