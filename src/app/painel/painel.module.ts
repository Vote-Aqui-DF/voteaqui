import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from './painel.component';
import { PipeModule } from '../comum/pipe/pipe.module';
import { PainelService } from './painel.service';
import { PainelResolver } from './painel.resolver';


@NgModule({
  declarations: [PainelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PainelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  providers: [
    PainelService,
    PainelResolver,
  ]
})
export class PainelModule { }
