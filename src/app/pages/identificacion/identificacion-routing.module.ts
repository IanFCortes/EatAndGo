import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificacionPage } from './identificacion.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentificacionPageRoutingModule {}
