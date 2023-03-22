import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAtencionesPage } from './informe-atenciones.page';

const routes: Routes = [
  {
    path: '',
    component: InformeAtencionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAtencionesPageRoutingModule {}
