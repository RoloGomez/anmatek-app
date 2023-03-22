import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeGastosPage } from './informe-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: InformeGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeGastosPageRoutingModule {}
