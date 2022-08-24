import { EfetuaLogoutResolve } from './../comum/servico/resolver/efetua-logout.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperarSenhaComponent } from './recuperar-senha.component';


const routes: Routes = [
  {
    path: '',
    component: RecuperarSenhaComponent,
    resolve: { logout: EfetuaLogoutResolve },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarSenhaRoutingModule { }
