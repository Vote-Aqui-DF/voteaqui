import { LoginService } from './../../../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const logado = this._loginService.estaLogado;

        if (!logado) {
            this._router.navigate(['/', 'login']);
        }

        return logado;
    }
}
