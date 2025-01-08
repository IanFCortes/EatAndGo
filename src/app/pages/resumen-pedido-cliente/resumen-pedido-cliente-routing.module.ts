import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenPedidoClientePage } from './resumen-pedido-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenPedidoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenPedidoClientePageRoutingModule {}
