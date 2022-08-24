import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensagemService } from './mensagem.service';
import { ConfirmeComponent } from './confirme.component';

@NgModule({
  declarations: [ConfirmeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    MatDialogModule,
  ],
  providers: [MensagemService],
  entryComponents: [ConfirmeComponent]
})
export class MensagemModule { }
