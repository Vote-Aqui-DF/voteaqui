import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { EfetuaLogoutResolve } from '../comum/servico/resolver/efetua-logout.resolver';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    resolve: { logout: EfetuaLogoutResolve },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
