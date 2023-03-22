import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeerOrdenPageRoutingModule } from './leer-orden-routing.module';

import { LeerOrdenPage } from './leer-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeerOrdenPageRoutingModule,
    QRCodeModule
  ],
  declarations: [LeerOrdenPage]
})
export class LeerOrdenPageModule {}
