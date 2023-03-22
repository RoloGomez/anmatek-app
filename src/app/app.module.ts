import { AlertComponent } from './components/alert/alert.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  //declarar el alertComponent, ademas ponerlo en los providers
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    ReactiveFormsModule,
    QRCodeModule,
  ],
  providers: [
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AlertComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
