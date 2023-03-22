import { ComponentsModule } from './../../components/components.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearOrdenPageRoutingModule } from './crear-orden-routing.module';

import { CrearOrdenPage } from './crear-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearOrdenPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule,
    ComponentsModule
  ],
  declarations: [CrearOrdenPage]
})
export class CrearOrdenPageModule {}
