import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeTecnicoPageRoutingModule } from './informe-tecnico-routing.module';

import { InformeTecnicoPage } from './informe-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeTecnicoPageRoutingModule
  ],
  declarations: [InformeTecnicoPage]
})
export class InformeTecnicoPageModule {}
