import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TrocarSenha } from '../comum/modelo/trocar-senha';
import { TrocarSenhaService } from './trocar-senha.service';
import { TrocarSenhaFormService } from './trocar-senha-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css']
})
export class TrocarSenhaComponent implements OnInit {

  public frm: FormGroup;

  public isEnviado = false;
  public entidade: TrocarSenha;

  public escondeSenha = true;

  constructor(
    private _service: TrocarSenhaService,
    private _formService: TrocarSenhaFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {
  }

  ngOnInit(): void {
    this._route.data.subscribe((info) => {
      const valor = new TrocarSenha();
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

    const reg = this.frm.value as TrocarSenha;
    this._service.trocarSenha(reg).subscribe((resp) => {
      this._mensagem.sucesso('Senha alterada com sucesso!');
      this._router.navigate(['/', 'login']);
    }, (err) => {
      const msg = 'Erro ao alterar a senha';
      console.error(msg, err);
      this._mensagem.erro(msg);
    });
  }

}
