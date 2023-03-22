import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: any = '';
  contrasena: any = '';
  error: boolean = false;
  constructor(private auth: AuthService, private router: Router, private toastController: ToastController) { 
  }

  ngOnInit() {
  }

  async iniciarSesion(){
    const res = await this.auth.loginUser(this.correo, this.contrasena).catch(error => {
      console.log(error);
      this.presentToast('bottom', 'El Usuario o Contraseño son Incorrectos');
    });
    if(res){
      this.presentToast('bottom', 'Bienvenido '+this.correo);
      this.auth.getUid();
      this.router.navigateByUrl('');
    }
  }
  logOut(){
    this.auth.logoutUser();
    this.presentToast('bottom','Sesion Finalizada');
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  
}
