import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario } from '../modelo/entidade/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  public novo(dados: Usuario): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/usuario/novo`, dados);
  }

  public create(dados: Usuario): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/usuario`, dados);
  }

  public restore(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/usuario/${id}`);
  }

  public update(dados: Usuario): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/usuario`, dados);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/api/usuario/${id}`);
  }

  public list(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/usuario`);
  }

  public loginDisponivel(login: string, id: number): Observable<any> {
    let param = `?login=${encodeURIComponent(login)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }
    return this.http.get<boolean>(
      `${environment.API_URL}/usuario/login-disponivel${param}` );
  }

  public pessoaDisponivel(pessoaId: number, id: number): Observable<any> {
    let param = `?pessoa-id=${encodeURIComponent(pessoaId)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }
    return this.http.get<boolean>(
      `${environment.API_URL}/usuario/pessoa-disponivel${param}`);
  }

  public emailDisponivel(email: string, id: number): Observable<any> {
    let param = `?email=${encodeURIComponent(email)}`;
    if (id) {
      param += `&id=${encodeURIComponent(id)}`;
    }
    return this.http.get<boolean>(
      `${environment.API_URL}/usuario/email-disponivel${param}`);
  }

}
