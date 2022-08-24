import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../modelo/entidade/usuario';
import { ConfirmarVotoComponent } from '../../cedula/confirmar-voto/confirmar-voto.component';
import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';

@Injectable()
export class FormResolve implements Resolve<Usuario> {

  constructor(
    private servico: UsuarioService,
    private mensagem: MensagemService,
    private router: Router
  ) {
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.servico.restore(route.params.id);
  }

}
