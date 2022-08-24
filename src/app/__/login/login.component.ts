import { LoginFormService } from './login-form.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Login } from '../comum/modelo/login';
import { LoginService } from './login.service';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public frm: FormGroup;

  public isEnviado = false;
  public entidade: Login;

  public escondeSenha = true;

  @ViewChild('recebeFoco') campoFoco: ElementRef;

  constructor(
    private _service: LoginService,
    private _formService: LoginFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {
  }

  ngOnInit(): void {
    this.frm = this._formService.criarFormulario(new Login());
  }

  ngAfterViewInit() {
    this.campoFoco.nativeElement.focus();
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

    const reg = this.frm.value as Login;
    this._service.login(reg).subscribe((resp) => {
      this._mensagem.sucesso('Login Efetuado!');
      this._router.navigate(['/']);
    }, (err) => {
      let msg = 'Erro no processo de login';
      if (err.error.error_description === 'Bad credentials') {
        msg = 'Credenciais inválidas!';
      }
      console.error(msg, err);
      this._mensagem.erro(msg);
    });
  }

}
