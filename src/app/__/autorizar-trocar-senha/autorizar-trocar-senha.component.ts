import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AutorizarTrocarSenhaFormService } from './autorizar-trocar-senha-form.service';
import { AutorizarTrocarSenhaService } from './autorizar-trocar-senha.service';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { AutorizarTrocarSenha } from '../comum/modelo/autorizar-trocar-senha';

@Component({
  selector: 'app-autorizar-trocar-senha',
  templateUrl: './autorizar-trocar-senha.component.html',
  styleUrls: ['./autorizar-trocar-senha.component.css']
})
export class AutorizarTrocarSenhaComponent implements OnInit {

  public frm: FormGroup;

  public isEnviado = false;
  public entidade: AutorizarTrocarSenha;

  constructor(
    private _service: AutorizarTrocarSenhaService,
    private _formService: AutorizarTrocarSenhaFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {
  }

  ngOnInit(): void {
    this._route.data.subscribe((info) => {
      const valor = new AutorizarTrocarSenha();
      valor.email = info['resolve']['email'];
      valor.token = info['resolve']['token'];
      this.frm = this._formService.criarFormulario(valor);
    });
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      const msg = 'Dados inválidos!';
      console.error(this.frm);
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    const reg = this.frm.value as AutorizarTrocarSenha;
    this._service.autorizarTrocarSenha(reg).subscribe((resp) => {
      this._mensagem.sucesso('Token de recuperação de senha validado!');
      this._router.navigate(['trocar-senha', reg.email, reg.token]);
    }, (err) => {
      const msg = 'Erro no processo de recuperação de senha';
      console.error(msg, err);
      this._mensagem.erro(msg);
    });
  }

}
