import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTecnicoPage } from './crear-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTecnicoPageRoutingModule {}
