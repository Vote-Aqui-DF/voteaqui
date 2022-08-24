import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';


@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    ListaRoutingModule
  ]
})
export class ListaModule { }
