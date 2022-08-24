import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ResultadoService } from './resultado.service';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';

@Injectable({ providedIn: 'root' })
export class ResultadoResolver implements Resolve<string> {

  constructor(
    private servico: ResultadoService,
    private mensagem: MensagemService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | Promise<string> | string {
    return this.servico.getResultado(parseInt(route.paramMap.get('votacaoId'), 10))
      .pipe(
        catchError(error => {
          this.mensagem.erro(`Erro (${JSON.stringify(error.error.msg)})`);
          console.error(error);
          return of(null);
        })
      );
  }
}
