import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenPedidoClientePageRoutingModule } from './resumen-pedido-cliente-routing.module';

import { ResumenPedidoClientePage } from './resumen-pedido-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenPedidoClientePageRoutingModule
  ],
  declarations: [ResumenPedidoClientePage]
})
export class ResumenPedidoClientePageModule {}
