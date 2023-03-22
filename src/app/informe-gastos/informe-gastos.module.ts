import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeGastosPageRoutingModule } from './informe-gastos-routing.module';

import { InformeGastosPage } from './informe-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeGastosPageRoutingModule
  ],
  declarations: [InformeGastosPage]
})
export class InformeGastosPageModule {}
