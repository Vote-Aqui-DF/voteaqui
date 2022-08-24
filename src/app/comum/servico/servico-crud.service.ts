import { Injector, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InjetorEstaticoService } from './../../comum/servico/injetor-estatico.service';
import { environment } from '../../../environments/environment';
import { EntidadeId } from '../modelo/entidade-id';
import { LoginService } from '../../login/login.service';
import { FiltroIdDTO } from '../modelo/dto/filtro-id.dto';

export abstract class ServicoCrudService<E extends EntidadeId, F extends FiltroIdDTO> {

  private _http: HttpClient;
  private _loginService: LoginService;

  private _lista: E[] = [];
  private _form: E;
  private _filtro: F;

  private _acao = '';
  private _entidade: E;

  constructor(
    private _funcionalidade: string,
  ) {
    const injector: Injector = InjetorEstaticoService.injector;
    this._http = injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    this._loginService = injector.get<LoginService>(LoginService as Type<LoginService>);
  }

  public get loginService() {
    return this._loginService;
  }
  public get http() {
    return this._http;
  }

  public get funcionalidade(): string {
    return this._funcionalidade;
  }

  public get acao(): string {
    return this._acao;
  }

  public set acao(valor: string) {
    this._acao = valor;
  }

  public get entidade(): E {
    return this._entidade;
  }

  public set entidade(valor: E) {
    this._entidade = valor;
  }

  public get lista(): E[] {
    return this._lista;
  }

  public get form(): E {
    return this._form;
  }

  public set form(valor) {
    this._form = valor;
  }

  public get filtro(): F {
    return this._filtro;
  }

  public set filtro(valor) {
    this._filtro = valor;
  }

  public create(entidade: E): Observable<number> {
    entidade.id = null;
    return this._http.post<number>(
      `${environment.REST_API_URL}/${this.funcionalidade}`,
      entidade,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public restore(id: number): Observable<E> {
    return this._http.get<E>(
      `${environment.REST_API_URL}/${this.funcionalidade}/${id}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public update(id: number, entidade: E): Observable<void> {
    return this._http.put<void>(
      `${environment.REST_API_URL}/${this.funcionalidade}/${id}`,
      entidade,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(
      `${environment.REST_API_URL}/${this.funcionalidade}/${id}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public novo(modelo: E): Observable<E> {
    return this._http.post<E>(
      `${environment.REST_API_URL}/${this.funcionalidade}/novo`,
      modelo,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

  public filtrar(): Observable<E[]> {
    // captar parametros do filtro
    let param = Object.keys(this.filtro).filter(key => this.filtro[key])
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(this.filtro[key]))
      .join('&');
    if (param) {
      param = '?' + param;
    }
    return this._http.get<E[]>(
      `${environment.REST_API_URL}/${this.funcionalidade}${param}`,
      { headers: this.loginService.apiRequestHttpHeader }
    );
  }

}
