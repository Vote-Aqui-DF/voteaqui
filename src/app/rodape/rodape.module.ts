import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RodapeComponent } from './rodape.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [RodapeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RodapeComponent,
  ],
  entryComponents: [
    RodapeComponent,
  ]
})
export class RodapeModule { }
