import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Usuario } from '../../../comum/modelo/entidade/usuario';
import { UsuarioCrudService } from '../usuario.service';

@Injectable()
export class FormResolve implements Resolve<Usuario> {

    constructor(
        private _service: UsuarioCrudService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        this._service.acao = 'Visualizar';
        return {
            principal: this._service.restore(route.params.id),
        };
    }

}
