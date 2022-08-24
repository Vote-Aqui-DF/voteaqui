import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CedulaResolver } from './cedula.resolver';
import { CedulaComponent } from './cedula.component';

const routes: Routes = [{
  path: '',
  component: CedulaComponent,
  resolve: { dados: CedulaResolver },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CedulaRoutingModule { }
