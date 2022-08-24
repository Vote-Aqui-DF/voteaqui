import { NgModule } from '@angular/core';
import { CallbackPipe } from './callback.pipe';
import { JsonFormatPipe } from './json-format.pipe';

@NgModule({
  declarations: [
    CallbackPipe,
    JsonFormatPipe,
  ],
  exports: [
    CallbackPipe,
    JsonFormatPipe,
  ],
})
export class PipeModule { }
