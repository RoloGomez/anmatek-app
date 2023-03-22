import { Observable } from 'rxjs';
import { ServicioService } from './servicio.service';
import { InventarioService } from './inventario.service';
import { Router } from '@angular/router';
import { OrdenService } from './orden.service';
import { TecnicoService } from './tecnico.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(public alertController: AlertController, public toastController: ToastController, public router: Router,
              public tecnicoDB: TecnicoService, public ordenDB: OrdenService, public inventarioDB: InventarioService,
              public servicioDB: ServicioService) { }

  //Mensajes
  async msgError() {
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error.',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async msgExito() {
    const toast = await this.toastController.create({
      message: 'El metodo ha funcionado.',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async msgcrearOrden() {
    const toast = await this.toastController.create({
      message: 'Orden agregada con exito!!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  async msgestadoOrden(estado: any) {
    const toast = await this.toastController.create({
      message: 'Estado de la orden cambiado a "'+estado+'"',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  async msgeliminarOrden() {
    const toast = await this.toastController.create({
      message: 'Se ha eliminado la orden con exito!!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  
  async msgmodificarProducto(nombre: any) {
    const toast = await this.toastController.create({
      message: nombre+' ha sido actualizado!!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  async msgeliminarProducto() {
    const toast = await this.toastController.create({
      message: 'El producto ha sido eliminado!!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  async msgmodificarTecnico(nombre: any) {
    const toast = await this.toastController.create({
      message: nombre+' ha sido actualizado!!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  async nuevaNotaAgregada() {
    const toast = await this.toastController.create({
      message: 'Nueva Nota agregada',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  //Alertas
    //Orden
  async cancelarOrden(){
    const alert = await this.alertController.create({
      header: 'Quiere cancelar la orden?',
      subHeader: 'Los datos ingresados se perderan',
      buttons: [
        {
          text: 'Continuar editando',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Descaertar orden',
          id: 'confirm',
          handler: (blah) => {
            //Algo
          }
        }
      ]
    });
    await alert.present();
  }
  async pausarOrden(idOrden: any, estado: any){
    const alert = await this.alertController.create({
      header: 'La orden está por ser pausada',
      subHeader: 'recuerde escribir el motivo de la pausa en Anotaciones.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'square-button',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Pausar',
          cssClass: 'square-button',
          id: 'confirm',
          handler: (blah) => {
            this.ordenDB.updateEstadoOrden(idOrden, estado);
            this.msgestadoOrden(estado);
          }
        }
      ]
    });
    await alert.present();
  }
  async estadorOrden(idOrden: any, estado: any){
    let msg = "";
    switch (estado){
      case "asignada":
        msg = "desea Asignar nuevamente la orden?";
        break;
      case "retiro":
        msg = "La orden esta lista para pasar a 'Retiro'?"
        break;
      case "completada":
        msg = "Desea completar la orden?";
        break;
      case "sin asignar":
        msg= "Desea Reasignar la orden?"
        break;
    }
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'square-button',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Aceptar',
          cssClass: 'square-button',
          id: 'confirm',
          handler: (blah) => {
            if(estado=='sin asignar'){
              this.ordenDB.updateTecnicoOrden(idOrden, 'vacio', '');
            }
            this.ordenDB.updateEstadoOrden(idOrden, estado);
            this.msgestadoOrden(estado);
            this.router.navigateByUrl('');
          }
        }
      ]
    });
    await alert.present();
  }
  async eliminarOrden(idOrden: any){
    const alert = await this.alertController.create({
      header: 'Eliminar orden',
      subHeader:'La eliminacion de la orden es irreversible. Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'square-button',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Si, eliminar orden',
          cssClass: 'square-button',
          id: 'confirm',
          handler: (blah) => {
            this.msgeliminarOrden();
            this.router.navigateByUrl('');
          }
        }
      ]
    });
    await alert.present();
  }
    //Tecnico
  async eliminarTecnico(rut:any, nombre:any){
    const alert = await this.alertController.create({
      header: 'Esta seguro de eliminar a '+nombre+'?',
      subHeader: 'Los datos ingresados se perderan',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Eliminar',
          id: 'confirm',
          handler: (blah) => {
            //Algo
            this.tecnicoDB.deleteTecnico(rut);
          }
        }
      ]
    });
    await alert.present();
  }
  async modificarTecnico(id: any, rut: any, nombre: any, rol: any, numero: any, correo: any){
    const alert = await this.alertController.create({
      header: 'Quiere guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            //nada
          }
        }, {
          text: 'Guardar',
          id: 'confirm',
          handler: (blah) => {
            //Algo
            this.tecnicoDB.updateTecnico(id, rut, nombre, rol, numero, correo)
            this.msgmodificarTecnico(nombre);
          }
        }
      ]
    });
    await alert.present();
  }
    //Inventario
    async modificarProducto(id: any, nombre:any, cantidad:any, compra: any, venta: any){
      const alert = await this.alertController.create({
        header: 'Quiere guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              //nada
            }
          }, {
            text: 'Guardar',
            id: 'confirm',
            handler: (blah) => {
              //Algo
              this.inventarioDB.updateItem(id, nombre, cantidad, compra, venta);
              this.msgmodificarProducto(nombre);
            }
          }
        ]
      });
      await alert.present();
    }
    async eliminarProducto(id: any){
      const alert = await this.alertController.create({
        header: 'Quiere eliminar el producto?',
        subHeader: 'los productos eliminados no se podran recuperar.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              //nada
            }
          }, {
            text: 'Guardar',
            id: 'confirm',
            handler: (blah) => {
              //Algo
              this.inventarioDB.deleteItem(id);
              this.msgeliminarProducto();

            }
          }
        ]
      });
      await alert.present();
    }
      //Servicio
      async agregarServicioOrden(id: any, idOrden: any, precioOrden: any, servicios: any, notas: any, nombre: any){
        let valor = 0;
        valor = this.servicioDB.getPrecio(id);

        const alert = await this.alertController.create({
          header: 'Precio del servicio:',
          subHeader:'Si preciona Guardar sin ingresar un valor se usará el valor recomendado.',
          inputs: [
            {
              name: 'precio',
              placeholder: 'recomendado $'+valor,
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              id: 'cancel-button',
              handler: (blah) => {
                //nada
              }
            }, {
              text: 'Guardar',
              id: 'confirm',
              handler: (blah) => {
                if(blah.precio != ''){
                  valor=blah.precio;
                } 
                console.log();
                this.ordenDB.updateValorOrden(idOrden, (precioOrden*1)+(valor*1));

                console.log("guardo el precio");

                servicios.push("$"+valor+" "+nombre);
                this.ordenDB.updateServicesOrden(idOrden, servicios);
                
                console.log("guardo el servicio");
                this.nuevaNotaAgregada();

                this.ordenDB.updateNotasOrden(idOrden, notas);
                
                console.log("guardo la nota");
              }
            }
          ]
        });
        await alert.present();
      }
}
