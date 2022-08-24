import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RecuperarSenhaFormService } from './recuperar-senha-form.service';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';
import { RecuperarSenha } from '../comum/modelo/recuperar-senha';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  public frm: FormGroup;

  public isEnviado = false;
  public entidade: RecuperarSenha;

  constructor(
    private _service: RecuperarSenhaService,
    private _formService: RecuperarSenhaFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {

  }

  ngOnInit(): void {
    this.frm = this._formService.criarFormulario(new RecuperarSenha());
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

    const reg = this.frm.value as RecuperarSenha;
    this._service.recuperarSenha(reg).subscribe((resp) => {
      this._mensagem.sucesso('E-mail de recuperação de senha enviado!');
      this._router.navigate(['/', 'autorizar-trocar-senha', reg.email]);
    }, (err) => {
      const msg = 'Erro no processo de recuperação de senha';
      console.error(msg, err);
      this._mensagem.erro(msg);
    });
  }

}
