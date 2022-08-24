import { PainelService } from './painel.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PainelResolver implements Resolve<string> {
  constructor(
    private servico: PainelService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string>|Promise<string>|string {
    return this.servico.getVotacaoByIdentificacao(route.paramMap.get('id'));
  }
}
