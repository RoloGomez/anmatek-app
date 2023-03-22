import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'crear-orden',
    loadChildren: () => import('../pages/crear-orden/crear-orden.module').then( m => m.CrearOrdenPageModule)
  },
  {
    path: 'leer-orden',
    loadChildren: () => import('../pages/leer-orden/leer-orden.module').then( m => m.LeerOrdenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
