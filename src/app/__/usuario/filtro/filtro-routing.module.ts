import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroComponent } from './filtro.component';

const routes: Routes = [
  {
    path: '',
    component: FiltroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltroRoutingModule { }
