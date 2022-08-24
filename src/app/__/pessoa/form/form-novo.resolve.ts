import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { PessoaCrudService } from '../pessoa.service';

@Injectable()
export class FormNovoResolve implements Resolve<Pessoa> {

    constructor(
        private _service: PessoaCrudService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        this._service.acao = 'Novo';
        return {
            principal: this._service.novo(null),
        };
    }

}
