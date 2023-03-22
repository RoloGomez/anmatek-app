import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeerProductoPage } from './leer-producto.page';

const routes: Routes = [
  {
    path: '',
    component: LeerProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeerProductoPageRoutingModule {}
