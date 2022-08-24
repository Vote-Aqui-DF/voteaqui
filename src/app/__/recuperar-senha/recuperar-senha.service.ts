import { RecuperarSenha } from './../comum/modelo/recuperar-senha';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable()
export class RecuperarSenhaService {

  constructor(
    private _http: HttpClient
  ) {
  }

  public recuperarSenha(valor: RecuperarSenha) {
    return this._http.post(environment.AUTHORIZATION_SERVER + `/usuario/recuperar-senha`, valor);
  }

}
