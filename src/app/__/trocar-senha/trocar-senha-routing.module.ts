import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrocarSenhaComponent } from './trocar-senha.component';
import { EfetuaLogoutResolve } from '../comum/servico/resolver/efetua-logout.resolver';
import { TrocarSenhaResolve } from './trocar-senha.resolve';

const routes: Routes = [
  {
    path: '',
    component: TrocarSenhaComponent,
    resolve: { resolve: TrocarSenhaResolve, logout: EfetuaLogoutResolve },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrocarSenhaRoutingModule { }
