import { Login } from './../comum/modelo/login';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class LoginFormService {

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: Login) {
    if (!entidade) {
      entidade = new Login();
    }

    const result = this._formBuilder.group(
      {
        login: [entidade.login, [Validators.required]],
        senha: [entidade.senha, [Validators.required]],
      }
    );

    return result;
  }

}
