import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from '../comum/servico/local-storage.service';
import { Token } from '../comum/modelo/token';
import { Login } from '../comum/modelo/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
  ) {
  }

  public login(valor: Login) {
    const url = `${environment.AUTHORIZATION_SERVER}/oauth/token`;
    const grantType = `?grant_type=password`;
    const username = `&username=${valor.login}`;
    const password = `&password=${valor.senha}`;
    const scope = `&scope=read write`;

    return this._http.post<Token>(`${url}${grantType}${username}${password}${scope}`,
      null,
      {
        observe: 'response',
        headers: this.clientDetailHttpHeader,
      }
    ).pipe(
      tap(resposta => {
        const resp = resposta.body;
        if (!resp || !resp.access_token) {
          const msg = 'Problemas ao autenticar o usuário!';
          this._localStorageService.apagar(LocalStorageService.CHAVE_SEGURANCA);
          throw new Error(msg);
        }
        this._localStorageService.gravar(LocalStorageService.CHAVE_SEGURANCA, resp);
      })
    );
  }

  public logout() {
    const url = `${environment.AUTHORIZATION_SERVER}/oauth/logout`;
    return this._http.post<string>(`${url}`,
      null,
      {
        // observe: 'response',
        headers: this.apiRequestHttpHeader
      }
    ) .pipe(
      tap(resposta => {
        this._localStorageService.apagar(LocalStorageService.CHAVE_SEGURANCA);
      })
    );
  }

  public get dadosLogin(): Token {
    return JSON.parse(localStorage.getItem(LocalStorageService.CHAVE_SEGURANCA));
  }

  public get estaLogado() {
    return this.dadosLogin != null;
  }

  private get clientCredentials() {
    return btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`);
  }

  public temPerfil(perfilList: string[]) {
    if (!this.dadosLogin || !this.dadosLogin.perfil) {
      return false;
    }
    for (const perfil of perfilList) {
      if (this.dadosLogin.perfil.includes(perfil)) {
        return true;
      }
    }
    return false;
  }

  private get clientDetailHttpHeader() {
    const credentials = `Basic ${this.clientCredentials}`;
    const result = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: credentials,
    });
    return result;
  }

  private get token() {
    return this.dadosLogin.access_token;
  }

  public get apiRequestHttpHeader() {
    const credentials = `Bearer ${this.token}`;
    const result = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: credentials
    };
    return new HttpHeaders(result);
  }

}
