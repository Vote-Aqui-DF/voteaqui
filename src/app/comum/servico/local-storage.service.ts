import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static CHAVE_SEGURANCA = 'authToken';

  constructor() {
  }

  public gravar(key, dado) {
    localStorage.setItem(key, JSON.stringify(dado));
  }

  public pegar(chave) {
    return JSON.parse(localStorage.getItem(chave));
  }
  public apagar(chave) {
    return localStorage.removeItem(chave);
  }

}
