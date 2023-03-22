import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeerProductoPageRoutingModule } from './leer-producto-routing.module';

import { LeerProductoPage } from './leer-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeerProductoPageRoutingModule
  ],
  declarations: [LeerProductoPage]
})
export class LeerProductoPageModule {}
