import { MatDialogModule } from '@angular/material/dialog';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material/material.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CedulaRoutingModule } from './cedula-routing.module';
import { CedulaComponent } from './cedula.component';
import { CedulaService } from './cedula.service';
import { CedulaResolver } from './cedula.resolver';
import { PipeModule } from '../comum/pipe/pipe.module';
import { ConfirmarVotoComponent } from './confirmar-voto/confirmar-voto.component';
import { MensagemParticipanteComponent } from './mensagem-participante/mensagem-participante.component';


@NgModule({
  declarations: [
    CedulaComponent,
    ConfirmarVotoComponent,
    MensagemParticipanteComponent,
    AlterarSenhaComponent,
  ],
  imports: [
    CommonModule,
    CedulaRoutingModule,
    MaterialModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    MatDialogModule,
  ],
  providers: [
    CedulaService,
    CedulaResolver,
  ],
  entryComponents: [
    AlterarSenhaComponent,
  ]
})
export class CedulaModule { }
