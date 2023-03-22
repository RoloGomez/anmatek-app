import { RegistroComponent } from './components/registro/registro.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Las rutas del navigateById() se escriben aca

const routes: Routes = [
  { path: 'registro', component: RegistroComponent},
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-orden',
    loadChildren: () => import('./pages/crear-orden/crear-orden.module').then( m => m.CrearOrdenPageModule)
  },
  {
    path: 'crear-tecnico',
    loadChildren: () => import('./pages/crear-tecnico/crear-tecnico.module').then( m => m.CrearTecnicoPageModule)
  },
  {
    path: 'leer-orden',
    loadChildren: () => import('./pages/leer-orden/leer-orden.module').then( m => m.LeerOrdenPageModule)
  },
  {
    path: 'patron',
    loadChildren: () => import('./patron/patron.module').then( m => m.PatronPageModule)
  },
  {
    path: 'leerqr',
    loadChildren: () => import('./leerqr/leerqr.module').then( m => m.LeerqrPageModule)
  },
  {
    path: 'leer-producto',
    loadChildren: () => import('./pages/leer-producto/leer-producto.module').then( m => m.LeerProductoPageModule)
  },
  {
    path: 'informe-tecnico',
    loadChildren: () => import('./informe-tecnico/informe-tecnico.module').then( m => m.InformeTecnicoPageModule)
  },
  {
    path: 'informe-atenciones',
    loadChildren: () => import('./informe-atenciones/informe-atenciones.module').then( m => m.InformeAtencionesPageModule)
  },
  {
    path: 'informe-gastos',
    loadChildren: () => import('./informe-gastos/informe-gastos.module').then( m => m.InformeGastosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
