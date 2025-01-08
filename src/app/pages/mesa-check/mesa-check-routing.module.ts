import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesaCheckPage } from './mesa-check.page';

const routes: Routes = [
  {
    path: '',
    component: MesaCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesaCheckPageRoutingModule {}
