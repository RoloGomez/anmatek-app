import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeAtencionesPageRoutingModule } from './informe-atenciones-routing.module';

import { InformeAtencionesPage } from './informe-atenciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeAtencionesPageRoutingModule
  ],
  declarations: [InformeAtencionesPage]
})
export class InformeAtencionesPageModule {}
