import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { FormNovoResolve } from './form/form-novo.resolve';
import { ListaResolve } from './lista/lista.resolve';
import { FormResolve } from './form/form.resolve';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ConfigService,
    FormNovoResolve,
    FormResolve,
    ListaResolve,
  ]
})
export class ConfigModule { }
