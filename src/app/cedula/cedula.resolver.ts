import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { CedulaService } from './cedula.service';

@Injectable({ providedIn: 'root' })
export class CedulaResolver implements Resolve<string> {
  constructor(
    private servico: CedulaService,
    private mensagem: MensagemService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | Promise<string> | string {
    return this.servico.getVotacaoByIdentificacaoAndVotacao(route.paramMap.get('id'), route.paramMap.get('votacao'))
      .pipe(
        catchError(error => {
          this.mensagem.erro(error);
          return of(null);
        })
      );
  }
}
