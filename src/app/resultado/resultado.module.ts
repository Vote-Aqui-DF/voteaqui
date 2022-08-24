import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResultadoRoutingModule } from './resultado-routing.module';
import { ResultadoComponent } from './resultado.component';
import { MaterialModule } from '../material/material.module';
import { ResultadoService } from './resultado.service';
import { ResultadoResolver } from './resultado.resolver';


@NgModule({
  declarations: [ResultadoComponent],
  imports: [
    CommonModule,
    ResultadoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ResultadoService,
    ResultadoResolver,
  ]
})
export class ResultadoModule { }
