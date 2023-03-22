import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeTecnicoPage } from './informe-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: InformeTecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeTecnicoPageRoutingModule {}
