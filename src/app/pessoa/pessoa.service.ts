import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pessoa } from '../modelo/entidade/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  public filtro: { nome: string, cpfCnpj: string };

  constructor(
    private http: HttpClient,
  ) { }

  public novo(dados: Pessoa): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/pessoa/novo`, dados);
  }

  public create(dados: Pessoa): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/pessoa`, dados);
  }

  public restore(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/pessoa/${id}`);
  }

  public update(dados: Pessoa): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/pessoa`, dados);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/api/pessoa/${id}`);
  }

  public list(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/pessoa`);
  }

  public filtrar(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/pessoa`);
  }

}
