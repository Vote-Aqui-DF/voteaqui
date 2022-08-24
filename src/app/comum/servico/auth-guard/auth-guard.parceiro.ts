import { LoginService } from '../../../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MensagemService } from '../mensagem/mensagem.service';

@Injectable()
export class AuthGuardParceiroService implements CanActivate {
    constructor(
        private _loginService: LoginService,
        private _router: Router,
        private _mensagem: MensagemService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const temAcesso = this._loginService.estaLogado && this._loginService.temPerfil(['Parceiro']);

        if (!temAcesso) {
            this._mensagem.erro('Acesso negado!');
            this._router.navigate(['/']);
        }

        return temAcesso;
    }
}
