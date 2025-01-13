import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'identificacion',
    loadChildren: () => import('./pages/identificacion/identificacion.module').then( m => m.IdentificacionPageModule)
  },
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'mesa-check',
    loadChildren: () => import('./pages/mesa-check/mesa-check.module').then( m => m.MesaCheckPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'pedido-cliente',
    loadChildren: () => import('./pages/pedido-cliente/pedido-cliente.module').then( m => m.PedidoClientePageModule)
  },
  {
    path: 'resumen-pedido-cliente',
    loadChildren: () => import('./pages/resumen-pedido-cliente/resumen-pedido-cliente.module').then( m => m.ResumenPedidoClientePageModule)
  },
  {
    path: 'historial-pedidos-cliente',
    loadChildren: () => import('./pages/historial-pedidos-cliente/historial-pedidos-cliente.module').then( m => m.HistorialPedidosClientePageModule)
  },
  {
    path: 'resumen-cliente',
    loadChildren: () => import('./pages/resumen-cliente/resumen-cliente.module').then( m => m.ResumenClientePageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./pages/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./pages/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
