import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPedidosClientePageRoutingModule } from './historial-pedidos-cliente-routing.module';

import { HistorialPedidosClientePage } from './historial-pedidos-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialPedidosClientePageRoutingModule
  ],
  declarations: [HistorialPedidosClientePage]
})
export class HistorialPedidosClientePageModule {}
