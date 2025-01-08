import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IdentificacionPage } from './identificacion.page';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: IdentificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class IdentificacionPageRoutingModule {}
