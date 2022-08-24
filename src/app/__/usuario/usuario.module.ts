import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { UsuarioFormService } from './usuario-form.service';
import { UsuarioCrudService } from './usuario.service';


@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ],
  exports: [
  ],
  providers: [
    UsuarioCrudService,
    UsuarioFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve,
  ]

})
export class UsuarioModule { }
