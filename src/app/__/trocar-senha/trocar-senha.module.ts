import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TrocarSenhaRoutingModule } from './trocar-senha-routing.module';
import { TrocarSenhaComponent } from './trocar-senha.component';
import { TrocarSenhaService } from './trocar-senha.service';
import { TrocarSenhaFormService } from './trocar-senha-form.service';


@NgModule({
  declarations: [TrocarSenhaComponent],
  imports: [
    CommonModule,
    TrocarSenhaRoutingModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    TrocarSenhaService,
    TrocarSenhaFormService,
  ]
})
export class TrocarSenhaModule { }
