import { AutorizarTrocarSenha } from './../comum/modelo/autorizar-trocar-senha';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AutorizarTrocarSenhaService {

  constructor(
    private _http: HttpClient
  ) {
  }

  public autorizarTrocarSenha(valor: AutorizarTrocarSenha) {
    return this._http.post(environment.AUTHORIZATION_SERVER + `/usuario/autorizar-trocar-senha`, valor);
  }

}
