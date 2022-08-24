import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';
import { constante } from './../../constante';
import { MensagemService } from '../../servico/mensagem/mensagem.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public SEM_FOTO = constante.SEM_FOTO;

  constructor(
    private _loginService: LoginService,
    private _mensagem: MensagemService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public get login() {
    return this.estaLogado ? this._loginService.dadosLogin : null;
  }

  public logout() {
    this._loginService.logout().subscribe((r) => {
      this._mensagem.sucesso('Logout efetuado!!!');
      this._router.navigate(['/']);
    }, (e) => {
      this._router.navigate(['/']);
    });
  }

  public temPerfil(perfilList: string[]) {
    return this._loginService.temPerfil(perfilList);
  }

  public adMime(v) {
    return this.adMime(v);
  }

  public get estaLogado() {
    return this._loginService.estaLogado;
  }

}
