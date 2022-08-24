import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../modelo/entidade/usuario';

@Injectable()
export class FormNovoResolve implements Resolve<Usuario> {

    constructor(
        private servico: UsuarioService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.servico.novo(null);
    }

}
