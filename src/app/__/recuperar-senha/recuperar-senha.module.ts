import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RecuperarSenhaRoutingModule } from './recuperar-senha-routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { RecuperarSenhaFormService } from './recuperar-senha-form.service';
import { EfetuaLogoutResolve } from './../comum/servico/resolver/efetua-logout.resolver';

@NgModule({
  declarations: [RecuperarSenhaComponent],
  imports: [
    CommonModule,
    RecuperarSenhaRoutingModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [
    RecuperarSenhaService,
    RecuperarSenhaFormService,
    EfetuaLogoutResolve,
  ]
})
export class RecuperarSenhaModule { }
