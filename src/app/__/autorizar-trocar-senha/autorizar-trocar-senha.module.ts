import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AutorizarTrocarSenhaRoutingModule } from './autorizar-trocar-senha-routing.module';
import { AutorizarTrocarSenhaComponent } from './autorizar-trocar-senha.component';
import { AutorizarTrocarSenhaService } from './autorizar-trocar-senha.service';
import { AutorizarTrocarSenhaFormService } from './autorizar-trocar-senha-form.service';

@NgModule({
  declarations: [AutorizarTrocarSenhaComponent],
  imports: [
    CommonModule,
    AutorizarTrocarSenhaRoutingModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [
    AutorizarTrocarSenhaService,
    AutorizarTrocarSenhaFormService,
  ]
})
export class AutorizarTrocarSenhaModule { }
