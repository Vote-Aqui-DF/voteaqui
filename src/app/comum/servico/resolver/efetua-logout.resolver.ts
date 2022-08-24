import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { LoginService } from './../../../login/login.service';

@Injectable({
    providedIn: 'root'
})
export class EfetuaLogoutResolve implements Resolve<void> {

    constructor(
        private _service: LoginService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        if (this._service.estaLogado) {
            this._service.logout().subscribe(() => console.log('logout efetuado!!'));
        }
    }

}
