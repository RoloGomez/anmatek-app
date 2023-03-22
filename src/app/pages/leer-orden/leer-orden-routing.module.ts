import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeerOrdenPage } from './leer-orden.page';

const routes: Routes = [
  {
    path: '',
    component: LeerOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeerOrdenPageRoutingModule {}
