import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'identificacion',
    loadChildren: () => import('./identificacion/identificacion.module').then( m => m.IdentificacionPageModule)
  },
  {
    path: '',
    redirectTo: 'identificacion',
    pathMatch: 'full'
  },  {
    path: 'mesa-check',
    loadChildren: () => import('./mesa-check/mesa-check.module').then( m => m.MesaCheckPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'pedido-cliente',
    loadChildren: () => import('./pedido-cliente/pedido-cliente.module').then( m => m.PedidoClientePageModule)
  },
  {
    path: 'resumen-pedido',
    loadChildren: () => import('./resumen-pedido/resumen-pedido.module').then( m => m.ResumenPedidoPageModule)
  },
  {
    path: 'resumen-pedido-cliente',
    loadChildren: () => import('./resumen-pedido-cliente/resumen-pedido-cliente.module').then( m => m.ResumenPedidoClientePageModule)
  },
  {
    path: 'historial-pedidos-cliente',
    loadChildren: () => import('./historial-pedidos-cliente/historial-pedidos-cliente.module').then( m => m.HistorialPedidosClientePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
