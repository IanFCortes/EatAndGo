import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaCheckPageRoutingModule } from './mesa-check-routing.module';

import { MesaCheckPage } from './mesa-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaCheckPageRoutingModule
  ],
  declarations: []
})
export class MesaCheckPageModule {}
