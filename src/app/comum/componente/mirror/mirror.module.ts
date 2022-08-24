import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MirrorComponent } from './mirror.component';

@NgModule({
  declarations: [MirrorComponent],
  imports: [
    CommonModule
  ],
  exports: [MirrorComponent],
})
export class MirrorModule { }
