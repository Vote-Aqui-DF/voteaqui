import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { environment } from '../../environments/environment';
import { Votacao } from '../modelo/entidade/votacao';
import { Participante } from '../modelo/entidade/participante';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
    private mensagem: MensagemService
  ) { }

  public novo(dados: Votacao): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/votacao/novo`, dados);
  }

  public create(dados: Votacao): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/votacao`, dados);
  }

  public restore(id: number, senha: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/votacao/${id}/${senha}`);
  }

  public update(dados: Votacao, senha: string): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/votacao/${senha}`, dados);
  }

  public delete(id: number, senha: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/api/votacao/${id}/${senha}`);
  }

  public list(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/votacao`);
  }

  public createParticipante(dados: Participante, votacaoId: number): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/participante/${votacaoId}`, dados);
  }

  public updateParticipante(dados: Participante, votacaoId: number): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/participante/${votacaoId}`, dados);
  }

  public deleteParticipante(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/api/participante/${id}`);
  }

  public listParticipante(votacaoId: number, pagina:number): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/participante/votacao/${votacaoId}/pag/${pagina}`);
  }

  public enviarMensagem(mensagem: {
    senha: string,
    meio: string,
    votacao: { id: number, nome: string },
    API_URL: string,
    participanteIdLista: number[],
    msg: string
  }): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/votacao/mensagem`, mensagem);
  }

  public alterarSenha(id: any, senhas: any): Observable<any> {
    if (senhas && senhas.senhaAtual && senhas.senhaNova) {
      return this.http.put(`${environment.API_URL}/api/votacao/${id}/alterar-senha/${senhas.senhaAtual}/${senhas.senhaNova}`, null);
    }
  }

  public desbloquear(participanteId: any): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/participante/desbloquear`, { id: participanteId });
  }

}
