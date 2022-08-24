import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PainelComponent } from './painel.component';
import { PainelResolver } from './painel.resolver';

const routes: Routes = [{
  path: '',
  component: PainelComponent,
  resolve: { dados: PainelResolver },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
