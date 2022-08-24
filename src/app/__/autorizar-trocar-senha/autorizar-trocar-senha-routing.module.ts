import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizarTrocarSenhaComponent } from './autorizar-trocar-senha.component';
import { AutorizarTrocarSenhaResolve } from './autorizar-trocar-senha.resolve';
import { EfetuaLogoutResolve } from '../comum/servico/resolver/efetua-logout.resolver';

const routes: Routes = [
  {
    path: '',
    component: AutorizarTrocarSenhaComponent,
    resolve: { resolve: AutorizarTrocarSenhaResolve, logout: EfetuaLogoutResolve },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizarTrocarSenhaRoutingModule { }
