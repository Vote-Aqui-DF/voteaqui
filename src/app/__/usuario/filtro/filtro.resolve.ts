import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { UsuarioCrudService } from '../usuario.service';

@Injectable()
export class FiltroResolve implements Resolve<any> {

    constructor(private _service: UsuarioCrudService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        this._service.acao = 'Filtrar';
        return null;
    }

}
