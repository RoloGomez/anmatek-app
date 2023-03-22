import { OrdenService } from './../services/orden.service';
import { AlertComponent } from './../components/alert/alert.component';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {
  content_visibility = 'hidden';
  scannedResult: string;
  datos: any[];
  escaneando: boolean = false;

  constructor(private router: Router, private alert: AlertComponent, private ordenDB: OrdenService) { 
    this.content_visibility = 'show';
  }

  ngOnInit() {
  }

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }

  async escanear() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      this.escaneando = true;

      const result = await BarcodeScanner.startScan();
      //console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';

      if(result?.hasContent) {
        this.scannedResult = result.content;
        this.datos = this.scannedResult.split('/');
        if(this.ordenDB.getOrdenById(this.datos[0])){
          //Invocar el service interactions y preguntar si quiere ir a la ruta.
          this.getOrder(this.datos[0], this.datos[1], this.datos[2], this.datos[3]);
        }else{
          this.scannedResult = this.scannedResult + " no se ha encontrado la ORDEN";
        }
        
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
    this.escaneando = false;
  }

  ngOnDestroy(): void {
      this.stopScan();
  }
  getOrder(id:any, rut: any, equipo: any, tecnico: any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        cli: rut,
        eq: equipo,
        tec: tecnico
      }
    }
    console.log(id);
    this.alert.irOrden();
    this.router.navigate(['leer-orden'], navigationExtras);
  }
}
