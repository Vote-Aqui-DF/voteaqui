import { ListaResolve } from './lista/lista.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FormResolve } from './form/form.resolve';

const routes: Routes = [

  {
    path: '',
    component: ConfigComponent,
    children: [
      // {
      //   path: 'filtro',
      //   loadChildren: () => import('./filtro/filtro.module').then(m => m.FiltroModule),
      //   resolve: { dados: FiltroResolve },
      // },
      {
        path: 'novo',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { dados: FormNovoResolve },
      },
      {
        path: ':id/edit',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { dados: FormResolve },
      },
      {
        path: ':id',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { dados: FormResolve },
      },
      {
        path: '',
        loadChildren: () => import('./lista/lista.module').then(m => m.ListaModule),
        resolve: { dados: ListaResolve },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
