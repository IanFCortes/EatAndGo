import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentificacionPageRoutingModule } from './identificacion-routing.module';

import { IdentificacionPage } from './identificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentificacionPageRoutingModule
  ],
  declarations: [IdentificacionPage]
})
export class IdentificacionPageModule {}
