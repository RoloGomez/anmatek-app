import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTecnicoPageRoutingModule } from './crear-tecnico-routing.module';

import { CrearTecnicoPage } from './crear-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTecnicoPageRoutingModule
  ],
  declarations: [CrearTecnicoPage]
})
export class CrearTecnicoPageModule {}
