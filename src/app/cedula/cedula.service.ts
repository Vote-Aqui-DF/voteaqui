import { Voto } from './../modelo/entidade/voto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CedulaService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getVotacaoByIdentificacaoAndVotacao(identificacao: string, votacao: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/participante/${identificacao}/${votacao}`);
  }

  public votar(identificacao: string, votacaoId: number, senha: string, voto: Voto): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/voto/${identificacao}/${votacaoId}/${senha}`, voto);
  }

}
