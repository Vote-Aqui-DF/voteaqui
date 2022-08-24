import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TrocarSenha } from './../comum/modelo/trocar-senha';

@Injectable()
export class TrocarSenhaFormService {

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: TrocarSenha) {
    if (!entidade) {
      entidade = new TrocarSenha();
    }

    const result = this._formBuilder.group(
      {
        email: [entidade.email, [Validators.required, Validators.email]],
        token: [entidade.token, [Validators.required]],
        senha: [entidade.senha, [Validators.required]],
        senhaRepetir: [entidade.senhaRepetir, []],
      }
    );

    // invalidar formulario caso as senhas não coincidam
    result.valueChanges.subscribe(field => {
      if (field.senha !== field.senhaRepetir) {
        result.controls.senhaRepetir.setErrors({ senhaNaoCoincidente: true });
      } else {
        result.controls.senhaRepetir.setErrors(null);
      }
    });

    return result;
  }

}
