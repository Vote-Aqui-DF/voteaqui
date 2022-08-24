import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { ConfigService } from './../config.service';
import { Votacao } from './../../modelo/entidade/votacao';
import { ConfirmarVotoComponent } from './../../cedula/confirmar-voto/confirmar-voto.component';
import { MensagemService } from './../../comum/servico/mensagem/mensagem.service';

@Injectable()
export class FormResolve implements Resolve<Votacao> {

  constructor(
    private servico: ConfigService,
    private mensagem: MensagemService,
    private router: Router
  ) {
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const senha = await this.mensagem.confirmeModelo('Digite a senha de acesso', ConfirmarVotoComponent);
    if (senha && senha.trim().length) {
      return this.servico.restore(route.params.id, senha);
    } else {
      console.log(`senha nao informada`);
      this.router.navigate(['/', 'config']);
    }
  }

}
