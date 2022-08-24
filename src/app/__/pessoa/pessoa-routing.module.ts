import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaComponent } from './pessoa.component';
import { ListResolve } from './list/list.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { FormResolve } from './form/form.resolve';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
    children: [
      {
        path: 'filtro',
        loadChildren: () => import('./filtro/filtro.module').then(m => m.FiltroModule),
        resolve: { resolve: FiltroResolve }
      },
      {
        path: 'novo',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { resolve: FormNovoResolve }
      },
      {
        path: ':id/edit',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { resolve: FormResolve }
      },
      {
        path: ':id',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule),
        resolve: { resolve: FormResolve }
      },
      {
        path: '',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule),
        resolve: { resolve: ListResolve }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
