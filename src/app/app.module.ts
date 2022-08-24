import { MensagemModule } from './comum/servico/mensagem/mensagem.module';
import { AnexarModule } from './comum/servico/anexar/anexar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RodapeModule } from './rodape/rodape.module';
import localeBr from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicoModule } from './comum/servico/servico.module';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatDialogModule,
    HttpClientModule,
    RodapeModule,

    ServicoModule,
    AnexarModule,
    MensagemModule,
  ],
  exports: [
    MatDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
