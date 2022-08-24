import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoComponent } from './resultado.component';
import { ResultadoResolver } from './resultado.resolver';


const routes: Routes = [{
  path: '',
  component: ResultadoComponent,
  resolve: { dados: ResultadoResolver },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoRoutingModule { }
