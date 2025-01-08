import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialPedidosClientePage } from './historial-pedidos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialPedidosClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialPedidosClientePageRoutingModule {}
