import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  async alertaCrearOrden(){
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Desea cancelar la orden?',
      subHeader: 'Los datos se perderan si no guarda la orden!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuar Editando',
          id: 'confirm',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  }
  async irOrden(){
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Ir a la orden?',
      subHeader: 'Alerta de prueba',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ir a orden',
          id: 'confirm',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  }
}
