import { RegistroComponent } from './registro/registro.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        RegistroComponent
    ], imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ], exports: [
        RegistroComponent
    ]
})
export class ComponentsModule{}