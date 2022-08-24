import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TrocarSenha } from '../comum/modelo/trocar-senha';

@Injectable()
export class TrocarSenhaService {

  constructor(
    private _http: HttpClient
  ) {
  }

  public trocarSenha(valor: TrocarSenha) {
    return this._http.post(environment.AUTHORIZATION_SERVER + `/usuario/trocar-senha`, valor);
  }

}
