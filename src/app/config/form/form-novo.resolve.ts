import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { ConfigService } from './../config.service';
import { Votacao } from './../../modelo/entidade/votacao';

@Injectable()
export class FormNovoResolve implements Resolve<Votacao> {

    constructor(
        private servico: ConfigService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.servico.novo(null);
    }

}
