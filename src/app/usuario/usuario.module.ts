import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FormNovoResolve } from './form/form-novo.resolve';
import { ListaResolve } from './lista/lista.resolve';
import { FormResolve } from './form/form.resolve';
import { UsuarioService } from './usuario.service';

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UsuarioService,
    FormNovoResolve,
    FormResolve,
    ListaResolve,
  ]
})
export class UsuarioModule { }
