import { AuthService } from './../../services/auth.service';
import { InteractionsService } from './../../services/interactions.service';
import { InventarioService } from './../../services/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leer-producto',
  templateUrl: './leer-producto.page.html',
  styleUrls: ['./leer-producto.page.scss'],
})
export class LeerProductoPage implements OnInit {
  id: any;
  modificar: boolean = true;
  producto: Observable<any[]>;
  rolTecnico: any;
  constructor(private route: ActivatedRoute, private inventarioDB: InventarioService, private router: Router, 
              private interactions: InteractionsService, private auth: AuthService) {
    route.queryParams.subscribe( params => {
      if(params && params.id) {
        this.id = params.id;
      }
    });
  }

  ngOnInit() {
    this.producto = this.inventarioDB.readItemById(this.id);
    this.rolTecnico = this.auth.rol;
  }
  modificarProducto(){
    this.modificar = !this.modificar;
  }
  guardarProducto(id: any, nombre: any, cantidad: any, compra: any, venta: any){
    console.log(nombre, cantidad);
    this.interactions.modificarProducto(id, nombre, cantidad, compra, venta);
    this.modificarProducto
  }
  eliminar(id: any){
    this.interactions.eliminarProducto(id);
    this.clear();
  }
  clear(){
    this.router.navigateByUrl('');
  }
}
