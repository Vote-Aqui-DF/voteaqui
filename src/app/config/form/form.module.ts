import { FormSairGuard } from './form-sair.guard';
import { PipeModule } from './../../comum/pipe/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
  ],
  providers: [
    FormSairGuard
  ]
})
export class FormModule { }
