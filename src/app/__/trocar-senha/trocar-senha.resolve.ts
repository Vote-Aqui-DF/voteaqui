import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MensagemService } from '../comum/servico/mensagem/mensagem.service';

@Injectable()
export class TrocarSenhaResolve implements Resolve<any> {

    constructor(
        private _router: Router,
        private _mensagem: MensagemService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        const email = route.params['email'];
        const token = route.params['token'];
        if (!email || !token) {
            this._mensagem.erro('E-mail ou token não informados');
            this._router.navigate(['recuperar-senha']);
        }
        return {
            email,
            token
        };
    }

}
