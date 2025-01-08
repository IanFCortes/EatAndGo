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
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
